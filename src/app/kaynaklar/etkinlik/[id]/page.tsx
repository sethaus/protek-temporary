'use client'

import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  ShareIcon,
  ArrowLeftIcon,
  EyeIcon,
  HeartIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface PageProps {
  params: {
    id: string
  }
}

export default function EtkinlikDetayPage({ params }: PageProps) {
  const router = useRouter()
  const [event, setEvent] = useState<any | null>(null)
  const [relatedEvents, setRelatedEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Tek etkinlik çek
        const eventResponse = await fetch(`/api/events/${params.id}`)
        const eventResult = await eventResponse.json()
        
        if (eventResult.success) {
          setEvent(eventResult.data)
          
          // Tüm etkinlikleri çek ve ilgili etkinlikleri filtrele
          const allEventsResponse = await fetch('/api/events')
          const allEventsResult = await allEventsResponse.json()
          
          if (allEventsResult.success) {
            const allEvents = allEventsResult.data
            const related = allEvents.filter((e: any) => 
              e.id !== params.id && e.eventType === eventResult.data.eventType
            ).slice(0, 3)
            setRelatedEvents(related)
          }
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Etkinlik yükleme hatası:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvent()
  }, [params.id])

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Etkinlik yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!event) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getEventTypeName = (eventType: string) => {
    switch (eventType) {
      case 'fuar': return 'Fuar'
      case 'seminer': return 'Seminer'
      case 'webinar': return 'Webinar'
      case 'workshop': return 'Workshop'
      case 'konferans': return 'Konferans'
      default: return eventType
    }
  }

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'fuar': return 'purple'
      case 'seminer': return 'blue'
      case 'webinar': return 'indigo'
      case 'workshop': return 'teal'
      case 'konferans': return 'green'
      default: return 'gray'
    }
  }

  const isUpcoming = new Date(event.startDate) > new Date()
  const isPast = new Date(event.endDate || event.startDate) < new Date()

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Hero Section */}
        <div className="relative">
          <div className="h-96 overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          
          {/* Back Button */}
          <div className="absolute top-8 left-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center space-x-2 bg-white/90 hover:bg-white px-4 py-2 rounded-xl font-medium text-gray-900 transition-colors backdrop-blur-sm"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Geri Dön</span>
            </button>
          </div>

          {/* Event Status Badge */}
          <div className="absolute top-8 right-8">
            {isUpcoming && (
              <span className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium">
                Yaklaşan Etkinlik
              </span>
            )}
            {isPast && (
              <span className="bg-gray-600 text-white px-4 py-2 rounded-xl font-medium">
                Geçmiş Etkinlik
              </span>
            )}
          </div>

          {/* Event Header */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`inline-block bg-${getEventTypeColor(event.eventType)}-600 text-white px-3 py-1 rounded-lg text-sm font-medium uppercase`}>
                    {getEventTypeName(event.eventType)}
                  </span>
                  {event.featured && (
                    <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-lg text-sm font-medium">
                      Öne Çıkan
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {event.title}
                </h1>
                <p className="text-xl text-gray-200 mb-6">
                  {event.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">
                        {formatDate(event.startDate)}
                        {event.endDate && ` - ${formatDate(event.endDate)}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BuildingOffice2Icon className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="w-5 h-5" />
                    <span>1.2K ilgi gösterme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                  <div className="prose prose-lg max-w-none">
                    {event.content.split('\n').map((paragraph: string, index: number) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            {paragraph.replace('## ', '')}
                          </h2>
                        )
                      } else if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                            {paragraph.replace('### ', '')}
                          </h3>
                        )
                      } else if (paragraph.startsWith('#### ')) {
                        return (
                          <h4 key={index} className="text-lg font-medium text-gray-900 mt-4 mb-2">
                            {paragraph.replace('#### ', '')}
                          </h4>
                        )
                      } else if (paragraph.startsWith('- ')) {
                        return (
                          <ul key={index} className="list-disc list-inside my-4">
                            <li className="text-gray-700">{paragraph.replace('- ', '')}</li>
                          </ul>
                        )
                      } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <p key={index} className="font-semibold text-gray-900 my-4">
                            {paragraph.replace(/^\*\*|\*\*$/g, '')}
                          </p>
                        )
                      } else if (paragraph.trim()) {
                        return (
                          <p key={index} className="text-gray-700 leading-relaxed my-4">
                            {paragraph}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
                        <HeartIcon className="w-5 h-5" />
                        <span>İlgi Göster</span>
                      </button>
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                        <ShareIcon className="w-5 h-5" />
                        <span>Paylaş</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Registration Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Etkinlik Bilgileri</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Tarih</p>
                        <p className="text-gray-600">
                          {formatDate(event.startDate)}
                          {event.endDate && ` - ${formatDate(event.endDate)}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <BuildingOffice2Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Konum</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <UserGroupIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Etkinlik Türü</p>
                        <p className="text-gray-600">{getEventTypeName(event.eventType)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Registration Button */}
                  {isUpcoming && event.registrationUrl && (
                    <div className="mt-6">
                      <a 
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center space-x-2 bg-${getEventTypeColor(event.eventType)}-600 hover:bg-${getEventTypeColor(event.eventType)}-700 text-white px-6 py-3 rounded-xl font-medium transition-colors`}
                      >
                        <span>Kayıt Ol</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {isPast && (
                    <div className="mt-6">
                      <button 
                        disabled
                        className="w-full flex items-center justify-center space-x-2 bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-medium cursor-not-allowed"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Etkinlik Tamamlandı</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                  <h4 className="font-semibold mb-4">Sorularınız mı var?</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Etkinlik hakkında daha fazla bilgi almak için bizimle iletişime geçin.
                  </p>
                  <a 
                    href="/iletisim"
                    className="block text-center bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    İletişime Geç
                  </a>
                </div>
              </div>
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Benzer Etkinlikler</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedEvents.map((relatedEvent) => (
                    <article 
                      key={relatedEvent.id}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/kaynaklar/etkinlik/${relatedEvent.id}`)}
                    >
                      <img 
                        src={relatedEvent.imageUrl} 
                        alt={relatedEvent.title}
                        className="w-full h-48 object-cover rounded-lg mb-4 group-hover:shadow-lg transition-shadow"
                      />
                      <div className="mb-2">
                        <span className={`inline-block bg-${getEventTypeColor(relatedEvent.eventType)}-100 text-${getEventTypeColor(relatedEvent.eventType)}-800 px-2 py-1 rounded text-xs font-medium uppercase`}>
                          {getEventTypeName(relatedEvent.eventType)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {relatedEvent.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {relatedEvent.description.slice(0, 100)}...
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>{formatDate(relatedEvent.startDate)}</p>
                        <p>{relatedEvent.location}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 