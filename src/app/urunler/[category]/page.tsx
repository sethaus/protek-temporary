import { notFound } from 'next/navigation'
import { productCategories } from '@/data/products'
import CategoryPageClient from './client'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return productCategories.map((category) => ({
    category: category.key,
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = productCategories.find(cat => cat.key === params.category)
  if (!category) {
    return {
      title: 'Kategori Bulunamadı',
      description: 'Aradığınız kategori mevcut değil.'
    }
  }
  return {
    title: `${category.name} | Protek Analitik`,
    description: category.description,
  }
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = productCategories.find(cat => cat.key === params.category)
  
  if (!category) {
    notFound()
  }

  return <CategoryPageClient category={category} />
}
 