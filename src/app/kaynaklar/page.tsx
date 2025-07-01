'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  DocumentTextIcon,
  AcademicCapIcon,
  NewspaperIcon,
  ChevronRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  BookOpenIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentCheckIcon,
  VideoCameraIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  EyeIcon,
  PlayIcon,
  DocumentIcon,
  CubeIcon,
  BeakerIcon,
  ClockIcon,
  GlobeAltIcon,
  UserGroupIcon,
  CogIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  LightBulbIcon,
  HeartIcon,
  StarIcon,
  TagIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

const sections = {
  "Haberler ve Etkinlikler": [
    { id: "sirket-haberleri", name: "Şirket Haberleri", icon: NewspaperIcon },
    { id: "sektor-guncel", name: "Sektör Güncel", icon: ArrowTrendingUpIcon },
    { id: "etkinlik-takvimi", name: "Etkinlik Takvimi", icon: CalendarDaysIcon },
    { id: "basari-hikayeleri", name: "Başarı Hikayeleri", icon: TrophyIcon }
  ],
  "Dokümantasyon": [
    { id: "urun-katalogu", name: "Ürün Kataloğu", icon: BookOpenIcon },

    { id: "metod-ornekleri", name: "Metod Örnekleri", icon: ClipboardDocumentCheckIcon }
  ],
  "Eğitim ve Destek": [
    { id: "sss", name: "FAQ", icon: QuestionMarkCircleIcon },
    { id: "teknik-destek", name: "Teknik Destek", icon: WrenchScrewdriverIcon }
  ]
}

export default function KaynaklarPage() {
  const [activeSection, setActiveSection] = useState('sirket-haberleri')
  const [newsData, setNewsData] = useState<any[]>([])
  const [eventsData, setEventsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // API'den veri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/events')
        ])
        const newsResult = await newsRes.json()
        const eventsResult = await eventsRes.json()
        
        setNewsData(newsResult.data || [])
        setEventsData(eventsResult.data || [])
      } catch (error) {
        console.error('Veri çekme hatası:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Helper functions
  const getFeaturedNews = () => newsData.filter(news => news.featured)
  const getFeaturedEvents = () => eventsData.filter(event => event.featured)
  const getUpcomingEvents = () => eventsData.filter(event => new Date(event.startDate) > new Date())

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const groupedSections = sections
  const featuredNews = getFeaturedNews()
  const featuredEvents = getFeaturedEvents()
  const upcomingEvents = getUpcomingEvents()

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30" lang="tr" style={{ hyphens: 'auto', wordBreak: 'break-word' }}>
        <div className="container-custom py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Kaynaklar</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Teknik dokümantasyondan eğitim materyallerine, sektör haberlerinden etkinlik duyurularına kadar ihtiyacınız olan tüm kaynaklar burada.
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
                    <h4 className="font-semibold mb-4">Destek Merkezi</h4>
                    <div className="space-y-3">
                      <a href="tel:+902121234567" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                        <PhoneIcon className="w-5 h-5" />
                        <span>+90 (212) 123 45 67</span>
                      </a>
                      <a href="mailto:destek@protekanalitik.com" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                        <EnvelopeIcon className="w-5 h-5" />
                        <span>destek@protekanalitik.com</span>
                      </a>
                      <a href="/iletisim" className="block mt-4 text-center bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
                        Teknik Destek Talebi
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-16">
              {/* Şirket Haberleri */}
              <section id="sirket-haberleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <NewspaperIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Şirket Haberleri</h2>
                      <p className="text-gray-600 hyphens-auto break-words">Şirket gelişmeleri ve duyurular</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {newsData.filter(news => news.category === 'sirket-haberleri').length > 0 ? (
                      newsData.filter(news => news.category === 'sirket-haberleri').map((news, index) => (
                        <article key={index} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                          <img 
                            src={news.imageUrl} 
                            alt={news.title}
                            className="w-full md:w-48 h-48 md:h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-gray-900 text-lg hyphens-auto break-words">{news.title}</h3>
                              {news.featured && (
                                <StarIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                              )}
                            </div>
                            <p className="text-gray-600 mb-4 hyphens-auto break-words">{news.summary}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500 min-w-0">
                                <span className="flex-shrink-0">{formatDate(news.publishDate)}</span>
                                <div className="flex flex-wrap gap-1">
                                  {news.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                    <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hyphens-auto break-words">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button 
                                onClick={() => router.push(`/kaynaklar/haber/${news.id}`)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1 flex-shrink-0 ml-4"
                              >
                                <span>Devamını Oku</span>
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <NewspaperIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Yeni içeriklerimiz çok yakında yayında...</h3>
                        <p className="text-gray-500">Şirket haberlerimizi takip etmek için sayfayı ziyaret etmeye devam edin.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Sektör Güncel */}
              <section id="sektor-guncel" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Sektör Güncel</h2>
                      <p className="text-gray-600 hyphens-auto break-words">Analitik sektör trendleri ve gelişmeleri</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {newsData.filter(news => news.category === 'sektor-guncel').length > 0 ? (
                      newsData.filter(news => news.category === 'sektor-guncel').map((news, index) => (
                        <article key={index} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                          <img 
                            src={news.imageUrl} 
                            alt={news.title}
                            className="w-full md:w-48 h-48 md:h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-gray-900 text-lg hyphens-auto break-words">{news.title}</h3>
                              {news.featured && (
                                <StarIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                              )}
                            </div>
                            <p className="text-gray-600 mb-4 hyphens-auto break-words">{news.summary}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500 min-w-0">
                                <span className="flex-shrink-0">{formatDate(news.publishDate)}</span>
                                <div className="flex flex-wrap gap-1">
                                  {news.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                    <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hyphens-auto break-words">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button 
                                onClick={() => router.push(`/kaynaklar/haber/${news.id}`)}
                                className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center space-x-1 flex-shrink-0 ml-4"
                              >
                                <span>Devamını Oku</span>
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ArrowTrendingUpIcon className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Yeni içeriklerimiz çok yakında yayında...</h3>
                        <p className="text-gray-500">Sektör güncellemelerini takip etmek için sayfayı ziyaret etmeye devam edin.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Etkinlik Takvimi */}
              <section id="etkinlik-takvimi" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <CalendarDaysIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Etkinlik Takvimi</h2>
                      <p className="text-gray-600 hyphens-auto break-words">Fuar, seminer ve etkinlik duyuruları</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {eventsData.length > 0 ? (
                      eventsData.map((event, index) => (
                        <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row gap-6">
                            <img 
                              src={event.imageUrl} 
                              alt={event.title}
                              className="w-full md:w-48 h-48 md:h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-gray-900 text-lg mb-1 hyphens-auto break-words">{event.title}</h3>
                                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded uppercase font-medium">
                                    {event.eventType}
                                  </span>
                                </div>
                                {event.featured && (
                                  <StarIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                                )}
                              </div>
                              <p className="text-gray-600 mb-4 hyphens-auto break-words">{event.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="space-y-1 text-sm text-gray-500 min-w-0 flex-1">
                                  <div className="flex items-center space-x-2">
                                    <CalendarDaysIcon className="w-4 h-4 flex-shrink-0" />
                                    <span className="hyphens-auto break-words">
                                      {formatDate(event.startDate)}
                                      {event.endDate && ` - ${formatDate(event.endDate)}`}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <BuildingOffice2Icon className="w-4 h-4 flex-shrink-0" />
                                    <span className="hyphens-auto break-words">{event.location}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                                  <button 
                                    onClick={() => router.push(`/kaynaklar/etkinlik/${event.id}`)}
                                    className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center space-x-1"
                                  >
                                    <span>Detaylar</span>
                                    <EyeIcon className="w-4 h-4" />
                                  </button>
                                  {event.registrationUrl && (
                                    <a 
                                      href={event.registrationUrl}
                                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                                    >
                                      Kayıt Ol
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CalendarDaysIcon className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Yeni içeriklerimiz çok yakında yayında...</h3>
                        <p className="text-gray-500">Etkinlik duyurularımızı takip etmek için sayfayı ziyaret etmeye devam edin.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Başarı Hikayeleri */}
              <section id="basari-hikayeleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <TrophyIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Başarı Hikayeleri</h2>
                      <p className="text-gray-600 hyphens-auto break-words">Müşteri başarı hikayeleri ve case studyler</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {newsData.filter(news => news.category === 'basari-hikayeleri').map((story, index) => (
                      <article key={index} className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                        <div className="flex flex-col md:flex-row gap-6">
                          <img 
                            src={story.imageUrl} 
                            alt={story.title}
                            className="w-full md:w-48 h-48 md:h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg mb-3 hyphens-auto break-words">{story.title}</h3>
                            <p className="text-gray-600 mb-4 hyphens-auto break-words">{story.summary}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500 min-w-0">
                                <span className="flex-shrink-0">{formatDate(story.publishDate)}</span>
                                <div className="flex flex-wrap gap-1">
                                  {story.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                    <span key={tagIndex} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs hyphens-auto break-words">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button 
                                onClick={() => router.push(`/kaynaklar/haber/${story.id}`)}
                                className="text-yellow-600 hover:text-yellow-800 font-medium text-sm flex items-center space-x-1 flex-shrink-0 ml-4"
                              >
                                <span className="whitespace-nowrap">Case Study İncele</span>
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {/* Ürün Kataloğu */}
              <section id="urun-katalogu" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpenIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Ürün Kataloğu</h2>
                                              <p className="text-gray-600 hyphens-auto break-words">Tüm ürünlerimizin detaylı kataloğu</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <div className="max-w-md mx-auto">
                      <div className="p-8 bg-blue-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow">
                        <BookOpenIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">2024 Ürün Kataloğu</h3>
                        <p className="text-blue-700 mb-6">
                          Tüm ürün gamımızı içeren kapsamlı katalog. Teknik özellikler, fiyat bilgileri ve uygulama alanları dahil.
                        </p>
                        <a 
                          href="https://heyzine.com/flip-book/c1d72a3b02.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          <BookOpenIcon className="w-5 h-5" />
                          <span>Kataloğu Görüntüle</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>



              {/* Metod Örnekleri */}
              <section id="metod-ornekleri" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <ClipboardDocumentCheckIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Metod Örnekleri</h2>
                      <p className="text-gray-600">Analiz metod örnekleri ve uygulamaları</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        title: "Gıda Güvenliği Analiz Metotları",
                        description: "E.coli, Salmonella ve Listeria tespiti için hızlı test metotları",
                        methods: ["PCR Metodları", "Immunoassay Teknikleri", "Kültür Bazlı Testler"],
                        difficulty: "Orta",
                        time: "2-4 saat",
                        color: "red"
                      },
                      {
                        title: "Protein Analizi Protokolleri",
                        description: "Süt ve et ürünlerinde protein miktarı belirleme metotları",
                        methods: ["Kjeldahl Metodu", "Bradford Assay", "BCA Protein Assay"],
                        difficulty: "Kolay",
                        time: "1-2 saat",
                        color: "blue"
                      },
                      {
                        title: "Pestisit Kalıntı Analizi",
                        description: "Meyve ve sebzelerde pestisit kalıntılarının GC-MS ile analizi",
                        methods: ["QuEChERS Ekstraksiyon", "GC-MS/MS Analizi", "LC-MS/MS Validasyon"],
                        difficulty: "İleri",
                        time: "4-6 saat",
                        color: "green"
                      }
                    ].map((method, index) => (
                      <div key={index} className={`p-6 bg-${method.color}-50 border border-${method.color}-200 rounded-xl`}>
                        <div className="flex items-start justify-between mb-4">
                          <h3 className={`font-semibold text-${method.color}-900`}>{method.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs bg-${method.color}-200 text-${method.color}-800 px-2 py-1 rounded`}>
                              {method.difficulty}
                            </span>
                            <span className={`text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded`}>
                              {method.time}
                            </span>
                          </div>
                        </div>
                        <p className={`text-${method.color}-700 text-sm mb-4`}>{method.description}</p>
                        <div className="space-y-2 mb-4">
                          <h4 className={`text-sm font-medium text-${method.color}-900`}>İçindeki Metotlar:</h4>
                          <div className="flex flex-wrap gap-2">
                            {method.methods.map((methodName, idx) => (
                              <span key={idx} className={`text-xs bg-white text-${method.color}-700 px-2 py-1 rounded border border-${method.color}-200`}>
                                {methodName}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className={`text-${method.color}-600 hover:text-${method.color}-800 text-sm font-medium flex items-center space-x-2`}>
                          <DocumentArrowDownIcon className="w-4 h-4" />
                          <span>Metot Dökümanını İndir</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>



              {/* SSS (FAQ) */}
              <section id="sss" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <QuestionMarkCircleIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Sıkça Sorulan Sorular</h2>
                      <p className="text-gray-600">En çok merak edilen sorular ve cevapları</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        question: "HPLC sisteminde baseline problemi nasıl çözülür?",
                        answer: "Baseline problemleri genellikle kolon kontaminasyonu, pompa problemleri veya detector ayarlarından kaynaklanır. İlk olarak sistemi temizleyip, mobil faz kalitesini kontrol edin."
                      },
                      {
                        question: "GC-MS analizinde neden peak splitting oluşur?",
                        answer: "Peak splitting, genellikle enjektör sıcaklığının düşük olması, kolon head space problemleri veya carrier gas akış problemlerinden kaynaklanır. Sistematik troubleshooting gereklidir."
                      },
                      {
                        question: "pH metre kalibrasyonu ne sıklıkla yapılmalı?",
                        answer: "pH metre kalibrasyonu günlük kullanımda her gün, yoğun kullanımda günde iki kez yapılmalıdır. Kritik analizler öncesi mutlaka kalibrasyon kontrol edilmelidir."
                      },
                      {
                        question: "Mikrobiyal test kitlerinin saklama koşulları neler?",
                        answer: "Test kitleri 2-8°C&apos;de, kuru ve karanlık ortamda saklanmalıdır. Dondurmaktan kaçının ve son kullanma tarihine dikkat edin."
                      },
                      {
                        question: "Spektrofotometre ölçümlerinde doğruluk nasıl artırılır?",
                        answer: "Blank ölçümü yapın, küvet temizliğine dikkat edin, örnekleri homojen hale getirin ve ölçüm sıcaklığını kontrol edin."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6">
                        <h4 className="font-medium text-gray-900 mb-3">{faq.question}</h4>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">Aradığınız soruyu bulamadınız mı?</p>
                    <a 
                      href="/iletisim#teknik-destek" 
                      className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                    >
                                              <span>Teknik Destek&apos;e Sorun</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Teknik Destek */}
              <section id="teknik-destek" className="scroll-mt-28">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <WrenchScrewdriverIcon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 hyphens-auto break-words">Teknik Destek</h2>
                      <p className="text-gray-600">Online teknik destek ve troubleshooting</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-teal-50 border border-teal-200 rounded-xl">
                      <div className="text-center">
                        <PhoneIcon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-teal-900 mb-2">Telefon Desteği</h3>
                        <p className="text-teal-700 text-sm mb-4">7/24 acil destek hattı</p>
                        <a href="tel:+902121234567" className="text-teal-600 hover:text-teal-800 font-medium">
                          +90 (212) 123 45 67
                        </a>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="text-center">
                        <EnvelopeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-blue-900 mb-2">E-mail Desteği</h3>
                        <p className="text-blue-700 text-sm mb-4">Detaylı sorular için</p>
                        <a href="mailto:teknik@protekanalitik.com" className="text-blue-600 hover:text-blue-800 font-medium">
                          teknik@protekanalitik.com
                        </a>
                      </div>
                    </div>

                    <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
                      <div className="text-center">
                        <GlobeAltIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-purple-900 mb-2">Uzaktan Erişim</h3>
                        <p className="text-purple-700 text-sm mb-4">Cihaz üzerinden destek</p>
                        <button className="text-purple-600 hover:text-purple-800 font-medium">
                          Oturum Başlat
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Destek Süreci</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { step: "1", title: "Problem Bildirimi", desc: "Sorunu detaylı açıklayın" },
                        { step: "2", title: "Analiz", desc: "Teknik ekip sorunu inceler" },
                        { step: "3", title: "Çözüm", desc: "Adım adım çözüm rehberi" },
                        { step: "4", title: "Takip", desc: "Çözüm kontrolü ve feedback" }
                      ].map((item, index) => (
                        <div key={index} className="text-center">
                          <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">
                            {item.step}
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                        </div>
                      ))}
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