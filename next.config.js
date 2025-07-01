/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Cloudflare Pages için optimize edilmiş ayarlar
  trailingSlash: false,
  
  // Webpack configuration for path aliases
  webpack: (config, { isServer }) => {
    // Cloudflare Pages'deki 25MB dosya boyutu limitini aşan büyük cache dosyası sorununu çözer.
    // Bu, cache klasörünü build sonrası silmekten daha güvenli bir yöntemdir.
    // Sorun server-side build'de oluştuğu için sadece server için cache'i kapatıyoruz.
    if (isServer) {
      config.cache = false;
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    }
    return config
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    // Cloudflare Pages için unoptimized images
    unoptimized: process.env.NODE_ENV === 'production',
  },
  
  // Build optimizasyonları
  typescript: {
    ignoreBuildErrors: false, // Production'da type check yapalım
  },
  eslint: {
    ignoreDuringBuilds: false, // Production'da lint check yapalım
  },
  
  // Experimental özellikler - temizlendi
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 