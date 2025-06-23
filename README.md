# Protek Analitik - Laboratuvar Teknolojileri Web Sitesi

Modern, responsive ve kullanıcı dostu laboratuvar teknolojileri firması web sitesi.

## 🚀 Özellikler

- **Modern UI/UX**: 2025 trendlerine uygun temiz ve ferah tasarım
- **Mega Menü**: Kategorik ve görsel ağırlıklı navigasyon
- **İzometrik Tasarım**: Laboratuvar teknolojileri temalı izometrik görseller
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Erişilebilirlik**: WCAG standartlarına uygun a11y özellikleri
- **SEO Optimizasyonu**: Arama motoru dostu yapı
- **Performans**: Hızlı yükleme ve optimizasyon

## 🛠️ Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animasyonlar
- **Heroicons** - Modern ikonlar
- **React Intersection Observer** - Scroll animasyonları

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusunu başlat
npm start
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── layout/           # Layout bileşenleri
│   │   ├── Header.tsx    # Header ve mega menü
│   │   ├── MegaMenu.tsx  # Mega menü komponenti
│   │   └── Footer.tsx    # Footer
│   └── sections/         # Sayfa bölümleri
│       ├── Hero.tsx      # Ana hero bölümü
│       ├── Features.tsx  # Özellikler
│       ├── Solutions.tsx # Çözümler
│       ├── Products.tsx  # Ürünler
│       ├── Sectors.tsx   # Sektörler
│       ├── About.tsx     # Hakkımızda
│       └── Contact.tsx   # İletişim
└── types/                # TypeScript tip tanımları
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: Kırmızı tonları (#ef4444)
- **Secondary**: Mavi tonları (#3b82f6)
- **Neutral**: Gri tonları
- **Accent**: Yeşil tonları (#22c55e)

### Tipografi
- **Font**: Inter (genel), Montserrat (başlıklar)
- **Boyutlar**: Responsive font büyüklükleri

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Erişilebilirlik

- Klavye navigasyonu desteği
- Screen reader uyumluluğu
- Yüksek kontrast oranları
- Focus indicator'ları
- ARIA etiketleri

## 🔧 Geliştirme

```bash
# Tip kontrolü
npm run type-check

# Linting
npm run lint

# Geliştirme modu
npm run dev
```

## 📊 SEO Optimizasyonları

- Meta tag'ler ve Open Graph
- Structured data (Schema.org)
- Sitemap ve robots.txt
- Core Web Vitals optimizasyonu
- Image optimization

## 🚀 Dağıtım

Proje Vercel, Netlify veya herhangi bir modern hosting platformuna deploy edilebilir.

```bash
# Build
npm run build

# Static export (opsiyonel)
npm run export
```

## 📞 İletişim

Proje hakkında sorularınız için:
- **E-posta**: info@protekanalitik.com
- **Telefon**: +90 212 XXX XX XX

## 📄 Lisans

Bu proje özel lisans altındadır. Protek Analitik şirketi için geliştirilmiştir.

## Product System

### URL Structure
```
/urunler                                    # Main products page
/urunler/[category]                         # Category listing page  
/urunler/[category]/[subcategory]           # Subcategory listing page
/urunler/[category]/[subcategory]/[product] # Product detail page
```

### Product Categories
1. **Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler**
   - Fiziksel Analiz Ekipmanları
   - Kimyasal Analiz Ekipmanları
   - Mikrobiyoloji Analiz Ekipmanları
   - Test/Ölçüm Kontrol Sistemleri
   - Ambalaj Test Sistemleri
   - Ar-Ge Ekipmanları

2. **Proses Kontrol Ve Hat Tipi Analiz Çözümleri**
   - Hat Tipi Analiz Sistemleri
   - Proses Sensörleri

3. **Pilot Tipi Üretim ve Proses Simülasyon Sistemleri**
   - Karıştırma ve Homojenizasyon
   - Kurutma ve İşleme
   - Filtrasyon ve Separasyon

### Product Features
- **Detailed Product Pages**: Comprehensive product information with specifications, features, and applications
- **Image Galleries**: Multiple product images with lightbox functionality
- **Tabbed Content**: Organized information in tabs (Overview, Specifications, Applications)
- **Related Products**: Suggestions for similar products
- **Product Comparison**: Add products to comparison list
- **Customer Reviews**: Review system with ratings
- **Social Sharing**: Share products on social media
- **Advanced Filtering**: Filter products by category and subcategory

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── urunler/           # Products section
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
└── data/                 # Static data
    ├── products.ts       # Product database
    └── products-filters.md # Product categorization
```

## Development

The project uses modern web development practices with TypeScript for type safety and Tailwind CSS for rapid styling. All components are responsive and optimized for performance.

### Key Components

- **Header/Navigation**: Responsive navigation with mega menu
- **Hero Section**: Animated hero with call-to-action
- **Product Sections**: Interactive product showcases
- **Product System**: Complete product catalog with detail pages
- **Footer**: Contact information and links

## License

This project is proprietary and confidential. 