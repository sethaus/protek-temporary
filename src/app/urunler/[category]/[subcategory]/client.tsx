'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon, BeakerIcon, CubeIcon, WrenchIcon } from '@heroicons/react/24/outline'
import type { Category, Subcategory } from '@/data/products'
import Header from '../../../../components/layout/Header'
import Footer from '../../../../components/layout/Footer'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

interface SubcategoryPageClientProps {
  category: Category
  subcategory: Subcategory
}

export default function SubcategoryPageClient({ category, subcategory }: SubcategoryPageClientProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
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

            </motion.div>
          </div>
        </section>

        {/* Geçici Mesaj - Ürünler Hazırlanıyor */}
        <section className="py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <IconComponent className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {subcategory.name} Ürünleri
              </h3>
              <p className="text-center text-gray-600 mt-4 text-lg">
                Hazırlık aşamasında, yakında tüm ürünlerimizle burada olacağız.
              </p>
              <Link
                href={`/urunler/${category.key}`}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mt-6"
              >
                Kategoriye Geri Dön
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
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
                .filter(sub => sub.key !== subcategory.key)
                .map((sub, index) => (
                <motion.div
                  key={sub.key}
                  ref={ref}
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
                      <div className="flex items-center justify-end text-sm">
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
