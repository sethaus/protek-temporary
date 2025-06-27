'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  PhotoIcon,
  CheckCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'

interface EventForm {
  title: string
  description: string
  content: string
  eventType: 'fuar' | 'seminer' | 'webinar' | 'workshop' | 'konferans'
  startDate: string
  endDate: string
  location: string
  imageUrl: string
  registrationUrl: string
  featured: boolean
}

export default function NewEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    content: '',
    eventType: 'seminer',
    startDate: '',
    endDate: '',
    location: '',
    imageUrl: '/images/lab-1.jpg',
    registrationUrl: '',
    featured: false
  })

  const eventTypeOptions = [
    { value: 'fuar', label: 'Fuar' },
    { value: 'seminer', label: 'Seminer' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'konferans', label: 'Konferans' }
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

      const eventData = {
        ...form,
        id,
        endDate: form.endDate || undefined,
        registrationUrl: form.registrationUrl || undefined
      }

      // API'ye POST isteği gönder
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      const result = await response.json()

      if (result.success) {
        alert('Etkinlik başarıyla eklendi!')
        router.push('/admin/resources')
      } else {
        alert(`Hata: ${result.error}`)
      }
    } catch (error) {
      alert('Hata: Etkinlik eklenirken bir sorun oluştu.')
    } finally {
      setLoading(false)
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Yeni Etkinlik Ekle</h1>
            <p className="text-gray-600">Sisteme yeni etkinlik duyurusu ekleyin</p>
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
                    Etkinlik Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Etkinlik adını girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kısa Açıklama *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Etkinlik kısa açıklamasını girin"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Etkinlik Türü *
                    </label>
                    <select
                      required
                      value={form.eventType}
                      onChange={(e) => setForm(prev => ({ ...prev, eventType: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {eventTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Başlangıç Tarihi *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.startDate}
                      onChange={(e) => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasyon *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Örn: İstanbul Fuar Center, Online (Zoom)"
                  />
                </div>
              </div>
            </div>

            {/* İçerik */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Etkinlik Detayları</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detaylı İçerik (Markdown destekli) *
                </label>
                <textarea
                  required
                  rows={15}
                  value={form.content}
                  onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Etkinlik detaylarını markdown formatında yazın..."
                />
                <div className="mt-2 text-xs text-gray-500">
                  Program, konuşmacılar, gündem gibi detayları markdown formatında ekleyebilirsiniz
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
                label="Etkinlik Görseli"
              />
            </div>

            {/* Kayıt */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kayıt Bilgileri</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {"Kayıt URL'si"}
                  </label>
                  <input
                    type="url"
                    value={form.registrationUrl}
                    onChange={(e) => setForm(prev => ({ ...prev, registrationUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/kayit"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    {"Katılımcıların kayıt olabileceği web sayfası linki"}
                  </div>
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
                    Öne çıkan etkinlik olarak işaretle
                  </label>
                </div>
              </div>
            </div>

            {/* Önizleme Bilgisi */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">📅 Etkinlik Özeti</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Tür:</strong> {eventTypeOptions.find(t => t.value === form.eventType)?.label}</p>
                {form.startDate && (
                                      <p><strong>Tarih:</strong> {new Date(form.startDate).toLocaleDateString(`tr-TR`)} 
                  {form.endDate && form.endDate !== form.startDate && 
                    ` - ${new Date(form.endDate).toLocaleDateString(`tr-TR`)}`}
                  </p>
                )}
                {form.location && <p><strong>Lokasyon:</strong> {form.location}</p>}
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
            className="inline-flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <>
                <CalendarIcon className="w-4 h-4" />
                <span>Etkinlik Yayınla</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 