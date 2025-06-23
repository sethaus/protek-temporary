'use client'

import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Solutions from '@/components/sections/Solutions'
import Products from '@/components/sections/Products'
import Clients from '@/components/sections/Clients'
import Sectors from '@/components/sections/Sectors'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Solutions />
      <Products />
      <Clients />
      <Sectors />
      <About />
      <Contact />
      <Footer />
    </main>
  )
} 