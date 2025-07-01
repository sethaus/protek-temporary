'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon, BeakerIcon, CubeIcon, WrenchIcon } from '@heroicons/react/24/outline'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import type { Category } from '@/data/products'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

interface CategoryPageClientProps {
  category: Category
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BeakerIcon

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
              </div>
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
                {category.name} Ürünleri
              </h3>
              <p className="text-center text-gray-600 mt-4 text-lg">
                Hazırlık aşamasında, yakında tüm ürünlerimizle burada olacağız.
              </p>
              <Link
                href="/urunler"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mt-6"
              >
                Diğer Kategorilere Bak
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
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
