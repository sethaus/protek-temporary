'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ChevronRightIcon, 
  HomeIcon, 
  BeakerIcon, 
  CubeIcon, 
  WrenchIcon, 
  ShareIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  WrenchIcon as WrenchIconSolid,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline'
import type { Product, Category, Subcategory } from '@/data/products'
import Header from '../../../../../components/layout/Header'
import Footer from '../../../../../components/layout/Footer'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

interface ProductPageClientProps {
  category: Category
  subcategory: Subcategory
  product: Product
}

export default function ProductPageClient({ category, subcategory, product }: ProductPageClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'applications' | 'support'>('overview')
  const [selectedImage, setSelectedImage] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BeakerIcon

  const productImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : []

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('URL kopyalandı!')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="pt-20">
        <section className="py-4 bg-white border-b border-neutral-200">
          <div className="container-custom">
            <nav className="flex items-center text-sm text-neutral-600 flex-wrap gap-1" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
                <HomeIcon className="w-4 h-4" />
                Ana Sayfa
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2 text-neutral-400" />
              <Link href="/urunler" className="hover:text-primary-600 transition-colors">
                Ürünler
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2 text-neutral-400" />
              <Link 
                href={`/urunler/${category.key}`} 
                className="hover:text-primary-600 transition-colors"
              >
                {category.name}
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2 text-neutral-400" />
              <Link 
                href={`/urunler/${category.key}/${subcategory.key}`} 
                className="hover:text-primary-600 transition-colors"
              >
                {subcategory.name}
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2 text-neutral-400" />
              <span className="text-neutral-800 font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Product Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-white border border-neutral-200 rounded-xl p-4 sticky top-24">
                  <div className="relative aspect-square mb-4">
                    {productImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${product.name} - resim ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${selectedImage === index ? 'opacity-100' : 'opacity-0'}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center">
                    {productImages.map((img, index) => (
                      <button 
                        key={index} 
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-16 border rounded-lg overflow-hidden transition-all ${selectedImage === index ? 'border-primary-600 ring-2 ring-primary-600' : 'border-neutral-200 hover:border-primary-400'}`}
                      >
                        <img src={img} alt={`thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-primary-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900">{product.name}</h1>
                        <p className="text-neutral-600">Model: {product.model}</p>
                    </div>
                </div>
                
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="w-6 h-6 text-primary-600" />
                        <div>
                            <p className="font-semibold text-neutral-800">Teslimat Süresi</p>
                            <p className="text-sm text-neutral-600">2-4 İş Günü</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <TruckIcon className="w-6 h-6 text-primary-600" />
                        <div>
                            <p className="font-semibold text-neutral-800">Kargo</p>
                            <p className="text-sm text-neutral-600">Tüm Türkiye&apos;ye Ücretsiz</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
                        <div>
                            <p className="font-semibold text-neutral-800">Garanti</p>
                            <p className="text-sm text-neutral-600">2 Yıl Üretici Garantisi</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-primary-600" />
                        <div>
                            <p className="font-semibold text-neutral-800">Destek</p>
                            <p className="text-sm text-neutral-600">7/24 Teknik Servis</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link 
                    href="/teklif-al"
                    className="flex-1 text-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-400/50 transform hover:-translate-y-0.5"
                  >
                    Hızlı Teklif Al
                  </Link>
                  <button 
                    onClick={shareProduct}
                    className="flex items-center justify-center gap-2 bg-neutral-200 text-neutral-800 px-6 py-4 rounded-lg font-semibold hover:bg-neutral-300 transition-colors"
                    aria-label="Ürünü paylaş"
                  >
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-t border-b border-neutral-200">
          <div className="container-custom">
            <div className="border-b border-neutral-200 mb-8">
              <nav className="-mb-px flex gap-6" aria-label="Tabs">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                >
                  Genel Bakış
                </button>
                <button 
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'specifications' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                >
                  Teknik Özellikler
                </button>
                <button 
                  onClick={() => setActiveTab('applications')}
                  className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'applications' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                >
                  Uygulama Alanları
                </button>
                 <button 
                  onClick={() => setActiveTab('support')}
                  className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'support' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}
                >
                  Destek ve Dökümanlar
                </button>
              </nav>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none prose-p:text-neutral-700 prose-headings:text-neutral-800 prose-strong:text-neutral-900 prose-a:text-primary-600 hover:prose-a:text-primary-700"
            >
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Ürün Açıklaması</h3>
                  <p>{product.overview || product.description}</p>
                  <h4 className="text-xl font-semibold mt-6 mb-3">Öne Çıkan Özellikler</h4>
                  <ul className="space-y-2 list-none p-0">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Teknik Veriler</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-neutral-200 text-left">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="p-4 font-semibold">Özellik</th>
                          <th className="p-4 font-semibold">Değer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.specifications || {}).map(([key, value]) => (
                          <tr key={key} className="border-t border-neutral-200">
                            <td className="p-4 font-medium text-neutral-600">{key}</td>
                            <td className="p-4">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === 'applications' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Kullanım Alanları</h3>
                  <p>Bu ürün, aşağıdaki endüstrilerde ve uygulamalarda yaygın olarak kullanılmaktadır:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 mt-4">
                    {product.applications?.map((app, index) => (
                      <li key={index} className="flex items-center">
                        <BeakerIcon className="w-5 h-5 text-primary-500 mr-3" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'support' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Destek Kaynakları</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                      <ArrowDownTrayIcon className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">Teknik Dokümanlar</h4>
                      <p className="text-neutral-600 text-sm mb-4">Kullanım kılavuzları, çizimler ve sertifikalar.</p>
                      <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">Dökümanları İndir →</a>
                    </div>
                    <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                      <ChatBubbleLeftIcon className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">Canlı Destek</h4>
                      <p className="text-neutral-600 text-sm mb-4">Uzman ekibimizden anında yardım alın.</p>
                      <Link href="/iletisim" className="text-primary-600 hover:text-primary-700 text-sm font-medium">Destek Al →</Link>
                    </div>
                    <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                      <WrenchIconSolid className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">Servis Talebi</h4>
                      <p className="text-neutral-600 text-sm mb-4">Kurulum veya bakım hizmetleri için talep oluşturun.</p>
                      <Link href="/teknik-destek" className="text-primary-600 hover:text-primary-700 text-sm font-medium">Servis Çağır →</Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Bu Ürün Hakkında Daha Fazla Bilgi İster misiniz?
              </h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Uzman ekibimiz size ürün özellikleri, fiyat ve kurulum hakkında detaylı bilgi verir
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/teklif-al?product=${product.id}`}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors shadow-lg hover:shadow-xl"
                >
                  Fiyat Teklifi Al
                </Link>
                <Link
                  href="/iletisim#satis-ekibi"
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
