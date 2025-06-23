'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  BeakerIcon,
  HeartIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  CubeIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  SparklesIcon,
  CakeIcon,
  GlobeAmericasIcon,
  SunIcon,
  FireIcon,
  CircleStackIcon,
  GiftIcon
} from '@heroicons/react/24/outline'

const sectors = [
  { 
    name: 'Gıda & İçecek', 
    icon: CakeIcon, 
    description: 'Gıda güvenliği ve kalite analizi çözümleri', 
    color: 'from-emerald-500 to-green-600',
    bgColor: 'from-emerald-50 to-green-50',
    projects: '150+',
    specialty: 'HACCP Uyumlu'
  },
  { 
    name: 'Süt & Süt Ürünleri', 
    icon: CircleStackIcon, 
    description: 'Süt ürünleri analiz ve kalite kontrol çözümleri', 
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    projects: '80+',
    specialty: 'ISO 22000'
  },
  { 
    name: 'Su & Atıksu', 
    icon: GlobeAmericasIcon, 
    description: 'Su kalitesi ve çevre analizleri', 
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50',
    projects: '200+',
    specialty: 'Çevre Dostu'
  },
  { 
    name: 'Tarım & Hayvancılık', 
    icon: SunIcon, 
    description: 'Tarımsal ürün ve hayvan sağlığı analizleri', 
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50',
    projects: '120+',
    specialty: 'Organik Sertifika'
  },
  { 
    name: 'Kimya & Petrokimya', 
    icon: BeakerIcon, 
    description: 'Endüstriyel kimyasal analizler ve test hizmetleri', 
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50',
    projects: '90+',
    specialty: 'Endüstri 4.0'
  },
  { 
    name: 'Ar-Ge & Üniversiteler', 
    icon: AcademicCapIcon, 
    description: 'Araştırma ve eğitim kurumları için özel çözümler', 
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50',
    projects: '60+',
    specialty: 'İnovasyon'
  }
]

export default function Sectors() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-200/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200 shadow-sm">
            <SparklesIcon className="w-4 h-4 text-primary-500" />
            <span className="text-label font-medium text-neutral-700">Uzmanlık Alanlarımız</span>
          </div>
          <h2 className="text-gradient font-bold">
            Hizmet Verdiğimiz
            <span className="block">Sektörler</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            25+ yıllık deneyimimizle farklı sektörlerde özelleşmiş laboratuvar çözümleri sunuyor, 
            her alanda en yüksek kalite standartlarını sağlıyoruz.
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                                <div className="relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100/50 hover:border-neutral-200/50 group-hover:scale-[1.02] overflow-hidden h-full">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sector.bgColor} opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 space-y-6">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                         <div className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-neutral-200/50 shadow-sm">
                           <span className="text-xs font-semibold text-neutral-700">{sector.projects} Proje</span>
                         </div>
                         <div className="inline-flex items-center px-3 py-1.5 bg-neutral-100/90 backdrop-blur-sm rounded-full border border-neutral-200/40">
                           <span className="text-xs font-medium text-neutral-600">{sector.specialty}</span>
                         </div>
                       </div>
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors leading-tight">
                        {sector.name}
                      </h3>
                      <p className="text-body text-neutral-600 leading-relaxed">
                        {sector.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 lg:p-12 shadow-xl border border-neutral-100">
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                Sektörünüze Özel Çözüm Arıyorsunuz?
              </h3>
              <p className="text-body-lg text-neutral-600 leading-relaxed">
                Uzman ekibimiz, ihtiyaçlarınıza göre özelleştirilmiş laboratuvar çözümleri geliştirmek için sizlerle birlikte çalışmaya hazır.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/iletisim" 
                  className="btn-primary group"
                >
                  Ücretsiz Danışmanlık Alın
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/cozumler" 
                  className="btn-outline"
                >
                  Tüm Çözümlerimizi İnceleyin
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 