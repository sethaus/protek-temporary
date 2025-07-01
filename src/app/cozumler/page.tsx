'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { 
  RocketLaunchIcon,
  LightBulbIcon,
  CubeIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  Squares2X2Icon,
  ArrowTrendingUpIcon,
  ChevronRightIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  StarIcon,
  UsersIcon,
  ClockIcon,
  BeakerIcon,
  CogIcon,
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
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const sections = {
  "Endüstriyel Çözümler": [
    { id: "gida-guvenligi", name: "Gıda Güvenliği Çözümleri", icon: ShieldCheckIcon },
    { id: "kalite-kontrol", name: "Kalite Kontrol Sistemleri", icon: ClipboardDocumentCheckIcon },
    { id: "arge-laboratuvar", name: "AR-GE Laboratuvar Kurulumu", icon: AcademicCapIcon },
    { id: "proses-optimizasyonu", name: "Proses Optimizasyonu", icon: Cog6ToothIcon }
  ],
  "Danışmanlık Hizmetleri": [
    { id: "teknik-danismanlik", name: "Teknik Danışmanlık", icon: WrenchScrewdriverIcon },
    { id: "egitim-programlari", name: "Eğitim Programları", icon: AcademicCapIcon },
    { id: "kalibrasyon", name: "Kalibrasyon Hizmetleri", icon: Cog6ToothIcon },
    { id: "bakim-onarim", name: "Bakım ve Onarım", icon: WrenchScrewdriverIcon }
  ],
  "Özel Projeler": [
    { id: "ozel-cihaz-tasarimi", name: "Özel Cihaz Tasarımı", icon: CubeIcon },
    { id: "sistem-entegrasyonu", name: "Sistem Entegrasyonu", icon: ArrowTrendingUpIcon }
  ]
}

export default function CozumlerPage() {
  const [activeSection, setActiveSection] = useState('gida-guvenligi')
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Çözümlerimiz</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Endüstriyel analiz ihtiyaçlarınızdan danışmanlık hizmetlerine, özel proje çözümlerinden sistem entegrasyonuna kadar geniş yelpazede hizmet sunuyoruz.
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
                            <span className="font-medium text-sm">{item.name}</span>
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
                    <h4 className="font-semibold mb-4">Proje Danışmanlığı</h4>
                    <div className="space-y-3">
                      <a href="tel:+902121234567" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                        <PhoneIcon className="w-5 h-5" />
                        <span>+90 (212) 123 45 67</span>
                      </a>
                      <a href="mailto:cozumler@protekanalitik.com" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                        <EnvelopeIcon className="w-5 h-5" />
                        <span>cozumler@protekanalitik.com</span>
                      </a>
                      <a href="/teklif-al" className="block mt-4 text-center bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
                        Teklif Talep Et
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-16">
              {/* Gıda Güvenliği Çözümleri */}
              <section id="gida-guvenligi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Gıda Güvenliği Çözümleri</h2>
                      <p className="text-gray-600">Gıda analizi ve güvenlik test çözümleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Kapsamlı Gıda Analizi</h3>
                      <p className="text-gray-700 mb-6">
                        Gıda üretiminde kalite ve güvenlik standartlarını sağlamak için kapsamlı analiz çözümleri sunuyoruz. 
                        Mikrobiyolojik analizlerden kimyasal kontaminant tespitine kadar geniş spektrumlu hizmetler.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Mikrobiyolojik analiz sistemleri</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Pestisit ve kimyasal kalıntı analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Besin değeri ve etiketleme analizi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Allerjen testi çözümleri</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Hızlı Test Çözümleri</h3>
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <ClockIcon className="w-6 h-6 text-green-600" />
                          <span className="font-medium text-green-900">Hızlı Sonuçlar</span>
                        </div>
                        <p className="text-green-700 text-sm mb-4">
                          Üretim hattında anlık test imkanı sunan portatif cihazlar ve hızlı test kitleri ile kalite kontrolünüzü optimize edin.
                        </p>
                        <ul className="text-green-600 text-sm space-y-2">
                          <li>• ATP biyolüminesans sistemleri</li>
                          <li>• pH ve asitlik ölçüm cihazları</li>
                          <li>• Su aktivitesi ölçüm sistemleri</li>
                          <li>• Protein ve yağ analiz cihazları</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-3">Sertifikasyon Desteği</h4>
                    <p className="text-gray-600 text-sm">
                      HACCP, ISO 22000, BRC, IFS gibi gıda güvenliği standartlarına uyum için gerekli analiz altyapısını kurmanızda destek sağlıyoruz.
                    </p>
                  </div>
                </div>
              </section>

              {/* Kalite Kontrol Sistemleri */}
              <section id="kalite-kontrol" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kalite Kontrol Sistemleri</h2>
                      <p className="text-gray-600">Üretim kalite kontrol ve izleme sistemleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <EyeIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-blue-900 mb-2">Gerçek Zamanlı İzleme</h3>
                        <p className="text-blue-700 text-sm">Sürekli kalite parametrelerini izleyin</p>
                      </div>
                      
                      <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                        <ChartBarIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-purple-900 mb-2">Veri Analizi</h3>
                        <p className="text-purple-700 text-sm">Trend analizi ve raporlama</p>
                      </div>
                      
                      <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                        <BoltIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-green-900 mb-2">Otomatik Kontrol</h3>
                        <p className="text-green-700 text-sm">Parametrelere göre otomatik müdahale</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Sistem Bileşenleri</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                              <span className="text-blue-600 text-xs font-semibold">1</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Sensör Ağları</h4>
                              <p className="text-gray-600 text-sm">Sıcaklık, nem, basınç, pH sensörleri</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                              <span className="text-blue-600 text-xs font-semibold">2</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Veri Toplama</h4>
                              <p className="text-gray-600 text-sm">Merkezi veri toplama ve depolama sistemi</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                              <span className="text-blue-600 text-xs font-semibold">3</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Analiz Yazılımı</h4>
                              <p className="text-gray-600 text-sm">İstatistiksel analiz ve raporlama</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                              <span className="text-blue-600 text-xs font-semibold">4</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Alarm Sistemleri</h4>
                              <p className="text-gray-600 text-sm">Limit aşımlarında otomatik uyarı</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AR-GE Laboratuvar Kurulumu */}
              <section id="arge-laboratuvar" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">AR-GE Laboratuvar Kurulumu</h2>
                      <p className="text-gray-600">Araştırma geliştirme laboratuvarı kurulum hizmetleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Turnkey Laboratuvar Çözümleri</h3>
                      <p className="text-gray-700 mb-6">
                        Konsept tasarımından devreye almaya kadar tam hizmet. Modern AR-GE laboratuvarınızı 
                        ihtiyaçlarınıza göre özelleştiriyoruz.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <BuildingOffice2Icon className="w-6 h-6 text-purple-600 mb-2" />
                          <h4 className="font-medium text-purple-900 text-sm">Laboratuvar Tasarımı</h4>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <BeakerIcon className="w-6 h-6 text-blue-600 mb-2" />
                          <h4 className="font-medium text-blue-900 text-sm">Ekipman Seçimi</h4>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <CogIcon className="w-6 h-6 text-green-600 mb-2" />
                          <h4 className="font-medium text-green-900 text-sm">Kurulum & Devreye Alma</h4>
                        </div>
                        
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <UsersIcon className="w-6 h-6 text-orange-600 mb-2" />
                          <h4 className="font-medium text-orange-900 text-sm">Personel Eğitimi</h4>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Özelleştirilmiş Çözümler</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm">Analitik kimya laboratuvarları</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm">Mikrobiyoloji laboratuvarları</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm">Fiziksel test laboratuvarları</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm">Temiz oda tesisleri</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-3">Proje Süreci</h4>
                        <div className="space-y-2 text-sm text-purple-700">
                          <p>📋 İhtiyaç analizi ve konsept tasarım</p>
                          <p>📐 Detay mühendislik ve proje yönetimi</p>
                          <p>🔧 Kurulum ve komisyonlama</p>
                          <p>✅ Test, devreye alma ve eğitim</p>
                          <p>🛠️ Garanti ve teknik destek</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Proses Optimizasyonu */}
              <section id="proses-optimizasyonu" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Cog6ToothIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Proses Optimizasyonu</h2>
                      <p className="text-gray-600">Üretim süreç analizi ve optimizasyon hizmetleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Süreç Analizi</h3>
                      <p className="text-gray-700 mb-6">
                        Mevcut üretim süreçlerinizi detaylı analiz ederek verimlilik artışı ve 
                        kalite iyileştirme fırsatlarını belirliyoruz.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-medium text-orange-900 mb-2">Veri Toplama & Analiz</h4>
                          <p className="text-orange-700 text-sm">Süreç parametrelerinin izlenmesi ve istatistiksel analizi</p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2">Darboğaz Tespiti</h4>
                          <p className="text-blue-700 text-sm">Üretim hattındaki kritik noktaların belirlenmesi</p>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-900 mb-2">İyileştirme Önerileri</h4>
                          <p className="text-green-700 text-sm">Verimliliği artıracak çözüm önerileri</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Optimizasyon Alanları</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Kalite Parametreleri</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Ürün Standardizasyonu</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Hata Oranı Azaltma</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Süreç Kararlılığı</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Verimlilik</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Üretim Hızı</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Kaynak Kullanımı</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Enerji Verimliliği</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Maliyet Optimizasyonu</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Hammadde Tasarrufu</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Fire Azaltma</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">İşçilik Verimliliği</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Teknik Danışmanlık */}
              <section id="teknik-danismanlik" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <WrenchScrewdriverIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Teknik Danışmanlık</h2>
                      <p className="text-gray-600">Analitik metod geliştirme ve validasyon</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Metod Geliştirme</h3>
                        <p className="text-gray-700 mb-4">
                          Özel analiz ihtiyaçlarınız için metod geliştirme ve validasyon hizmetleri.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <StarIcon className="w-5 h-5 text-indigo-500 mt-0.5" />
                            <span className="text-sm">Analitik metod tasarımı</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <StarIcon className="w-5 h-5 text-indigo-500 mt-0.5" />
                            <span className="text-sm">Metod validasyon çalışmaları</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <StarIcon className="w-5 h-5 text-indigo-500 mt-0.5" />
                            <span className="text-sm">Belirsizlik hesaplamaları</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <StarIcon className="w-5 h-5 text-indigo-500 mt-0.5" />
                            <span className="text-sm">Prosedür dokümantasyonu</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Uzman Kadro</h3>
                        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-indigo-600">15+</div>
                              <div className="text-indigo-700 text-sm">Yıl Deneyim</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-indigo-600">50+</div>
                              <div className="text-indigo-700 text-sm">Başarılı Proje</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-indigo-600">100+</div>
                              <div className="text-indigo-700 text-sm">Metod Validasyonu</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-indigo-600">24/7</div>
                              <div className="text-indigo-700 text-sm">Teknik Destek</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Danışmanlık Alanları</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Kimyasal Analiz</h4>
                          <p className="text-gray-600 text-sm">HPLC, GC, MS, ICP metodları</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Mikrobiyolojik Testler</h4>
                          <p className="text-gray-600 text-sm">Klasik ve hızlı mikrobiyoloji</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Fiziksel Testler</h4>
                          <p className="text-gray-600 text-sm">Mekanik ve termal analiz</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Eğitim Programları */}
              <section id="egitim-programlari" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Eğitim Programları</h2>
                      <p className="text-gray-600">Laboratuvar teknikleri ve cihaz eğitimleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                      <BookOpenIcon className="w-8 h-8 text-emerald-600 mb-4" />
                      <h3 className="font-semibold text-emerald-900 mb-3">Temel Eğitimler</h3>
                      <ul className="text-emerald-700 text-sm space-y-2">
                        <li>• Laboratuvar güvenliği</li>
                        <li>• Temel analiz teknikleri</li>
                        <li>• Cihaz kullanımı</li>
                        <li>• Kalibre işlemleri</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <GlobeAltIcon className="w-8 h-8 text-blue-600 mb-4" />
                      <h3 className="font-semibold text-blue-900 mb-3">İleri Seviye</h3>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li>• Metod validasyonu</li>
                        <li>• Belirsizlik hesabı</li>
                        <li>• İstatistiksel analiz</li>
                        <li>• Troubleshooting</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <UsersIcon className="w-8 h-8 text-purple-600 mb-4" />
                      <h3 className="font-semibold text-purple-900 mb-3">Özel Eğitimler</h3>
                      <ul className="text-purple-700 text-sm space-y-2">
                        <li>• Müşteri odaklı program</li>
                        <li>• Saha eğitimleri</li>
                        <li>• Online seminerler</li>
                        <li>• Sertifikasyon programları</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border border-emerald-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Eğitim Avantajları</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>Sertifikalı eğitmenler</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>Uygulamalı eğitim</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>Eğitim materyalleri</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Kalibrasyon Hizmetleri */}
              <section id="kalibrasyon" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <Cog6ToothIcon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kalibrasyon Hizmetleri</h2>
                      <p className="text-gray-600">Cihaz kalibrasyonu ve kalite güvence hizmetleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Kalibrasyon Kapsamı</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                            <h4 className="font-medium text-cyan-900 mb-2">Ağırlık & Hacim</h4>
                            <p className="text-cyan-700 text-sm">Teraziler, pipetler, büretler, hacim ölçer</p>
                          </div>
                          
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-2">Sıcaklık & Basınç</h4>
                            <p className="text-blue-700 text-sm">Termometreler, fırınlar, otoklavlar</p>
                          </div>
                          
                          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h4 className="font-medium text-purple-900 mb-2">Elektriksel Ölçümler</h4>
                            <p className="text-purple-700 text-sm">pH metreler, iletkenlik ölçerler</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Kalibrasyon Süreci</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <CalendarDaysIcon className="w-5 h-5 text-cyan-500 mt-1" />
                            <div>
                              <h4 className="font-medium text-gray-900">Planlama</h4>
                              <p className="text-gray-600 text-sm">Kalibrasyon planı oluşturma</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-cyan-500 mt-1" />
                            <div>
                              <h4 className="font-medium text-gray-900">Uygulama</h4>
                              <p className="text-gray-600 text-sm">Standart prosedürler ile kalibrasyon</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <DocumentCheckIcon className="w-5 h-5 text-cyan-500 mt-1" />
                            <div>
                              <h4 className="font-medium text-gray-900">Raporlama</h4>
                              <p className="text-gray-600 text-sm">Detaylı kalibrasyon sertifikası</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <ClockIcon className="w-5 h-5 text-cyan-500 mt-1" />
                            <div>
                              <h4 className="font-medium text-gray-900">Takip</h4>
                              <p className="text-gray-600 text-sm">Kalibrasyon tarih takibi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                      <h4 className="font-semibold text-cyan-900 mb-3">Akreditasyon & Standartlar</h4>
                      <p className="text-cyan-700 text-sm mb-3">
                        TÜRKAK akreditasyonlu laboratuvarımızda, uluslararası standartlara uygun kalibrasyon hizmeti sunuyoruz.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full">ISO/IEC 17025</span>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full">TÜRKAK Akreditasyonu</span>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full">Uluslararası İzlenebilirlik</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bakım ve Onarım */}
              <section id="bakim-onarim" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <WrenchScrewdriverIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Bakım ve Onarım</h2>
                      <p className="text-gray-600">Preventif bakım ve teknik servis hizmetleri</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Servis Paketleri</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <HeartIcon className="w-5 h-5 text-green-600" />
                            <h4 className="font-medium text-green-900">Temel Bakım</h4>
                          </div>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Yıllık preventif bakım</li>
                            <li>• Temizlik ve kalibre</li>
                            <li>• Performans kontrolü</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <StarIcon className="w-5 h-5 text-blue-600" />
                            <h4 className="font-medium text-blue-900">Kapsamlı Bakım</h4>
                          </div>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• 6 aylık preventif bakım</li>
                            <li>• Yedek parça dahil</li>
                            <li>• Öncelikli teknik destek</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <BoltIcon className="w-5 h-5 text-purple-600" />
                            <h4 className="font-medium text-purple-900">Premium Bakım</h4>
                          </div>
                          <ul className="text-purple-700 text-sm space-y-1">
                            <li>• 3 aylık preventif bakım</li>
                            <li>• Uzaktan izleme sistemi</li>
                            <li>• 24/7 acil müdahale</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Hızlı Müdahale</h3>
                      <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-6">
                        <div className="text-center">
                          <ClockIcon className="w-12 h-12 text-red-600 mx-auto mb-3" />
                          <h4 className="font-semibold text-red-900 mb-2">4 Saat Garanti</h4>
                          <p className="text-red-700 text-sm">Acil durumlar için 4 saat içinde müdahale garantisi</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <TruckIcon className="w-5 h-5 text-gray-500" />
                          <span className="text-sm">Türkiye geneli servis ağı</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-5 h-5 text-gray-500" />
                          <span className="text-sm">7/24 teknik destek hattı</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <ComputerDesktopIcon className="w-5 h-5 text-gray-500" />
                          <span className="text-sm">Uzaktan erişim desteği</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-gray-500" />
                          <span className="text-sm">Orijinal yedek parça garantisi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Remaining sections for Özel Projeler category... */}
              
              {/* Özel Cihaz Tasarımı */}
              <section id="ozel-cihaz-tasarimi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Özel Cihaz Tasarımı</h2>
                      <p className="text-gray-600">İhtiyaca özel analitik cihaz tasarım ve üretimi</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
                        <PuzzlePieceIcon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-amber-900 mb-2">Özel Tasarım</h3>
                        <p className="text-amber-700 text-sm">İhtiyacınıza özel çözüm</p>
                      </div>
                      
                      <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <CogIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-blue-900 mb-2">Prototip Üretimi</h3>
                        <p className="text-blue-700 text-sm">Hızlı prototip geliştirme</p>
                      </div>
                      
                      <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                        <PlayIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-green-900 mb-2">Test & Geliştirme</h3>
                        <p className="text-green-700 text-sm">Sürekli iyileştirme</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                      <h4 className="font-semibold text-amber-900 mb-4">Tasarım Süreci</h4>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                        <div className="p-3">
                          <div className="w-8 h-8 bg-amber-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-amber-800 font-semibold text-sm">1</span>
                          </div>
                          <p className="text-amber-700 text-xs">İhtiyaç Analizi</p>
                        </div>
                        <div className="p-3">
                          <div className="w-8 h-8 bg-amber-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-amber-800 font-semibold text-sm">2</span>
                          </div>
                          <p className="text-amber-700 text-xs">Konsept Tasarım</p>
                        </div>
                        <div className="p-3">
                          <div className="w-8 h-8 bg-amber-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-amber-800 font-semibold text-sm">3</span>
                          </div>
                          <p className="text-amber-700 text-xs">Prototip Üretim</p>
                        </div>
                        <div className="p-3">
                          <div className="w-8 h-8 bg-amber-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-amber-800 font-semibold text-sm">4</span>
                          </div>
                          <p className="text-amber-700 text-xs">Test & Optimizasyon</p>
                        </div>
                        <div className="p-3">
                          <div className="w-8 h-8 bg-amber-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-amber-800 font-semibold text-sm">5</span>
                          </div>
                          <p className="text-amber-700 text-xs">Seri Üretim</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sistem Entegrasyonu */}
              <section id="sistem-entegrasyonu" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Sistem Entegrasyonu</h2>
                      <p className="text-gray-600">Mevcut sistemlerle entegrasyon çözümleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Entegrasyon Alanları</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-medium text-slate-900 mb-2">ERP Sistemleri</h4>
                            <p className="text-slate-700 text-sm">SAP, Oracle, Microsoft Dynamics entegrasyonu</p>
                          </div>
                          
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-2">Cihaz Entegrasyonu</h4>
                            <p className="text-blue-700 text-sm">Analiz cihazlarından otomatik veri aktarımı</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-medium text-green-900 mb-2">Kalite Sistemleri</h4>
                            <p className="text-green-700 text-sm">QMS ve dokümantasyon sistemleri</p>
                          </div>
                          
                          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h4 className="font-medium text-purple-900 mb-2">Raporlama Araçları</h4>
                            <p className="text-purple-700 text-sm">BI ve dashboard araçları entegrasyonu</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-4">Entegrasyon Avantajları</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <BoltIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Otomatik veri akışı</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Hata oranı azaltma</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <ClockIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Zaman tasarrufu</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <ChartBarIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm">Gerçek zamanlı raporlama</span>
                          </div>
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