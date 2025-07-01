import { notFound } from 'next/navigation'
import { productCategories, getProductById } from '@/data/products'
import ProductPageClient from './client'
import type { Metadata } from 'next'

// Statik yolları oluşturur
export async function generateStaticParams() {
  const paths = productCategories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.products.map((product) => ({
        category: category.key,
        subcategory: subcategory.key,
        product: product.id,
      }))
    )
  )
  return paths
}

// Sayfa metadata'sını oluşturur
export async function generateMetadata({ params }: { params: { product: string } }): Promise<Metadata> {
  const product = getProductById(params.product)
  
  if (!product) {
    return {
      title: 'Ürün Bulunamadı',
      description: 'Aradığınız ürün mevcut değil.'
    }
  }

  const productImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : []

  return {
    title: `${product.name} | Protek Analitik`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Protek Analitik`,
      description: product.description,
      images: productImages.map(img => ({ url: img, width: 800, height: 600, alt: product.name })),
      type: 'website',
    },
  }
}

interface ProductPageProps {
  params: {
    category: string
    subcategory: string
    product: string
  }
}

// Sunucu tarafı bileşeni
export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.product)
  const category = productCategories.find(cat => cat.key === params.category)
  const subcategory = category?.subcategories.find(sub => sub.key === params.subcategory)
  
  // Ürünün doğru alt kategoride olduğunu doğrula
  const isProductInSubcategory = subcategory?.products.some(p => p.id === params.product)

  if (!product || !category || !subcategory || !isProductInSubcategory) {
    notFound()
  }

  return <ProductPageClient category={category} subcategory={subcategory} product={product} />
}