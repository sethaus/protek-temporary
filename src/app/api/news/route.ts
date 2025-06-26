import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { airtableNews } from '@/lib/airtable'

const STORE_PATH = path.join(process.cwd(), 'src/data/news-events-store.json')

function readStore() {
  if (!fs.existsSync(STORE_PATH)) return { news: [], events: [] }
  return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'))
}
function writeStore(data: any) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  try {
    // Try Airtable first
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        const airtableData = await airtableNews.getAll()
        
        // Fallback to JSON if Airtable is empty
        if (airtableData.length === 0) {
          const store = readStore()
          return NextResponse.json({ 
            success: true, 
            data: store.news,
            source: 'json_fallback'
          })
        }
        
        return NextResponse.json({ 
          success: true, 
          data: airtableData,
          source: 'airtable'
        })
      } catch (airtableError) {
        console.error('Airtable error, falling back to JSON:', airtableError)
      }
    }
    
    // Fallback to JSON
    const store = readStore()
    return NextResponse.json({ 
      success: true, 
      data: store.news,
      source: 'json'
    })
  } catch (error) {
    console.error('News fetch error:', error)
    return NextResponse.json({
      success: false,
      error: 'Haberler yüklenirken hata oluştu'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newItem: any = await request.json()
    
    // Validasyon
    if (!newItem.title) {
      return NextResponse.json({
        success: false,
        error: 'Haber başlığı zorunludur'
      }, { status: 400 })
    }
    
    // Try Airtable first
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        const airtableNewsItem = await airtableNews.create(newItem)
        return NextResponse.json({ 
          success: true, 
          message: 'Haber başarıyla eklendi (Airtable)',
          data: airtableNewsItem,
          source: 'airtable'
        })
      } catch (airtableError) {
        console.error('Airtable error, falling back to JSON:', airtableError)
      }
    }
    
    // Fallback to JSON
    const store = readStore()
    newItem.id = newItem.id || Date.now().toString()
    newItem.created_at = new Date().toISOString()
    newItem.updated_at = new Date().toISOString()
    
    store.news.unshift(newItem)
    writeStore(store)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Haber başarıyla eklendi (JSON)',
      data: newItem,
      source: 'json'
    })
    
  } catch (error) {
    console.error('News create error:', error)
    return NextResponse.json({
      success: false,
      error: 'Haber eklenirken hata oluştu'
    }, { status: 500 })
  }
} 