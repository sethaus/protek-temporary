# Cloudflare Pages Deployment Rehberi

## Ön Gereksinimler

1. **Gmail SMTP Ayarları**: Email gönderimi için gerekli
   - Gmail hesabınızda 2FA (2-Factor Authentication) aktif olmalı
   - Gmail App Password oluşturun: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - 16 karakterlik app password'u not alın

## Cloudflare Pages Deployment Adımları

### 1. GitHub Repository ✅
- ✅ Repository oluşturuldu: https://github.com/sethaus/protek-temporary
- ✅ Kod GitHub'a push edildi
- ✅ Main branch hazırlığı
```bash
git add .
git commit -m "Cloudflare Pages deployment hazırlığı"
git push origin main
```

### 2. Cloudflare Pages Kurulumu
1. Cloudflare Dashboard → Pages → Create a project
2. Connect to Git → GitHub repository seçin: `sethaus/protek-temporary`
3. Build ayarları:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (boş bırakın)
   - **Node.js version**: `18.x`, `20.x` veya `22.x` (hepsi destekleniyor)

**ÖNEMLİ**: Webpack path aliases ve wrangler.toml konfigürasyonu eklendi, build sorunları çözüldü.

### 3. Environment Variables
Cloudflare Pages → Settings → Environment variables:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
NODE_ENV=production
```

### 4. Custom Domain Bağlama
Proje başarıyla deploy edildikten sonra, `protekanalitik.com` domain'ini bağlamak için:

1. Cloudflare Pages projenizin dashboard'una gidin ("Continue to project" butonu).
2. **Custom domains** sekmesine tıklayın.
3. **Set up a custom domain** butonuna basın.
4. Alan adınız olarak `protekanalitik.com` girin ve devam edin.
5. **DNS Onayı:** Domain'iniz zaten Cloudflare'de olduğu için, Cloudflare otomatik olarak gerekli `CNAME` kaydını oluşturmayı önerecektir. Sadece onaylamanız yeterlidir.
6. Birkaç dakika içinde domain aktif hale gelecek ve SSL sertifikası otomatik olarak yüklenecektir.

## Build Komutları

### Yerel Development
```bash
npm install
npm run dev
```

### Production Build Test
```bash
npm run build
npm start
```

### Type Check
```bash
npm run type-check
```

## Önemli Notlar

1. **Email Routing**: Cloudflare Email Routing zaten aktif olduğu için ek ayar gerekmez
2. **API Routes**: Next.js API routes Cloudflare Pages'de çalışır
3. **Environment Variables**: Production'da Cloudflare dashboard'dan ayarlanmalı
4. **Images**: Production'da unoptimized olarak çalışacak (Cloudflare Images kullanılabilir)

## Troubleshooting

### Build Hataları
- TypeScript hatalarını kontrol edin: `npm run type-check`
- Lint hatalarını kontrol edin: `npm run lint`

### Email Gönderim Sorunları
- Resend API key'in doğru olduğunu kontrol edin
- Domain verification'ın tamamlandığını kontrol edin
- Cloudflare Email Routing ayarlarını kontrol edin

### Performance
- Cloudflare Analytics ile performansı izleyin
- Core Web Vitals metriklerini takip edin
