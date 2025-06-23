'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Link from 'next/link'
import { BeakerIcon, CubeIcon, WrenchIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { productCategories, searchProducts, getAllProducts } from '@/data/products'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

// Helper function to generate product URL - same as in Products.tsx
const generateProductUrl = (product: any) => {
  // Find category and subcategory keys from the product data structure
  for (const category of productCategories) {
    for (const subcategory of category.subcategories) {
      if (subcategory.products.some(p => p.id === product.id)) {
        return `/urunler/${category.key}/${subcategory.key}/${product.id}`
      }
    }
  }
  // Fallback - should not happen if data is consistent
  return `/urunler/product-not-found`
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

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

  const allProducts = getAllProducts()

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
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg bg-neutral-100"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-neutral-600 mt-1">{product.description}</p>
                            <div className="text-xs text-neutral-500 mt-2">
                              {product.category} • {product.subcategory}
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
                  {productCategories.length} ana kategoride {allProducts.length}+ ürün seçeneği
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productCategories.map((category, index) => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BeakerIcon
                  const productCount = category.subcategories.reduce((total, sub) => total + sub.products.length, 0)
                  
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