import { productCategories } from '@/data/products'

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
