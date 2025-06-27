'use client'

import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  CalendarIcon,
  TagIcon,
  ShareIcon,
  ArrowLeftIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface PageProps {
  params: {
    id: string
  }
}

export default function HaberDetayPage({ params }: PageProps) {
  const router = useRouter()
  const [news, setNews] = useState<any | null>(null)
  const [relatedNews, setRelatedNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Tek haber çek
        const newsResponse = await fetch(`/api/news/${params.id}`)
        const newsResult = await newsResponse.json()
        
        if (newsResult.success) {
          setNews(newsResult.data)
          
          // Tüm haberleri çek ve ilgili haberleri filtrele
          const allNewsResponse = await fetch('/api/news')
          const allNewsResult = await allNewsResponse.json()
          
          if (allNewsResult.success) {
            const allNews = allNewsResult.data
            const related = allNews.filter((n: any) => 
              n.id !== params.id && n.category === newsResult.data.category
            ).slice(0, 3)
            setRelatedNews(related)
          }
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Haber yükleme hatası:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    
    fetchNews()
  }, [params.id])

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Haber yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!news) {
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

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'sirket-haberleri': return 'Şirket Haberleri'
      case 'sektor-guncel': return 'Sektör Güncel'
      case 'basari-hikayeleri': return 'Başarı Hikayeleri'
      default: return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sirket-haberleri': return 'blue'
      case 'sektor-guncel': return 'green'
      case 'basari-hikayeleri': return 'yellow'
      default: return 'gray'
    }
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Hero Section */}
        <div className="relative">
          <div className="h-96 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title}
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

          {/* Article Header */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`inline-block bg-${getCategoryColor(news.category)}-600 text-white px-3 py-1 rounded-lg text-sm font-medium`}>
                    {getCategoryName(news.category)}
                  </span>
                  {news.featured && (
                    <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-lg text-sm font-medium">
                      Öne Çıkan
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {news.title}
                </h1>
                <p className="text-xl text-gray-200 mb-6">
                  {news.summary}
                </p>
                <div className="flex items-center space-x-6 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{formatDate(news.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="w-5 h-5" />
                    <span>2.4K görüntüleme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
              <div className="prose prose-lg max-w-none">
                {news.content.split('\n').map((paragraph: string, index: number) => {
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
                  } else if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc list-inside my-4">
                        <li className="text-gray-700">{paragraph.replace('- ', '')}</li>
                      </ul>
                    )
                  } else if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                    return (
                      <blockquote key={index} className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-600 bg-blue-50 py-4 rounded-r-lg">
                        {paragraph.replace(/^\*|\*$/g, '')}
                      </blockquote>
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

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <TagIcon className="w-5 h-5 text-gray-400" />
                                      {news.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
                    <HeartIcon className="w-5 h-5" />
                    <span>Beğen</span>
                  </button>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span>Paylaş</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors">
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span>Yorum Yap</span>
                </button>
              </div>
            </div>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">İlgili Haberler</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedNews.map((relatedItem) => (
                    <article 
                      key={relatedItem.id}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/kaynaklar/haber/${relatedItem.id}`)}
                    >
                      <img 
                        src={relatedItem.imageUrl} 
                        alt={relatedItem.title}
                        className="w-full h-48 object-cover rounded-lg mb-4 group-hover:shadow-lg transition-shadow"
                      />
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {relatedItem.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {relatedItem.summary.slice(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(relatedItem.publishDate)}
                      </p>
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