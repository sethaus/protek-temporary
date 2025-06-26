'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

type ResourceType = 'all' | 'news' | 'events'

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<ResourceType>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [news, setNews] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Haber ve etkinlikleri API'den çek
  const fetchResources = async () => {
    setLoading(true)
    try {
      const [newsRes, eventsRes] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/events')
      ])
      const newsData = await newsRes.json()
      const eventsData = await eventsRes.json()
      setNews(newsData.data || [])
      setEvents(eventsData.data || [])
    } catch (e) {
      setNews([])
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  // Silme işlemleri API üzerinden
  const handleDeleteNews = async (id: string) => {
    if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      await fetch(`/api/news/${id}`, { method: 'DELETE' })
      fetchResources()
      alert('Haber başarıyla silindi!')
    }
  }
  const handleDeleteEvent = async (id: string) => {
    if (confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
      await fetch(`/api/events/${id}`, { method: 'DELETE' })
      fetchResources()
      alert('Etkinlik başarıyla silindi!')
    }
  }

  const filteredNews = news.filter(item =>
    searchTerm === '' || 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEvents = events.filter(item =>
    searchTerm === '' || 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kaynak Yönetimi</h1>
          <p className="text-gray-600">Haber ve etkinlik içeriklerini yönetin</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/resources/news/new"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span>Yeni Haber</span>
          </Link>
          <Link
            href="/admin/resources/events/new"
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Yeni Etkinlik</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Tümü ({news.length + events.length})
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'news'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Haberler ({news.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'events'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Etkinlikler ({events.length})
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Kaynaklarda ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* News Content */}
      {(activeTab === 'all' || activeTab === 'news') && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Haberler
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Haber</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-lg object-cover" src={news.imageUrl} alt="" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{news.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{news.summary}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        news.category === 'sirket-haberleri' 
                          ? 'bg-blue-100 text-blue-800'
                          : news.category === 'sektor-guncel'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {news.category === 'sirket-haberleri' ? 'Şirket' : 
                         news.category === 'sektor-guncel' ? 'Sektör' : 'Başarı'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(news.publishDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {news.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Öne Çıkan
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-900" title="Görüntüle">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <Link href={`/admin/resources/news/${news.id}/edit`} className="text-green-600 hover:text-green-900" title="Düzenle">
                          <PencilIcon className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDeleteNews(news.id)} className="text-red-600 hover:text-red-900" title="Sil">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Events Content */}
      {(activeTab === 'all' || activeTab === 'events') && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Etkinlikler
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Etkinlik</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tür</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasyon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-lg object-cover" src={event.imageUrl} alt="" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                        {event.eventType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.startDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-900" title="Görüntüle">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <Link href={`/admin/resources/events/${event.id}/edit`} className="text-green-600 hover:text-green-900" title="Düzenle">
                          <PencilIcon className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 hover:text-red-900" title="Sil">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 