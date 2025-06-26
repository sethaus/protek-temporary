'use client'

import { useState } from 'react'
import { 
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

interface ContactInfo {
  id: string
  title: string
  type: 'address' | 'phone' | 'email' | 'hours' | 'social'
  content: string
  icon: any
}

export default function ContactManagementPage() {
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([
    {
      id: 'main-office',
      title: 'Merkez Ofis',
      type: 'address',
      content: 'Atakent Mah. Dicle Cad. No:29\n34760 Ümraniye / İstanbul / TÜRKİYE',
      icon: BuildingOffice2Icon
    },
    {
      id: 'middle-east-office',
      title: 'Ortadoğu Ofis',
      type: 'address',
      content: 'Ras Al Khaimah, United Arab Emirates\nT: +971 7 203 1257\nT: +971 50 653 62 75',
      icon: BuildingOffice2Icon
    },
    {
      id: 'main-phone',
      title: 'Ana Hat',
      type: 'phone',
      content: '+90 (216) 329 39 60',
      icon: PhoneIcon
    },
    {
      id: 'pbx-phone',
      title: 'Pbx',
      type: 'phone',
      content: '+90 (216) 329 37 70',
      icon: PhoneIcon
    },
    {
      id: 'fax',
      title: 'Fax',
      type: 'phone',
      content: '+90 (216) 329 41 47',
      icon: PhoneIcon
    },
    {
      id: 'general-email',
      title: 'Genel Bilgi',
      type: 'email',
      content: 'info@protekanalitik.com',
      icon: EnvelopeIcon
    },
    {
      id: 'technical-email',
      title: 'Teknik Destek',
      type: 'email',
      content: 'teknik@protekanalitik.com',
      icon: EnvelopeIcon
    },
    {
      id: 'working-hours',
      title: 'Çalışma Saatleri',
      type: 'hours',
      content: 'Pazartesi - Cuma: 08:30 - 18:30\nCumartesi: 09:00 - 13:00\nPazar: Kapalı',
      icon: ClockIcon
    }
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const handleEdit = (id: string, content: string) => {
    setEditingId(id)
    setEditContent(content)
  }

  const handleSave = (id: string) => {
    setContactInfos(prev => prev.map(info => 
      info.id === id ? { ...info, content: editContent } : info
    ))
    setEditingId(null)
    setEditContent('')
    alert('İletişim bilgisi başarıyla güncellendi!')
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditContent('')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'address': return 'bg-blue-100 text-blue-800'
      case 'phone': return 'bg-green-100 text-green-800'
      case 'email': return 'bg-purple-100 text-purple-800'
      case 'hours': return 'bg-orange-100 text-orange-800'
      case 'social': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'address': return 'Adres'
      case 'phone': return 'Telefon'
      case 'email': return 'E-posta'
      case 'hours': return 'Çalışma Saatleri'
      case 'social': return 'Sosyal Medya'
      default: return 'Diğer'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">İletişim Bilgileri Yönetimi</h1>
        <p className="text-gray-600">İletişim sayfasındaki bilgileri düzenleyin ve güncelleyin</p>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contactInfos.map((info) => {
          const IconComponent = info.icon
          const isEditing = editingId === info.id

          return (
            <div key={info.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{info.title}</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(info.type)}`}>
                      {getTypeLabel(info.type)}
                    </span>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => handleEdit(info.id, info.content)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="İçeriği düzenleyin..."
                  />
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSave(info.id)}
                      className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Kaydet</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-700 whitespace-pre-line">
                  {info.content}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Kullanım Talimatları</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Her bilgi kartının sağ üst köşesindeki düzenle butonuna tıklayarak içeriği değiştirebilirsiniz</li>
          <li>• Çok satırlı bilgiler için Enter tuşunu kullanabilirsiniz</li>
          <li>• Değişiklikler anında uygulanır ve websitede görünür olur</li>
          <li>• Telefon numaraları uluslararası format (+90...) kullanılmalıdır</li>
        </ul>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {contactInfos.filter(info => info.type === 'address').length}
          </div>
          <div className="text-sm text-gray-600">Ofis Adresi</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {contactInfos.filter(info => info.type === 'phone').length}
          </div>
          <div className="text-sm text-gray-600">Telefon Numarası</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {contactInfos.filter(info => info.type === 'email').length}
          </div>
          <div className="text-sm text-gray-600">E-posta Adresi</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">
            {contactInfos.filter(info => info.type === 'hours').length}
          </div>
          <div className="text-sm text-gray-600">Çalışma Saati</div>
        </div>
      </div>
    </div>
  )
} 