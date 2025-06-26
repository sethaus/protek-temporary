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

// GET - Belirli bir ürünü getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Try Airtable first if ID starts with "rec" (Airtable record)
    if (id.startsWith('rec') && process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        const product = await airtableProducts.getById(id)
        return NextResponse.json({ 
          success: true, 
          product,
          source: 'airtable'
        })
      } catch (airtableError) {
        console.error('Airtable product not found, trying JSON:', airtableError)
      }
    }
    
    // Fallback to JSON store
    const store = readProductsStore()
    const product = store.products.find((p: Product) => p.id === id)
    
    if (!product) {
      // Try original products as well
      const originalProducts = getAllProducts()
      const originalProduct = originalProducts.find(p => p.id === id)
      
      if (originalProduct) {
        return NextResponse.json({ 
          success: true, 
          product: originalProduct,
          source: 'original'
        })
      }
      
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      product,
      source: 'json'
    })
  } catch (error) {
    console.error('❌ GET /api/products/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}

// PUT - Ürün güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id
    const updatedProduct: any = await request.json()
    
    // Validasyon
    if (!updatedProduct.name) {
      return NextResponse.json({
        success: false,
        error: 'Ürün adı zorunludur'
      }, { status: 400 })
    }
    
    // Try Airtable first if ID starts with "rec" (Airtable record)
    if (productId.startsWith('rec') && process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        console.log('🔄 Updating product in Airtable:', productId, updatedProduct)
        
        // Clean product data for Airtable - include all compatible fields
        const cleanedProduct = Object.entries(updatedProduct).reduce((acc, [key, value]) => {
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
        
        const airtableProduct = await airtableProducts.update(productId, cleanedProduct)
        console.log('✅ Successfully updated in Airtable:', airtableProduct)
        
        return NextResponse.json({ 
          success: true, 
          message: 'Ürün başarıyla güncellendi (Airtable)',
          data: airtableProduct,
          source: 'airtable'
        })
      } catch (airtableError) {
        console.error('❌ Airtable update error:', airtableError)
        return NextResponse.json({
          success: false,
          error: 'Airtable ürünü güncellenirken hata oluştu'
        }, { status: 500 })
      }
    }
    
    // Store'u oku
    const store = readProductsStore()
    
    // Orijinal ürünleri kontrol et
    const originalProducts = getAllProducts()
    const isOriginalProduct = originalProducts.some(p => p.id === productId)
    
    // updated_at timestamp ekle
    const productWithTimestamp = {
      ...updatedProduct,
      updated_at: new Date().toISOString()
    }
    
    // Store'da mevcut ürünü bul veya ekle
    let productIndex = store.products.findIndex((p: Product) => p.id === productId)
    
    if (productIndex >= 0) {
      // Store'da varsa güncelle
      store.products[productIndex] = productWithTimestamp
    } else {
      // Store'da yoksa ekle (orijinal ürünün güncellenmiş hali)
      store.products.push(productWithTimestamp)
    }
    
    store.lastUpdated = new Date().toISOString()
    
    // Store'u güncelle
    writeProductsStore(store)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ürün başarıyla güncellendi',
      data: productWithTimestamp,
      meta: {
        isOriginalProduct,
        action: productIndex >= 0 ? 'updated' : 'added_to_store'
      }
    })
    
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Ürün güncellenirken hata oluştu'
    }, { status: 500 })
  }
}

// DELETE - Ürün sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id
    
    // Try Airtable first if ID starts with "rec" (Airtable record)
    if (productId.startsWith('rec') && process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        console.log('🔄 Deleting product from Airtable:', productId)
        await airtableProducts.delete(productId)
        console.log('✅ Successfully deleted from Airtable')
        
        return NextResponse.json({ 
          success: true, 
          message: 'Ürün başarıyla silindi (Airtable)',
          source: 'airtable'
        })
      } catch (airtableError) {
        console.error('❌ Airtable delete error:', airtableError)
        return NextResponse.json({
          success: false,
          error: 'Airtable ürünü silinirken hata oluştu'
        }, { status: 500 })
      }
    }
    
    // Store'u oku
    const store = readProductsStore()
    
    // Orijinal ürünleri kontrol et
    const originalProducts = getAllProducts()
    const isOriginalProduct = originalProducts.some(p => p.id === productId)
    
    if (isOriginalProduct) {
      // Orijinal ürünse, "deleted" işareti koy
      const existingIndex = store.products.findIndex((p: Product) => p.id === productId)
      
      if (existingIndex >= 0) {
        // Zaten store'da varsa sil
        store.products.splice(existingIndex, 1)
      }
      
      // Deleted ürün olarak işaretle
      store.products.push({
        id: productId,
        deleted: true,
        deletedAt: new Date().toISOString()
      } as any)
      
    } else {
      // Custom ürünse store'dan tamamen sil
      const existingIndex = store.products.findIndex((p: Product) => p.id === productId)
      
      if (existingIndex >= 0) {
        store.products.splice(existingIndex, 1)
      } else {
        return NextResponse.json({
          success: false,
          error: 'Ürün bulunamadı'
        }, { status: 404 })
      }
    }
    
    store.lastUpdated = new Date().toISOString()
    
    // Store'u güncelle
    writeProductsStore(store)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ürün başarıyla silindi',
      meta: {
        isOriginalProduct,
        action: isOriginalProduct ? 'marked_deleted' : 'removed_from_store'
      }
    })
    
  } catch (error) {
    console.error('Ürün silme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Ürün silinirken hata oluştu'
    }, { status: 500 })
  }
} 