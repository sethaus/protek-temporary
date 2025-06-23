'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  CubeIcon,
  BeakerIcon,
  AcademicCapIcon,
  ChevronRightIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  StarIcon,
  UsersIcon,
  ClockIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  DocumentCheckIcon,
  ComputerDesktopIcon,
  PlayIcon,
  PuzzlePieceIcon,
  BoltIcon,
  EyeIcon,
  TruckIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  HeartIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  ArrowTrendingUpIcon,
  Squares2X2Icon,
  LightBulbIcon,
  ClipboardDocumentCheckIcon,
  FireIcon,
  SunIcon,
  BeakerIcon as FlaskIcon,
  CubeTransparentIcon,
  SparklesIcon,
  LifebuoyIcon,
  ScaleIcon,
  MagnifyingGlassIcon,
  ChartPieIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline'

const sections = {
  "Gıda ve İçecek": [
    { id: "sut-urunleri", name: "Süt ve Süt Ürünleri", icon: CubeIcon },
    { id: "et-urunleri", name: "Et ve Et Ürünleri", icon: CubeIcon },
    { id: "tahil-baklagil", name: "Tahıl ve Baklagiller", icon: CubeIcon },
    { id: "icecek-sanayi", name: "İçecek Sanayi", icon: CubeIcon },
    { id: "meyve-sebze", name: "Meyve ve Sebze İşleme", icon: CubeIcon }
  ],
  "Kimya ve Petrokimya": [
    { id: "petrol-turevleri", name: "Petrol ve Türevleri", icon: BeakerIcon },
    { id: "polimer-plastik", name: "Polimer ve Plastik", icon: BeakerIcon },
    { id: "boya-kaplama", name: "Boya ve Kaplama", icon: BeakerIcon },
    { id: "kimyasal-uretim", name: "Kimyasal Üretim", icon: BeakerIcon }
  ],
  "İlaç ve Kozmetik": [
    { id: "ilac-uretimi", name: "İlaç Üretimi", icon: AcademicCapIcon },
    { id: "kozmetik-urunler", name: "Kozmetik Ürünler", icon: AcademicCapIcon },
    { id: "kisisel-bakim", name: "Kişisel Bakım", icon: AcademicCapIcon },
    { id: "vitamin-takviye", name: "Vitamin ve Takviye", icon: AcademicCapIcon }
  ]
}

export default function SektorlerPage() {
  const [activeSection, setActiveSection] = useState('sut-urunleri')
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
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
        <div className="container-custom py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Sektörlerimiz</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gıda sanayisinden kimya petrokimyaya, ilaç üretiminden kozmetik sektörüne kadar geniş yelpazede sektörlere özel analitik çözümler sunuyoruz.
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
                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <item.icon 
                              className={`w-5 h-5 ${
                                activeSection === item.id ? 'text-purple-600' : 'text-gray-400'
                              }`} 
                            />
                            <span className="font-medium text-sm">{item.name}</span>
                            {activeSection === item.id && (
                              <ChevronRightIcon className="w-4 h-4 text-purple-600 ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Quick Contact Widget */}
                  <div className="mt-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                    <h4 className="font-semibold mb-4">Sektör Danışmanlığı</h4>
                    <div className="space-y-3">
                      <a href="tel:+902121234567" className="flex items-center space-x-3 text-purple-100 hover:text-white transition-colors">
                        <PhoneIcon className="w-5 h-5" />
                        <span>+90 (212) 123 45 67</span>
                      </a>
                      <a href="mailto:sektorler@protekanalitik.com" className="flex items-center space-x-3 text-purple-100 hover:text-white transition-colors">
                        <EnvelopeIcon className="w-5 h-5" />
                        <span>sektorler@protekanalitik.com</span>
                      </a>
                      <a href="/teklif-al" className="block mt-4 text-center bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
                        Sektör Çözümü Talep Et
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-16">
              {/* Süt ve Süt Ürünleri */}
              <section id="sut-urunleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Süt ve Süt Ürünleri</h2>
                      <p className="text-gray-600">Süt kalitesi ve güvenlik analizleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kalite Parametreleri</h3>
                      <p className="text-gray-700 mb-6">
                        Süt ve süt ürünlerinde kalite, güvenlik ve besin değeri analizleri için 
                        kapsamlı test çözümleri sunuyoruz.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Protein, yağ, karbonhidrat analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Mikrobiyolojik kalite kontrolü</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Antibiyotik kalıntı analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm">Sahtekarlık tespiti (su ilavesi, vb.)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Çözüm Paketleri</h3>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <ScaleIcon className="w-6 h-6 text-blue-600" />
                          <span className="font-medium text-blue-900">Hızlı Kalite Kontrolü</span>
                        </div>
                        <p className="text-blue-700 text-sm mb-4">
                          Üretim hattında gerçek zamanlı analiz için portatif ve online sistemler.
                        </p>
                        <ul className="text-blue-600 text-sm space-y-2">
                          <li>• Infrared süt analizörleri</li>
                          <li>• pH ve asitlik ölçüm cihazları</li>
                          <li>• Somatic hücre sayım sistemleri</li>
                          <li>• Mikotoksin test kitleri</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <MagnifyingGlassIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Kesin Analiz</h4>
                      <p className="text-gray-600 text-sm">%99.9 doğruluk oranı</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <ClockIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Hızlı Sonuç</h4>
                      <p className="text-gray-600 text-sm">30 saniyede sonuç</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <ShieldCheckIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Güvenilir</h4>
                      <p className="text-gray-600 text-sm">ISO sertifikalı</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Et ve Et Ürünleri */}
              <section id="et-urunleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Et ve Et Ürünleri</h2>
                      <p className="text-gray-600">Et kalitesi ve beslenme değeri analizleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                        <ShieldCheckIcon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-red-900 mb-2">Güvenlik Testleri</h3>
                        <p className="text-red-700 text-sm">Mikrobiyal kontaminasyon analizi</p>
                      </div>
                      
                      <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200">
                        <ScaleIcon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-orange-900 mb-2">Beslenme Değeri</h3>
                        <p className="text-orange-700 text-sm">Protein, yağ, mineral analizi</p>
                      </div>
                      
                      <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                        <FaceSmileIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-green-900 mb-2">Duyusal Analiz</h3>
                        <p className="text-green-700 text-sm">Tat, koku, tekstür değerlendirme</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Test Parametreleri</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-red-500" />
                            <span className="text-sm">E. coli, Salmonella, Listeria testleri</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-red-500" />
                            <span className="text-sm">Antibiyotik ve hormon kalıntı analizi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-red-500" />
                            <span className="text-sm">Ağır metal kontaminasyon testi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-red-500" />
                            <span className="text-sm">Histamin ve mikotoksin analizi</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                        <h4 className="font-semibold text-red-900 mb-3">Hızlı Test Kitleri</h4>
                        <div className="space-y-2 text-sm text-red-700">
                          <p>🧪 15 dakikada mikrobiyal test sonucu</p>
                          <p>📊 Portatif protein analiz cihazları</p>
                          <p>🔬 pH ve su aktivitesi ölçümü</p>
                          <p>✅ Sahadafever testi imkanı</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tahıl ve Baklagiller */}
              <section id="tahil-baklagil" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Tahıl ve Baklagiller</h2>
                      <p className="text-gray-600">Tahıl kalitesi ve besin değeri analizleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kalite Analizleri</h3>
                      <p className="text-gray-700 mb-4">
                        Tahıl ve baklagil ürünlerinde kalite, güvenlik ve besin değeri 
                        parametrelerinin kapsamlı analizi.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">Protein kalitesi ve miktar analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">Gluten analizi ve çölyak testleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">Mikotoksin ve aflatoksin analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">Pestisit kalıntı testi</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Fiziksel Özellikler</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <h4 className="font-medium text-amber-900 mb-2">Reolojik Özellikler</h4>
                          <p className="text-amber-700 text-sm">Hamur özellikleri, elastisite, viskozite</p>
                        </div>
                        
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h4 className="font-medium text-yellow-900 mb-2">Nem ve Su Aktivitesi</h4>
                          <p className="text-yellow-700 text-sm">Saklama koşulları optimizasyonu</p>
                        </div>
                        
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-medium text-orange-900 mb-2">Partikül Boyut Analizi</h4>
                          <p className="text-orange-700 text-sm">Un kalitesi ve öğütme kontrolü</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* İçecek Sanayi */}
              <section id="icecek-sanayi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">İçecek Sanayi</h2>
                      <p className="text-gray-600">Alkolsüz ve alkollü içecek analizleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Alkolsüz İçecekler</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">Şeker ve tatlandırıcı analizi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">pH, asitlik ve CO2 seviyesi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">Vitamin ve mineral içeriği</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">Koruyucu madde analizi</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Alkollü İçecekler</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">Alkol derecesi ölçümü</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">Metanol ve fuzel yağı analizi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">Histamin ve sülfür analizi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">Sahtekarlık tespiti</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
                      <h4 className="font-semibold text-cyan-900 mb-4">Üretim Hattı Çözümleri</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <MagnifyingGlassIcon className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                          <h5 className="font-medium text-cyan-900">Online Analiz</h5>
                          <p className="text-cyan-700 text-sm">Gerçek zamanlı kalite kontrolü</p>
                        </div>
                        <div>
                          <ClockIcon className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                          <h5 className="font-medium text-cyan-900">Hızlı Test</h5>
                          <p className="text-cyan-700 text-sm">1 dakikada sonuç</p>
                        </div>
                        <div>
                          <ChartPieIcon className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                          <h5 className="font-medium text-cyan-900">Veri İzleme</h5>
                          <p className="text-cyan-700 text-sm">Otomatik raporlama</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Meyve ve Sebze İşleme */}
              <section id="meyve-sebze" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Meyve ve Sebze İşleme</h2>
                      <p className="text-gray-600">Meyve sebze işleme kalite kontrolü</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Besin Değeri Analizi</h3>
                      <p className="text-gray-700 mb-4">
                        Taze ve işlenmiş meyve-sebze ürünlerinde besin değeri ve 
                        kalite parametrelerinin analizi.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Vitamin C, A, E analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Antioksidan aktivite ölçümü</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Şeker profili ve asitlik</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Mineral ve eser element</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Güvenlik Testleri</h3>
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-3">Kontaminasyon Kontrolü</h4>
                        <div className="space-y-2 text-sm text-green-700">
                          <p>🧪 Pestisit kalıntı analizi (400+ aktif madde)</p>
                          <p>🦠 Mikrobiyal kontaminasyon testi</p>
                          <p>⚗️ Ağır metal analizi (Pb, Cd, Hg, As)</p>
                          <p>🔬 Mycotoxin ve patulin analizi</p>
                          <p>📊 GMO testi ve doğal ürün doğrulama</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-3">Özel Çözümler</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-4 h-4 text-green-500" />
                        <span>Organik sertifikasyon testleri</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <LifebuoyIcon className="w-4 h-4 text-green-500" />
                        <span>Raf ömrü belirleme çalışmaları</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CubeTransparentIcon className="w-4 h-4 text-green-500" />
                        <span>Ambalaj materyali testleri</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SunIcon className="w-4 h-4 text-green-500" />
                        <span>Isıl işlem validasyonu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Kimya ve Petrokimya sektörleri için kalan bölümler... */}
              
              {/* Petrol ve Türevleri */}
              <section id="petrol-turevleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <BeakerIcon className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Petrol ve Türevleri</h2>
                      <p className="text-gray-600">Petrol ürünleri kalite kontrol analizleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <FireIcon className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-slate-900 mb-2">Yakıt Analizi</h3>
                        <p className="text-slate-700 text-sm">Benzin, dizel, jet yakıtı testleri</p>
                      </div>
                      
                      <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <CogIcon className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-900 mb-2">Yağlama Yağları</h3>
                        <p className="text-gray-700 text-sm">Motor yağı, endüstriyel yağlar</p>
                      </div>
                      
                      <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <FlaskIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-blue-900 mb-2">Petrokimyasallar</h3>
                        <p className="text-blue-700 text-sm">Aromatik, olefin, polimer hammadde</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Test Parametreleri</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Oktan/Setan sayısı ölçümü</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Kükürt içeriği analizi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Viskozite ve akış özellikleri</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Buhar basıncı ve damıtma eğrisi</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-3">Standart Metotlar</h4>
                        <div className="space-y-2 text-sm text-slate-700">
                          <p>📋 ASTM standartları uygulaması</p>
                          <p>🔬 EN ve ISO metot uygulamaları</p>
                          <p>⚗️ Gümrük laboratuvarı testleri</p>
                          <p>📊 Akaryakıt kalite kontrol standartları</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Polimer ve Plastik */}
              <section id="polimer-plastik" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <BeakerIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Polimer ve Plastik</h2>
                      <p className="text-gray-600">Polimer karakterizasyon ve kalite testleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Mekanik Özellikler</h3>
                      <p className="text-gray-700 mb-4">
                        Plastik ve polimer malzemelerin mekanik, termal ve kimyasal 
                        özelliklerinin kapsamlı karakterizasyonu.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-indigo-500" />
                          <span className="text-sm">Çekme, basma, eğilme testleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-indigo-500" />
                          <span className="text-sm">Darbe dayanımı ve yorulma testleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-indigo-500" />
                          <span className="text-sm">Creep ve stress relaxation</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-indigo-500" />
                          <span className="text-sm">Sertlik ve aşınma direnci</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Termal Analiz</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <h4 className="font-medium text-indigo-900 mb-2">DSC Analizi</h4>
                          <p className="text-indigo-700 text-sm">Erime, kristalizasyon, cam geçiş sıcaklığı</p>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-purple-900 mb-2">TGA Analizi</h4>
                          <p className="text-purple-700 text-sm">Termal bozunma, stabilite, filler içeriği</p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2">HDT/Vicat Testleri</h4>
                          <p className="text-blue-700 text-sm">Isıl deforme sıcaklığı, yumuşama noktası</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <ArrowTrendingUpIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Moleküler Ağırlık</h4>
                      <p className="text-gray-600 text-sm">GPC/SEC analizi</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <MagnifyingGlassIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">FTIR Spektroskopi</h4>
                      <p className="text-gray-600 text-sm">Kimyasal yapı analizi</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <EyeIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Mikroskopi</h4>
                      <p className="text-gray-600 text-sm">Morfoloji analizi</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <ChartBarIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Reoloji</h4>
                      <p className="text-gray-600 text-sm">Akış özellikleri</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Boya ve Kaplama */}
              <section id="boya-kaplama" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <BeakerIcon className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Boya ve Kaplama</h2>
                      <p className="text-gray-600">Boya kalitesi ve performans testleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-200">
                        <SparklesIcon className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-pink-900 mb-2">Görsel Özellikler</h3>
                        <p className="text-pink-700 text-sm">Renk, parlaklık, opaklık ölçümü</p>
                      </div>
                      
                      <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                        <ShieldCheckIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-purple-900 mb-2">Koruma Özellikleri</h3>
                        <p className="text-purple-700 text-sm">Korozyon, UV, hava şartları direnci</p>
                      </div>
                      
                      <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                        <WrenchScrewdriverIcon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-red-900 mb-2">Uygulama Özellikleri</h3>
                        <p className="text-red-700 text-sm">Viskozite, akış, kuruma süresi</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Performans Testleri</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-pink-500" />
                            <span className="text-sm">Çapraz kesik ve dolly testleri</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-pink-500" />
                            <span className="text-sm">Salt spray korozyon testi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-pink-500" />
                            <span className="text-sm">UV-A/UV-B dayanım testleri</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-pink-500" />
                            <span className="text-sm">Darbe ve büküm direnci</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200">
                        <h4 className="font-semibold text-pink-900 mb-3">Özel Test Yöntemleri</h4>
                        <div className="space-y-2 text-sm text-pink-700">
                          <p>🎨 Renk eşleştirme ve formülasyon</p>
                          <p>⏱️ Pot life ve storage stability</p>
                          <p>🌡️ Düşük/yüksek sıcaklık dayanımı</p>
                          <p>💧 Su emme ve nem geçirgenliği</p>
                          <p>🧪 Kimyasal direnç testleri</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Kimyasal Üretim */}
              <section id="kimyasal-uretim" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <BeakerIcon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kimyasal Üretim</h2>
                      <p className="text-gray-600">Kimyasal ürün analiz ve karakterizasyon</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Analitik Servisler</h3>
                      <p className="text-gray-700 mb-4">
                        Kimyasal ürünlerin kimyasal kompozisyon, saflık ve kalite 
                        özelliklerinin detaylı analizi.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-teal-500" />
                          <span className="text-sm">HPLC, GC-MS, LC-MS analizleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-teal-500" />
                          <span className="text-sm">ICP-OES element analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-teal-500" />
                          <span className="text-sm">Karl Fischer nem analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-teal-500" />
                          <span className="text-sm">Spektroskopik kimlik analizi</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kalite Kontrol</h3>
                      <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                        <h4 className="font-semibold text-teal-900 mb-3">Üretim Süreç Kontrolü</h4>
                        <div className="space-y-3 text-sm text-teal-700">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>Gerçek zamanlı süreç izleme</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ChartBarIcon className="w-4 h-4" />
                            <span>İstatistiksel proses kontrolü</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DocumentCheckIcon className="w-4 h-4" />
                            <span>Batch release testing</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ShieldCheckIcon className="w-4 h-4" />
                            <span>Stabilite çalışmaları</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-3">İhtisas Alanları</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <FlaskIcon className="w-4 h-4 text-teal-500" />
                        <span>Organik kimyasallar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CubeIcon className="w-4 h-4 text-teal-500" />
                        <span>İnorganik bileşikler</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Squares2X2Icon className="w-4 h-4 text-teal-500" />
                        <span>Katalitik sistemler</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-4 h-4 text-teal-500" />
                        <span>Özel kimyasallar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <LifebuoyIcon className="w-4 h-4 text-teal-500" />
                        <span>Çevre güvenliği testleri</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ScaleIcon className="w-4 h-4 text-teal-500" />
                        <span>Regülasyon uygunluk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* İlaç Üretimi */}
              <section id="ilac-uretimi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">İlaç Üretimi</h2>
                      <p className="text-gray-600">Farmasötik kalite kontrol ve analizler</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">GMP Uyumlu Testler</h3>
                        <p className="text-gray-700 mb-4">
                          İlaç üretiminde GMP standartlarına uygun kalite kontrol ve 
                          mikrobiyolojik testler.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">Aktif madde içerik analizi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">Çözünme ve dağılma testleri</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">Mikrobiyolojik limik testleri</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">Endotoksin ve sterilite testleri</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Stabilite Çalışmaları</h3>
                        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                          <h4 className="font-semibold text-emerald-900 mb-3">Raf Ömrü Belirleme</h4>
                          <div className="space-y-2 text-sm text-emerald-700">
                            <p>📊 ICH kılavuzları uygulaması</p>
                            <p>🌡️ Hızlandırılmış/uzun süreli testler</p>
                            <p>💊 Farklı dozaj formları analizi</p>
                            <p>📈 Degradasyon ürünleri takibi</p>
                            <p>📦 Ambalaj uyumluluk testleri</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <MagnifyingGlassIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900">HPLC Analizi</h4>
                        <p className="text-gray-600 text-sm">USP/EP metotları</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <ClockIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900">Hızlı Test</h4>
                        <p className="text-gray-600 text-sm">2-4 saat sonuç</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <ShieldCheckIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900">GMP Uygun</h4>
                        <p className="text-gray-600 text-sm">Validasyon desteği</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <DocumentCheckIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900">Raporlama</h4>
                        <p className="text-gray-600 text-sm">LIMS entegrasyonu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Son 3 bölüm için kısaca devam edeceğim... */}
              
              {/* Kozmetik Ürünler */}
              <section id="kozmetik-urunler" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kozmetik Ürünler</h2>
                      <p className="text-gray-600">Kozmetik güvenlik ve kalite testleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Güvenlik Testleri</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-rose-500" />
                          <span className="text-sm">Mikrobiyolojik challenge test</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-rose-500" />
                          <span className="text-sm">Ağır metal analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-rose-500" />
                          <span className="text-sm">Allerjen madde testi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-rose-500" />
                          <span className="text-sm">SPF ve UV koruma faktörü</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
                      <h4 className="font-semibold text-rose-900 mb-3">Fizikokimyasal Testler</h4>
                      <div className="space-y-2 text-sm text-rose-700">
                        <p>🧪 pH, viskozite, yoğunluk ölçümü</p>
                        <p>🎨 Renk stabilitesi ve parlaklık</p>
                        <p>💧 Su direnci ve yayılabilirlik</p>
                        <p>⏱️ Stabilite ve raf ömrü testleri</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Kişisel Bakım */}
              <section id="kisisel-bakim" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kişisel Bakım</h2>
                      <p className="text-gray-600">Kişisel bakım ürünleri analiz hizmetleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-sky-50 rounded-xl border border-sky-200">
                      <h3 className="font-semibold text-sky-900 mb-3">Şampuan & Saç Bakım</h3>
                      <div className="text-sky-700 text-sm space-y-1">
                        <p>• Temizleme gücü testleri</p>
                        <p>• Köpük stabilitesi</p>
                        <p>• Kondisyonlama etkisi</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-3">Cilt Bakım</h3>
                      <div className="text-blue-700 text-sm space-y-1">
                        <p>• Nemlendirme kapasitesi</p>
                        <p>• Emilim hızı testleri</p>
                        <p>• Anti-aging etkisi</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                      <h3 className="font-semibold text-purple-900 mb-3">Oral Bakım</h3>
                      <div className="text-purple-700 text-sm space-y-1">
                        <p>• Fluorür içerik analizi</p>
                        <p>• Beyazlatma etkisi</p>
                        <p>• Antibakteriyel aktivite</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Vitamin ve Takviye */}
              <section id="vitamin-takviye" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Vitamin ve Takviye</h2>
                      <p className="text-gray-600">Besin takviyesi kalite kontrol analizleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Vitamin Analizleri</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-orange-500" />
                          <span className="text-sm">Su çözünür vitaminler (B, C)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-orange-500" />
                          <span className="text-sm">Yağ çözünür vitaminler (A, D, E, K)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-orange-500" />
                          <span className="text-sm">Mineral ve eser element analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-orange-500" />
                          <span className="text-sm">Amino asit profili</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                      <h4 className="font-semibold text-orange-900 mb-3">Kalite Güvence</h4>
                      <div className="space-y-2 text-sm text-orange-700">
                        <p>📊 Label claim verification</p>
                        <p>⚗️ Mikrobiyolojik saflık testleri</p>
                        <p>🔬 Biyoyararlanım çalışmaları</p>
                        <p>📈 Stabilite ve raf ömrü</p>
                        <p>🧪 Çözünme ve dağılma testleri</p>
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