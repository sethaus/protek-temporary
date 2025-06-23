'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  BeakerIcon, 
  CogIcon, 
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const features = [
  {
    icon: BeakerIcon,
    title: 'Analiz Teknolojileri',
    description: 'En gelişmiş laboratuvar analiz cihazları',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    delay: 0
  },
  {
    icon: CogIcon,
    title: 'Otomasyon Sistemleri',
    description: 'Akıllı laboratuvar otomasyon çözümleri',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    delay: 0.1
  },
  {
    icon: ShieldCheckIcon,
    title: 'Kalite Güvencesi',
    description: 'Uluslararası standartlarda hizmet',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    delay: 0.2
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Teknik Destek',
    description: '7/24 uzman destek hizmeti',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    delay: 0.3
  }
]

const rotatingWords = [
  'Yenilikçi',
  'Sertifikalı',
  'Dünya Standartlarında',
  'Ar-Ge Odaklı',
  'Anahtar Teslim',
  '360°',
  'Yüksek Teknolojili',
  'Güvenilir',
  'Entegre',
]

const promoImages = [
  '/images/promo-images/banner-lab.jpg',
  '/images/promo-images/banner-lab2.jpg',
  '/images/promo-images/banner-lab3.jpg'
]

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -25])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length)
    }, 2200)

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % promoImages.length)
    }, 3000)

    return () => {
      clearInterval(wordInterval)
      clearInterval(imageInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-neutral-50 via-blue-50/30 to-red-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full blur-xl opacity-60"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-r from-secondary-200 to-accent-200 rounded-full blur-xl opacity-40"
        />
      </div>

      <div className="container-custom relative z-10 pt-16 md:pt-16 lg:pt-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 pt-8 md:pt-0"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 rounded-full text-caption font-medium border border-primary-200/50 shadow-lg backdrop-blur-sm cursor-pointer group"
              >
                <BeakerIcon className="w-4 h-4 group-hover:text-primary-600 transition-colors" />
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent font-bold">
                  Türkiye&rsquo;nin Laboratuvar Teknolojileri Lideri
                </span>
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
              
              <h1 className="font-display font-bold text-neutral-900 leading-tight text-3xl lg:text-4xl xl:text-5xl">
                <span className="inline-block min-w-[140px] align-top">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[currentWord]}
                      initial={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                      className="bg-gradient-to-r from-[#2A50F8] via-primary-500 to-secondary-500 bg-clip-text text-transparent font-bold"
                      style={{ display: 'inline-block' }}
                    >
                      {rotatingWords[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <br />
                Laboratuvar
                <br />
                Çözümleri
              </h1>
              
              <p className="text-body text-neutral-600 max-w-lg">
                Laboratuvar teknolojilerinde 20+ yıllık deneyimimizle, güvenilir analiz cihazları, 
                otomasyon sistemleri ve anahtar teslim laboratuvar kurulum hizmetleri sunuyoruz.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/cozumler"
                className="btn-primary px-5 py-2.5"
              >
                Çözümlerimizi Keşfedin
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <button 
                className="btn-outline px-5 py-2.5 group"
                onClick={() => {
                  const videoSection = document.getElementById('tanitim-videosu');
                  if (videoSection) {
                    videoSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    });
                  }
                }}
              >
                <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Tanıtım Videosu
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-row flex-wrap justify-start gap-6 pt-4 border-t border-neutral-200"
            >
              <div>
                <div className="text-xl lg:text-2xl font-bold text-[#2A50F8]">500+</div>
                <div className="text-caption text-neutral-600">Tamamlanan Proje</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-secondary-600">20+</div>
                <div className="text-caption text-neutral-600">Yıllık Deneyim</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-accent-600">1000+</div>
                <div className="text-caption text-neutral-600">Mutlu Müşteri</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Modern Hexagon-Inspired Cards */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{ opacity }}
          >
            {/* Main Container with Glass Effect */}
            <motion.div 
              className="relative p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl"
              style={{ y: y1 }}
            >
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-200/60 to-secondary-200/60 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 space-y-4">
                {/* Modern Hexagon-Inspired Feature Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon
                    const isHovered = hoveredFeature === index
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ 
                          delay: 0.8 + feature.delay, 
                          duration: 0.6,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        style={{ y: y2 }}
                        className="group relative cursor-pointer"
                        onMouseEnter={() => setHoveredFeature(index)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        {/* Hexagon-inspired background shape */}
                        <div className="absolute inset-0 -rotate-45 rounded-2xl bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                             style={{ 
                               background: `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace('to-', ', ')})`,
                               clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                             }}>
                        </div>
                        
                        {/* Card Content */}
                        <motion.div 
                          className={`relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg transition-all duration-300 ${
                            isHovered ? 'shadow-xl border-white/80' : ''
                          }`}
                          animate={{
                            backgroundColor: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)'
                          }}
                        >
                          <div className="flex items-center gap-4">
                            {/* Icon with Hexagon Background */}
                            <div className="relative flex-shrink-0">
                              <motion.div 
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                                animate={{
                                  rotate: isHovered ? 5 : 0
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <IconComponent className="w-full h-full text-white" />
                              </motion.div>
                              
                              {/* Status Indicator */}
                              <motion.div 
                                className="absolute -top-1 -right-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: isHovered ? 1 : 0 }}
                              >
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              </motion.div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm text-neutral-900 leading-tight mb-1">
                                {feature.title}
                              </h3>
                              <motion.p 
                                className="text-xs text-neutral-600 leading-relaxed"
                                animate={{
                                  opacity: isHovered ? 1 : 0.8
                                }}
                              >
                                {feature.description}
                              </motion.p>
                              
                              {/* Progress Bar */}
                              <motion.div 
                                className="h-1 bg-neutral-100 rounded-full overflow-hidden mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                              >
                                <motion.div 
                                  className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: isHovered ? '85%' : 0 }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Floating particles effect */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                                  initial={{ 
                                    x: '50%', 
                                    y: '50%',
                                    scale: 0
                                  }}
                                  animate={{ 
                                    x: `${50 + (i - 1) * 30}%`, 
                                    y: `${30 + i * 20}%`,
                                    scale: 1
                                  }}
                                  transition={{ 
                                    duration: 0.6,
                                    delay: i * 0.1
                                  }}
                                />
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Bottom Lab Image with Modern Treatment */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="relative mt-6 overflow-hidden rounded-2xl group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  style={{ y: y2 }}
                >
                  <div className="relative h-40 bg-gradient-to-r from-neutral-100 to-neutral-50 rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={promoImages[currentImage]}
                          alt="Modern Laboratuvar"
                          className="w-full h-full object-cover"
                          width={800}
                          height={400}
                          priority={true}
                          onLoadingComplete={() => setIsImageLoaded(true)}
                          style={{ opacity: isImageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Modern Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 mix-blend-multiply"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="space-y-1">
                        <h4 className="text-white text-sm font-semibold drop-shadow-md">Modern Laboratuvar</h4>
                        <p className="text-white/95 text-xs drop-shadow-md">İleri Teknoloji Ekipmanları</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating ISO Badge - Modern Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.6, duration: 0.8, type: "spring" }}
              className="absolute -top-3 -right-3 group cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="relative">
                {/* Hexagon shape background */}
                <div 
                  className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  }}
                ></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-xs font-bold leading-tight">ISO</span>
                  <span className="text-xs font-medium leading-tight">9001</span>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
} 