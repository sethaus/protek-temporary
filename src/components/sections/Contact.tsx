'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact', // Use the new centralized API endpoint type
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      })

      const result: { success: boolean; message?: string } = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage('Mesajınız başarıyla gönderildi!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitMessage('Mesaj gönderilirken bir hata oluştu.')
      }
    } catch (error) {
      console.error('Form gönderim hatası:', error)
      setSubmitMessage('Mesaj gönderilirken bir hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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
                <div className="flex flex-col space-y-1">
                  <span>+90 (216) 329 39 60 Pbx</span>
                  <span>+90 (216) 329 37 70 Pbx</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-6 h-6 text-primary-400" />
                <span>info@protekanalitik.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-primary-400" />
                <span>Atakent Mah. Dicle Cad. No:29<br />34760 Ümraniye / İstanbul / TÜRKİYE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Adınız"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Konu"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500"
              />
              <textarea
                rows={4}
                name="message"
                placeholder="Mesajınız"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="input bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500 resize-none"
              ></textarea>
              
              {/* Submit Message */}
              {submitMessage && (
                <div className={`text-center p-3 rounded-lg ${
                  submitMessage.includes('başarıyla') 
                    ? 'bg-green-900/20 text-green-400 border border-green-800' 
                    : 'bg-red-900/20 text-red-400 border border-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 