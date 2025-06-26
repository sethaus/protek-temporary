'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRightIcon, HomeIcon, BeakerIcon, CubeIcon, WrenchIcon, FlagIcon } from '@heroicons/react/24/outline'
import { productCategories, type Product } from '@/data/products'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Kategoriyi bul
  const category = productCategories.find(cat => cat.key === params.category)
  
  if (!category) {
    notFound()
  }

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

  // Filter products by category from API data
  const categoryProducts = products.filter(product => product.category === category.name)

  // Helper function to get subcategory key for a product
  const getSubcategoryKeyForProduct = (productId: string): string => {
    // Önce statik yapıda ara
    for (const subcategory of category.subcategories) {
      if (subcategory.products.some(p => p.id === productId)) {
        return subcategory.key
      }
    }
    
    // API'den gelen ürün için subcategory name'den key oluştur
    const product = categoryProducts.find(p => p.id === productId)
    if (product && product.subcategory) {
      const subcategory = category.subcategories.find(sub => sub.name === product.subcategory)
      if (subcategory) {
        return subcategory.key
      }
      
      // Fallback: name'den key oluştur
      return product.subcategory
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/,/g, '')
        .replace(/\s+/g, '-') || 'test-sistemleri'
    }
    
    return 'unknown'
  }

  // Generate product URL function
  const generateProductUrl = (product: any) => {
    const subcategoryKey = getSubcategoryKeyForProduct(product.id)
    return `/urunler/${category.key}/${subcategoryKey}/${product.id}`
  }

  // Get subcategory counts from API data
  const getSubcategoryProductCount = (subcategoryName: string): number => {
    return categoryProducts.filter(product => product.subcategory === subcategoryName).length
  }

  // Seçili alt kategoriye göre ürünleri filtrele
  const filteredProducts = selectedSubcategory
    ? categoryProducts.filter(product => {
        const subcategory = category.subcategories.find(sub => sub.key === selectedSubcategory)
        return subcategory && product.subcategory === subcategory.name
      })
    : categoryProducts

  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BeakerIcon
  const totalProducts = categoryProducts.length

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
        {/* Breadcrumb */}
        <section className="py-4 bg-white border-b border-neutral-200">
          <div className="container-custom">
            <nav className="flex items-center text-sm text-neutral-600">
              <Link href="/" className="hover:text-primary-600 transition-colors">
                <HomeIcon className="w-4 h-4" />
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2" />
              <Link href="/urunler" className="hover:text-primary-600 transition-colors">
                Ürünler
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2" />
              <span className="text-neutral-800 font-medium">{category.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white space-y-6"
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">{category.name}</h1>
              <p className="text-lg lg:text-xl text-primary-100 max-w-3xl mx-auto">
                {category.description}
              </p>
              <div className="flex justify-center items-center gap-8 text-primary-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{category.subcategories.length}</div>
                  <div className="text-sm">Alt Kategori</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalProducts}</div>
                  <div className="text-sm">Ürün</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Alt Kategori Filtreleri */}
        <section className="py-8 bg-white border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSubcategory(null)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedSubcategory === null
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Tümü ({totalProducts})
              </button>
              {category.subcategories.map((subcategory) => (
                <button
                  key={subcategory.key}
                  onClick={() => setSelectedSubcategory(subcategory.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedSubcategory === subcategory.key
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {subcategory.name} ({getSubcategoryProductCount(subcategory.name)})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Ürün Listesi */}
        <section className="py-16">
          <div className="container-custom">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={generateProductUrl(product)}>
                      <div className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div className="relative">
                          {/* Ürün Resmi */}
                          <div className="relative h-48 bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                              <FlagIcon className="w-5 h-5 text-neutral-400 hover:text-primary-500 transition-colors" />
                            </button>
                          </div>

                          {/* Ürün Bilgileri */}
                          <div className="p-6">
                            <div className="text-xs text-primary-600 font-medium mb-2">
                              {product.subcategory}
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                              {product.description}
                            </p>

                            {/* Özellikler */}
                            <div className="space-y-2 mb-4">
                              {product.features?.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-xs text-neutral-500">
                                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>

                            {/* Uygulama Alanları */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.applications?.slice(0, 3).map((app, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                                >
                                  {app}
                                </span>
                              ))}
                            </div>

                            {/* CTA */}
                            <div className="flex items-center justify-between">
                              <span className="text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
                                Detayları Gör
                              </span>
                              <ChevronRightIcon className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BeakerIcon className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  Bu kategoride ürün bulunamadı
                </h3>
                <p className="text-neutral-600 mb-6">
                  Yakında yeni ürünler eklenecektir.
                </p>
                <Link
                  href="/urunler"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Diğer Kategorilere Bak
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Teknik Destek İhtiyacınız mı Var?
              </h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Ürün seçimi ve teknik özellikler hakkında uzman desteği alın
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/iletisim"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
                >
                  İletişime Geç
                </Link>
                <Link
                  href="/teknik-destek"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Teknik Destek
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 