'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CubeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  PlusIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { type Product } from '@/data/products'

interface DashboardCard {
  title: string
  value: string | number
  icon: any
  color: string
  link: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalNews: 0,
    totalEvents: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentNews, setRecentNews] = useState<any[]>([])

  // Fetch stats from API
  const fetchStats = async () => {
    try {
      setLoading(true)
      const [productsRes, newsRes, eventsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/news'),
        fetch('/api/events')
      ])
      
      const productsData = await productsRes.json()
      const newsData = await newsRes.json()
      const eventsData = await eventsRes.json()
      
      if (productsData.success && Array.isArray(productsData.data)) {
        const products: Product[] = productsData.data
        const categories = new Set(products.map((p: Product) => p.category)).size

        setStats({
          totalProducts: products.length,
          totalCategories: categories,
          totalNews: newsData.data?.length || 0,
          totalEvents: eventsData.data?.length || 0
        })
        setRecentNews(newsData.data?.slice(0, 3) || [])
      } else {
        // API error, use default values
        setStats({
          totalProducts: 0,
          totalCategories: 0,
          totalNews: newsData.data?.length || 0,
          totalEvents: eventsData.data?.length || 0
        })
        setRecentNews(newsData.data?.slice(0, 3) || [])
      }
    } catch (error) {
      console.error('Dashboard istatistikleri yüklenirken hata:', error)
      // Error, use default values
      setStats({
        totalProducts: 0,
        totalCategories: 0,
        totalNews: 0,
        totalEvents: 0
      })
      setRecentNews([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const dashboardCards: DashboardCard[] = [
    {
      title: 'Toplam Ürün',
      value: loading ? '...' : stats.totalProducts,
      icon: CubeIcon,
      color: 'blue',
      link: '/admin/products'
    },
    {
      title: 'Kategori Sayısı',
      value: loading ? '...' : stats.totalCategories,
      icon: ArrowTrendingUpIcon,
      color: 'green',
      link: '/admin/categories'
    },
    {
      title: 'Haber Sayısı',
      value: stats.totalNews,
      icon: DocumentTextIcon,
      color: 'purple',
      link: '/admin/resources'
    },
    {
      title: 'Etkinlik Sayısı',
      value: stats.totalEvents,
      icon: CalendarIcon,
      color: 'orange',
      link: '/admin/resources'
    }
  ]

  const quickActions = [
    {
      title: 'Yeni Ürün Ekle',
      description: 'Sisteme yeni ürün kaydet',
      icon: CubeIcon,
      link: '/admin/products/new',
      color: 'blue'
    },
    {
      title: 'Haber Ekle',
      description: 'Yeni haber yazısı oluştur',
      icon: DocumentTextIcon,
      link: '/admin/resources/news/new',
      color: 'green'
    },
    {
      title: 'Etkinlik Ekle',
      description: 'Yeni etkinlik duyurusu ekle',
      icon: CalendarIcon,
      link: '/admin/resources/events/new',
      color: 'purple'
    },
    {
      title: 'İletişim Düzenle',
      description: 'İletişim sayfa içeriklerini güncelle',
      icon: ChatBubbleLeftRightIcon,
      link: '/admin/contact',
      color: 'orange'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Protek Analitik CMS yönetim paneline hoş geldiniz</p>
        </div>
        <button 
          onClick={fetchStats}
          className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-200 text-sm"
          disabled={loading}
        >
          {loading ? '⏳ Yükleniyor...' : '🔄 Yenile'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                  <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* API Status Indicator */}
      {!loading && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 text-sm font-medium">
              ✅ API Bağlantısı Aktif - {stats.totalProducts} ürün başarıyla yüklendi
            </span>
          </div>
        </div>
      )}

      {/* Quick Actions - kompakt grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <Link key={idx} href={action.link} className={`flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition group text-center`}>
            <div className={`p-3 rounded-full bg-${action.color}-100 mb-2`}>
              <action.icon className={`w-6 h-6 text-${action.color}-600`} />
            </div>
            <span className="font-semibold text-gray-800 mb-1 group-hover:text-${action.color}-700 transition-colors">{action.title}</span>
            <span className="text-xs text-gray-500">{action.description}</span>
          </Link>
        ))}
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent News */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Son Haberler</h2>
            <Link 
              href="/admin/resources" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="space-y-3">
            {recentNews.map((news) => (
              <div key={news.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                <h3 className="font-medium text-gray-900 text-sm mb-1">{news.title}</h3>
                <p className="text-xs text-gray-500">{news.publishDate}</p>
                <div className="flex items-center space-x-2 mt-2">
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
                  {news.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Öne Çıkan
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sistem Bilgileri</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sistem Durumu</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Çevrimiçi
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">API Durumu</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                loading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {loading ? 'Yükleniyor...' : 'Bağlı'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Son Güncelleme</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString('tr-TR')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Versiyon</span>
              <span className="text-sm font-medium text-gray-900">v1.0.0</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <EyeIcon className="w-4 h-4" />
                <span>CMS Panel aktif ve kullanıma hazır</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 