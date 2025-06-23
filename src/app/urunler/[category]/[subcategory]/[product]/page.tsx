'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  ChevronRightIcon, 
  HomeIcon, 
  BeakerIcon, 
  CubeIcon, 
  WrenchIcon, 
  FlagIcon,
  StarIcon,
  ShareIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  PhoneIcon,
  CheckCircleIcon,
  ArrowsPointingOutIcon,
  PlayIcon,
  ScaleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline'
import { 
  FlagIcon as FlagIconSolid, 
  StarIcon as StarIconSolid,
  PlayIcon as PlayIconSolid 
} from '@heroicons/react/24/solid'
import { productCategories, getProductById } from '@/data/products'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const iconMap = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

interface ProductPageProps {
  params: {
    category: string
    subcategory: string
    product: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'applications' | 'reviews' | 'support'>('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [comparisonList, setComparisonList] = useState<string[]>([])
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Ürünü bul
  const product = getProductById(params.product)
  
  if (!product) {
    notFound()
  }

  // Kategori ve alt kategoriyi bul
  const category = productCategories.find(cat => cat.key === params.category)
  const subcategory = category?.subcategories.find(sub => sub.key === params.subcategory)
  
  if (!category || !subcategory) {
    notFound()
  }

  // Benzer ürünleri bul (aynı alt kategorideki diğer ürünler)
  const relatedProducts = subcategory.products
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BeakerIcon

  // Demo resimler ve video (gerçek uygulamada product.media array'i olurdu)
  const productImages = [
    product.image,
    '/images/lab-1.jpg',
    '/images/lab-2.jpg',
    '/images/lab-3.jpg',
    '/images/lab-4.jpg'
  ]

  const toggleComparison = (productId: string) => {
    setComparisonList(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

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
      // Fallback - Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // Show toast notification
    }
  }

  // Mock customer reviews
  const customerReviews = [
    {
      id: 1,
      name: 'Dr. Mehmet Yılmaz',
      company: 'İstanbul Üniversitesi',
      rating: 5,
      date: '2024-01-15',
      comment: 'Çok hassas ölçümler yapabiliyor. Laboratuvarımızda sorunsuz çalışıyor.',
      verified: true
    },
    {
      id: 2,
      name: 'Ayşe Kılıç',
      company: 'Gıda Kontrol Lab.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Kullanımı kolay, sonuçları güvenilir. Fiyat-performans açısından çok iyi.',
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="pt-20">
        {/* Enhanced Breadcrumb with Schema Markup */}
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

        {/* Enhanced Product Hero Section */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Enhanced Product Images Gallery */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl overflow-hidden group">
                    <img
                      src={productImages[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Image Overlay Controls */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => setIsFavorite(!isFavorite)}
                          className="p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
                        >
                          {isFavorite ? (
                                                          <FlagIconSolid className="w-6 h-6 text-primary-500" />
                          ) : (
                            <FlagIcon className="w-6 h-6 text-neutral-600" />
                          )}
                        </button>
                        <button
                          onClick={() => setIsFullscreen(true)}
                          className="p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
                        >
                          <ArrowsPointingOutIcon className="w-6 h-6 text-neutral-600" />
                        </button>
                      </div>
                      
                      {/* Video Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setShowVideo(true)}
                          className="p-4 bg-primary-600 hover:bg-primary-700 rounded-full text-white shadow-xl transition-colors"
                        >
                          <PlayIconSolid className="w-8 h-8 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    {/* 360° View Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-2 bg-white/90 rounded-lg shadow-lg">
                        <EyeIcon className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-medium text-neutral-800">360° Görünüm</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="flex gap-2 mt-4">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-primary-500 scale-105' 
                            : 'border-transparent hover:border-primary-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <PlayIcon className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Product Information */}
              <div className="space-y-6">
                {/* Product Header */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-primary-600 mb-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                    <ChevronRightIcon className="w-3 h-3" />
                    <span>{subcategory.name}</span>
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <h1 className="text-3xl lg:text-4xl font-bold text-neutral-800 leading-tight">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={shareProduct}
                        className="p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                        title="Paylaş"
                      >
                        <ShareIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleComparison(product.id)}
                        className={`p-2 transition-colors ${
                          comparisonList.includes(product.id)
                            ? 'text-primary-600'
                            : 'text-neutral-600 hover:text-primary-600'
                        }`}
                        title="Karşılaştırmaya Ekle"
                      >
                        <ScaleIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Enhanced Rating & Trust Indicators */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIconSolid key={star} className="w-5 h-5 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-600">(24 değerlendirme)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Garantili Ürün</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <TruckIcon className="w-4 h-4" />
                      <span>Ücretsiz Kargo</span>
                    </div>
                  </div>

                  {/* Quick Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {product.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link 
                      href="/iletisim"
                      className="bg-primary-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      Fiyat Teklifi Al
                    </Link>
                    <Link 
                      href="/iletisim"
                      className="border-2 border-primary-600 text-primary-600 px-6 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <PhoneIcon className="w-5 h-5" />
                      Bilgi Al
                    </Link>
                  </div>
                  
                  {/* Secondary Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-primary-600 transition-colors bg-white rounded-lg border border-neutral-200 hover:border-primary-200">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      Katalog İndir
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-primary-600 transition-colors bg-white rounded-lg border border-neutral-200 hover:border-primary-200">
                      <CalendarIcon className="w-4 h-4" />
                      Demo Talep Et
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-primary-600 transition-colors bg-white rounded-lg border border-neutral-200 hover:border-primary-200">
                      <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
                      Canlı Destek
                    </button>
                  </div>
                </div>

                {/* Quick Delivery Info */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <TruckIcon className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Hızlı Teslimat</p>
                      <p className="text-sm text-green-600">İstanbul için 24 saat, diğer iller için 2-3 iş günü</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Product Details Tabs */}
        <section ref={ref} className="py-16 bg-white">
          <div className="container-custom">
            {/* Tab Navigation */}
            <div className="flex flex-wrap border-b border-neutral-200 mb-8">
              {[
                { key: 'overview' as const, label: 'Genel Bakış', icon: BeakerIcon },
                { key: 'specifications' as const, label: 'Teknik Özellikler', icon: DocumentTextIcon },
                { key: 'applications' as const, label: 'Uygulama Alanları', icon: CubeIcon },
                { key: 'reviews' as const, label: 'Müşteri Yorumları', icon: StarIcon },
                { key: 'support' as const, label: 'Destek', icon: ChatBubbleLeftIcon },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-neutral-800 mb-4">Ürün Genel Bakış</h3>
                      <p className="text-neutral-700 leading-relaxed mb-6">
                        {product.description} Bu ürün, {product.applications.join(', ').toLowerCase()} alanlarında 
                        kullanılmak üzere tasarlanmıştır ve {product.features.join(', ').toLowerCase()} 
                        özelliklerini sunar.
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-semibold text-neutral-800 mb-4">Öne Çıkan Özellikler</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {product.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-neutral-800 mb-4">Uygulama Alanları</h4>
                      <div className="space-y-3">
                        {product.applications.map((app, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 bg-primary-50 text-primary-700 rounded-lg border border-primary-200"
                          >
                            {app}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">Teknik Özellikler</h3>
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <div className="bg-neutral-50 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <motion.div 
                            key={key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex justify-between items-center py-3 border-b border-neutral-200 last:border-b-0"
                          >
                            <span className="font-medium text-neutral-800">{key}</span>
                            <span className="text-neutral-600 text-right">{value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <DocumentTextIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                      <p className="text-neutral-600 mb-4">Detaylı teknik özellikler için lütfen bizimle iletişime geçin.</p>
                      <Link
                        href="/iletisim"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        İletişime Geç
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">Uygulama Alanları ve Kullanım Senaryoları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.applications.map((application, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                          <BeakerIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-neutral-800 mb-2">{application}</h4>
                        <p className="text-neutral-600 text-sm">
                          {product.name} ürünü {application.toLowerCase()} alanında yüksek performans sağlar.
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">Müşteri Yorumları</h3>
                  <div className="space-y-6">
                    {customerReviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white border border-neutral-200 rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-neutral-800">{review.name}</h4>
                            <p className="text-sm text-neutral-600">{review.company}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <StarIconSolid 
                                    key={star} 
                                    className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-neutral-300'}`} 
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Doğrulanmış</span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-neutral-500">{new Date(review.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <p className="text-neutral-700">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">Destek ve Hizmetler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white border border-neutral-200 rounded-xl p-6">
                      <DocumentTextIcon className="w-10 h-10 text-primary-600 mb-4" />
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">Teknik Dokümantasyon</h4>
                      <p className="text-neutral-600 text-sm mb-4">Kullanım kılavuzları, teknik çizimler ve sertifikalar</p>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Dökümanları İndir →
                      </button>
                    </div>
                    
                    <div className="bg-white border border-neutral-200 rounded-xl p-6">
                      <ChatBubbleLeftIcon className="w-10 h-10 text-primary-600 mb-4" />
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">Teknik Destek</h4>
                      <p className="text-neutral-600 text-sm mb-4">Uzman ekibimizden 7/24 teknik destek alın</p>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Destek Al →
                      </button>
                    </div>
                    
                    <div className="bg-white border border-neutral-200 rounded-xl p-6">
                      <WrenchIcon className="w-10 h-10 text-primary-600 mb-4" />
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">Kurulum ve Eğitim</h4>
                      <p className="text-neutral-600 text-sm mb-4">Profesyonel kurulum ve personel eğitimi hizmetleri</p>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Bilgi Al →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-neutral-50">
            <div className="container-custom">
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-8 text-center">
                Benzer Ürünler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/urunler/${params.category}/${params.subcategory}/${relatedProduct.id}`}>
                      <div className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-48 bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                toggleComparison(relatedProduct.id)
                              }}
                              className={`p-2 rounded-full transition-colors ${
                                comparisonList.includes(relatedProduct.id)
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-white/80 text-neutral-600 hover:bg-white'
                              }`}
                            >
                              <ScaleIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                            {relatedProduct.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary-600 font-medium text-sm">Detayları Gör</span>
                            <ChevronRightIcon className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced CTA Section */}
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
                  href="/iletisim"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors shadow-lg hover:shadow-xl"
                >
                  Fiyat Teklifi Al
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