'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PlayIcon } from '@heroicons/react/24/solid'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="protek-hakkinda" ref={ref} className="section-padding bg-white overflow-x-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-gradient">Protek Analitik Hakkında</h2>
            <p className="text-body-lg text-neutral-600">
              20 yılı aşkın deneyimimizle laboratuvar teknolojileri alanında Türkiye&apos;nin önde gelen firmalarından biriyiz. 
              Müşterilerimize en kaliteli hizmeti sunmak için sürekli gelişen teknolojileri takip ediyor ve uzman ekibimizle 
              çözümler üretiyoruz.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-body text-neutral-700">ISO 9001:2015 Kalite Yönetim Sistemi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span className="text-body text-neutral-700">500+ Başarıyla Tamamlanan Proje</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span className="text-body text-neutral-700">1000+ Memnun Müşteri</span>
              </div>
            </div>
            <a href="/hakkimizda" className="btn-primary">
              Daha Fazla Bilgi
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[600px] mx-auto lg:mx-0"
          >
            {/* Video Player Container */}
            <div id="tanitim-videosu" className="relative bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl w-full">
              {/* Video Header */}
              <div className="bg-neutral-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white text-sm font-medium truncate">
                  Protek Analitik Tanıtım Videosu
                </div>
              </div>

              {/* Video Content */}
              <div className="relative w-full pb-[75%]">
                <iframe 
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7328309007935291392?compact=1" 
                  className="absolute top-0 left-0 w-full h-full border-0" 
                  allowFullScreen
                  title="Protek Analitik Tanıtım Videosu"
                />
              </div>

              {/* Video Footer */}
              <div className="bg-neutral-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>LinkedIn Video</span>
                </div>
                <div className="text-white text-sm">
                  HD • 4:3
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Yeni Video
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 