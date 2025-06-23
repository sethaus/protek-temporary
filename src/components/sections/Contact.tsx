'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="section-padding bg-gradient-to-br from-black via-[#000510] to-[#001328] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-[#001328]/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#001328]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/30 rounded-full blur-3xl"></div>
      </div>
              <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-white">İletişime Geçin</h2>
          <p className="text-body-lg text-neutral-300 max-w-3xl mx-auto">
            Projeleriniz için uzman ekibimizden destek almak istiyorsanız, bizimle iletişime geçin.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-6 h-6 text-primary-400" />
                <span>+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-6 h-6 text-primary-400" />
                <span>info@protekanalitik.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-primary-400" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Adınız"
                  className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <input
                type="text"
                placeholder="Konu"
                className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500"
              />
              <textarea
                rows={4}
                placeholder="Mesajınız"
                className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500 resize-none"
              ></textarea>
              <button type="submit" className="btn-primary w-full">
                Mesaj Gönder
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 