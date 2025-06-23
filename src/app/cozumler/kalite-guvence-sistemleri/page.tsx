'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  RocketLaunchIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentCheckIcon,
  PhoneIcon,
  StarIcon,
  TrophyIcon,
  HeartIcon,
  LockClosedIcon,
  ClipboardDocumentCheckIcon,
  CogIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  ChartPieIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const qualityFeatures = [
  {
    icon: DocumentCheckIcon,
    title: 'ISO Uyumluluk',
    description: 'ISO 17025, ISO 9001, GLP, GMP standartlarına tam uyumluluk',
    standards: ['ISO 17025:2017', 'ISO 9001:2015', 'GLP Guidelines', 'GMP Standards']
  },
  {
    icon: LockClosedIcon,
    title: 'Veri Güvenliği',
    description: 'Elektronik kayıt tutma ve dijital imza sistemleri',
    standards: ['21 CFR Part 11', 'GDPR Compliance', 'Data Integrity', 'Audit Trail']
  },
  {
    icon: ChartPieIcon,
    title: 'Performans İzleme',
    description: 'Kalite göstergeleri ve sürekli iyileştirme',
    standards: ['KPI Dashboard', 'Trend Analysis', 'Control Charts', 'CAPA System']
  },
  {
    icon: ExclamationTriangleIcon,
    title: 'Risk Yönetimi',
    description: 'Kapsamlı risk analizi ve önleyici aksiyonlar',
    standards: ['Risk Assessment', 'FMEA Analysis', 'Preventive Actions', 'Contingency Planning']
  }
]

const complianceAreas = [
  {
    name: 'Farmasötik Kalite',
    description: 'İlaç ve biyomedikal ürünler için kalite sistemleri',
    icon: '💊',
    regulations: ['FDA Guidelines', 'EMA Regulations', 'ICH Guidelines', 'Turkish Medicines Agency'],
    benefits: ['%99.9 uyumluluk', 'Hızlı onay süreçleri', 'Uluslararası kabul']
  },
  {
    name: 'Gıda Güvenliği',
    description: 'HACCP ve gıda güvenliği yönetim sistemleri',
    icon: '🍽️',
    regulations: ['HACCP Principles', 'ISO 22000', 'BRC Standards', 'Turkish Food Codex'],
    benefits: ['Sıfır gıda krizi', 'Müşteri güveni', 'Marka koruması']
  },
  {
    name: 'Çevre Uyumluluğu',
    description: 'Çevre mevzuatı ve emisyon kontrolü',
    icon: '🌿',
    regulations: ['ISO 14001', 'REACH Regulation', 'Environmental Laws', 'Emission Standards'],
    benefits: ['Sürdürülebilirlik', 'Yasal uyumluluk', 'Sosyal sorumluluk']
  },
  {
    name: 'Otomotiv Kalite',
    description: 'IATF ve otomotiv sektörü kalite standartları',
    icon: '🚗',
    regulations: ['IATF 16949', 'ISO/TS 16949', 'Customer Requirements', 'PPAP Process'],
    benefits: ['OEM onayları', 'Sıfır hata hedefi', 'Müşteri memnuniyeti']
  }
]

const qualityTools = [
  {
    name: 'LIMS Entegrasyonu',
    description: 'Laboratuvar bilgi yönetim sistemleri ile kalite kontrolü',
    features: ['Numune takibi', 'Sonuç doğrulama', 'Otomatik raporlama', 'Trend analizi']
  },
  {
    name: 'Kalibrasyon Yönetimi',
    description: 'Cihaz kalibrasyonu ve metrolo ji hizmetleri',
    features: ['Kalibrasyon planlaması', 'Sertifika yönetimi', 'Belirsizlik hesaplaması', 'İzlenebilirlik']
  },
  {
    name: 'Doküman Kontrolü',
    description: 'Doküman yönetimi ve versiyon kontrolü',
    features: ['Elektronik dokümanlar', 'Onay süreçleri', 'Versiyon takibi', 'Erişim kontrolü']
  },
  {
    name: 'Eğitim Programları',
    description: 'Personel eğitimi ve yetkinlik geliştirme',
    features: ['Teknik eğitimler', 'Sertifikasyon', 'Yetkinlik testleri', 'Sürekli eğitim']
  }
]

const testimonials = [
  {
    name: 'Dr. Leyla Başaran',
    position: 'Kalite Direktörü',
    company: 'Pfizer Türkiye',
    content: 'Kalite güvence sistemimiz sayesinde FDA denetimlerini başarıyla geçiyoruz. Sistematik yaklaşımları mükemmel.',
    rating: 5,
    focus: 'FDA Compliance'
  },
  {
    name: 'Mühendis Kemal Öztürk',
    position: 'Kalite Müdürü',
    company: 'Ford Otosan',
    content: 'IATF 16949 sertifikasyonumuzda kritik rol oynadılar. Süreç iyileştirmelerimiz %40 hata azalması sağladı.',
    rating: 5,
    focus: 'Automotive Quality'
  }
]

export default function KaliteGuvenceSistemleriPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-[#001328] via-[#000a1a] to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-white/20">
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/90 font-medium text-sm">Kalite & Uyumluluk</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Kalite Güvence
                  <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Sistemleri
                  </span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  ISO standartları, FDA uyumluluğu ve endüstriyel kalite sistemleri ile 
                  laboratuvarınızda mükemmellik standardını yakalayın.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🏆', text: 'ISO Sertifikası' },
                  { icon: '🔒', text: '100% Uyumluluk' },
                  { icon: '📊', text: 'Sürekli İzleme' },
                  { icon: '🎯', text: 'Sıfır Hata Hedefi' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-white font-medium text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="/teklif-al"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Kalite Denetimi Al
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 group"
                >
                  <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Başarı Hikayeleri
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <img 
                  src="/images/lab-7.jpg" 
                  alt="Kalite Güvence Sistemi" 
                  className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
                />
                
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">100%</div>
                  <div className="text-xs opacity-90">ISO Uyumluluğu</div>
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">%99.9</div>
                  <div className="text-xs opacity-90">Doğruluk Oranı</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Kalite Güvence
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Özellikleri</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {feature.standards.map((standard, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {standard}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Uyumluluk
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"> Alanları</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {complianceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{area.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{area.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mevzuat</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {area.regulations.map((reg, idx) => (
                        <div key={idx} className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                          {reg}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Faydalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.benefits.map((benefit, idx) => (
                        <span key={idx} className="text-xs bg-emerald-100 text-emerald-700 rounded-full px-2 py-1">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Tools */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Kalite
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"> Araçları</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {qualityTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{tool.name}</h3>
                <p className="text-gray-600 mb-6">{tool.description}</p>
                
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#001328] via-[#000a1a] to-black">
        <div className="container-custom">
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white">
                      {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium mb-6">
                    {testimonials[activeTestimonial].focus}
                  </div>
                  
                  <p className="text-xl text-white/90 mb-8 italic leading-relaxed">
                    &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                  </p>
                  
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{testimonials[activeTestimonial].name}</div>
                    <div className="text-white/70">{testimonials[activeTestimonial].position}</div>
                    <div className="text-emerald-400 font-semibold">{testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Kalite Standartlarınızı
                <span className="block">Mükemmelleştirin</span>
              </h2>
              
              <p className="text-xl text-white/90">
                Ücretsiz kalite denetimi için bugün bizimle iletişime geçin.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="/teklif-al"
                  className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                >
                  <ShieldCheckIcon className="w-6 h-6" />
                  Kalite Denetimi Al
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="tel:+902123456789"
                  className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-3 group"
                >
                  <PhoneIcon className="w-6 h-6" />
                  Hemen Ara
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}