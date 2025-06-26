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

// GET tek etkinlik
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const store = readStore()
  const event = store.events.find((item: any) => item.id === params.id)
  if (!event) {
    return NextResponse.json({ success: false, error: 'Etkinlik bulunamadı' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: event })
}

// PUT etkinlik güncelle
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const updatedEvent = await request.json()
  const store = readStore()
  const index = store.events.findIndex((item: any) => item.id === params.id)
  
  if (index === -1) {
    return NextResponse.json({ success: false, error: 'Etkinlik bulunamadı' }, { status: 404 })
  }
  
  store.events[index] = { ...store.events[index], ...updatedEvent, id: params.id }
  writeStore(store)
  
  return NextResponse.json({ success: true, data: store.events[index] })
}

// DELETE etkinlik sil
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const store = readStore()
  const index = store.events.findIndex((item: any) => item.id === params.id)
  
  if (index === -1) {
    return NextResponse.json({ success: false, error: 'Etkinlik bulunamadı' }, { status: 404 })
  }
  
  store.events.splice(index, 1)
  writeStore(store)
  
  return NextResponse.json({ success: true, message: 'Etkinlik silindi' })
} 