'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const footerSections = {
  company: {
    title: 'Kurumsal',
    links: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'Sektörler', href: '/sektorler' },
      { name: 'Çözümler', href: '/cozumler' },
      { name: 'Kaynaklar', href: '/kaynaklar' }
    ]
  },
  products: {
    title: 'Ürünler',
    links: [
      { name: 'Laboratuvar Ekipmanları', href: '/urunler/laboratuvar-ekipmanlari' },
      { name: 'Kimyasal Analiz', href: '/urunler/laboratuvar-ekipmanlari/kimyasal-analiz' },
      { name: 'Fiziksel Analiz', href: '/urunler/laboratuvar-ekipmanlari/fiziksel-analiz' },
      { name: 'Mikrobiyoloji', href: '/urunler/laboratuvar-ekipmanlari/mikrobiyoloji' }
    ]
  },
  support: {
    title: 'Destek',
    links: [
      { name: 'Teklif Al', href: '/teklif-al' },
      { name: 'İletişim', href: '/iletisim' },
      { name: 'Teknik Destek', href: '/iletisim#teknik-servis' },
      { name: 'Canlı Destek', href: '/iletisim#canli-destek' }
    ]
  }
}

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/protek-analytical-industrial-systems/posts/?feedView=all',
    description: 'Bize yazın',
    color: 'bg-blue-600 hover:bg-blue-700',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/protek.analitik/',
    description: 'Bizi takip edin',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCEBjbLKziuAJliIjjCaOERg',
    description: 'Bizi izleyin',
    color: 'bg-red-600 hover:bg-red-700',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  }
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setEmail('')
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-slate-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">
              Laboratuvar Teknolojilerinde Güncel Kalın
            </h2>
            <p className="text-slate-400 mb-6">
              Yeni ürünler, teknik güncellemeler ve özel kampanyalardan ilk siz haberdar olun.
            </p>
            
            {/* Compact Newsletter Form */}
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="flex-1 px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-green-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap text-sm"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircleIcon className="w-4 h-4" />
                      Kaydedildi
                    </>
                  ) : (
                    <>
                      Abone Ol
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-6 gap-8 mb-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <Image 
                  src="/images/logo-protek-white.png" 
                  alt="Protek Analitik Logo" 
                  className="h-10 w-auto mb-3"
                  width={120}
                  height={40}
                />
                <p className="text-slate-400 text-sm leading-relaxed">
                  Laboratuvar teknolojilerinde 25+ yıllık deneyimimizle, güvenilir analiz 
                  cihazları, otomasyon sistemleri ve anahtar teslim çözümler sunuyoruz.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">İletişim</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <div>
                        <p className="text-slate-300">Merkez Ofis:</p>
                        <p className="text-slate-400 text-xs">Atakent Mah. Dicle Cad. No:29</p>
                        <p className="text-slate-400 text-xs">34760 Ümraniye / İstanbul / TÜRKİYE</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <div className="text-slate-300 text-xs">
                        <p>T: +90 (216) 329 39 60 Pbx</p>
                        <p>T: +90 (216) 329 37 70 Pbx</p>
                        <p>F: +90 (216) 329 41 47</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-slate-300 text-sm">Ortadoğu Ofis:</p>
                      <p className="text-slate-400 text-xs">Ras Al Khaimah, United Arab Emirates</p>
                      <p className="text-slate-300 text-xs">T: +971 7 203 1257 | +971 50 653 62 75</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className="space-y-3">
                <h4 className="font-medium text-white">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group text-sm"
                      >
                        <span>{link.name}</span>
                        <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Media Section */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Sosyal Medya</h4>
              
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-3 rounded-lg ${social.color} text-white hover:scale-105 transition-all duration-300 group`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {social.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{social.name}</p>
                        <p className="text-xs opacity-90 truncate">{social.description}</p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2.5">
                <Link
                  href="/teklif-al"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 px-3 rounded-lg font-medium transition-colors text-sm"
                >
                  Hızlı Teklif Al
                </Link>
                
                <Link
                  href="/iletisim#canli-destek"
                  className="block w-full border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-center py-2.5 px-3 rounded-lg font-medium transition-colors text-sm"
                >
                  Canlı Destek
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="text-slate-400 text-xs">
                © 2025 Protek Analitik. Tüm hakları saklıdır.
              </div>
              {/* CMS Panel Erişimi */}
              <Link
                href="/admin"
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors opacity-50 hover:opacity-100"
                title="CMS Panel Erişimi"
              >
                🔧 Admin
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <Link href="/gizlilik-politikasi" className="text-slate-400 hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kvkk" className="text-slate-400 hover:text-white transition-colors">
                KVKK
              </Link>
              <Link href="/kullanim-kosullari" className="text-slate-400 hover:text-white transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="/cerez-politikasi" className="text-slate-400 hover:text-white transition-colors">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 