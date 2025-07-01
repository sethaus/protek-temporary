import { productCategories } from '@/data/products'

export async function generateStaticParams() {
  return productCategories.map((category) => ({
    category: category.key,
  }))
}
