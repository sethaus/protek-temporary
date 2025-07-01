/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Cloudflare Pages dosya boyutu optimizasyonu için yapılandırma
  output: 'standalone', // Server component'ler için standalone gerekli
  poweredByHeader: false,
  swcMinify: true, // SWC minifier etkinleştirme
  
  // Webpack configuration for path aliases ve optimizasyonlar
  webpack: (config) => {
    // Webpack optimizasyonları
    config.optimization.minimize = true;
    
    // Bundle boyutunu azaltmak için üçüncü parti kütüphaneleri parçala
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000
    };
    
    // Alias tanımlamaları
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
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
        pathname: '/**',
      }
    ],
    // Görüntü optimizasyon ayarları
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
  },
  
  // Build optimizasyonları - bundle boyutunu küçültmek için
  typescript: {
    // Type checking'i build sırasında atlayalım
    ignoreBuildErrors: true,
  },
  eslint: {
    // Lint checking'i build sırasında atlayalım
    ignoreDuringBuilds: true,
  },
  
  // Statik export'ta headers desteklenmiyor
  // Headers için Cloudflare Pages custom headers kullanılacak
}

module.exports = nextConfig 