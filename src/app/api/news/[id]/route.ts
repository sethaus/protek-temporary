import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STORE_PATH = path.join(process.cwd(), 'src/data/news-events-store.json')

function readStore() {
  if (!fs.existsSync(STORE_PATH)) return { news: [], events: [] }
  return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'))
}

function writeStore(data: any) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

// GET tek haber
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const store = readStore()
  const news = store.news.find((item: any) => item.id === params.id)
  if (!news) {
    return NextResponse.json({ success: false, error: 'Haber bulunamadı' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: news })
}

// PUT haber güncelle
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const updatedNews = await request.json()
  const store = readStore()
  const index = store.news.findIndex((item: any) => item.id === params.id)
  
  if (index === -1) {
    return NextResponse.json({ success: false, error: 'Haber bulunamadı' }, { status: 404 })
  }
  
  store.news[index] = { ...store.news[index], ...updatedNews, id: params.id }
  writeStore(store)
  
  return NextResponse.json({ success: true, data: store.news[index] })
}

// DELETE haber sil
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const store = readStore()
  const index = store.news.findIndex((item: any) => item.id === params.id)
  
  if (index === -1) {
    return NextResponse.json({ success: false, error: 'Haber bulunamadı' }, { status: 404 })
  }
  
  store.news.splice(index, 1)
  writeStore(store)
  
  return NextResponse.json({ success: true, message: 'Haber silindi' })
} 