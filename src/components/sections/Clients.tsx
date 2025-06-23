'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

const clientLogos = [
  { name: 'Behr', logo: '/client-images/behr.jpg' },
  { name: 'Novasina', logo: '/client-images/novasina.jpg' },
  { name: 'Alliance', logo: '/client-images/allience.jpg' },
  { name: 'Atago', logo: '/client-images/atago.jpg' },
  { name: 'Awerness', logo: '/client-images/awernes.jpg' },
  { name: 'Interline', logo: '/client-images/interline.jpg' },
  { name: 'Foodtech', logo: '/client-images/foodtech.jpg' },
  { name: 'Atre2', logo: '/client-images/atre2.jpg' },
  { name: 'Apera', logo: '/client-images/apera.jpg' },
  { name: 'WaterID', logo: '/client-images/waterid.jpg' },
  { name: 'Orion', logo: '/client-images/orion.jpg' },
  { name: 'LabPlus', logo: '/client-images/labplus.jpg' },
  { name: 'Mazyme', logo: '/client-images/mazyme.jpg' },
  { name: 'Xebios', logo: '/client-images/xebios.jpg' },
  { name: 'Chemo', logo: '/client-images/chemo.jpg' },
  { name: 'Harrer', logo: '/client-images/harrer.jpg' },
  { name: '3NH', logo: '/client-images/3nh.jpg' },
  { name: 'Maselli', logo: '/client-images/maselli.jpg' },
  { name: 'Pentair', logo: '/client-images/pentair.jpg' },
  { name: 'Moist', logo: '/client-images/moist.jpg' },
  { name: 'Neogen', logo: '/client-images/neogen.jpg' },
  { name: 'Gold Standard', logo: '/client-images/goldstandard.jpg' },
  { name: 'Miris', logo: '/client-images/miris.png' },
]

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    return springValue.onChange((latest) => {
      setDisplayValue(Math.round(latest))
    })
  }, [springValue])

  return (
    <div ref={ref} className="text-4xl font-bold text-gradient mb-2">
      {displayValue}{suffix}
    </div>
  )
}

export default function Clients() {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  
  // Double the logos for seamless infinite scroll
  const doubledLogos = [...clientLogos, ...clientLogos]

  return (
    <section id="clients-section" className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-6 py-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            <span className="text-label text-neutral-700">Güvenilir Ortaklarımız</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-neutral-900 mb-4"
          >
            Dünya Çapında <span className="text-gradient">Güvenilir Markalar</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-neutral-600 max-w-2xl mx-auto"
          >
            25+ yıllık deneyimimizle, dünya standartlarında analitik çözümler sunuyoruz. 
            Prestijli markaların Türkiye temsilcisi olarak hizmet veriyoruz.
          </motion.p>
        </div>

        {/* Interactive Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div
            className="text-center group cursor-pointer"
            onMouseEnter={() => setHoveredStat('brands')}
            onMouseLeave={() => setHoveredStat(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl p-6 border border-primary-100 group-hover:border-primary-200 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary-500/10">
              <AnimatedCounter value={25} suffix="+" duration={2.5} />
              <div className="text-body text-neutral-600 font-medium group-hover:text-primary-600 transition-colors">
                Uluslararası Marka
              </div>
              {hoveredStat === 'brands' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-primary-100"
                >
                  <div className="text-caption text-primary-600 font-medium">
                    Dünya çapında güvenilir markalar
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="text-center group cursor-pointer"
            onMouseEnter={() => setHoveredStat('customers')}
            onMouseLeave={() => setHoveredStat(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-br from-white to-secondary-50 rounded-2xl p-6 border border-secondary-100 group-hover:border-secondary-200 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-secondary-500/10">
              <AnimatedCounter value={1000} suffix="+" duration={3} />
              <div className="text-body text-neutral-600 font-medium group-hover:text-secondary-600 transition-colors">
                Mutlu Müşteri
              </div>
              {hoveredStat === 'customers' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-secondary-100"
                >
                  <div className="text-caption text-secondary-600 font-medium">
                    Türkiye geneli memnun müşteriler
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="text-center group cursor-pointer"
            onMouseEnter={() => setHoveredStat('experience')}
            onMouseLeave={() => setHoveredStat(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-br from-white to-accent-50 rounded-2xl p-6 border border-accent-100 group-hover:border-accent-200 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-accent-500/10">
              <AnimatedCounter value={15} suffix="+" duration={2} />
              <div className="text-body text-neutral-600 font-medium group-hover:text-accent-600 transition-colors">
                Sektör Deneyimi
              </div>
              {hoveredStat === 'experience' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-accent-100"
                >
                  <div className="text-caption text-accent-600 font-medium">
                    Farklı endüstri alanlarında uzman
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Infinite Scrolling Logos */}
        <div className="relative py-8">
          {/* Top Row - Left to Right */}
          <div className="overflow-hidden mb-12 pb-8">
            <motion.div
              className="flex space-x-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {doubledLogos.map((client, index) => (
                <motion.div
                  key={`top-${index}`}
                  className="flex-shrink-0 group relative"
                  onMouseEnter={() => setHoveredLogo(`top-${client.name}`)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="w-36 h-24 bg-white rounded-2xl border border-neutral-200/50 flex items-center justify-center transition-all duration-300 relative overflow-hidden group-hover:border-primary-200 group-hover:shadow-xl group-hover:shadow-primary-500/10">
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Logo */}
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={96}
                      height={48}
                      className="max-w-28 max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10"
                    />
                    
                    {/* Hover Tooltip */}
                    {hoveredLogo === `top-${client.name}` && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap z-30 shadow-lg font-medium"
                      >
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-600 rotate-45"></div>
                        {client.name}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Row - Right to Left */}
          <div className="overflow-hidden pb-8">
            <motion.div
              className="flex space-x-12"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {doubledLogos.reverse().map((client, index) => (
                <motion.div
                  key={`bottom-${index}`}
                  className="flex-shrink-0 group relative"
                  onMouseEnter={() => setHoveredLogo(`bottom-${client.name}`)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="w-36 h-24 bg-white rounded-2xl border border-neutral-200/50 flex items-center justify-center transition-all duration-300 relative overflow-hidden group-hover:border-accent-200 group-hover:shadow-xl group-hover:shadow-accent-500/10">
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Logo */}
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={96}
                      height={48}
                      className="max-w-28 max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10"
                    />
                    
                    {/* Hover Tooltip */}
                    {hoveredLogo === `bottom-${client.name}` && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-600 to-primary-600 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap z-30 shadow-lg font-medium"
                      >
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent-600 rotate-45"></div>
                        {client.name}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Siz de Bu Güvenilir Ağa Katılın
            </h3>
            <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
              Dünya standartlarında analitik çözümler için bizimle iletişime geçin. 
              Uzman ekibimiz size en uygun çözümü sunar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/iletisim"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                İletişime Geçin
              </motion.a>
              <motion.a
                href="/hakkimizda/referanslar"
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Referanslarımızı İnceleyin
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 