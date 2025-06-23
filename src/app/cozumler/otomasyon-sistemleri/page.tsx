'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  CogIcon,
  CheckCircleIcon,
  ClockIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UsersIcon,
  ChartBarIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentCheckIcon,
  PhoneIcon,
  StarIcon,
  TrophyIcon,
  HeartIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  Squares2X2Icon,
  ComputerDesktopIcon,
  CircleStackIcon,
  BoltIcon,
  EyeIcon,
  BeakerIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CpuChipIcon,
  SignalIcon,
  ChartPieIcon,
  DocumentArrowDownIcon,
  ExclamationTriangleIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: Squares2X2Icon,
    title: 'LIMS Yazılım Entegrasyonu',
    description: 'Laboratuvar bilgi yönetim sistemleri ile tam entegrasyon',
    benefits: ['Numune takibi', 'Sonuç yönetimi', 'Raporlama otomasyonu', 'Kalibrasyon takibi'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: CpuChipIcon,
    title: 'Robotik Numune İşleme',
    description: 'Otomatik numune hazırlama ve analiz sistemleri',
    benefits: ['Pipetleme otomasyonu', 'Dilüsyon hazırlama', 'Seyreltme işlemleri', 'Karışım preparasyonu'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: SignalIcon,
    title: 'IoT Sensör Ağları',
    description: 'Akıllı sensörlerle sürekli izleme ve kontrol',
    benefits: ['Sıcaklık izleme', 'Nem kontrolü', 'Basınç ölçümü', 'Gaz konsantrasyonu'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ChartPieIcon,
    title: 'Gerçek Zamanlı Monitoring',
    description: 'Canlı veri izleme ve dashboard sistemleri',
    benefits: ['Live dashboard', 'Alarm sistemleri', 'Trend analizi', 'Performans KPI\'ları'],
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Uzaktan Kontrol',
    description: 'Mobil ve web tabanlı uzaktan erişim imkanı',
    benefits: ['Mobil uygulama', 'Web arayüzü', 'Uzaktan müdahale', 'Push bildirimler'],
    color: 'from-teal-500 to-blue-500'
  },
  {
    icon: CloudIcon,
    title: 'Bulut Tabanlı Çözümler',
    description: 'Güvenli bulut altyapısı ile veri yönetimi',
    benefits: ['Otomatik yedekleme', 'Sınırsız depolama', 'Multi-lab erişim', 'Güvenlik sertifikaları'],
    color: 'from-indigo-500 to-purple-500'
  }
]

const automationTypes = [
  {
    icon: BeakerIcon,
    title: 'Analiz Otomasyonu',
    description: 'Spektrofotometre, HPLC, GC-MS gibi cihazların otomatik kontrolü',
    benefits: [
      'Otomatik numune enjeksiyonu',
      'Sequence programlama',
      'Sonuç aktarımı',
      'Kalibrasyon kontrolü'
    ],
    stats: { accuracy: '%99.9', speed: '5x', error: '%95' }
  },
  {
    icon: CircleStackIcon,
    title: 'Veri Yönetimi Otomasyonu',
    description: 'LIMS entegrasyonu ile veri akışının otomatikleştirilmesi',
    benefits: [
      'Otomatik veri transferi',
      'Rapor oluşturma',
      'Arşivleme sistemleri',
      'Doküman kontrolü'
    ],
    stats: { time: '%80', paperless: '%100', compliance: 'ISO 17025' }
  },
  {
    icon: CogIcon,
    title: 'Süreç Otomasyonu',
    description: 'Laboratuvar workflow süreçlerinin dijitalleştirilmesi',
    benefits: [
      'İş akışı optimizasyonu',
      'Onay süreçleri',
      'Görev yönetimi',
      'Zaman takibi'
    ],
    stats: { efficiency: '%60', bottleneck: '%70', satisfaction: '%95' }
  },
  {
    icon: ShieldCheckIcon,
    title: 'Kalite Güvence Otomasyonu',
    description: 'QA/QC süreçlerinin otomatik kontrolü ve validasyonu',
    benefits: [
      'Kontrol kartları',
      'Out-of-trend alarmları',
      'Yetkinlik testleri',
      'Audit trail'
    ],
    stats: { compliance: '%100', audit: '24/7', traceability: 'Tam' }
  }
]

const benefits = [
  {
    title: 'Verimlilik Artışı',
    description: 'Otomatik süreçlerle %90 daha hızlı sonuçlar',
    icon: RocketLaunchIcon,
    value: '%90',
    details: ['Manuel işlem süresi azalması', 'Paralel analiz kapasitesi', 'Bekleme süresi eliminasyonu']
  },
  {
    title: 'Hata Oranı Azalması',
    description: 'İnsan hatasını minimize ederek güvenilirlik',
    icon: ShieldCheckIcon,
    value: '%95',
    details: ['Standardize işlemler', 'Doğrulama kontrolleri', 'Otomatik validasyon']
  },
  {
    title: 'Maliyet Tasarrufu',
    description: 'İşgücü ve kaynak kullanımında optimizasyon',
    icon: ChartBarIcon,
    value: '%40',
    details: ['Personel maliyeti düşüşü', 'Reaktif tasarrufu', 'Enerji verimliliği']
  },
  {
    title: 'İzlenebilirlik',
    description: 'Tam izlenebilirlik ve complience',
    icon: DocumentCheckIcon,
    value: '%100',
    details: ['Audit trail', 'Elektronik imza', 'Tam dokümentasyon']
  }
]

const technologies = [
  {
    name: 'LIMS Platformları',
    technologies: ['LabWare', 'Thermo Fisher SampleManager', 'Waters NuGenesis', 'Abbott STARLIMS'],
    icon: ServerIcon,
    color: 'bg-blue-500'
  },
  {
    name: 'Otomasyon Donanımları',
    technologies: ['Hamilton Liquid Handlers', 'Tecan Pipetting Systems', 'Beckman Coulter', 'Agilent OpenLAB'],
    icon: CpuChipIcon,
    color: 'bg-purple-500'
  },
  {
    name: 'IoT ve Sensörler',
    technologies: ['Vaisala Sensörler', 'Honeywell Monitoring', 'Siemens SCADA', 'Custom IoT Solutions'],
    icon: SignalIcon,
    color: 'bg-green-500'
  },
  {
    name: 'Yazılım Entegrasyonları',
    technologies: ['REST API', 'Database Connectors', 'Custom Middleware', 'Cloud Integration'],
    icon: CloudIcon,
    color: 'bg-orange-500'
  }
]

const processSteps = [
  {
    step: '01',
    title: 'Sistem Analizi',
    description: 'Mevcut laboratuvar süreçlerinin detaylı analizi',
    duration: '1-2 hafta',
    deliverables: ['Süreç haritası', 'Otomasyon fırsatları', 'ROI analizi'],
    icon: DocumentCheckIcon,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    step: '02',
    title: 'Çözüm Tasarımı',
    description: 'Özelleştirilmiş otomasyon sisteminin tasarlanması',
    duration: '2-3 hafta',
    deliverables: ['Sistem mimarisi', 'Teknik şartname', 'Entegrasyon planı'],
    icon: CubeIcon,
    color: 'from-purple-500 to-pink-500'
  },
  {
    step: '03',
    title: 'Geliştirme ve Test',
    description: 'Yazılım geliştirme ve donanım entegrasyonu',
    duration: '4-8 hafta',
    deliverables: ['Yazılım modülleri', 'Donanım kurulumu', 'Beta testler'],
    icon: WrenchScrewdriverIcon,
    color: 'from-green-500 to-emerald-500'
  },
  {
    step: '04',
    title: 'Pilot Uygulama',
    description: 'Kontrollü ortamda pilot uygulamanın test edilmesi',
    duration: '2-4 hafta',
    deliverables: ['Pilot sonuçları', 'Performans raporları', 'İyileştirme önerileri'],
    icon: BeakerIcon,
    color: 'from-orange-500 to-red-500'
  },
  {
    step: '05',
    title: 'Devreye Alma',
    description: 'Sistemin tam olarak devreye alınması ve eğitimler',
    duration: '1-2 hafta',
    deliverables: ['Sistem devreye alma', 'Kullanıcı eğitimleri', 'Dokümentasyon'],
    icon: RocketLaunchIcon,
    color: 'from-teal-500 to-blue-500'
  }
]

const testimonials = [
  {
    name: 'Dr. Elif Kaya',
    position: 'Laboratuvar Müdürü',
    company: 'Nestlé Türkiye',
    content: 'LIMS entegrasyonu sayesinde numune işleme süremiz %70 azaldı. Artık günde 3 kat daha fazla numune analiz edebiliyoruz.',
    rating: 5,
    focus: 'Verimlilik'
  },
  {
    name: 'Prof. Dr. Ahmet Demir',
    position: 'Araştırma Direktörü',
    company: 'TÜBİTAK MAM',
    content: 'Robotik numune hazırlama sistemi ile standardizasyonumuz %100 arttı. Tekrarlanabilirlik konusunda hiç sorun yaşamıyoruz.',
    rating: 5,
    focus: 'Kalite'
  },
  {
    name: 'Müh. Zeynep Özkan',
    position: 'Kalite Direktörü',
    company: 'Roche Diagnostics',
    content: 'IoT sensör ağımız ile laboratuvar koşullarını 7/24 izleyebiliyoruz. Kritik parametreler için anında alarm alıyoruz.',
    rating: 5,
    focus: 'İzleme'
  }
]

export default function OtomasyonSistemleriPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [selectedAutomationType, setSelectedAutomationType] = useState(0)

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
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-white/20">
                  <CogIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-white/90 font-medium text-sm">Akıllı Otomasyon</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Laboratuvar
                  <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Otomasyon Sistemleri
                  </span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  LIMS entegrasyonu, robotik sistemler ve IoT sensörleri ile laboratuvarınızı 
                  geleceğin akıllı tesisine dönüştürün.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🤖', text: '%90 Hata Azalması' },
                  { icon: '⚡', text: '5x Hızlı İşlem' },
                  { icon: '📊', text: '7/24 İzleme' },
                  { icon: '🔒', text: 'Tam İzlenebilirlik' }
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
                  href="#demo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Demo Talep Et
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 group"
                >
                  <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Video İzle
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
                  src="/images/lab-2.jpg" 
                  alt="Otomasyon Sistemi" 
                  className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
                />
                
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">%99.9</div>
                  <div className="text-xs opacity-90">Doğruluk Oranı</div>
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">24/7</div>
                  <div className="text-xs opacity-90">Kesintisiz Çalışma</div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full mb-6">
              <CogIcon className="w-5 h-5" />
              <span className="font-semibold">Otomasyon Özellikleri</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Akıllı Laboratuvar
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Teknolojileri</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Son teknoloji otomasyon çözümleri ile laboratuvarınızı dijital dönüşüme hazırlayın.
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
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
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

      {/* Automation Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Otomasyon
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Alanları</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {automationTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{type.description}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Özellikler</h4>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Performans</h4>
                    <div className="space-y-2">
                      {Object.entries(type.stats).map(([key, value], idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-semibold text-blue-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Otomasyon
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Faydaları</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{benefit.value}</div>
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{benefit.description}</p>
                
                <ul className="space-y-2">
                  {benefit.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Desteklenen
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Teknolojiler</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${tech.color} rounded-xl flex items-center justify-center`}>
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{tech.name}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {tech.technologies.map((technology, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 font-medium">{technology}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Uygulama
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Süreci</span>
            </h2>
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
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Deneyimleri</span>
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
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white">
                      {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-6">
                    {testimonials[activeTestimonial].focus}
                  </div>
                  
                  <p className="text-xl text-white/90 mb-8 italic leading-relaxed">
                    &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                  </p>
                  
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{testimonials[activeTestimonial].name}</div>
                    <div className="text-white/70">{testimonials[activeTestimonial].position}</div>
                    <div className="text-purple-400 font-semibold">{testimonials[activeTestimonial].company}</div>
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
      <section id="demo" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Laboratuvarınızı
                <span className="block">Akıllı Hale Getirin</span>
              </h2>
              
              <p className="text-xl text-white/90">
                Ücretsiz demo talep edin ve otomasyon sistemlerimizin gücünü deneyimleyin.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="/teklif-al"
                  className="bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                >
                  <CogIcon className="w-6 h-6" />
                  Demo Talep Et
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
                <div className="flex items-center gap-3 text-white">
                  <ClockIcon className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Hızlı Kurulum</div>
                    <div className="text-sm text-white/70">4-8 hafta</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-white">
                  <ShieldCheckIcon className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Garanti</div>
                    <div className="text-sm text-white/70">2 yıl tam garanti</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-white">
                  <UsersIcon className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Eğitim</div>
                    <div className="text-sm text-white/70">Kapsamlı personel eğitimi</div>
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