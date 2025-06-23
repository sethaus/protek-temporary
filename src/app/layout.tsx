import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Protek Analitik - Türkiye\'nin Laboratuvar Teknolojileri Lideri',
  description: 'Laboratuvar teknolojilerinde lider, güvenilir, yenilikçi ve kullanıcı odaklı çözümler. Analiz cihazları, laboratuvar kurulumu ve teknik destek hizmetleri.',
  keywords: 'laboratuvar, analiz cihazları, kimyasal analiz, mikrobiyolojik analiz, laboratuvar kurulumu, protek analitik',
  authors: [{ name: 'Protek Analitik' }],
  creator: 'Protek Analitik',
  publisher: 'Protek Analitik',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://protekanalitik.com'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Protek Analitik - Türkiye\'nin Laboratuvar Teknolojileri Lideri',
    description: 'Laboratuvar teknolojilerinde lider, güvenilir, yenilikçi ve kullanıcı odaklı çözümler.',
    url: 'https://protekanalitik.com',
    siteName: 'Protek Analitik',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Protek Analitik',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protek Analitik - Türkiye\'nin Laboratuvar Teknolojileri Lideri',
    description: 'Laboratuvar teknolojilerinde lider, güvenilir, yenilikçi ve kullanıcı odaklı çözümler.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ef4444" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-neutral-50 antialiased">
        {children}
      </body>
    </html>
  )
} 