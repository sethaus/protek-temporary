'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRightIcon, HomeIcon, BeakerIcon, CubeIcon, WrenchIcon, FlagIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { productCategories, getProductsBySubcategory } from '@/data/products'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

interface SubcategoryPageProps {
  params: {
    category: string
    subcategory: string
  }
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const [sortBy, setSortBy] = useState<'name' | 'applications'>('name')
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Kategori ve alt kategoriyi bul
  const category = productCategories.find(cat => cat.key === params.category)
  const subcategory = category?.subcategories.find(sub => 
    sub.key === params.subcategory
  )
  
  if (!category || !subcategory) {
    notFound()
  }

  // Ürünleri sırala
  const sortedProducts = [...subcategory.products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' })
    } else {
      return a.applications.length - b.applications.length
    }
  })

  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BeakerIcon

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="py-4 bg-white border-b border-neutral-200">
          <div className="container-custom">
            <nav className="flex items-center text-sm text-neutral-600 flex-wrap gap-1">
              <Link href="/" className="hover:text-primary-600 transition-colors">
                <HomeIcon className="w-4 h-4" />
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2" />
              <Link href="/urunler" className="hover:text-primary-600 transition-colors">
                Ürünler
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2" />
              <Link 
                href={`/urunler/${category.key}`} 
                className="hover:text-primary-600 transition-colors"
              >
                {category.name}
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2" />
              <span className="text-neutral-800 font-medium">{subcategory.name}</span>
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
              <h1 className="text-4xl lg:text-5xl font-bold">{subcategory.name}</h1>
              <p className="text-lg lg:text-xl text-primary-100 max-w-3xl mx-auto">
                {subcategory.description}
              </p>
              <div className="text-primary-100">
                <span className="text-2xl font-bold text-white">{subcategory.products.length}</span> ürün bulundu
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filtre ve Sıralama */}
        <section className="py-6 bg-white border-b">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-neutral-600">
                <span className="font-medium text-neutral-800">{subcategory.products.length}</span> ürün listeleniyor
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FunnelIcon className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-600">Sırala:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'applications')}
                    className="text-sm border border-neutral-300 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="name">İsme Göre (A-Z)</option>
                    <option value="applications">Uygulama Sayısına Göre</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ürün Listesi */}
        <section ref={ref} className="py-16">
          <div className="container-custom">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/urunler/${category.key}/${params.subcategory}/${product.id}`}>
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
                            <h3 className="text-lg font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                              {product.description}
                            </p>

                            {/* Özellikler */}
                            <div className="space-y-2 mb-4">
                              <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                                Öne Çıkan Özellikler
                              </h4>
                              {product.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-xs text-neutral-500">
                                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 flex-shrink-0"></div>
                                  <span className="line-clamp-1">{feature}</span>
                                </div>
                              ))}
                            </div>

                            {/* Uygulama Alanları */}
                            <div className="mb-4">
                              <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                                Uygulama Alanları
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {product.applications.slice(0, 3).map((app, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                                  >
                                    {app}
                                  </span>
                                ))}
                                {product.applications.length > 3 && (
                                  <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                                    +{product.applications.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Teknik Özellikler Önizleme */}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                                  Teknik Özellikler
                                </h4>
                                <div className="text-xs text-neutral-500 space-y-1">
                                  {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="font-medium">{key}:</span>
                                      <span>{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* CTA */}
                            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
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
                  Bu alt kategoride ürün bulunamadı
                </h3>
                <p className="text-neutral-600 mb-6">
                  Yakında yeni ürünler eklenecektir.
                </p>
                <Link
                  href={`/urunler/${category.key}`}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Kategoriye Geri Dön
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Diğer Alt Kategoriler */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">
              {category.name} - Diğer Alt Kategoriler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.subcategories
                .filter(sub => sub.key !== params.subcategory)
                .map((sub, index) => (
                <motion.div
                  key={sub.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/urunler/${category.key}/${sub.key}`}>
                    <div className="bg-neutral-50 hover:bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                      <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors mb-2">
                        {sub.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                        {sub.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">{sub.products.length} ürün</span>
                        <ChevronRightIcon className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ürün Karşılaştırması mı Yapıyorsunuz?
              </h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Uzman ekibimiz size en uygun ürünü seçmenizde yardımcı olur
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/iletisim"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
                >
                  Ürün Karşılaştırması İste
                </Link>
                <Link
                  href="/teknik-destek"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Teknik Danışmanlık
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