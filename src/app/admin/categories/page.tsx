'use client'

import { useState } from 'react'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CogIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { productCategories, type Category, type Subcategory } from '@/data/products'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(productCategories)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingSubcategory, setEditingSubcategory] = useState<{ category: string, subcategory: Subcategory } | null>(null)
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', key: '' })
  const [subcategoryForm, setSubcategoryForm] = useState({ name: '', description: '', key: '', categoryKey: '' })

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteCategory = (categoryKey: string) => {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Alt kategoriler ve ürünler de silinecektir.')) {
      setCategories(categories.filter(cat => cat.key !== categoryKey))
      alert('Kategori başarıyla silindi!')
    }
  }

  const handleDeleteSubcategory = (categoryKey: string, subcategoryKey: string) => {
    if (confirm('Bu alt kategoriyi silmek istediğinizden emin misiniz? İçindeki ürünler de silinecektir.')) {
      setCategories(categories.map(cat => 
        cat.key === categoryKey 
          ? { ...cat, subcategories: cat.subcategories.filter(sub => sub.key !== subcategoryKey) }
          : cat
      ))
      alert('Alt kategori başarıyla silindi!')
    }
  }

  const getTotalProducts = (category: Category) => {
    return category.subcategories.reduce((total, sub) => total + sub.products.length, 0)
  }

  const handleNewCategory = () => {
    setCategoryForm({ name: '', description: '', key: '' })
    setEditingCategory(null)
    setShowCategoryModal(true)
  }

  const handleEditCategory = (category: Category) => {
    setCategoryForm({ name: category.name, description: category.description, key: category.key })
    setEditingCategory(category)
    setShowCategoryModal(true)
  }

  const handleNewSubcategory = (categoryKey: string) => {
    setSubcategoryForm({ name: '', description: '', key: '', categoryKey })
    setEditingSubcategory(null)
    setShowSubcategoryModal(true)
  }

  const handleEditSubcategory = (categoryKey: string, subcategory: Subcategory) => {
    setSubcategoryForm({ 
      name: subcategory.name, 
      description: subcategory.description, 
      key: subcategory.key, 
      categoryKey 
    })
    setEditingSubcategory({ category: categoryKey, subcategory })
    setShowSubcategoryModal(true)
  }

  const saveCategoryForm = () => {
    if (!categoryForm.name.trim() || !categoryForm.description.trim()) {
      alert('Lütfen tüm alanları doldurun.')
      return
    }

    const key = categoryForm.key || categoryForm.name.toLowerCase()
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    if (editingCategory) {
      // Edit existing category
      setCategories(categories.map(cat => 
        cat.key === editingCategory.key 
          ? { ...cat, name: categoryForm.name, description: categoryForm.description }
          : cat
      ))
      alert('Kategori başarıyla güncellendi!')
    } else {
      // Add new category
      if (categories.some(cat => cat.key === key)) {
        alert('Bu anahtar zaten kullanılıyor. Lütfen farklı bir isim seçin.')
        return
      }
      setCategories([...categories, {
        key,
        name: categoryForm.name,
        description: categoryForm.description,
        icon: '⚙️',
        subcategories: []
      }])
      alert('Kategori başarıyla eklendi!')
    }
    setShowCategoryModal(false)
  }

  const saveSubcategoryForm = () => {
    if (!subcategoryForm.name.trim() || !subcategoryForm.description.trim()) {
      alert('Lütfen tüm alanları doldurun.')
      return
    }

    const key = subcategoryForm.key || subcategoryForm.name.toLowerCase()
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    if (editingSubcategory) {
      // Edit existing subcategory
      setCategories(categories.map(cat => 
        cat.key === subcategoryForm.categoryKey
          ? {
              ...cat,
              subcategories: cat.subcategories.map(sub =>
                sub.key === editingSubcategory.subcategory.key
                  ? { ...sub, name: subcategoryForm.name, description: subcategoryForm.description }
                  : sub
              )
            }
          : cat
      ))
      alert('Alt kategori başarıyla güncellendi!')
    } else {
      // Add new subcategory
      const category = categories.find(cat => cat.key === subcategoryForm.categoryKey)
      if (category?.subcategories.some(sub => sub.key === key)) {
        alert('Bu anahtar zaten kullanılıyor. Lütfen farklı bir isim seçin.')
        return
      }
      setCategories(categories.map(cat => 
        cat.key === subcategoryForm.categoryKey
          ? {
              ...cat,
              subcategories: [...cat.subcategories, {
                key,
                name: subcategoryForm.name,
                description: subcategoryForm.description,
                products: []
              }]
            }
          : cat
      ))
      alert('Alt kategori başarıyla eklendi!')
    }
    setShowSubcategoryModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategori Yönetimi</h1>
          <p className="text-gray-600">Ürün kategorilerini ve alt kategorilerini yönetin</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleNewCategory}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Yeni Kategori</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Kategori ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <div key={category.key} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Category Header */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.key ? null : category.key
                    )}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ChevronRightIcon 
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedCategory === category.key ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CogIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {category.subcategories.length} alt kategori
                    </div>
                    <div className="text-sm text-gray-500">
                      {getTotalProducts(category)} ürün
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Görüntüle">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditCategory(category)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg" 
                      title="Düzenle"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category.key)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg" 
                      title="Sil"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subcategories */}
            {expandedCategory === category.key && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Alt Kategoriler</h4>
                  <button
                    onClick={() => handleNewSubcategory(category.key)}
                    className="inline-flex items-center space-x-1 text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Alt Kategori Ekle</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                          <p className="text-sm text-gray-600">{subcategory.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600">
                          {subcategory.products.length} ürün
                        </span>
                        <div className="flex items-center space-x-1">
                          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="Görüntüle">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditSubcategory(category.key, subcategory)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded" 
                            title="Düzenle"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteSubcategory(category.key, subcategory.key)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded" 
                            title="Sil"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {category.subcategories.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Bu kategoride henüz alt kategori bulunmuyor
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
          <div className="text-sm text-gray-600">Ana Kategori</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {categories.reduce((total, cat) => total + cat.subcategories.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Alt Kategori</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {categories.reduce((total, cat) => total + getTotalProducts(cat), 0)}
          </div>
          <div className="text-sm text-gray-600">Toplam Ürün</div>
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori Adı *
                </label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Kategori adını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama *
                </label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Kategori açıklamasını girin"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={saveCategoryForm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingCategory ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Modal */}
      {showSubcategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingSubcategory ? 'Alt Kategori Düzenle' : 'Yeni Alt Kategori'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Kategori Adı *
                </label>
                <input
                  type="text"
                  value={subcategoryForm.name}
                  onChange={(e) => setSubcategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Alt kategori adını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama *
                </label>
                <textarea
                  value={subcategoryForm.description}
                  onChange={(e) => setSubcategoryForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Alt kategori açıklamasını girin"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSubcategoryModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={saveSubcategoryForm}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingSubcategory ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 