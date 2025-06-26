import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    // Dosya tipini kontrol et
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Sadece resim dosyaları yüklenebilir' }, { status: 400 })
    }

    // Dosya boyutunu kontrol et (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan küçük olmalıdır' }, { status: 400 })
    }

    // Dosya adını güvenli hale getir
    const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const timestamp = Date.now()
    const uniqueFileName = `${timestamp}-${fileName}`
    
    // Upload klasörünü oluştur
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    await mkdir(uploadDir, { recursive: true })
    
    // Dosyayı kaydet
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, uniqueFileName)
    
    await writeFile(filePath, buffer)
    
    // Public URL'i döndür
    const publicUrl = `/uploads/products/${uniqueFileName}`
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      message: 'Dosya başarıyla yüklendi' 
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Dosya yüklenirken hata oluştu' }, { status: 500 })
  }
}

// Çoklu dosya yükleme için
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    const uploadedFiles = []
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    await mkdir(uploadDir, { recursive: true })

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue // Geçersiz dosyaları atla
      }

      if (file.size > 5 * 1024 * 1024) {
        continue // Çok büyük dosyaları atla
      }

      const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const timestamp = Date.now()
      const uniqueFileName = `${timestamp}-${fileName}`
      
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filePath = path.join(uploadDir, uniqueFileName)
      
      await writeFile(filePath, buffer)
      
      uploadedFiles.push(`/uploads/products/${uniqueFileName}`)
    }
    
    return NextResponse.json({ 
      success: true, 
      urls: uploadedFiles,
      message: `${uploadedFiles.length} dosya başarıyla yüklendi` 
    })
    
  } catch (error) {
    console.error('Multiple upload error:', error)
    return NextResponse.json({ error: 'Dosyalar yüklenirken hata oluştu' }, { status: 500 })
  }
} 