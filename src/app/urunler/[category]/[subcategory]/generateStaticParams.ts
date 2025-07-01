import { productCategories } from '@/data/products'

export async function generateStaticParams() {
  const paths = productCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.key,
      subcategory: subcategory.key,
    }))
  )
  return paths
}
