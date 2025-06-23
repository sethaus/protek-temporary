'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  BeakerIcon,
  CogIcon,
  ShieldCheckIcon,
  ClockIcon,
  UsersIcon,
  GlobeAltIcon,
  TrophyIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: BeakerIcon,
    title: 'Gelişmiş Analiz Teknolojileri',
    description: 'En son teknoloji analiz cihazları ile yüksek hassasiyetli ölçümler',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: CogIcon,
    title: 'Otomasyon Sistemleri',
    description: 'Akıllı laboratuvar otomasyon çözümleri ile verimliliği artırın',
    color: 'from-secondary-500 to-secondary-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Kalite Güvencesi',
    description: 'ISO standartlarında hizmet ve sertifikalı çözümler',
    color: 'from-accent-500 to-accent-600'
  },
  {
    icon: ClockIcon,
    title: '24/7 Teknik Destek',
    description: 'Kesintisiz hizmet için sürekli teknik destek ve bakım',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: UsersIcon,
    title: 'Uzman Ekip',
    description: 'Alanında uzman mühendis ve teknisyen kadrosu',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Çözümler',
    description: 'Uluslararası standartlarda yerel hizmet anlayışı',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: TrophyIcon,
    title: '20+ Yıl Deneyim',
    description: 'Sektördeki köklü deneyimimiz güvencesinde',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: LightBulbIcon,
    title: 'İnovatif Yaklaşım',
    description: 'Sürekli gelişim ve yenilikçi çözümler',
    color: 'from-indigo-500 to-blue-500'
  }
]

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-10"
        >
          <h2 className="text-gradient">Neden Protek Analitik?</h2>
          <p className="text-body text-neutral-600 max-w-2xl mx-auto">
            Laboratuvar teknolojilerinde öncü konumumuz, kaliteli hizmet anlayışımız ve 
            müşteri odaklı yaklaşımımızla sektörde fark yaratan çözümler sunuyoruz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-hover p-4 text-center space-y-3 h-full">
                  <div className="mx-auto w-12 h-12 relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300`}></div>
                    <div className={`relative bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center w-full h-full group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors text-sm leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-caption text-neutral-600 leading-snug">
                      {feature.description}
                    </p>
                  </div>
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
          className="text-center mt-10"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 lg:p-8">
            <div className="space-y-4">
              <h3 className="font-bold text-neutral-900 text-lg lg:text-xl">
                Laboratuvarınız İçin En İyi Çözümü Birlikte Bulalım
              </h3>
              <p className="text-body-sm text-neutral-600 max-w-xl mx-auto">
                Uzman ekibimiz, ihtiyaçlarınıza özel laboratuvar çözümleri geliştirmek için sizlerle birlikte çalışmaya hazır.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/teklif-al" className="btn-primary">
                  Ücretsiz Teklif Alın
                </a>
                <a href="/iletisim" className="btn-outline">
                  Uzmanlarımızla Görüşün
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 