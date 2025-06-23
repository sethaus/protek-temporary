'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BeakerIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const solutions = [
  {
    id: 'endustriyel',
    icon: BeakerIcon,
    title: 'Endüstriyel Laboratuvar Kurulumu',
    subtitle: 'Modern ve verimli laboratuvar alanları',
    description: 'Sektörünüze özel tasarlanmış, en son teknoloji ile donatılmış laboratuvar kurulum çözümleri sunuyoruz. Planlama aşamasından teslime kadar her adımda yanınızdayız.',
    image: '/images/lab-1.jpg',
    features: [
      'Laboratuvar Dizayn ve Planlama',
      'Cihaz Seçimi ve Entegrasyonu', 
      'İş Güvenliği Sistemleri',
      'Otomasyon ve Veri Yönetimi',
      '7/24 Teknik Destek'
    ],
    benefits: [
      'Verimlilik artışı %40',
      'Maliyet tasarrufu %25',
      'Hızlı kurulum süreci'
    ],
    href: '/cozumler/endustriyel-laboratuvar-kurulumu',
    badge: 'Popüler'
  },
  {
    id: 'otomasyon',
    icon: CogIcon,
    title: 'Laboratuvar Otomasyon Sistemleri',
    subtitle: 'Akıllı otomasyon ile verimlilik',
    description: 'LIMS yazılımları, robotik sistemler ve akıllı sensörlerle laboratuvar süreçlerinizi tamamen otomatize edin. İnsan hatasını minimuma indirirken verimliliği maksimuma çıkarın.',
    image: '/images/lab-2.jpg',
    features: [
      'LIMS Yazılım Entegrasyonu',
      'Robotik Numune İşleme',
      'Akıllı Sensör Ağları',
      'Gerçek Zamanlı Monitoring',
      'Uzaktan Kontrol Sistemi'
    ],
    benefits: [
      'Hata oranı %90 azalma',
      'İşlem hızı 3x artış',
      'Tam izlenebilirlik'
    ],
    href: '/cozumler/otomasyon-sistemleri',
    badge: 'Yenilikçi'
  },
  {
    id: 'anahtar-teslim',
    icon: WrenchScrewdriverIcon,
    title: 'Anahtar Teslim Projeler',
    subtitle: 'Baştan sona komple çözüm',
    description: 'Konsept tasarımından devreye almaya kadar tüm süreçleri yönetiyoruz. Tek noktadan koordinasyon ile proje sürenizi kısaltır, kaliteyi artırırız.',
    image: '/images/lab-3.jpg',
    features: [
      'Proje Yönetimi ve Koordinasyon',
      'Anahtar Teslim Uygulama',
      'Eğitim ve Operasyonel Destek',
      'Kalite Güvence Sistemleri',
      'Garanti ve Bakım Hizmetleri'
    ],
    benefits: [
      'Tek koordinatör avantajı',
      'Zamanında teslim garantisi',
      'Uzun dönem destek'
    ],
    href: '/cozumler/anahtar-teslim-projeler',
    badge: 'Güvenilir'
  },
  {
    id: 'arge',
    icon: AcademicCapIcon,
    title: 'AR-GE Laboratuvarları',
    subtitle: 'Araştırma odaklı özel tasarım',
    description: 'Üniversiteler ve araştırma kurumları için özel geliştirilen, esneklik ve genişletilebilirlik odaklı laboratuvar çözümleri.',
    image: '/images/lab-4.jpg',
    features: [
      'Modüler ve Esnek Tasarım',
      'Araştırma Ekipmanları',
      'Akademik İş Birlikleri',
      'Öğrenci Eğitim Programları',
      'Sürdürülebilir Teknolojiler'
    ],
    benefits: [
      'Araştırma kapasitesi artışı',
      'Akademik iş birliği fırsatları',
      'Sürdürülebilir çözümler'
    ],
    href: '/cozumler/ar-ge-laboratuvarlari',
    badge: 'Akademik'
  },
  {
    id: 'kalite-guvence',
    icon: ShieldCheckIcon,
    title: 'Kalite Güvence Sistemleri',
    subtitle: 'ISO standartları ile kalite yönetimi',
    description: 'ISO 17025, GLP ve GMP standartlarına uygun kalite güvence sistemleri kurarak laboratuvarınızın akreditasyon süreçlerini destekliyoruz.',
    image: '/images/lab-7.jpg',
    features: [
      'ISO 17025 Akreditasyon Desteği',
      'Kalite Yönetim Sistemleri',
      'Doküman Yönetimi',
      'İç Denetim Süreçleri',
      'Sürekli İyileştirme Programları'
    ],
    benefits: [
      'Uluslararası tanınırlık',
      'Müşteri güveni artışı',
      'Süreç standardizasyonu'
    ],
    href: '/cozumler/kalite-guvence-sistemleri',
    badge: 'Sertifikalı'
  }
]

export default function Solutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [activeTab, setActiveTab] = useState(0)
  const activeSolution = solutions[activeTab]

  const [isPaused, setIsPaused] = useState(false)

  // Auto-cycle through tabs
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % solutions.length)
    }, 10000) // 10 saniye olarak yavaşlattık
    return () => clearInterval(interval)
  }, [isPaused])

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Popüler': return 'bg-gradient-to-r from-orange-500 to-red-500'
      case 'Yenilikçi': return 'bg-gradient-to-r from-purple-500 to-blue-500'
      case 'Güvenilir': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'Akademik': return 'bg-gradient-to-r from-indigo-500 to-purple-500'
      case 'Sertifikalı': return 'bg-gradient-to-r from-cyan-500 to-teal-500'
      default: return 'bg-gradient-to-r from-primary-500 to-secondary-500'
    }
  }

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-gradient-to-br from-[#001328] via-[#000a1a] to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001328]/20 to-black/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#001328]/10 rounded-full blur-3xl shadow-2xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#001328]/15 rounded-full blur-3xl shadow-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#001328]/8 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-[#001328]/10"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <SparklesIcon className="w-4 h-4 text-secondary-400" />
            <span className="text-white/90 text-label">Çözümlerimiz</span>
          </div>
          <h2 className="font-bold text-white">
            Laboratuvarınız İçin
            <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Özel Tasarlanmış Çözümler
            </span>
          </h2>
          <p className="text-body-lg text-neutral-300 max-w-2xl mx-auto">
            25+ yıllık deneyimimizle sektörünüze özel, yenilikçi ve sürdürülebilir laboratuvar çözümleri sunuyoruz.
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Tab Navigation */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-rows-5 gap-2 h-full"
              >
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon
                const isActive = activeTab === index
                
                return (
                  <motion.button
                    key={solution.id}
                    onClick={() => setActiveTab(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`w-full text-left p-3 lg:p-4 rounded-xl border transition-all duration-500 group h-full flex flex-col justify-between ${
                      isActive
                        ? 'bg-white/10 border-white/30 backdrop-blur-sm scale-[1.02]'
                        : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                    }`}
                    whileHover={{ scale: isActive ? 1.02 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3 flex-grow">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-primary-500 to-secondary-500 scale-110'
                          : 'bg-white/10 group-hover:bg-white/20'
                      }`}>
                        <IconComponent className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-white/70'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h5 className={`text-sm font-semibold transition-colors leading-tight ${
                            isActive ? 'text-white' : 'text-white/80'
                          }`}>
                            {solution.title}
                          </h5>
                          <span className={`px-1.5 py-0.5 text-caption font-medium text-white rounded-full flex-shrink-0 ${getBadgeColor(solution.badge)}`}>
                            {solution.badge}
                          </span>
                        </div>
                        <p className={`text-caption transition-colors leading-tight ${
                          isActive ? 'text-white/90' : 'text-white/60'
                        }`}>
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    {isActive && !isPaused && (
                      <motion.div
                        className="mt-3 w-full h-0.5 bg-white/20 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 10, ease: 'linear' }}
                          key={activeTab}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </motion.div>
          </div>

            {/* Content Area */}
            <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  <Image
                    src={activeSolution.image}
                    alt={activeSolution.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-caption font-medium text-white rounded-full ${getBadgeColor(activeSolution.badge)}`}>
                      {activeSolution.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 lg:p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {activeSolution.title}
                    </h3>
                    <p className="text-neutral-300 text-body-sm">
                      {activeSolution.description}
                    </p>
                  </div>

                  {/* Features & Benefits Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Features */}
                    <div>
                      <h6 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-primary-400" />
                        Özellikler
                      </h6>
                      <ul className="space-y-2">
                        {activeSolution.features.slice(0, 3).map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-caption text-neutral-300"
                          >
                            <div className="w-1 h-1 bg-primary-400 rounded-full"></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h6 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <RocketLaunchIcon className="w-4 h-4 text-secondary-400" />
                        Avantajlar
                      </h6>
                      <ul className="space-y-2">
                        {activeSolution.benefits.map((benefit, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="flex items-center gap-2 text-caption text-neutral-300"
                          >
                            <SparklesIcon className="w-3 h-3 text-secondary-400" />
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href={activeSolution.href}
                      className="flex-1 bg-[#001328] text-white px-5 py-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-[#001328] hover:via-[#2A50F8] hover:to-[#FF4766] transition-all duration-700 hover:scale-110 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 group text-body-sm relative overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-600 hover:before:left-[100%]"
                    >
                      Detayları İncele
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                                          </Link>
                      <Link 
                        href="/teklif-al"
                        className="px-5 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20 text-body-sm text-center"
                      >
                        Teklif Al
                      </Link>
                  </div>
                </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <Link
            href="/cozumler"
            className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            Tüm Çözümlerimizi Keşfedin
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 