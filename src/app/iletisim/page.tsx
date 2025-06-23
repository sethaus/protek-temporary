'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  TruckIcon,
  CogIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CursorArrowRaysIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'

interface ContactSection {
  id: string
  title: string
  icon: any
  category: string
}

const contactSections: ContactSection[] = [
  // İletişim Bilgileri
  { id: 'genel-mudurluk', title: 'Genel Müdürlük', icon: BuildingOffice2Icon, category: 'İletişim Bilgileri' },
  { id: 'satis-ekibi', title: 'Satış Ekibi', icon: UserGroupIcon, category: 'İletişim Bilgileri' },
  { id: 'teknik-servis', title: 'Teknik Servis', icon: WrenchScrewdriverIcon, category: 'İletişim Bilgileri' },
  { id: 'muhasebe', title: 'Muhasebe', icon: BanknotesIcon, category: 'İletişim Bilgileri' },
  { id: 'sosyal-medya', title: 'Sosyal Medya', icon: GlobeAltIcon, category: 'İletişim Bilgileri' },
  
  // Destek Hizmetleri
  { id: 'canli-destek', title: 'Canlı Destek', icon: ChatBubbleLeftRightIcon, category: 'Destek Hizmetleri' },
  { id: 'uzaktan-erisim', title: 'Uzaktan Erişim', icon: GlobeAltIcon, category: 'Destek Hizmetleri' },
  { id: 'egitim-talepleri', title: 'Eğitim Talepleri', icon: AcademicCapIcon, category: 'Destek Hizmetleri' },
  { id: 'sikayet-oneriler', title: 'Şikayet ve Öneriler', icon: EnvelopeIcon, category: 'Destek Hizmetleri' },
  
  // Lojistik ve Teslimat
  { id: 'kargo-takibi', title: 'Kargo Takibi', icon: TruckIcon, category: 'Lojistik ve Teslimat' },
  { id: 'teslimat-noktalari', title: 'Teslimat Noktaları', icon: MapPinIcon, category: 'Lojistik ve Teslimat' },
  { id: 'kurulum-hizmetleri', title: 'Kurulum Hizmetleri', icon: CogIcon, category: 'Lojistik ve Teslimat' }
]

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState('genel-mudurluk')

  useEffect(() => {
    const handleScroll = () => {
      const sections = contactSections.map(section => document.getElementById(section.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(contactSections[i].id)
          break
        }
      }
    }

    // Handle initial hash if present
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash && contactSections.some(section => section.id === hash)) {
        setTimeout(() => scrollToSection(hash), 100)
      }
    }

    // Check hash on mount
    handleHashChange()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const yPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
      })
    }
  }

  const groupedSections = contactSections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = []
    }
    acc[section.category].push(section)
    return acc
  }, {} as Record<string, ContactSection[]>)

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container-custom py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">İletişim</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              7/24 destek için yanınızdayız. İhtiyacınıza göre doğru departmanla hızlıca iletişime geçin.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sticky Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  
                  {Object.entries(groupedSections).map(([category, sections]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        {category}
                      </h4>
                      <div className="space-y-1">
                        {sections.map((section) => {
                          const IconComponent = section.icon
                          return (
                            <button
                              key={section.id}
                              onClick={() => scrollToSection(section.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                                activeSection === section.id
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              <IconComponent className={`w-5 h-5 ${
                                activeSection === section.id ? 'text-blue-600' : 'text-gray-400'
                              }`} />
                              <span className="font-medium">{section.title}</span>
                              {activeSection === section.id && (
                                <ChevronRightIcon className="w-4 h-4 text-blue-600 ml-auto" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Contact Card */}
                <div className="mt-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                  <h4 className="font-semibold mb-4">Hızlı İletişim</h4>
                  <div className="space-y-3">
                    <a href="tel:+902163293960" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                      <PhoneIcon className="w-5 h-5" />
                      <span>+90 (216) 329 39 60</span>
                    </a>
                    <a href="mailto:info@protekanalitik.com" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                      <EnvelopeIcon className="w-5 h-5" />
                      <span>info@protekanalitik.com</span>
                    </a>
                    <div className="text-blue-100 text-sm">
                      <p>Merkez Ofis: Atakent Mah. Dicle Cad. No:29</p>
                      <p>34760 Ümraniye / İstanbul</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <h5 className="font-medium mb-3 text-sm">Sosyal Medya</h5>
                    <div className="flex space-x-3">
                      <a 
                        href="https://www.linkedin.com/company/protek-analytical-industrial-systems/posts/?feedView=all" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                        title="LinkedIn'de Takip Et"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://www.instagram.com/protek.analitik/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                        title="Instagram'da Takip Et"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://www.youtube.com/channel/UCEBjbLKziuAJliIjjCaOERg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                        title="YouTube'da İzle"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-16">
              
              {/* Genel Müdürlük */}
              <section id="genel-mudurluk" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BuildingOffice2Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Genel Müdürlük</h2>
                      <p className="text-gray-600">Ana ofis ve yönetim iletişim</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">İletişim Bilgileri</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">+90 (216) 329 39 60</p>
                            <p className="text-sm text-gray-500">Ana Hat</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">+90 (216) 329 37 70</p>
                            <p className="text-sm text-gray-500">Pbx</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">+90 (216) 329 41 47</p>
                            <p className="text-sm text-gray-500">Fax</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">info@protekanalitik.com</p>
                            <p className="text-sm text-gray-500">Genel Bilgi</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <p className="font-medium">Merkez Ofis</p>
                            <p className="text-gray-600">Atakent Mah. Dicle Cad. No:29<br/>
                            34760 Ümraniye / İstanbul / TÜRKİYE</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 mt-4 pt-4 border-t border-gray-200">
                          <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <p className="font-medium">Ortadoğu Ofis</p>
                            <p className="text-gray-600">Ras Al Khaimah, United Arab Emirates</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-600">T: +971 7 203 1257</p>
                              <p className="text-sm text-gray-600">T: +971 50 653 62 75</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Çalışma Saatleri</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Pazartesi - Cuma</span>
                          <span className="font-medium">08:30 - 18:30</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cumartesi</span>
                          <span className="font-medium">09:00 - 13:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pazar</span>
                          <span className="text-red-500">Kapalı</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">Açık</span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">18:30&rsquo;a kadar hizmetdeyiz</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Satış Ekibi */}
              <section id="satis-ekibi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <UserGroupIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Satış Ekibi</h2>
                      <p className="text-gray-600">Bölgesel satış temsilcileri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Ahmet Yılmaz', role: 'Satış Müdürü', region: 'İstanbul', phone: '+90 532 123 45 67', email: 'ahmet.yilmaz@protekanalitik.com' },
                      { name: 'Ayşe Demir', role: 'Satış Temsilcisi', region: 'Ankara', phone: '+90 533 234 56 78', email: 'ayse.demir@protekanalitik.com' },
                      { name: 'Mehmet Kaya', role: 'Satış Temsilcisi', region: 'İzmir', phone: '+90 534 345 67 89', email: 'mehmet.kaya@protekanalitik.com' }
                    ].map((person, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-semibold text-lg">{person.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{person.name}</h3>
                          <p className="text-sm text-gray-500">{person.role}</p>
                          <p className="text-sm font-medium text-blue-600">{person.region}</p>
                        </div>
                        <div className="space-y-2">
                          <a href={`tel:${person.phone}`} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
                            <PhoneIcon className="w-4 h-4" />
                            <span>{person.phone}</span>
                          </a>
                          <a href={`mailto:${person.email}`} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
                            <EnvelopeIcon className="w-4 h-4" />
                            <span className="truncate">{person.email}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Teknik Servis */}
              <section id="teknik-servis" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <WrenchScrewdriverIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Teknik Servis</h2>
                      <p className="text-gray-600">7/24 teknik destek hizmeti</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Acil Teknik Destek</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                          <ClockIcon className="w-6 h-6 text-red-600" />
                          <div>
                            <p className="font-medium text-red-900">Acil Hat</p>
                            <p className="text-red-700">+90 (212) 999 99 99</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <PhoneIcon className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium">Teknik Destek Hattı</p>
                              <p className="text-gray-600">+90 (212) 123 45 68</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium">E-posta Desteği</p>
                              <p className="text-gray-600">teknik@protekanalitik.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Servis Hizmetleri</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Preventif bakım hizmetleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Cihaz kalibrasyonu</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Yedek parça temini</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Uzaktan erişim desteği</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Yerinde teknik müdahale</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Yanıt Süresi:</strong> Acil: 2 saat, Rutin: 24 saat
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Muhasebe */}
              <section id="muhasebe" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <BanknotesIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Muhasebe</h2>
                      <p className="text-gray-600">Fatura ve ödeme işlemleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">İletişim Bilgileri</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">+90 (212) 123 45 69</p>
                            <p className="text-sm text-gray-500">Muhasebe Departmanı</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">muhasebe@protekanalitik.com</p>
                            <p className="text-sm text-gray-500">Fatura ve Ödeme</p>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-4 mt-6">Çalışma Saatleri</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Pazartesi - Cuma</span>
                          <span className="font-medium">09:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cumartesi - Pazar</span>
                          <span className="text-red-500">Kapalı</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Ödeme Yöntemleri</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Banka havalesi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Kredi kartı</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Çek</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Senet</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Not:</strong> Fatura talepleri 3 iş günü önceden bildirilmeli
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sosyal Medya */}
              <section id="sosyal-medya" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Sosyal Medya</h2>
                      <p className="text-gray-600">Bizi sosyal medyada takip edin</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* LinkedIn */}
                    <a 
                      href="https://www.linkedin.com/company/protek-analytical-industrial-systems/posts/?feedView=all" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">LinkedIn</h3>
                          <p className="text-gray-600">Bize hızlıca yazın</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-medium group-hover:text-blue-700">Takip Et</span>
                        <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a 
                      href="https://www.instagram.com/protek.analitik/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-6 bg-gradient-to-br from-pink-50 to-purple-100 rounded-xl border border-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Instagram</h3>
                          <p className="text-gray-600">Bizi takip edin</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-600 font-medium group-hover:text-purple-700">Takip Et</span>
                        <svg className="w-5 h-5 text-purple-600 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>

                    {/* YouTube */}
                    <a 
                      href="https://www.youtube.com/channel/UCEBjbLKziuAJliIjjCaOERg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">YouTube</h3>
                          <p className="text-gray-600">Bizi izleyin</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-medium group-hover:text-red-700">İzle</span>
                        <svg className="w-5 h-5 text-red-600 group-hover:text-red-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </section>

              {/* Canlı Destek */}
              <section id="canli-destek" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Canlı Destek</h2>
                      <p className="text-gray-600">Online anlık destek</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Canlı Sohbet</h3>
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-medium text-green-700">Online</span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Teknik sorularınız için uzman ekibimiz hazır. Anında destek alın.
                        </p>
                        <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                          Canlı Sohbet Başlat
                        </button>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">Destek Saatleri</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Pazartesi - Cuma</span>
                            <span className="font-medium">09:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cumartesi</span>
                            <span className="font-medium">10:00 - 16:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pazar</span>
                            <span className="text-red-500">Kapalı</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Sık Sorulan Sorular</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Cihaz kurulum süreci nasıl işliyor?</h4>
                          <p className="text-sm text-gray-600">Kurulum ekibimiz size uygun tarihte gelir ve tüm kurulum işlemlerini tamamlar.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Garantiim ne kadar süreli?</h4>
                          <p className="text-sm text-gray-600">Tüm cihazlarımız minimum 2 yıl garantilidir. Bazı ürünlerde 5 yıla kadar garanti sunuyoruz.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Eğitim hizmetleri veriyor musunuz?</h4>
                          <p className="text-sm text-gray-600">Evet, tüm cihazlarımız için kapsamlı kullanıcı eğitimleri veriyoruz.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Uzaktan Erişim */}
              <section id="uzaktan-erisim" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <GlobeAltIcon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Uzaktan Erişim</h2>
                      <p className="text-gray-600">Uzaktan teknik destek hizmeti</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Nasıl Çalışır?</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Bağlantı Kurulumu</h4>
                            <p className="text-sm text-gray-600">Güvenli erişim kodu ile bağlantı</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">2</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Problem Tespiti</h4>
                            <p className="text-sm text-gray-600">Hızlı sorun tespiti</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">3</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Anında Çözüm</h4>
                            <p className="text-sm text-gray-600">Anında çözüm veya randevu</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Uzaktan Erişim Talep Et</h3>
                      <div className="p-6 bg-cyan-50 rounded-xl border border-cyan-200">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sorun Açıklaması</label>
                            <textarea className="w-full p-3 border border-gray-300 rounded-lg resize-none" rows={3} placeholder="Yaşadığınız sorunu kısaca açıklayın..."></textarea>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numaranız</label>
                            <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="+90 xxx xxx xx xx" />
                          </div>
                          <button className="w-full bg-cyan-600 text-white py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
                            Uzaktan Destek Talep Et
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Kargo Takibi */}
              <section id="kargo-takibi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <TruckIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kargo Takibi</h2>
                      <p className="text-gray-600">Sipariş durumu sorgulama</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kargo Takip</h3>
                      <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sipariş/Takip Numarası</label>
                            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="ORD-2024-001 veya 1234567890" />
                          </div>
                          <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                            Kargo Durumunu Sorgula
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">Kargo Firmaları</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span>MNG Kargo</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span>Yurtiçi Kargo</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span>Aras Kargo</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span>UPS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Teslimat Bilgileri</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Standart Teslimat</h4>
                          <p className="text-sm text-blue-700">İstanbul içi 1-2 iş günü, Türkiye geneli 2-5 iş günü</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <h4 className="font-medium text-orange-900 mb-2">Hızlı Teslimat</h4>
                          <p className="text-sm text-orange-700">İstanbul içi aynı gün, diğer şehirler 1-2 iş günü</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-2">Özel Teslimat</h4>
                          <p className="text-sm text-green-700">Hassas ekipmanlar için özel kurye ve ambalaj</p>
                        </div>
                      </div>
                      
                                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Not:</strong> Kargo gönderiminde SMS/e-posta bilgilendirmesi yapılır
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Eğitim Talepleri */}
              <section id="egitim-talepleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Eğitim Talepleri</h2>
                      <p className="text-gray-600">Özel eğitim ve workshop</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Eğitim Programları</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Temel Kullanıcı Eğitimi</h4>
                          <p className="text-sm text-gray-600 mb-3">Cihaz kullanımı ve temel bakım</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>🕐 4 saat</span>
                            <span>👥 Max 8 kişi</span>
                            <span>📍 Yerinde/Online</span>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">İleri Seviye Eğitim</h4>
                          <p className="text-sm text-gray-600 mb-3">Metod geliştirme ve kalibrasyon</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>🕐 8 saat</span>
                            <span>👥 Max 6 kişi</span>
                            <span>📍 Merkez</span>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Özel Workshop</h4>
                          <p className="text-sm text-gray-600 mb-3">İhtiyaca özel eğitim programı</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>🕐 Esnek</span>
                            <span>👥 Esnek</span>
                            <span>📍 Görüşme</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Eğitim Talep Formu</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Eğitim Türü</label>
                          <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Temel Kullanıcı Eğitimi</option>
                            <option>İleri Seviye Eğitim</option>
                            <option>Özel Workshop</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Katılımcı Sayısı</label>
                          <input type="number" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Kaç kişi katılacak?" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tercih Edilen Tarih</label>
                          <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ek Notlar</label>
                          <textarea className="w-full p-3 border border-gray-300 rounded-lg resize-none" rows={3} placeholder="Özel istekleriniz..."></textarea>
                        </div>
                        <button className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors">
                          Eğitim Talebi Gönder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Şikayet ve Öneriler */}
              <section id="sikayet-oneriler" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                      <EnvelopeIcon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Şikayet ve Öneriler</h2>
                      <p className="text-gray-600">Geri bildirimleriniz değerli</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Geri Bildirim Formu</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Konu Türü</label>
                          <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Şikayet</option>
                            <option>Öneri</option>
                            <option>Teşekkür</option>
                            <option>Kalite Geri Bildirimi</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Konu Başlığı</label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Konuyu özetleyin..." />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Detaylı Açıklama</label>
                          <textarea className="w-full p-3 border border-gray-300 rounded-lg resize-none" rows={5} placeholder="Geri bildiriminizi detaylı olarak yazın..."></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">İletişim E-posta</label>
                          <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="email@example.com" />
                        </div>
                        <button className="w-full bg-rose-600 text-white py-3 px-4 rounded-lg hover:bg-rose-700 transition-colors">
                          Geri Bildirim Gönder
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kalite Politikamız</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                            <h4 className="font-medium text-green-900">Müşteri Memnuniyeti</h4>
                          </div>
                          <p className="text-sm text-green-700">
                            Müşteri memnuniyeti önceliğimiz. Geri bildirimler 24 saat içinde değerlendirilir.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                            <h4 className="font-medium text-blue-900">Sürekli İyileştirme</h4>
                          </div>
                          <p className="text-sm text-blue-700">
                            Önerilerinizle hizmet kalitemizi sürekli geliştiriyoruz.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                            <h4 className="font-medium text-purple-900">Gizlilik</h4>
                          </div>
                          <p className="text-sm text-purple-700">
                            Geri bildirimler gizli tutulur ve iyileştirme amaçlı kullanılır.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>İletişim:</strong> Acil durumlar için +90 (212) 123 45 67 
                          numarasından bize ulaşabilirsiniz.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Teslimat Noktaları */}
              <section id="teslimat-noktalari" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <MapPinIcon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Teslimat Noktaları</h2>
                      <p className="text-gray-600">Türkiye geneli teslimat ağı</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[
                      { city: 'İstanbul', address: 'Maslak Mahallesi, Büyükdere Caddesi No:123', phone: '+90 212 123 45 67', type: 'Ana Merkez' },
                      { city: 'Ankara', address: 'Çankaya, Atatürk Bulvarı No:45', phone: '+90 312 234 56 78', type: 'Şube' },
                      { city: 'İzmir', address: 'Alsancak, Cumhuriyet Bulvarı No:78', phone: '+90 232 345 67 89', type: 'Şube' },
                      { city: 'Antalya', address: 'Muratpaşa, Atatürk Caddesi No:123', phone: '+90 242 456 78 90', type: 'Bayi' },
                      { city: 'Bursa', address: 'Osmangazi, Fethiye Caddesi No:56', phone: '+90 224 567 89 01', type: 'Bayi' },
                      { city: 'Adana', address: 'Seyhan, İnönü Caddesi No:34', phone: '+90 322 678 90 12', type: 'Bayi' }
                    ].map((location, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">{location.city}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            location.type === 'Ana Merkez' 
                              ? 'bg-blue-100 text-blue-800' 
                              : location.type === 'Şube'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {location.type}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span className="text-sm text-gray-600">{location.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{location.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Teslimat Saatleri</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Pazartesi - Cuma</span>
                          <span className="font-medium">08:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cumartesi</span>
                          <span className="font-medium">09:00 - 15:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pazar</span>
                          <span className="text-red-500">Teslimat Yok</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Özel Teslimat Hizmetleri</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Hassas ekipman taşıma</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Soğuk zincir teslimat</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Kurulum dahil teslimat</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Randevulu teslimat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Kurulum Hizmetleri */}
              <section id="kurulum-hizmetleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <CogIcon className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kurulum Hizmetleri</h2>
                      <p className="text-gray-600">Yerinde kurulum ve devreye alma</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kurulum Süreci</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Ön Değerlendirme</h4>
                            <p className="text-sm text-gray-600">Saha incelemesi ve analiz</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">2</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Kurulum Planlaması</h4>
                            <p className="text-sm text-gray-600">Kurulum planı ve zaman çizelgesi</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">3</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Fiziksel Kurulum</h4>
                            <p className="text-sm text-gray-600">Cihaz yerleştirme ve bağlantı</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">4</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Test ve Devreye Alma</h4>
                            <p className="text-sm text-gray-600">Test ve performans doğrulama</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">5</div>
                          <div>
                            <h4 className="font-medium text-gray-900">Eğitim ve Teslim</h4>
                            <p className="text-sm text-gray-600">Kullanıcı eğitimi ve teslim</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kurulum Hizmet Paketleri</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Temel Kurulum</h4>
                          <p className="text-sm text-gray-600 mb-3">Standart kurulum ve temel eğitim</p>
                          <div className="space-y-1 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>Fiziksel kurulum</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>Temel kalibrasyon</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>2 saat eğitim</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Gelişmiş Kurulum</h4>
                          <p className="text-sm text-gray-600 mb-3">Kapsamlı kurulum ve detaylı eğitim</p>
                          <div className="space-y-1 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>Temel kurulum + optimizasyon</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>İleri seviye kalibrasyon</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>4 saat detaylı eğitim</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>30 gün telefon desteği</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Premium Kurulum</h4>
                          <p className="text-sm text-gray-600 mb-3">Anahtar teslim çözüm ve sürekli destek</p>
                          <div className="space-y-1 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>Tam optimizasyon paketi</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>Özel metod geliştirme</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>8 saat kapsamlı eğitim</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span>1 yıl uzaktan destek</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button className="w-full bg-slate-600 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">
                          Kurulum Talebi Oluştur
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 