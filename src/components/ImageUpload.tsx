'use client'

import { useState, useRef } from 'react'
import { PhotoIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  className?: string
}

export default function ImageUpload({ value, onChange, label = "Resim", className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Lütfen sadece resim dosyası seçin.')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır.')
      return
    }

    setUploading(true)
    
    try {
      // Dosyayı sunucuya yükle
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', { 
        method: 'POST', 
        body: formData 
      })
      
      const result = await response.json()
      
      if (result.success) {
        onChange(result.url)
      } else {
        alert(result.error || 'Resim yüklenirken hata oluştu.')
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      alert('Resim yüklenirken hata oluştu.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeImage = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Current Image Preview */}
      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Önizleme"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
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
                <span>Dosya Seç</span>
              </button>
              <p className="text-sm text-gray-500 mt-2">
                veya dosyayı sürükleyip bırakın
              </p>
            </div>
            <p className="text-xs text-gray-400">
              PNG, JPG, JPEG, WebP (Max: 5MB)
            </p>
          </div>
        )}
      </div>

      {/* URL Input Alternative */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">veya URL girin</span>
        </div>
      </div>

      <input
        type="text"
        value={value.startsWith('data:') ? '' : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg veya /images/product.jpg"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
} 