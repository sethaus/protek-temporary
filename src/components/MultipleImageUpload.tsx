'use client'

import { useState, useRef } from 'react'
import { PhotoIcon, XMarkIcon, ArrowUpTrayIcon, PlusIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

interface MultipleImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  label?: string
  maxImages?: number
  className?: string
}

export default function MultipleImageUpload({ 
  images = [], 
  onChange, 
  label = "Ürün Görselleri", 
  maxImages = 10,
  className = "" 
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      alert(`En fazla ${maxImages} resim yükleyebilirsiniz.`)
      return
    }

    setUploading(true)

    try {
      // Dosyaları sunucuya yükle
      const formData = new FormData()
      const validFiles: File[] = []

      // Dosyaları filtrele ve FormData'ya ekle
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} geçerli bir resim dosyası değil.`)
          continue
        }

        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} dosyası 5MB'dan büyük.`)
          continue
        }

        validFiles.push(file)
        formData.append('files', file)
      }

      if (validFiles.length === 0) {
        setUploading(false)
        return
      }

      // Çoklu dosya yükleme API'sini çağır
      const response = await fetch('/api/upload', { 
        method: 'PUT', 
        body: formData 
      })
      
      const result = await response.json()
      
      if (result.success && result.urls) {
        onChange([...images, ...result.urls])
        alert(`${result.urls.length} resim başarıyla yüklendi.`)
      } else {
        alert(result.error || 'Resimler yüklenirken hata oluştu.')
      }

    } catch (error) {
      console.error('Multiple upload error:', error)
      alert('Resimler yüklenirken hata oluştu.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files)
    }
  }

  const addUrlImage = () => {
    if (!urlInput.trim()) return
    
    // Basic URL validation - sadece format kontrolü, URL'nin çalışıp çalışmadığı kontrol edilmiyor
    const urlPattern = /^(https?:\/\/|\/)/i
    if (!urlPattern.test(urlInput.trim())) {
      // URL formatı geçersizse bile ekle - kullanıcı yerel path de girebilir
    }

    if (images.length >= maxImages) {
      alert(`En fazla ${maxImages} resim ekleyebilirsiniz.`)
      return
    }

    if (!images.includes(urlInput.trim())) {
      onChange([...images, urlInput.trim()])
      setUrlInput('')
    } else {
      alert('Bu resim zaten eklenmiş.')
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]]
      onChange(newImages)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} ({images.length}/{maxImages})
      </label>

      {/* Existing Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Resim ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                 onError={(e) => {
                   const target = e.target as HTMLImageElement
                   target.src = '/images/lab-1.jpg' // fallback resim
                   target.style.backgroundColor = '#f3f4f6'
                   target.style.color = '#6b7280'
                   target.alt = 'Resim yüklenemiyor'
                 }}
              />
              
              {/* Image Controls */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'up')}
                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    title="Yukarı taşı"
                  >
                    <ArrowUpIcon className="w-4 h-4" />
                  </button>
                )}
                
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'down')}
                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    title="Aşağı taşı"
                  >
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                  title="Sil"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              
              {/* Image Number */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          
          {uploading ? (
            <div className="space-y-2">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-600">Yükleniyor...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ArrowUpTrayIcon className="w-4 h-4" />
                  <span>Resimler Seç</span>
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  veya resimleri sürükleyip bırakın
                </p>
              </div>
              <p className="text-xs text-gray-400">
                PNG, JPG, JPEG, WebP (Max: 5MB her biri)
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL Input */}
      {images.length < maxImages && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">veya URL ile ekle</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addUrlImage())}
              placeholder="https://example.com/image.jpg veya /images/product.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addUrlImage}
              disabled={!urlInput.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• İlk resim ana ürün resmi olarak kullanılır</p>
        <p>• Resimleri sıralamak için üzerine gelin ve ok butonlarını kullanın</p>
        <p>• Yerel dosya yolları (/images/...) da kullanabilirsiniz</p>
      </div>
    </div>
  )
} 