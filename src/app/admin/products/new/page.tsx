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
  DocumentIcon,
  TruckIcon,
  ShieldCheckIcon,
  FolderPlusIcon
} from '@heroicons/react/24/outline'
import { productCategories } from '@/data/products'
import MultipleImageUpload from '@/components/MultipleImageUpload'

interface ProductForm {
  name: string
  description: string
  overview: string
  images: string[]
  category: string
  subcategory: string
  features: string[]
  applications: string[]
  specifications: { [key: string]: string }
  dataSheet?: string
  price?: string
  isWarrantied?: boolean
  hasFreeShipping?: boolean
  catalogFiles?: string[]
}

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    overview: '',
    images: [],
    category: '',
    subcategory: '',
    features: [''],
    applications: [''],
    specifications: {},
    dataSheet: '',
    price: '',
    isWarrantied: false,
    hasFreeShipping: false,
    catalogFiles: []
  })

  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')
  const [newCatalogUrl, setNewCatalogUrl] = useState('')
  const [newCatalogName, setNewCatalogName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate unique ID
      const id = form.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '') + '-' + Date.now().toString().slice(-3)

      const productData = {
        ...form,
        id,
        image: form.images[0] || '/images/lab-1.jpg', // Ana resim (backward compatibility)
        images: form.images.length > 0 ? form.images : undefined,
        features: form.features.filter(f => f.trim() !== ''),
        applications: form.applications.filter(a => a.trim() !== ''),
        specifications: Object.keys(form.specifications).length > 0 ? form.specifications : undefined,
        catalogFiles: form.catalogFiles && form.catalogFiles.length > 0 ? form.catalogFiles : undefined
      }

      // API çağrısı yap
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      const result = await response.json()

      if (result.success) {
        alert('Ürün başarıyla eklendi!')
        router.push('/admin/products')
      } else {
        alert(`Hata: ${result.error}`)
      }
    } catch (error) {
      console.error('Ürün ekleme hatası:', error)
      alert('Hata: Ürün eklenirken bir sorun oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }))
  }

  const removeFeature = (index: number) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }))
  }

  const addApplication = () => {
    setForm(prev => ({ ...prev, applications: [...prev.applications, ''] }))
  }

  const removeApplication = (index: number) => {
    setForm(prev => ({
      ...prev,
      applications: prev.applications.filter((_, i) => i !== index)
    }))
  }

  const updateApplication = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      applications: prev.applications.map((a, i) => i === index ? value : a)
    }))
  }

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setForm(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }))
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const removeSpecification = (key: string) => {
    setForm(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return { ...prev, specifications: newSpecs }
    })
  }

  const addCatalogFile = () => {
    if (newCatalogUrl.trim() && newCatalogName.trim()) {
      const catalogEntry = `${newCatalogName}|${newCatalogUrl}`
      setForm(prev => ({
        ...prev,
        catalogFiles: [...(prev.catalogFiles || []), catalogEntry]
      }))
      setNewCatalogUrl('')
      setNewCatalogName('')
    }
  }

  const removeCatalogFile = (index: number) => {
    setForm(prev => ({
      ...prev,
      catalogFiles: (prev.catalogFiles || []).filter((_, i) => i !== index)
    }))
  }

  const getAvailableSubcategories = () => {
    if (!form.category) return []
    const category = productCategories.find(cat => cat.name === form.category)
    return category?.subcategories || []
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
            <p className="text-gray-600">Sisteme yeni ürün bilgilerini girin</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Kolon - Temel Bilgiler ve Teknik Özellikler */}
          <div className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ürün Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ürün adını girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ürün açıklamasını girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genel Bakış
                  </label>
                  <textarea
                    rows={6}
                    value={form.overview}
                    onChange={(e) => setForm(prev => ({ ...prev, overview: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ürün hakkında detaylı genel bakış metnini girin..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Bu metin ürün detay sayfasındaki &quot;Genel Bakış&quot; sekmesinde görüntülenecektir.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ 
                        ...prev, 
                        category: e.target.value,
                        subcategory: '' 
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Kategori seçin</option>
                      {productCategories.map((category) => (
                        <option key={category.key} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alt Kategori *
                    </label>
                    <select
                      required
                      value={form.subcategory}
                      onChange={(e) => setForm(prev => ({ ...prev, subcategory: e.target.value }))}
                      disabled={!form.category}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Alt kategori seçin</option>
                      {getAvailableSubcategories().map((subcategory) => (
                        <option key={subcategory.key} value={subcategory.name}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Teknik Özellikler - Sol tarafta orta */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Teknik Özellikler
              </h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Özellik adı"
                  />
                  <input
                    type="text"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Değer"
                  />
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Object.entries(form.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">{key}:</span> 
                        <span className="text-gray-600 ml-1">{value}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecification(key)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Sil"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {Object.keys(form.specifications).length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      Henüz teknik özellik eklenmemiş
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Özellikler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Özellikler</h3>
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Ekle</span>
                </button>
              </div>
              <div className="space-y-3">
                {form.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Özellik girin"
                    />
                    {form.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Uygulama Alanları */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Uygulama Alanları</h3>
                <button
                  type="button"
                  onClick={addApplication}
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Ekle</span>
                </button>
              </div>
              <div className="space-y-3">
                {form.applications.map((application, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={application}
                      onChange={(e) => updateApplication(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Uygulama alanı girin"
                    />
                    {form.applications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeApplication(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Görseller ve Ek Bilgiler */}
          <div className="space-y-6">
            {/* Resimler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <MultipleImageUpload
                images={form.images}
                onChange={(images) => setForm(prev => ({ ...prev, images }))}
                label="Ürün Görselleri (8 adete kadar)"
                maxImages={8}
              />
            </div>

            {/* Ürün Avantajları */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-600" />
                Ürün Avantajları
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isWarrantied"
                    checked={form.isWarrantied}
                    onChange={(e) => setForm(prev => ({ ...prev, isWarrantied: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isWarrantied" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                    <ShieldCheckIcon className="w-4 h-4 mr-1 text-green-600" />
                    Garantili Ürün
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasFreeShipping"
                    checked={form.hasFreeShipping}
                    onChange={(e) => setForm(prev => ({ ...prev, hasFreeShipping: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasFreeShipping" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                    <TruckIcon className="w-4 h-4 mr-1 text-blue-600" />
                    Ücretsiz Kargo
                  </label>
                </div>
              </div>
            </div>

            {/* Katalog Dosyaları */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FolderPlusIcon className="w-5 h-5 mr-2 text-purple-600" />
                Ürünle İlgili Kataloglar
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    value={newCatalogName}
                    onChange={(e) => setNewCatalogName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Katalog adı (örn: Ürün Broşürü)"
                  />
                  <input
                    type="url"
                    value={newCatalogUrl}
                    onChange={(e) => setNewCatalogUrl(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Katalog URL'si (PDF linki)"
                  />
                  <button
                    type="button"
                    onClick={addCatalogFile}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Katalog Ekle
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(form.catalogFiles || []).map((catalog, index) => {
                    const [name, url] = catalog.split('|')
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border">
                        <div className="flex items-center space-x-2">
                          <DocumentIcon className="w-4 h-4 text-purple-600" />
                      <div className="text-sm">
                            <div className="font-medium text-gray-800">{name}</div>
                            <div className="text-xs text-gray-500 truncate max-w-xs">{url}</div>
                          </div>
                      </div>
                      <button
                        type="button"
                          onClick={() => removeCatalogFile(index)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Sil"
                      >
                          <XMarkIcon className="w-4 h-4" />
                      </button>
                      </div>
                    )
                  })}
                  {(!form.catalogFiles || form.catalogFiles.length === 0) && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      Henüz katalog eklenmemiş
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ek Bilgiler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ek Bilgiler</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Veri Sayfası URL
                  </label>
                  <input
                    type="url"
                    value={form.dataSheet}
                    onChange={(e) => setForm(prev => ({ ...prev, dataSheet: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="PDF veya döküman linki"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 bg-white rounded-lg p-6">
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
                <CheckCircleIcon className="w-4 h-4" />
                <span>Ürün Ekle</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 