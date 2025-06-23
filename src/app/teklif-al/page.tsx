'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import { 
  CheckIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon,
  BeakerIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
  LightBulbIcon,
  RocketLaunchIcon,
  CubeIcon,
  DocumentArrowUpIcon,
  PaperClipIcon,
  CheckCircleIcon,
  SparklesIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

interface FormData {
  quoteType: string
  category: string
  subcategory: string
  customRequirement: string
  projectDetails: string
  budget: string
  timeline: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  position: string
  files: File[]
}

const categories = [
  {
    id: 'laboratuvar-ekipmanlari',
    name: 'Laboratuvar Ekipmanları',
    description: 'Analiz ekipmanları ve sarf malzemeleri',
    icon: BeakerIcon,
    color: 'from-blue-500 to-cyan-500',
    subcategories: [
      'Fiziksel Analiz Ekipmanları',
      'Kimyasal Analiz Ekipmanları', 
      'Mikrobiyoloji Analiz Ekipmanları',
      'Test, Ölçü Kontrol Sistemleri'
    ]
  },
  {
    id: 'proses-kontrol',
    name: 'Proses Kontrol',
    description: 'Hat tipi analiz ve proses kontrol sistemleri',
    icon: Cog6ToothIcon,
    color: 'from-purple-500 to-pink-500',
    subcategories: [
      'Hat Tipi Analiz Sistemleri',
      'Proses Sensörleri',
      'Kontrol Sistemleri'
    ]
  },
  {
    id: 'pilot-uretim',
    name: 'Pilot Üretim',
    description: 'Pilot üretim ve simülasyon sistemleri',
    icon: BuildingOffice2Icon,
    color: 'from-green-500 to-emerald-500',
    subcategories: [
      'Karıştırma ve Homojenizasyon',
      'Kurutma ve İşleme',
      'Filtrasyon ve Separasyon'
    ]
  },
  {
    id: 'cozumler',
    name: 'Özel Çözümler',
    description: 'Danışmanlık ve özel proje çözümleri',
    icon: LightBulbIcon,
    color: 'from-orange-500 to-red-500',
    subcategories: [
      'Teknik Danışmanlık',
      'Laboratuvar Kurulumu',
      'Eğitim Programları',
      'Bakım ve Servis'
    ]
  }
]

const budgetRanges = [
  '10.000 - 50.000 TL',
  '50.000 - 100.000 TL', 
  '100.000 - 500.000 TL',
  '500.000 - 1.000.000 TL',
  '1.000.000 TL üzeri',
  'Henüz belirlemedim'
]

const timelineOptions = [
  'Acil (1 ay içinde)',
  'Kısa vadeli (1-3 ay)',
  'Orta vadeli (3-6 ay)',
  'Uzun vadeli (6+ ay)',
  'Henüz belirlemedim'
]

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    quoteType: '',
    category: '',
    subcategory: '',
    customRequirement: '',
    projectDetails: '',
    budget: '',
    timeline: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    position: '',
    files: []
  })

  const totalSteps = 3

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.quoteType !== '' && formData.category !== ''
      case 2:
        return formData.projectDetails !== '' && formData.budget !== '' && formData.timeline !== ''
      case 3:
        return formData.companyName !== '' && formData.contactPerson !== '' && formData.email !== '' && formData.phone !== ''
      default:
        return false
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    alert('Teklifiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
  }

  const renderStep1 = () => (
    <div className="space-y-10">
      {/* Quote Type Selection */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Nasıl yardımcı olabiliriz?</h2>
        <p className="text-gray-600 mb-6">Size en uygun çözümü sunabilmemiz için ihtiyacınızı belirleyin</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => handleInputChange('quoteType', 'product')}
            className={`group cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
              formData.quoteType === 'product' 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <CubeIcon className={`w-10 h-10 transition-colors ${
                formData.quoteType === 'product' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
              }`} />
              {formData.quoteType === 'product' && (
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ürün Teklifi</h3>
            <p className="text-sm text-gray-600">Belirli ürünler veya ekipmanlar için fiyat teklifi</p>
          </div>

          <div 
            onClick={() => handleInputChange('quoteType', 'solution')}
            className={`group cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
              formData.quoteType === 'solution' 
                ? 'border-purple-500 bg-purple-50 shadow-md' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <RocketLaunchIcon className={`w-10 h-10 transition-colors ${
                formData.quoteType === 'solution' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'
              }`} />
              {formData.quoteType === 'solution' && (
                <CheckCircleIcon className="w-6 h-6 text-purple-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Çözüm Paketi</h3>
            <p className="text-sm text-gray-600">Komple çözüm paketi ve danışmanlık hizmeti</p>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      {formData.quoteType && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Kategori Seçimi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.id}
                  onClick={() => handleInputChange('category', category.id)}
                  className={`group cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg ${
                    formData.category === category.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {formData.category === category.id && (
                      <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Subcategory Selection */}
      {formData.category && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Alt Kategori</h2>
          <div className="space-y-3">
            {categories.find(cat => cat.id === formData.category)?.subcategories.map((sub) => (
              <label key={sub} className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="subcategory"
                  value={sub}
                  checked={formData.subcategory === sub}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{sub}</span>
              </label>
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Özel Gereksinimler (Opsiyonel)</label>
            <textarea
              value={formData.customRequirement}
              onChange={(e) => handleInputChange('customRequirement', e.target.value)}
              placeholder="Özel gereksinimlerinizi, teknik detayları veya merak ettiklerinizi yazın..."
              className="w-full h-28 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Proje Detayları</h2>
        <p className="text-gray-600 mb-6">Size en uygun teklifi hazırlayabilmemiz için proje hakkında bilgi verin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <DocumentTextIcon className="w-5 h-5" />
              <span>Proje Tanımı</span>
            </label>
            <textarea
              value={formData.projectDetails}
              onChange={(e) => handleInputChange('projectDetails', e.target.value)}
              placeholder="Projenizi detaylı olarak açıklayın. Hangi analizler yapacaksınız, nasıl bir laboratuvar kuruyorsunuz, hangi sektörde çalışıyorsunuz..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <DocumentArrowUpIcon className="w-5 h-5" />
              <span>Dosya Ekleri (Opsiyonel)</span>
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <DocumentArrowUpIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Dosyalarınızı buraya sürükleyin veya tıklayın</p>
              <p className="text-xs text-gray-500">PDF, DOC, XLS, JPG, PNG (Max 10MB)</p>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleInputChange('files', Array.from(e.target.files))
                  }
                }}
              />
            </div>
            {formData.files.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <PaperClipIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <CurrencyDollarIcon className="w-5 h-5" />
              <span>Bütçe Aralığı</span>
            </label>
            <div className="space-y-2">
              {budgetRanges.map((range) => (
                <label key={range} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="budget"
                    value={range}
                    checked={formData.budget === range}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{range}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <ClockIcon className="w-5 h-5" />
              <span>Zaman Çizelgesi</span>
            </label>
            <div className="space-y-2">
              {timelineOptions.map((timeline) => (
                <label key={timeline} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="timeline"
                    value={timeline}
                    checked={formData.timeline === timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{timeline}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">İletişim Bilgileri</h2>
        <p className="text-gray-600 mb-6">Teklifinizi size ulaştırabilmemiz için iletişim bilgilerinizi girin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Şirket/Kurum Adı *</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Şirket adınızı girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İletişim Kişisi *</label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adınız ve soyadınız"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pozisyon/Unvan</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Pozisyonunuz veya ünvanınız"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+90 xxx xxx xx xx"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start space-x-3">
          <SparklesIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Teklif Süreci</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Teklifiniz 24 saat içinde uzman ekibimiz tarafından incelenecek</li>
              <li>• Detaylı analiz sonrası size özel teklif hazırlanacak</li>
              <li>• 2-3 iş günü içinde detaylı teklif size ulaşacak</li>
              <li>• İhtiyaç halinde ücretsiz teknik danışmanlık sunulacak</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return renderStep1()
    }
  }

  const steps = [
    {
      id: 1,
      title: 'İhtiyaç Tespiti',
      description: 'Teklif türü ve kategori'
    },
    {
      id: 2,
      title: 'Proje Detayları',
      description: 'Bütçe ve zaman planı'
    },
    {
      id: 3,
      title: 'İletişim Bilgileri',
      description: 'İletişim ve gönderim'
    }
  ]

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container-custom py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Teklif Talebi</h1>
            <p className="text-xl text-gray-600">Size en uygun çözümü sunmak için buradayız</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep > step.id 
                        ? 'bg-green-600 text-white shadow-lg' 
                        : currentStep === step.id 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.id ? (
                        <CheckIcon className="w-6 h-6" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 mx-4 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12">
              {renderCurrentStep()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-md'
                }`}
              >
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Önceki</span>
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isStepValid() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-105' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Sonraki</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isStepValid() 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckIcon className="w-5 h-5" />
                  <span>Teklif Gönder</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 