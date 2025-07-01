'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BeakerIcon, CubeIcon, WrenchIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { productCategories, type Product } from '@/data/products'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

// Helper function to generate product URL - same as in Products.tsx
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

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const data = await response.json()
      
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data)
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

  // Search function using API data
  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return products.filter(product => {
      // Basic text fields
      const basicMatch = 
        product.name?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.subcategory?.toLowerCase().includes(searchTerm) ||
        product.overview?.toLowerCase().includes(searchTerm)
      
      // Features array search
      const featuresMatch = product.features?.some(feature => 
        typeof feature === 'string' && feature.toLowerCase().includes(searchTerm)
      )
      
      // Applications array search
      const applicationsMatch = product.applications?.some(app => 
        typeof app === 'string' && app.toLowerCase().includes(searchTerm)
      )
      
      // Specifications object search
      const specificationsMatch = product.specifications && 
        typeof product.specifications === 'object' &&
        Object.entries(product.specifications).some(([key, value]) => 
          key.toLowerCase().includes(searchTerm) || 
          (typeof value === 'string' && value.toLowerCase().includes(searchTerm))
        )
      
      return basicMatch || featuresMatch || applicationsMatch || specificationsMatch
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim().length > 2) {
      setIsSearching(true)
      const results = searchProducts(query)
      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  // Calculate category product counts from API data
  const getCategoryProductCount = (categoryName: string): number => {
    return products.filter(product => product.category === categoryName).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="pt-20">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Ürünler yükleniyor...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
          <div className="container-custom relative">
            <motion.div 
              className="text-center text-white space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                Ürün <span className="text-gradient-light">Katalogumuz</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-100 max-w-3xl mx-auto">
                Laboratuvarınızın her türlü ihtiyacı için geniş ürün yelpazemizi keşfedin
              </p>
              
              {/* Arama Kutusu */}
              <div className="max-w-2xl mx-auto mt-8">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Ürün, kategori veya özellik ara..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Arama Sonuçları */}
        {isSearching && (
          <section className="py-8 bg-white border-b">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                Arama Sonuçları ({searchResults.length})
              </h2>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((product) => (
                    <Link 
                      key={product.id} 
                      href={generateProductUrl(product)}
                      className="group"
                    >
                      <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <img
                            src={product.image || '/images/placeholder.svg'}
                            alt={product.name || 'Ürün'}
                            className="w-16 h-16 object-cover rounded-lg bg-neutral-100"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/images/placeholder.svg'
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-neutral-600 mt-1">{product.description || 'Açıklama bulunmuyor'}</p>
                            <div className="text-xs text-neutral-500 mt-2">
                              {product.category || 'Kategori yok'} • {product.subcategory || 'Alt kategori yok'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-500">Arama kriterlerinize uygun ürün bulunamadı.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Kategori Listesi */}
        {!isSearching && (
          <section ref={ref} className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
                  Ürün Kategorilerimiz
                </h2>
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  {productCategories.length} ana kategoride {products.length}+ ürün seçeneği
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productCategories.map((category, index) => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BeakerIcon
                  const productCount = getCategoryProductCount(category.name)
                  
                  return (
                    <motion.div
                      key={category.key}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Link href={`/urunler/${category.key}`} className="group">
                        <div className="relative bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                          {/* Gradient Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <div className="relative">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                              <IconComponent className="w-8 h-8 text-primary-600" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary-700 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-neutral-600 mb-4 line-clamp-3">
                              {category.description}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                              <span>{category.subcategories.length} alt kategori</span>
                              <span>{productCount} ürün</span>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                              <span>Kategoriye Git</span>
                              <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {!isSearching && (
          <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
            <div className="container-custom text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Aradığınız Ürünü Bulamadınız mı?
                </h2>
                <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                  Uzman ekibimiz size özel çözümler geliştirmek için burada
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/iletisim" 
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
                  >
                    İletişime Geç
                  </a>
                  <a 
                    href="/teknik-destek" 
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                  >
                    Teknik Destek
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
} 