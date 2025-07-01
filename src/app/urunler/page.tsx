import { motion } from 'framer-motion'
import Link from 'next/link'
import { BeakerIcon, CubeIcon, WrenchIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { productCategories } from '@/data/products'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Map icon names to component references
const iconMap: { [key: string]: React.ElementType } = {
  beaker: BeakerIcon,
  cube: CubeIcon,
  wrench: WrenchIcon,
}

// Helper function to calculate the number of products in a category
const getCategoryProductCount = (categoryKey: string): number => {
  const category = productCategories.find(cat => cat.key === categoryKey);
  if (!category) return 0;
  return category.subcategories.reduce((acc, sub) => acc + sub.products.length, 0);
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
          <div className="container-custom relative">
            <motion.div 
              className="text-center text-white space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Ürün Kategorileri
              </h1>
              <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto">
                Endüstriyel test ve analiz ihtiyaçlarınız için sunduğumuz tüm çözümleri ve ürün gruplarını keşfedin.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Kategori Listesi */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {productCategories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || CubeIcon;
                const productCount = getCategoryProductCount(category.key);

                return (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/urunler/${category.key}`} className="group h-full flex">
                      <div className="w-full relative bg-white rounded-xl border border-neutral-200 p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        
                        <div className="relative flex-grow flex flex-col">
                          {/* Icon */}
                          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                            <IconComponent className="w-8 h-8 text-primary-600" />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary-700 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-neutral-600 mb-4 line-clamp-3 flex-grow">
                            {category.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm text-neutral-500 my-4">
                            <span>{category.subcategories.length} alt kategori</span>
                            <span>{productCount} ürün</span>
                          </div>

                          {/* Arrow */}
                          <div className="mt-auto flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                            <span>Kategoriye Git</span>
                            <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Aradığınız Ürünü Bulamadınız mı?
                </h2>
                <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
                  Uzman ekibimiz size özel çözümler geliştirmek için burada. İhtiyaçlarınızı bize bildirin, size en uygun çözümü birlikte bulalım.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link 
                    href="/iletisim" 
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    İletişime Geç
                  </Link>
                  <Link
                    href="/teklif-al" 
                    className="border-2 border-primary-200 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors transform hover:scale-105"
                  >
                    Teklif Al
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}