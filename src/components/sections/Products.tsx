'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BeakerIcon, CubeIcon, WrenchIcon, ArrowRightIcon, FlagIcon } from '@heroicons/react/24/outline'
import { productCategories, type Product } from '@/data/products'

const categoryList = [
  { label: 'Tümü', key: 'all' },
  ...productCategories.map(cat => ({ label: cat.name, key: cat.key })),
]

// Helper function to generate product URL
const generateProductUrl = (product: any) => {
  // API'den gelen ürünler için category ve subcategory name'den key'e çevirme
  const findCategoryKey = (categoryName: string) => {
    const category = productCategories.find(cat => cat.name === categoryName)
    return category ? category.key : 'laboratuvar-ekipmanlari' // fallback
  }
  
  const findSubcategoryKey = (categoryName: string, subcategoryName: string) => {
    const category = productCategories.find(cat => cat.name === categoryName)
    if (category) {
      const subcategory = category.subcategories.find(sub => sub.name === subcategoryName)
      if (subcategory) {
        return subcategory.key
      }
    }
    
    // Fallback: subcategory name'den key oluştur
    return subcategoryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/,/g, '')
      .replace(/\s+/g, '-') || 'test-sistemleri'
  }
  
  // Eğer statik ürünse, mevcut mantığı kullan
  for (const category of productCategories) {
    for (const subcategory of category.subcategories) {
      if (subcategory.products.some(p => p.id === product.id)) {
        return `/urunler/${category.key}/${subcategory.key}/${product.id}`
      }
    }
  }
  
  // API'den gelen dinamik ürünler için
  if (product.category && product.subcategory) {
    const categoryKey = findCategoryKey(product.category)
    const subcategoryKey = findSubcategoryKey(product.category, product.subcategory)
    return `/urunler/${categoryKey}/${subcategoryKey}/${product.id}`
  }
  
  // Son fallback
  return `/urunler/laboratuvar-ekipmanlari/test-sistemleri/${product.id}`
}

export default function Products() {
  const [selected, setSelected] = useState('all')
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const data: { success: boolean, data: Product[] } = await response.json()
      
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data.slice(0, 8))
      } else {
        console.error('Failed to fetch products:', data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Alt kategori listesi
  const subcategories = selected === 'all'
    ? []
    : productCategories.find(cat => cat.key === selected)?.subcategories || []

  // Seçili ürünler - API'den gelen ürünleri filtrele
  let filteredProducts = [] as Product[]
  if (selected === 'all') {
    filteredProducts = products
  } else if (selectedSub) {
    filteredProducts = products.filter(product => 
      product.category === productCategories.find(cat => cat.key === selected)?.name &&
      product.subcategory === productCategories.find(cat => cat.key === selected)?.subcategories.find(sub => sub.key === selectedSub)?.name
    )
  } else {
    filteredProducts = products.filter(product => 
      product.category === productCategories.find(cat => cat.key === selected)?.name
    )
  }

  // Yatay scroll fonksiyonları
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const scrollAmount = clientWidth * 0.8
    scrollRef.current.scrollTo({
      left: dir === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    })
  }

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-gradient">Ürünlerimiz</h2>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Ürünler yükleniyor...
            </p>
          </div>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-gradient">Ürünlerimiz</h2>
          <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
            Laboratuvarınızın her türlü ihtiyacı için geniş ürün yelpazemizle hizmetinizdeyiz.
          </p>
        </div>
        {/* Kategori Sekmeleri */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categoryList.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setSelected(cat.key); setSelectedSub(null) }}
              className={`px-5 py-2 rounded-full border text-body-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${selected === cat.key ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white text-primary-600 border-primary-100 hover:bg-primary-50'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {/* Alt Kategori Sekmeleri */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
                              onClick={() => setSelectedSub(null)}
                className={`px-4 py-1.5 rounded-full border text-caption font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${selectedSub === null ? 'bg-accent-500 text-white border-accent-500 shadow' : 'bg-white text-primary-600 border-primary-100 hover:bg-primary-50'}`}
            >
              Tümü
            </button>
            {subcategories.map(sub => (
              <button
                key={sub.key}
                onClick={() => setSelectedSub(sub.key)}
                className={`px-4 py-1.5 rounded-full border text-caption font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${selectedSub === sub.key ? 'bg-accent-500 text-white border-accent-500 shadow' : 'bg-white text-primary-600 border-primary-100 hover:bg-primary-50'}`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
        {/* Yatay Scroll Okları */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary-100 border border-primary-200 rounded-full w-8 h-8 items-center justify-center shadow transition-all"
            aria-label="Sola kaydır"
            style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
            tabIndex={0}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id || idx}
                className="min-w-[280px] max-w-[300px] w-full bg-white rounded-2xl shadow-soft border border-neutral-100 group snap-start transition-all duration-500 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden flex flex-col"
                tabIndex={0}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Favorite Icon */}
                <div className="absolute top-4 right-4 z-10">
                  <button className="p-2 rounded-full bg-white/90 hover:bg-white border border-neutral-200 shadow-sm transition-all duration-300 hover:scale-110">
                    <FlagIcon className="w-4 h-4 text-neutral-400 hover:text-primary-500 transition-colors" />
                  </button>
                </div>

                {/* Product Image */}
                <div className="relative w-full h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-auto h-28 object-contain transition-transform duration-500 group-hover:scale-110"
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-5 relative z-10 flex-1 flex flex-col">
                  {/* Product Name & Description */}
                  <div className="mb-3">
                    <h4 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-2 leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-body-sm text-neutral-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-3">
                    <h6 className="text-label text-neutral-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <BeakerIcon className="w-3 h-3" />
                      Özellikler
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {product.features?.slice(0, 3).map((feature: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-50 text-primary-700 text-caption rounded-md border border-primary-100"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features && product.features.length > 3 && (
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-caption rounded-md">
                          +{product.features.length - 3} daha
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="mb-4">
                    <h6 className="text-label text-neutral-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <CubeIcon className="w-3 h-3" />
                      Uygulama Alanları
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {product.applications?.slice(0, 2).map((app: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary-50 text-secondary-700 text-caption rounded-md border border-secondary-100"
                        >
                          {app}
                        </span>
                      ))}
                      {product.applications && product.applications.length > 2 && (
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md">
                          +{product.applications.length - 2} alan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={generateProductUrl(product)}
                      className="flex-1 bg-[#001328] text-white text-sm font-semibold py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#001328] hover:via-[#2A50F8] hover:to-[#FF4766] transition-all duration-700 shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 flex items-center justify-center gap-2 group/btn relative overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-600 hover:before:left-[100%]"
                    >
                      İncele
                      <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-all duration-300" />
                    </a>
                    <button className="p-3 border-2 border-primary-200 text-primary-600 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 flex items-center justify-center">
                      <WrenchIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary-100 border border-primary-200 rounded-full w-8 h-8 items-center justify-center shadow transition-all"
            aria-label="Sağa kaydır"
            style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="text-center mt-10">
          <a href="/urunler" className="btn-primary">
            Tüm Ürünleri Görüntüle
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
} 