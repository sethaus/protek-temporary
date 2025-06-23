'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  BeakerIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  TruckIcon,
  UsersIcon,
  ChartBarIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  BoltIcon,
  EyeIcon,
  HeartIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  Squares2X2Icon,
  ScaleIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: BuildingOffice2Icon,
    title: 'Özel Tasarım Laboratuvarlar',
    description: 'Sektörünüze ve ihtiyaçlarınıza özel tasarlanmış laboratuvar alanları',
    benefits: ['Modüler dizayn', 'Genişletilebilir yapı', 'Ergonomik çalışma alanları']
  },
  {
    icon: CogIcon,
    title: 'Son Teknoloji Ekipmanlar',
    description: 'Dünya markası analiz cihazları ve otomasyon sistemleri',
    benefits: ['High-end spektrometreler', 'LIMS entegrasyonu', 'IoT sensör ağları']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Güvenlik ve Uyumluluk',
    description: 'ISO, GLP, GMP standartlarına uygun güvenlik sistemleri',
    benefits: ['Acil durum sistemleri', 'Havalandırma kontrolleri', 'Kimyasal güvenlik']
  },
  {
    icon: AcademicCapIcon,
    title: 'Eğitim ve Destek',
    description: 'Kapsamlı personel eğitimi ve sürekli teknik destek',
    benefits: ['Cihaz eğitimleri', '24/7 teknik destek', 'Bakım programları']
  },
  {
    icon: ChartBarIcon,
    title: 'Veri Yönetimi',
    description: 'Gelişmiş LIMS ve veri analiz sistemleri',
    benefits: ['Gerçek zamanlı raporlama', 'Trend analizi', 'Uzaktan erişim']
  },
  {
    icon: RocketLaunchIcon,
    title: 'Hızlı Kurulum',
    description: 'Proje yönetimi ile hızlı ve zamanında teslim garantisi',
    benefits: ['Planlama optimizasyonu', 'Paralel kurulum', 'Test ve validasyon']
  }
]

const processSteps = [
  {
    step: '01',
    title: 'İhtiyaç Analizi',
    description: 'Detaylı ihtiyaç analizi ve fizibilite çalışması',
    duration: '2-3 hafta',
    deliverables: ['Teknik şartname', 'Bütçe analizi', 'Zaman çizelgesi'],
    icon: ClipboardDocumentCheckIcon,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    step: '02',
    title: 'Tasarım ve Planlama',
    description: '3D modelleme ile laboratuvar tasarımı ve ekipman planlaması',
    duration: '3-4 hafta',
    deliverables: ['3D laboratuvar modeli', 'Ekipman listesi', 'Layout planı'],
    icon: CubeIcon,
    color: 'from-purple-500 to-pink-500'
  },
  {
    step: '03',
    title: 'Tedarik ve Kurulum',
    description: 'Ekipman temini, altyapı hazırlığı ve kurulum işlemleri',
    duration: '4-8 hafta',
    deliverables: ['Ekipman kurulumu', 'Altyapı tamamlama', 'Güvenlik sistemleri'],
    icon: WrenchScrewdriverIcon,
    color: 'from-green-500 to-emerald-500'
  },
  {
    step: '04',
    title: 'Test ve Validasyon',
    description: 'Sistem testleri, kalibrasyon ve performans validasyonu',
    duration: '2-3 hafta',
    deliverables: ['Test raporları', 'Kalibrasyon sertifikaları', 'Performans dokümanları'],
    icon: DocumentCheckIcon,
    color: 'from-orange-500 to-red-500'
  },
  {
    step: '05',
    title: 'Eğitim ve Teslim',
    description: 'Personel eğitimi, sistem teslimi ve garanti başlangıcı',
    duration: '1-2 hafta',
    deliverables: ['Personel eğitimi', 'Operasyon kılavuzları', 'Garanti belgesi'],
    icon: AcademicCapIcon,
    color: 'from-teal-500 to-blue-500'
  }
]

const testimonials = [
  {
    name: 'Dr. Mehmet Özkan',
    position: 'Kalite Müdürü',
    company: 'Ülker Gıda A.Ş.',
    content: 'Protek Analitik ile kurduğumuz laboratuvar, üretim süreçlerimizde %40 verimlilik artışı sağladı. Profesyonel yaklaşımları ve zamanında teslimatları takdire şayan.',
    rating: 5,
    image: '/images/client-testimonial-1.jpg'
  },
  {
    name: 'Prof. Dr. Ayşe Kara',
    position: 'Araştırma Direktörü',
    company: 'TÜBA Araştırma Enstitüsü',
    content: 'AR-GE laboratuvarımızı kurarken gösterdikleri teknik ekspertiz ve inovatif çözümler sayesinde uluslararası standartlarda bir laboratuvara sahip olduk.',
    rating: 5,
    image: '/images/client-testimonial-2.jpg'
  },
  {
    name: 'Ing. Serkan Demir',
    position: 'Fabrika Müdürü',
    company: 'Henkel Türkiye',
    content: 'Endüstriyel laboratuvar kurulumumuzda başından sonuna kadar yanımızda oldular. LIMS entegrasyonu ve otomasyon sistemleri mükemmel çalışıyor.',
    rating: 5,
    image: '/images/client-testimonial-3.jpg'
  }
]

const stats = [
  { number: '500+', label: 'Tamamlanan Proje', icon: TrophyIcon },
  { number: '%98', label: 'Müşteri Memnuniyeti', icon: HeartIcon },
  { number: '25+', label: 'Yıllık Deneyim', icon: StarIcon },
  { number: '7/24', label: 'Teknik Destek', icon: ClockIcon }
]

const sectors = [
  { name: 'Gıda ve İçecek', description: 'Kalite kontrol ve güvenlik laboratuvarları', icon: '🍽️', projects: '150+' },
  { name: 'İlaç ve Kozmetik', description: 'AR-GE ve kalite kontrol laboratuvarları', icon: '💊', projects: '80+' },
  { name: 'Kimya ve Petrokimya', description: 'Analitik ve test laboratuvarları', icon: '⚗️', projects: '120+' },
  { name: 'Çevre ve Su', description: 'Çevre izleme ve analiz laboratuvarları', icon: '🌿', projects: '90+' },
  { name: 'Akademik', description: 'Üniversite ve araştırma laboratuvarları', icon: '🎓', projects: '60+' },
  { name: 'Otomotiv', description: 'Malzeme test ve analiz laboratuvarları', icon: '🚗', projects: '40+' }
]

export default function EndustriyelLaboratuvarPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeStep, setActiveStep] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Auto-cycle testimonials
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
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-white/5 bg-grid-pattern opacity-20"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/20">
                  <BeakerIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-white/90 font-medium text-sm">Endüstriyel Çözümler</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Endüstriyel
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Laboratuvar Kurulumu
                  </span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Sektörünüze özel tasarlanmış, son teknoloji ile donatılmış laboratuvarlar. 
                  Planlama aşamasından teslime kadar her adımda profesyonel destek.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '⚡', text: '%40 Verimlilik Artışı' },
                  { icon: '🎯', text: 'Sektöre Özel Tasarım' },
                  { icon: '🛡️', text: 'ISO Standartlarında' },
                  { icon: '📱', text: 'Akıllı Otomasyon' }
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#iletisim"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Ücretsiz Danışmanlık Al
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 group"
                >
                  <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Demo İzle
                </motion.button>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <img 
                  src="/images/lab-1.jpg" 
                  alt="Modern Laboratuvar" 
                  className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
                />
                
                {/* Floating Stats */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">500+</div>
                  <div className="text-xs opacity-90">Tamamlanan Proje</div>
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">%98</div>
                  <div className="text-xs opacity-90">Müşteri Memnuniyeti</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full mb-6">
              <RocketLaunchIcon className="w-5 h-5" />
              <span className="font-semibold">Özelliklerimiz</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Neden Bizim
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Çözümlerimizi </span>
              Tercih Etmelisiniz?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              25+ yıllık deneyimimiz ve 500+ başarılı projeyle, size en iyi laboratuvar çözümlerini sunuyoruz.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full mb-6">
              <Cog6ToothIcon className="w-5 h-5" />
              <span className="font-semibold">Süreç Adımları</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Laboratuvar Kurulum
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Sürecimiz</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profesyonel proje yönetimi ile 5 aşamalı kurulum sürecimiz, zamanında teslim garantisi sunar.
            </p>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Step Content */}
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 mb-1">ADIM {step.step}</div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Süre</div>
                      <div className="text-blue-600 font-medium">{step.duration}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Çıktılar</div>
                      <ul className="space-y-1">
                        {step.deliverables.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-2xl`}>
                    <span className="text-3xl font-bold text-white">{step.step}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[#001328] via-[#000a1a] to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full mb-6">
              <HeartIcon className="w-5 h-5" />
              <span className="font-semibold">Müşteri Görüşleri</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Müşterilerimiz
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Ne Diyor?</span>
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
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
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
                    <div className="text-blue-400 font-semibold">{testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
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

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Hangi Sektörlere
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Hizmet Veriyoruz?</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{sector.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{sector.name}</h3>
                    <div className="text-blue-600 font-semibold text-sm">{sector.projects} proje</div>
                  </div>
                </div>
                <p className="text-gray-600">{sector.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="iletisim" className="py-20 bg-gradient-to-br from-[#001328] via-[#000a1a] to-black">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Laboratuvarınızı Geleceğe
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Taşıyın</span>
              </h2>
              
              <p className="text-xl text-gray-300">
                Ücretsiz danışmanlık alın ve size özel laboratuvar çözümümüzü keşfedin.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="/teklif-al"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                >
                  <RocketLaunchIcon className="w-6 h-6" />
                  Ücretsiz Teklif Al
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="tel:+902123456789"
                  className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 group"
                >
                  <PhoneIcon className="w-6 h-6" />
                  +90 212 345 67 89
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
                <div className="flex items-center gap-3 text-white">
                  <ClockIcon className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="font-semibold">Hızlı Yanıt</div>
                    <div className="text-sm text-gray-300">24 saat içinde</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-white">
                  <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="font-semibold">Garanti</div>
                    <div className="text-sm text-gray-300">2 yıl tam garanti</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-white">
                  <UsersIcon className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-semibold">Uzman Ekip</div>
                    <div className="text-sm text-gray-300">25+ yıl deneyim</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}