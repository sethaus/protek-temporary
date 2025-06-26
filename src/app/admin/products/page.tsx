'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  CalendarIcon,
  TagIcon,
  ClockIcon,
  BuildingOffice2Icon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { productCategories, type Product } from '@/data/products'

type SortDirection = 'newest' | 'oldest'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [sortDirection, setSortDirection] = useState<SortDirection>('newest')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Multi-select state
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/products')
      
      if (!response.ok) {
        throw new Error(`API hatası: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data)
        setFilteredProducts(data.data)
      } else {
        throw new Error('API yanıtı beklenenden farklı')
      }
    } catch (error) {
      console.error('Ürünleri yüklerken hata:', error)
      setError(error instanceof Error ? error.message : 'Bilinmeyen hata')
      setProducts([])
      setFilteredProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Multi-select functions
  const toggleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)))
    }
  }

  const clearSelection = () => {
    setSelectedProducts(new Set())
  }

  // Bulk delete function
  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return

    const selectedCount = selectedProducts.size
    const confirmMessage = `${selectedCount} ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
    
    if (!confirm(confirmMessage)) return

    setIsDeleting(true)
    const errors: string[] = []
    let deletedCount = 0

    try {
      // Delete products one by one
      for (const productId of Array.from(selectedProducts)) {
        try {
          const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
          })

          const result = await response.json()

          if (result.success) {
            deletedCount++
          } else {
            errors.push(`${productId}: ${result.error}`)
          }
        } catch (error) {
          errors.push(`${productId}: Network error`)
        }
      }

      // Show results
      if (deletedCount > 0) {
        alert(`✅ ${deletedCount} ürün başarıyla silindi!`)
      }
      
      if (errors.length > 0) {
        console.error('Silme hataları:', errors)
        alert(`⚠️ ${errors.length} ürün silinirken hata oluştu. Konsolu kontrol edin.`)
      }

      // Refresh products and clear selection
      await fetchProducts()
      setSelectedProducts(new Set())

    } catch (error) {
      console.error('Toplu silme hatası:', error)
      alert('❌ Toplu silme işlemi sırasında beklenmeyen bir hata oluştu.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Sorting function
  const sortProducts = (productsToSort: Product[], sortDirection: SortDirection): Product[] => {
    const sorted = [...productsToSort]
    
    return sorted.sort((a, b) => {
      // updated_at varsa onu kullan, yoksa created_at'i kullan
      const aTime = (a.updated_at || a.created_at) ? new Date(a.updated_at || a.created_at).getTime() : 0
      const bTime = (b.updated_at || b.created_at) ? new Date(b.updated_at || b.created_at).getTime() : 0
      
      if (sortDirection === 'newest') {
        return bTime - aTime // En yeni güncellenme üstte
      } else {
        return aTime - bTime // En eski güncellenme üstte
      }
    })
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Tarih yok'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Geçersiz tarih'
    }
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'newest' ? 'oldest' : 'newest')
  }

  useEffect(() => {
    let items = [...products]

    // Search filter
    if (searchTerm) {
      items = items.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory) {
      items = items.filter(product => product.category && product.category === selectedCategory)
    }

    // Subcategory filter
    if (selectedSubcategory) {
      items = items.filter(product => product.subcategory && product.subcategory === selectedSubcategory)
    }
    
    // Apply sorting
    const sortedItems = sortProducts(items, sortDirection)

    setFilteredProducts(sortedItems)
    
    // Clear selection when filters change
    setSelectedProducts(new Set())
  }, [products, searchTerm, selectedCategory, selectedSubcategory, sortDirection])

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        })

        const result = await response.json()

        if (result.success) {
          // Refresh products list after deletion
          await fetchProducts()
          alert('Ürün başarıyla silindi!')
        } else {
          alert(`Hata: ${result.error}`)
        }
      } catch (error) {
        console.error('Ürün silme hatası:', error)
        alert('Hata: Ürün silinirken bir sorun oluştu.')
      }
    }
  }

  const getAvailableSubcategories = () => {
    if (!selectedCategory) return []
    const category = productCategories.find(cat => cat.name === selectedCategory)
    return category?.subcategories || []
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
            <p className="text-gray-600">Sistemdeki tüm ürünleri görüntüleyin ve yönetin</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-gray-500">Ürünler yükleniyor...</div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
            <p className="text-gray-600">Sistemdeki tüm ürünleri görüntüleyin ve yönetin</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-12 text-center">
          <div className="text-red-600 mb-4">❌ Hata: {error}</div>
          <button 
            onClick={fetchProducts}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
          <p className="text-gray-600">Sistemdeki tüm ürünleri görüntüleyin ve yönetin</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Yeni Ürün</span>
        </Link>
      </div>

      {/* Summary Stats - Compact Top Bar */}
      <div className="bg-white rounded-lg border border-gray-200 px-6 py-3">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{filteredProducts.length}</div>
            <div className="text-xs text-gray-600">Görüntülenen Ürün</div>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="text-lg font-bold text-green-600">
              {new Set(filteredProducts.filter(p => p.category).map(p => p.category)).size}
            </div>
            <div className="text-xs text-gray-600">Farklı Kategori</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {new Set(filteredProducts.filter(p => p.subcategory).map(p => p.subcategory)).size}
            </div>
            <div className="text-xs text-gray-600">Farklı Alt Kategori</div>
          </div>
        </div>
      </div>

      {/* Multi-select Actions Bar */}
      {selectedProducts.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedProducts.size} ürün seçildi
              </span>
              <button
                onClick={clearSelection}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Seçimi Temizle
              </button>
            </div>
            <button
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              {isDeleting ? 'Siliniyor...' : 'Seçilenleri Sil'}
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setSelectedSubcategory('')
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Tüm Kategoriler</option>
            {productCategories.map((category) => (
              <option key={category.key} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Subcategory Filter */}
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={!selectedCategory}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 text-sm"
          >
            <option value="">Tüm Alt Kategoriler</option>
            {getAvailableSubcategories().map((subcategory) => (
              <option key={subcategory.key} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>

          {/* Sort Toggle Button */}
          <button
            onClick={toggleSortDirection}
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
          >
            <ArrowsUpDownIcon className="w-4 h-4" />
            <span>{sortDirection === 'newest' ? 'En Son Değişiklik Üstte' : 'En Eski Değişiklik Üstte'}</span>
          </button>
        </div>

        {/* Results Count & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-4 border-t border-gray-200 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <FunnelIcon className="w-4 h-4 mr-2" />
              <span className="font-medium">{filteredProducts.length}</span> ürün bulundu
            </div>
            {filteredProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-600 cursor-pointer" onClick={toggleSelectAll}>
                  Tümünü Seç
                </label>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchProducts}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-200 text-sm transition-colors"
            >
              🔄 Yenile
            </button>
            <span className="text-xs text-gray-400">
              Toplam: {products.length} ürün
            </span>
          </div>
        </div>
      </div>

      {/* Products List - Modern Compact Cards */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-lg border border-gray-200">
            <TagIcon className="w-12 h-12 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {products.length === 0 ? 'Sistemde hiç ürün yok' : 'Ürün bulunamadı'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {products.length === 0 ? 'İlk ürününüzü ekleyerek başlayın.' : 'Filtreleme kriterlerinizi değiştirmeyi deneyin.'}
            </p>
            {products.length === 0 && (
               <Link
                href="/admin/products/new"
                className="mt-6 inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>İlk Ürünü Ekle</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 p-4 ${
                  selectedProducts.has(product.id) 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                  </div>

                  {/* Left Section: Image & Content */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        className="w-16 h-16 object-cover rounded-lg bg-gray-50 border border-gray-100"
                        src={product.image || '/images/placeholder.svg'}
                        alt={product.name}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Product Title */}
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {product.name}
                      </h3>
                      
                      {/* Product Description */}
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {product.description || 'Açıklama bulunmuyor'}
                      </p>

                      {/* Mobile Category Tags - Show on small screens */}
                      <div className="flex sm:hidden items-center gap-2 text-xs">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                          <BuildingOffice2Icon className="w-3 h-3 text-blue-600" />
                          <span className="font-medium text-blue-700 truncate max-w-[80px]" title={product.category || 'Kategori yok'}>
                            {product.category && product.category.length > 10 ? `${product.category.substring(0, 10)}...` : (product.category || 'Kategori yok')}
                          </span>
                        </div>
                        <ChevronRightIcon className="w-3 h-3 text-gray-400" />
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 border border-green-200">
                          <span className="font-medium text-green-700 truncate max-w-[80px]" title={product.subcategory || 'Alt kategori yok'}>
                            {product.subcategory && product.subcategory.length > 10 ? `${product.subcategory.substring(0, 10)}...` : (product.subcategory || 'Alt kategori yok')}
                          </span>
                        </div>
                      </div>

                      {/* Last Update Date */}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ClockIcon className="w-3 h-3" />
                        <span>Son Değişiklik: {formatDate(product.updated_at || product.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Modern Category & Feature Tags */}
                  <div className="flex items-center gap-6 flex-shrink-0">
                    {/* Category Breadcrumb - Horizontal, Modern */}
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200">
                        <BuildingOffice2Icon className="w-3 h-3 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700 truncate max-w-[100px]" title={product.category || 'Kategori yok'}>
                          {product.category && product.category.length > 12 ? `${product.category.substring(0, 12)}...` : (product.category || 'Kategori yok')}
                        </span>
                      </div>
                      <ChevronRightIcon className="w-3 h-3 text-gray-400" />
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 border border-green-200">
                        <span className="text-xs font-medium text-green-700 truncate max-w-[100px]" title={product.subcategory || 'Alt kategori yok'}>
                          {product.subcategory && product.subcategory.length > 12 ? `${product.subcategory.substring(0, 12)}...` : (product.subcategory || 'Alt kategori yok')}
                        </span>
                      </div>
                    </div>

                    {/* Feature Tags - Compact Horizontal Pills */}
                    <div className="hidden md:flex items-center gap-1.5">
                      {product.isWarrantied && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          🛡️
                        </span>
                      )}
                      {product.hasFreeShipping && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          🚚
                        </span>
                      )}
                      {product.price && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                          💰
                        </span>
                      )}
                    </div>

                    {/* Action Buttons - Horizontal, Compact */}
                    <div className="flex items-center gap-1">
                      {/* View Product */}
                      {product.category && product.subcategory ? (
                        <a 
                          href={`/urunler/${product.category.toLowerCase().replace(/ /g, '-')}/${product.subcategory.toLowerCase().replace(/ /g, '-')}/${product.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Sitede Görüntüle"
                          className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </a>
                      ) : (
                        <span 
                          title="Kategori bilgisi eksik"
                          className="p-1.5 text-gray-300 cursor-not-allowed rounded-md"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </span>
                      )}
                      
                      {/* Edit Product */}
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        title="Düzenle"
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Link>
                      
                      {/* Delete Product */}
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        title="Sil"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 