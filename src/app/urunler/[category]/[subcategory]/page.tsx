import { notFound } from 'next/navigation'
import { productCategories } from '@/data/products'
import SubcategoryPageClient from './client'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const paths = productCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.key,
      subcategory: subcategory.key,
    }))
  )
  return paths
}

export async function generateMetadata({ params }: { params: { category: string, subcategory: string } }): Promise<Metadata> {
  const category = productCategories.find(cat => cat.key === params.category)
  const subcategory = category?.subcategories.find(sub => sub.key === params.subcategory)
  
  if (!subcategory) {
    return {
      title: 'Alt Kategori Bulunamadı',
      description: 'Aradığınız alt kategori mevcut değil.'
    }
  }

  return {
    title: `${subcategory.name} | ${category?.name}`,
    description: subcategory.description,
  }
}

interface SubcategoryPageProps {
  params: {
    category: string
    subcategory: string
  }
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const category = productCategories.find(cat => cat.key === params.category)
  const subcategory = category?.subcategories.find(sub => 
    sub.key === params.subcategory
  )
  
  if (!category || !subcategory) {
    notFound()
  }

  return <SubcategoryPageClient category={category} subcategory={subcategory} />
}
 