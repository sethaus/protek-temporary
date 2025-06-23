'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ClockIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentCheckIcon,
  PhoneIcon,
  StarIcon,
  TrophyIcon,
  HeartIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  CubeIcon,
  Squares2X2Icon,
  CogIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    icon: UserGroupIcon,
    title: 'Tek Koordinatör Avantajı',
    description: 'Tüm süreçleri tek elden yönetim ile proje karmaşıklığını minimuma indiriyoruz.',
    value: '100%'
  },
  {
    icon: ClockIcon,
    title: 'Zamanında Teslim Garantisi',
    description: 'Detaylı planlama ve proje yönetimi ile belirlenen sürede teslim garantisi.',
    value: '%98'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Kalite Güvencesi',
    description: 'ISO standartlarında kalite güvencesi ve 2 yıl tam garanti.',
    value: 'ISO 9001'
  },
  {
    icon: TrophyIcon,
    title: 'Uzun Dönem Destek',
    description: '24/7 teknik destek ve sürekli bakım hizmetleri.',
    value: '7/24'
  }
]

const projectTypes = [
  {
    name: 'Endüstriyel Laboratuvarlar',
    description: 'Gıda, kimya, ilaç sektörlerine özel laboratuvar projeleri',
    icon: '🏭',
    duration: '8-16 hafta',
    scope: ['Tasarım', 'Kurulum', 'Eğitim', 'Devreye alma']
  },
  {
    name: 'AR-GE Merkezleri',
    description: 'Araştırma geliştirme odaklı laboratuvar kompleksleri',
    icon: '🔬',
    duration: '12-20 hafta',
    scope: ['Konsept tasarım', 'Teknoloji seçimi', 'Kurulum', 'Validasyon']
  },
  {
    name: 'Kalite Kontrol Laboratuvarları',
    description: 'QC/QA odaklı analiz ve test laboratuvarları',
    icon: '⚗️',
    duration: '6-12 hafta',
    scope: ['İhtiyaç analizi', 'Ekipman seçimi', 'Kurulum', 'Sertifikasyon']
  },
  {
    name: 'Akademik Laboratuvarlar',
    description: 'Üniversite ve araştırma kurumları için eğitim laboratuvarları',
    icon: '🎓',
    duration: '10-18 hafta',
    scope: ['Eğitim odaklı tasarım', 'Modüler kurulum', 'Eğitim', 'Dokümentasyon']
  }
]

const testimonials = [
  {
    name: 'Mühendis Ali Vural',
    position: 'Proje Müdürü',
    company: 'Arçelik A.Ş.',
    content: 'Anahtar teslim projemizde gösterdikleri profesyonellik mükemmeldi. Zamanında teslim edildi ve beklentilerimizi aştı.',
    rating: 5
  },
  {
    name: 'Dr. Fatma Şen',
    position: 'Kalite Direktörü',
    company: 'Koç Holding',
    content: 'Tek koordinatör ile çalışmanın avantajını gördük. Hiçbir aksaklık yaşamadık ve süreç çok rahat ilerledi.',
    rating: 5
  }
]

export default function AnahtarTeslimProjelerPage() {
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
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-green-500/20 rounded-full blur-3xl"></div>
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full border border-white/20">
                  <WrenchScrewdriverIcon className="w-4 h-4 text-green-400" />
                  <span className="text-white/90 font-medium text-sm">Komple Çözüm</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Anahtar Teslim
                  <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Projeler
                  </span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Konsept tasarımından devreye almaya kadar tüm süreçleri tek elden yönetiyoruz. 
                  Proje sürenizi kısaltır, kaliteyi artırırız.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎯', text: 'Tek Koordinatör' },
                  { icon: '⏰', text: 'Zamanında Teslim' },
                  { icon: '🛡️', text: '2 Yıl Garanti' },
                  { icon: '🤝', text: 'Uzun Dönem Destek' }
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
                  className="flex-1 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Proje Teklifi Al
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 group"
                >
                  <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Proje Örnekleri
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
                  src="/images/lab-3.jpg" 
                  alt="Anahtar Teslim Proje" 
                  className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
                />
                
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">300+</div>
                  <div className="text-xs opacity-90">Tamamlanan Proje</div>
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">%98</div>
                  <div className="text-xs opacity-90">Zamanında Teslim</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Anahtar Teslim
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Avantajları</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">{benefit.value}</div>
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Proje
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Türlerimiz</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projectTypes.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{project.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                    <div className="text-green-600 font-semibold text-sm">{project.duration}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Kapsam</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.scope.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#001328] via-[#000a1a] to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Müşteri
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Memnuniyeti</span>
            </h2>
          </motion.div>

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
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white">
                      {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-xl text-white/90 mb-8 italic leading-relaxed">
                    &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                  </p>
                  
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{testimonials[activeTestimonial].name}</div>
                    <div className="text-white/70">{testimonials[activeTestimonial].position}</div>
                    <div className="text-green-400 font-semibold">{testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Projenizi
                <span className="block">Bizimle Başlatın</span>
              </h2>
              
              <p className="text-xl text-white/90">
                Ücretsiz proje danışmanlığı için bugün iletişime geçin.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="/teklif-al"
                  className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                >
                  <WrenchScrewdriverIcon className="w-6 h-6" />
                  Proje Teklifi Al
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