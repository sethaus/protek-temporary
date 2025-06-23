'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  AcademicCapIcon,
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
  LightBulbIcon,
  BeakerIcon,
  CubeIcon,
  Squares2X2Icon,
  CogIcon,
  GlobeAltIcon,
  BookOpenIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: CubeIcon,
    title: 'Modüler ve Esnek Tasarım',
    description: 'Gelecek ihtiyaçlarınıza uygun genişletilebilir laboratuvar mimarisi',
    benefits: ['Kolay yeniden düzenleme', 'Modüler ekipman', 'Esnek alan planlaması']
  },
  {
    icon: BeakerIcon,
    title: 'İleri Araştırma Ekipmanları',
    description: 'Son teknoloji analiz cihazları ve araştırma altyapısı',
    benefits: ['High-end spektrometreler', 'Mikroskopi sistemleri', 'Özel analiz cihazları']
  },
  {
    icon: UserGroupIcon,
    title: 'Akademik İş Birlikleri',
    description: 'Üniversiteler ve araştırma kurumlarıyla stratejik ortaklıklar',
    benefits: ['Ortak araştırmalar', 'Akademisyen desteği', 'Bilimsel danışmanlık']
  },
  {
    icon: BookOpenIcon,
    title: 'Eğitim Programları',
    description: 'Öğrenci ve araştırmacılar için kapsamlı eğitim programları',
    benefits: ['Teknik eğitimler', 'Sertifikasyon', 'Online kurslar']
  }
]

const researchAreas = [
  {
    name: 'Biyomedikal Araştırmalar',
    description: 'İlaç geliştirme, biyomoleküler analiz ve tanı sistemleri',
    icon: '🧬',
    equipment: ['LC-MS/MS sistemleri', 'Cell culture lab', 'PCR sistemleri', 'Protein analiz cihazları']
  },
  {
    name: 'Malzeme Bilimi',
    description: 'Nanoteknoloji, polimer araştırmaları ve yeni malzemeler',
    icon: '🔬',
    equipment: ['SEM/TEM mikroskopları', 'XRD sistemleri', 'Termal analiz', 'Mekanik test cihazları']
  },
  {
    name: 'Çevre ve Enerji',
    description: 'Sürdürülebilir teknolojiler ve çevre analizi',
    icon: '🌱',
    equipment: ['GC-MS sistemleri', 'Emisyon ölçümleri', 'Su kalitesi analizi', 'Enerji verimliliği testleri']
  },
  {
    name: 'Gıda Teknolojisi',
    description: 'Gıda güvenliği, beslenme ve yeni ürün geliştirme',
    icon: '🥬',
    equipment: ['HPLC sistemleri', 'Mikrobiyoloji lab', 'Duyusal analiz', 'Şelf life testleri']
  }
]

const partnerships = [
  {
    name: 'Üniversite Ortaklıkları',
    description: 'Boğaziçi, İTÜ, ODTÜ ve diğer önde gelen üniversiteler',
    count: '25+',
    icon: AcademicCapIcon
  },
  {
    name: 'Araştırma Enstitüleri',
    description: 'TÜBİTAK, TÜBA ve uluslararası araştırma merkezleri',
    count: '15+',
    icon: BeakerIcon
  },
  {
    name: 'Teknoloji Transferi',
    description: 'Araştırma sonuçlarının ticarileştirilmesi',
    count: '50+',
    icon: LightBulbIcon
  }
]

const testimonials = [
  {
    name: 'Prof. Dr. Mehmet Özdemir',
    position: 'Araştırma Direktörü',
    company: 'Koç Üniversitesi',
    content: 'AR-GE laboratuvarımız sayesinde araştırma kapasitemiz %300 arttı. Uluslararası projelerde daha aktif rol alabiliyoruz.',
    rating: 5
  },
  {
    name: 'Dr. Aylin Karaca',
    position: 'Proje Koordinatörü',
    company: 'TÜBİTAK MAM',
    content: 'Modüler tasarım sayesinde farklı projelere göre laboratuvarı kolayca yeniden düzenleyebiliyoruz.',
    rating: 5
  }
]

export default function ArGeLaboratuvarlariPage() {
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
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/20">
                  <AcademicCapIcon className="w-4 h-4 text-indigo-400" />
                  <span className="text-white/90 font-medium text-sm">Araştırma & Geliştirme</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  AR-GE
                  <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Laboratuvarları
                  </span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Üniversiteler ve araştırma kurumları için özel geliştirilen, esneklik ve 
                  genişletilebilirlik odaklı laboratuvar çözümleri.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🔬', text: 'İleri Araştırma' },
                  { icon: '🎓', text: 'Akademik Ortaklık' },
                  { icon: '🏗️', text: 'Modüler Tasarım' },
                  { icon: '💡', text: 'İnovasyon Odaklı' }
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
                  className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Araştırma Teklifi Al
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 group"
                >
                  <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  AR-GE Örnekleri
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
                  src="/images/lab-4.jpg" 
                  alt="AR-GE Laboratuvarı" 
                  className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
                />
                
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">60+</div>
                  <div className="text-xs opacity-90">AR-GE Projesi</div>
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-2xl">
                  <div className="text-xl font-bold">25+</div>
                  <div className="text-xs opacity-90">Üniversite Ortaklığı</div>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AR-GE Laboratuvarı
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Özellikleri</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                
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

      {/* Research Areas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Araştırma
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Alanları</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
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
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Temel Ekipmanlar</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {area.equipment.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
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

      {/* Partnerships */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Akademik
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Ortaklıklarımız</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerships.map((partnership, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <partnership.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">{partnership.count}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{partnership.name}</h3>
                <p className="text-gray-600">{partnership.description}</p>
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
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
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
                    <div className="text-indigo-400 font-semibold">{testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Araştırmanızı
                <span className="block">Bir Üst Seviyeye Taşıyın</span>
              </h2>
              
              <p className="text-xl text-white/90">
                AR-GE laboratuvarınız için özel çözümlerimizi keşfedin.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="/teklif-al"
                  className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                >
                  <AcademicCapIcon className="w-6 h-6" />
                  Araştırma Teklifi Al
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