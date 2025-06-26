import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Product, getAllProducts } from '@/data/products'
import { airtableProducts } from '@/lib/airtable'

const PRODUCTS_STORE = path.join(process.cwd(), 'src/data/products-store.json')

// JSON store'u oku
function readProductsStore() {
  try {
    if (!fs.existsSync(PRODUCTS_STORE)) {
      return { products: [], lastUpdated: new Date().toISOString() }
    }
    const content = fs.readFileSync(PRODUCTS_STORE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error('JSON store okuma hatası:', error)
    return { products: [], lastUpdated: new Date().toISOString() }
  }
}

// JSON store'u yaz
function writeProductsStore(data: any) {
  try {
    fs.writeFileSync(PRODUCTS_STORE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('JSON store yazma hatası:', error)
    throw error
  }
}

// Tüm ürünleri getir (Airtable + fallback to JSON)
export async function GET() {
  try {
    // HYBRID SYSTEM: Always merge Airtable + JSON data  
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        const airtableData = await airtableProducts.getAll()
        
        // Always get JSON data too
        const originalProducts = getAllProducts()
        const store = readProductsStore()
        const customProducts = store.products || []
        
        // Merge JSON products (excluding deleted ones)
        const jsonProducts = [
          ...customProducts.filter((p: any) => !p.deleted),
          ...originalProducts.filter(op => !customProducts.find((cp: any) => cp.id === op.id && !cp.deleted))
        ]
        
        // Combine Airtable + JSON products
        const allProducts = [
          ...airtableData, // New Airtable products first
          ...jsonProducts   // Then JSON products
        ]
        
        // Sort by updated_at (newest first)
        const sortedProducts = allProducts.sort((a, b) => {
          const aTime = new Date(a.updated_at || a.created_at || 0).getTime()
          const bTime = new Date(b.updated_at || b.created_at || 0).getTime()
          return bTime - aTime
        })
        
        return NextResponse.json({ 
          success: true, 
          data: sortedProducts,
          source: 'hybrid',
          meta: {
            total: sortedProducts.length,
            airtable: airtableData.length,
            json: jsonProducts.length,
            lastUpdated: new Date().toISOString()
          }
        })
      } catch (airtableError) {
        console.error('Airtable error, falling back to JSON:', airtableError)
        // Fall back to JSON on Airtable error
      }
    }
    
    // Fallback to JSON system
    const originalProducts = getAllProducts()
    const store = readProductsStore()
    const customProducts = store.products || []
    
    let allProducts = [
      ...customProducts.filter((p: any) => !p.deleted),
      ...originalProducts.filter(op => !customProducts.find((cp: any) => cp.id === op.id && !cp.deleted))
    ]

    // En yeni ürün en üstte olacak şekilde sırala
    allProducts = allProducts.sort((a, b) => {
      const aTime = new Date(a.updated_at || a.created_at || 0).getTime()
      const bTime = new Date(b.updated_at || b.created_at || 0).getTime()
      return bTime - aTime
    })
    
    return NextResponse.json({ 
      success: true, 
      data: allProducts,
      source: 'json',
      meta: {
        total: allProducts.length,
        original: originalProducts.length,
        custom: customProducts.length,
        lastUpdated: store.lastUpdated
      }
    })
  } catch (error) {
    console.error('Ürünler getirme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Ürünler yüklenirken hata oluştu'
    }, { status: 500 })
  }
}

// Yeni ürün ekle (Airtable + fallback to JSON)
export async function POST(request: NextRequest) {
  try {
    const newProduct: any = await request.json()
    
    // Validasyon
    if (!newProduct.name) {
      return NextResponse.json({
        success: false,
        error: 'Ürün adı zorunludur'
      }, { status: 400 })
    }
    
    // ALWAYS try Airtable first for new products
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        console.log('🔄 Attempting to create product in Airtable:', newProduct)
        
        // Clean product data for Airtable - include all compatible fields
        const cleanedProduct = Object.entries(newProduct).reduce((acc, [key, value]) => {
          // Skip only system fields that cause issues
          const skipFields = ['id', 'created_at', 'updated_at', 'image']
          
          if (value !== undefined && value !== null && !skipFields.includes(key)) {
            // Handle special field types for Airtable compatibility
            if (key === 'price') {
              if (typeof value === 'string' && value.trim() === '') {
                return acc // Skip empty price
              }
              // Convert price to number for Airtable
              const numPrice = typeof value === 'string' ? parseFloat(value) : Number(value)
              if (!isNaN(numPrice) && numPrice > 0) {
                acc[key] = numPrice
              }
              return acc
            }
            
            // Convert arrays to comma-separated strings for Airtable
            if (key === 'features' || key === 'applications') {
              if (Array.isArray(value) && value.length > 0) {
                acc[key] = value.join(', ')
              }
              return acc
            }
            
            // Convert images array to JSON string for Airtable
            if (key === 'images') {
              if (Array.isArray(value) && value.length > 0) {
                acc[key] = JSON.stringify(value)
              }
              return acc
            }
            
            // Convert specifications object to JSON string
            if (key === 'specifications') {
              if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
                acc[key] = JSON.stringify(value)
              }
              return acc
            }
            
            acc[key] = value
          }
          return acc
        }, {} as any)
        
        console.log('🔧 Cleaned product for Airtable:', cleanedProduct)
        const airtableProduct = await airtableProducts.create(cleanedProduct)
        console.log('✅ Successfully created in Airtable:', airtableProduct)
        
        return NextResponse.json({ 
          success: true, 
          message: 'Ürün başarıyla eklendi (Airtable)',
          data: airtableProduct,
          source: 'airtable'
        })
      } catch (airtableError) {
        console.error('❌ Airtable error, falling back to JSON:', airtableError)
        console.error('Error details:', airtableError instanceof Error ? airtableError.message : String(airtableError))
        // Fall back to JSON on error
      }
    } else {
      console.log('⚠️ Airtable credentials missing, using JSON fallback')
    }
    
    // Fallback to JSON system
    const store = readProductsStore()
    
    // ID çakışması kontrolü
    const allProducts = getAllProducts()
    const existingIds = [...allProducts.map(p => p.id), ...store.products.map((p: Product) => p.id)]
    
    if (newProduct.id && existingIds.includes(newProduct.id)) {
      return NextResponse.json({
        success: false,
        error: 'Bu ID zaten kullanılıyor'
      }, { status: 400 })
    }
    
    // Yeni ürüne tarih bilgisi ekle
    const now = new Date().toISOString()
    const productWithTimestamp = {
      ...newProduct,
      id: newProduct.id || `product-${Date.now()}`,
      created_at: now,
      updated_at: now
    }
    
    // Yeni ürünü ekle
    store.products.push(productWithTimestamp)
    store.lastUpdated = new Date().toISOString()
    
    // Store'u güncelle
    writeProductsStore(store)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ürün başarıyla eklendi (JSON)',
      data: productWithTimestamp,
      source: 'json'
    })
    
  } catch (error) {
    console.error('Ürün ekleme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Ürün eklenirken hata oluştu'
    }, { status: 500 })
  }
} 