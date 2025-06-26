'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'

interface NewsForm {
  title: string
  summary: string
  content: string
  category: 'sirket-haberleri' | 'sektor-guncel' | 'basari-hikayeleri'
  publishDate: string
  imageUrl: string
  tags: string[]
  featured: boolean
}

export default function NewNewsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<NewsForm>({
    title: '',
    summary: '',
    content: '',
    category: 'sirket-haberleri',
    publishDate: new Date().toISOString().split('T')[0],
    imageUrl: '/images/lab-1.jpg',
    tags: [''],
    featured: false
  })

  const [newTag, setNewTag] = useState('')

  const categoryOptions = [
    { value: 'sirket-haberleri', label: 'Şirket Haberleri' },
    { value: 'sektor-guncel', label: 'Sektör Güncel' },
    { value: 'basari-hikayeleri', label: 'Başarı Hikayeleri' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const id = form.title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '') + '-' + Date.now().toString().slice(-3)

      const newsData = {
        ...form,
        id,
        tags: form.tags.filter(tag => tag.trim() !== '')
      }

      // API'ye POST isteği gönder
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      })

      const result = await response.json()

      if (result.success) {
        alert('Haber başarıyla eklendi!')
        router.push('/admin/resources')
      } else {
        alert(`Hata: ${result.error}`)
      }
    } catch (error) {
      console.error('Haber ekleme hatası:', error)
      alert('Hata: Haber eklenirken bir sorun oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags.filter(t => t), newTag.trim()] }))
      setNewTag('')
    }
  }

  const removeTag = (index: number) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/resources"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yeni Haber Ekle</h1>
            <p className="text-gray-600">Sisteme yeni haber yazısı ekleyin</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - Ana İçerik */}
          <div className="lg:col-span-2 space-y-6">
            {/* Temel Bilgiler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Haber Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Haber başlığını girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Özet *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.summary}
                    onChange={(e) => setForm(prev => ({ ...prev, summary: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Haber özetini girin"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Yayın Tarihi *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.publishDate}
                      onChange={(e) => setForm(prev => ({ ...prev, publishDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* İçerik */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Haber İçeriği</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İçerik (Markdown destekli) *
                </label>
                <textarea
                  required
                  rows={15}
                  value={form.content}
                  onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Haber içeriğini markdown formatında yazın..."
                />
                <div className="mt-2 text-xs text-gray-500">
                  Markdown kullanabilirsiniz: **kalın**, *italik*, # başlık, - liste
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Ek Bilgiler */}
          <div className="space-y-6">
            {/* Resim */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))}
                label="Haber Resmi"
              />
            </div>

            {/* Etiketler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiketler</h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Etiket ekle"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {form.tags.filter(tag => tag.trim() !== '').map((tag, index) => (
                    <div key={index} className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="p-0.5 text-blue-600 hover:bg-blue-200 rounded-full"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ayarlar */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ayarlar</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Öne çıkan haber olarak işaretle
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/resources"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <>
                <DocumentTextIcon className="w-4 h-4" />
                <span>Haber Yayınla</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 