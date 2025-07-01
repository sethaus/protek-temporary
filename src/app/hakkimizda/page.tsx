'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  BuildingOffice2Icon,
  DocumentTextIcon,
  Squares2X2Icon,
  TrophyIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  GlobeAltIcon,
  FlagIcon,
  CalendarIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  StarIcon,
  CheckCircleIcon,
  TrophyIcon as AwardIcon,
  HeartIcon,
  BookOpenIcon,
  LightBulbIcon,
  CogIcon,
  RocketLaunchIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const sections = {
  "Şirket Bilgileri": [
    { id: "sirketimiz", name: "Şirketimiz", icon: BuildingOffice2Icon },
    { id: "tarihcemiz", name: "Tarihçemiz", icon: DocumentTextIcon },
    { id: "organizasyon", name: "Organizasyon Şeması", icon: Squares2X2Icon }
  ],
  "Kalite ve Sertifikalar": [
    { id: "iso-sertifikalari", name: "ISO Sertifikaları", icon: ShieldCheckIcon },
    { id: "kalite-politikasi", name: "Kalite Politikamız", icon: TrophyIcon },
    { id: "akreditasyon", name: "Akreditasyon", icon: AcademicCapIcon },
    { id: "uygunluk", name: "Uygunluk Beyanları", icon: ClipboardDocumentCheckIcon }
  ],
  "Sosyal Sorumluluk": [
    { id: "cevre-politikasi", name: "Çevre Politikası", icon: GlobeAltIcon },
    { id: "sosyal-projeler", name: "Sosyal Projeler", icon: FlagIcon },
    { id: "egitim-destegi", name: "Eğitim Desteği", icon: AcademicCapIcon }
  ]
}

export default function HakkimizdaPage() {
  const [activeSection, setActiveSection] = useState('sirketimiz')
  const router = useRouter()

  // Hash navigation handling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setActiveSection(hash)
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const headerOffset = 120
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
          }
        }, 100)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Active section detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const allSections = Object.values(sections).flat()
      for (const section of allSections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const groupedSections = sections

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container-custom py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Hakkımızda</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              25+ yıllık deneyimimiz ve uzman kadromuzla laboratuvar teknolojilerinde güvenilir çözüm ortağınız.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sticky Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  
                  {Object.entries(groupedSections).map(([category, items]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        {category}
                      </h4>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                              activeSection === item.id
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <item.icon 
                              className={`w-5 h-5 ${
                                activeSection === item.id ? 'text-blue-600' : 'text-gray-400'
                              }`} 
                            />
                            <span className="font-medium">{item.name}</span>
                            {activeSection === item.id && (
                              <ChevronRightIcon className="w-4 h-4 text-blue-600 ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Quick Contact Widget */}
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
                      <a href="/iletisim" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                        <MapPinIcon className="w-5 h-5" />
                        <span>İletişim</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-16">
              
              {/* Şirketimiz */}
              <section id="sirketimiz" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BuildingOffice2Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Şirketimiz</h2>
                      <p className="text-gray-600">Misyon, vizyon ve değerlerimiz</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Misyonumuz</h3>
                      <p className="text-gray-700 mb-6">
                        Laboratuvar teknolojilerinde güvenilir, yenilikçi ve kullanıcı odaklı çözümler sunarak, 
                        müşterilerimizin analiz kalitesini artırmak ve iş süreçlerini optimize etmek.
                      </p>
                      
                      <h3 className="font-semibold text-gray-900 mb-4">Vizyonumuz</h3>
                      <p className="text-gray-700">
                        Türkiye&rsquo;de laboratuvar teknolojileri alanında lider konumumuzu koruyarak, 
                        bölgesel bir güç olmak ve uluslararası pazarlarda tanınır bir marka haline gelmek.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Değerlerimiz</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Güvenilirlik ve kalite</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Sürekli yenilik</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Müşteri odaklılık</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Etik ve şeffaflık</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span>Çevresel sorumluluk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tarihçemiz */}
              <section id="tarihcemiz" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Tarihçemiz</h2>
                      <p className="text-sm text-gray-500">Kuruluştan bugüne yolculuğumuz</p>
                    </div>
                  </div>
                  
                  {/* Timeline Container */}
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200"></div>
                    
                    <div className="space-y-8">
                      {/* 1998 - Kuruluş */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                          <BuildingOffice2Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">1998</span>
                            <h4 className="font-semibold text-gray-900 text-sm">Kuruluş</h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">İstanbul&rsquo;da laboratuvar ekipmanları distribütörlüğü olarak faaliyete başladık.</p>
                        </div>
                      </div>
                      
                      {/* 2005 - Bölgesel Gelişim */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                          <MapPinIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">2005</span>
                            <h4 className="font-semibold text-gray-900 text-sm">Bölgesel Gelişim</h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">Ankara ve İzmir&rsquo;de şubeler açarak Türkiye geneline hizmet ağımızı genişlettik.</p>
                        </div>
                      </div>
                      
                      {/* 2010 - AR-GE Yatırımı */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                          <LightBulbIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">2010</span>
                            <h4 className="font-semibold text-gray-900 text-sm">AR-GE Yatırımı</h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">Kendi AR-GE merkezimizi kurarak, özelleştirilmiş analiz çözümleri geliştirmeye başladık.</p>
                        </div>
                      </div>
                      
                      {/* 2018 - Uluslararası Ağ */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                          <GlobeAltIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">2018</span>
                            <h4 className="font-semibold text-gray-900 text-sm">Uluslararası Ağ</h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">Yurt dışı distribütörlükler ve bölge ofisleriyle global müşteri portföyümüzü büyüttük.</p>
                        </div>
                      </div>
                      
                      {/* 2024 - Lider Konum */}
                      <div className="flex items-start space-x-6 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                          <TrophyIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">2024</span>
                            <h4 className="font-semibold text-gray-900 text-sm">Lider Konum</h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">Türkiye&rsquo;nin önde gelen laboratuvar teknolojileri şirketlerinden biri olarak sektörde liderliğe ulaştık.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Organizasyon Şeması */}
              <section id="organizasyon" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Squares2X2Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Organizasyon Şeması</h2>
                      <p className="text-gray-600">Şirket yapısı ve departmanlar</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-block p-4 bg-blue-100 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900">Genel Müdürlük</h4>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-900">Teknik Departman</h4>
                          <p className="text-sm text-green-700 mt-1">Ar-Ge & Teknik Destek</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-medium text-orange-900">Satış Departmanı</h4>
                          <p className="text-sm text-orange-700 mt-1">İç & Dış Satış</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-purple-900">Operasyon</h4>
                          <p className="text-sm text-purple-700 mt-1">Lojistik & Kurulum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ISO Sertifikaları */}
              <section id="iso-sertifikalari" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <ShieldCheckIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">ISO Sertifikaları</h2>
                      <p className="text-gray-600">Kalite standartlarımız</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <AwardIcon className="w-8 h-8 text-green-600" />
                        <h3 className="font-semibold text-green-900">ISO 9001:2015</h3>
                      </div>
                      <p className="text-green-700 text-sm">Kalite Yönetim Sistemi</p>
                      <p className="text-green-600 text-xs mt-2">Geçerlilik: 2024-2027</p>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <AwardIcon className="w-8 h-8 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">ISO 14001:2015</h3>
                      </div>
                      <p className="text-blue-700 text-sm">Çevre Yönetim Sistemi</p>
                      <p className="text-blue-600 text-xs mt-2">Geçerlilik: 2024-2027</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Kalite Politikamız */}
              <section id="kalite-politikasi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <TrophyIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kalite Politikamız</h2>
                      <p className="text-gray-600">Kalite yönetim sistemimiz</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Protek Analitik olarak, müşteri memnuniyetini esas alarak, 
                      uluslararası kalite standartlarına uygun ürün ve hizmetler sunmayı taahhüt ediyoruz.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Müşteri Odaklılık</h4>
                        <p className="text-sm text-gray-600">Müşteri ihtiyaçlarını anlama ve beklentileri aşma</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Sürekli İyileştirme</h4>
                        <p className="text-sm text-gray-600">Süreçlerimizi sürekli gözden geçirme ve geliştirme</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Akreditasyon */}
              <section id="akreditasyon" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Akreditasyon</h2>
                      <p className="text-gray-600">Laboratuvar akreditasyon belgeleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                      <h4 className="font-medium text-cyan-900 mb-2">TÜRKAK Akreditasyonu</h4>
                      <p className="text-cyan-700 text-sm">Kalibrasyon ve test laboratuvarı akreditasyonu</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-cyan-200 text-cyan-800 text-xs rounded-full">
                        Aktif
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Uygunluk Beyanları */}
              <section id="uygunluk" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                      <ClipboardDocumentCheckIcon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Uygunluk Beyanları</h2>
                      <p className="text-gray-600">Ürün uygunluk beyanları ve CE belgeleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                      <h4 className="font-medium text-rose-900 mb-2">CE Belgeleri</h4>
                      <p className="text-rose-700 text-sm">Avrupa Birliği uygunluk beyanları</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-orange-900 mb-2">TSE Belgeleri</h4>
                      <p className="text-orange-700 text-sm">Türk Standartları Enstitüsü belgeleri</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Çevre Politikası */}
              <section id="cevre-politikasi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <GlobeAltIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Çevre Politikası</h2>
                      <p className="text-gray-600">Çevresel sorumluluklarımız</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Çevresel sürdürülebilirlik konusunda sorumluluklarımızın bilincindeyiz. 
                      Tüm faaliyetlerimizde çevre dostu yaklaşımları benimser ve uygularız.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <HeartIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium text-green-900">Geri Dönüşüm</h4>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <LightBulbIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium text-green-900">Enerji Verimliliği</h4>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CogIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium text-green-900">Sürdürülebilirlik</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sosyal Projeler */}
              <section id="sosyal-projeler" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <FlagIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Sosyal Projeler</h2>
                      <p className="text-gray-600">Toplumsal katkı projelerimiz</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                      <h3 className="font-semibold text-red-900 mb-3">Laboratuvar Donanım Desteği</h3>
                      <p className="text-red-700 text-sm">
                        Üniversite laboratuvarlarına ekipman desteği sağlayarak eğitim kalitesinin artırılmasına katkıda bulunuyoruz.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-3">Burslu Öğrenci Programı</h3>
                      <p className="text-blue-700 text-sm">
                        Başarılı öğrencilere burs desteği sağlayarak geleceğin bilim insanlarının yetişmesine destek oluyoruz.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Eğitim Desteği */}
              <section id="egitim-destegi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Eğitim Desteği</h2>
                      <p className="text-gray-600">Üniversite ve araştırma kurumlarına desteğimiz</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Eğitim Programları</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <BookOpenIcon className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">Teknik eğitim seminerleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RocketLaunchIcon className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">Staj programları</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <AcademicCapIcon className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">Üniversite iş birlikleri</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Araştırma Desteği</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <LightBulbIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Ar-Ge projeleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CogIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Ekipman desteği</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <UserIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Uzman danışmanlık</span>
                        </div>
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