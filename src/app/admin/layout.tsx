'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon,
  CubeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Ürünler', href: '/admin/products', icon: CubeIcon },
  { name: 'Kategoriler', href: '/admin/categories', icon: CogIcon },
  { name: 'Kaynaklar', href: '/admin/resources', icon: DocumentTextIcon },
  { name: 'İletişim Yönetimi', href: '/admin/contact', icon: ChatBubbleLeftRightIcon },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">CMS Panel</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              href="/"
              className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              <span>Ana Siteye Dön</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">CMS Panel</h2>
        </div>
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="p-6 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span>Ana Siteye Dön</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Protek Analitik CMS</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="p-4 lg:p-8 max-w-full overflow-x-auto">
          {children}
          </div>
        </main>
      </div>
    </div>
  )
} 