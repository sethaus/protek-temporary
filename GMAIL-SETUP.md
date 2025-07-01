# Gmail SMTP Kurulum Rehberi

## Gmail App Password Oluşturma

### 1. Gmail Hesabınızda 2FA Aktifleştirin
1. [Google Account Security](https://myaccount.google.com/security) sayfasına gidin
2. "2-Step Verification" bölümünü bulun
3. 2FA'yı aktifleştirin (telefon numarası veya authenticator app ile)

### 2. App Password Oluşturun
1. [App Passwords](https://myaccount.google.com/apppasswords) sayfasına gidin
2. "Select app" dropdown'dan "Mail" seçin
3. "Select device" dropdown'dan "Other (custom name)" seçin
4. "Protek Analitik Website" yazın
5. "Generate" butonuna tıklayın
6. 16 karakterlik password'u kopyalayın (örnek: `abcd efgh ijkl mnop`)

### 3. Environment Variables Ayarlayın

#### Yerel Development (.env.local)
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

#### Cloudflare Pages Production
Cloudflare Dashboard → Pages → Your Project → Settings → Environment variables:
- `GMAIL_USER`: Gmail adresiniz
- `GMAIL_APP_PASSWORD`: 16 karakterlik app password (boşluksuz)

## Güvenlik Notları

1. **App Password'u kimseyle paylaşmayın**
2. **Regular Gmail şifrenizi kullanmayın**
3. **App Password sadece bu uygulama için geçerli**
4. **Gerekirse App Password'u iptal edip yenisini oluşturabilirsiniz**

## Test Etme

### Yerel Test
```bash
npm run dev
# http://localhost:3000/teklif-al sayfasından form gönderin
```

### Production Test
- Cloudflare Pages deployment'ından sonra
- Canlı siteden form gönderin
- Gmail hesabınızın "Sent" klasörünü kontrol edin

## Troubleshooting

### "Invalid login" Hatası
- 2FA aktif mi kontrol edin
- App Password doğru mu kontrol edin
- Gmail hesabınız aktif mi kontrol edin

### "Less secure app access" Hatası
- App Password kullanıyorsanız bu hata almamalısınız
- Regular şifre kullanmayın, mutlaka App Password kullanın

### Email Gönderilmiyor
- Environment variables doğru ayarlandı mı kontrol edin
- Gmail hesabınızın "Sent" klasörünü kontrol edin
- Cloudflare Pages logs'larını kontrol edin

## Avantajları

✅ **Ücretsiz**: Gmail SMTP ücretsiz  
✅ **Güvenilir**: Google'ın altyapısı  
✅ **Kolay**: Mevcut Gmail hesabınızı kullanın  
✅ **Hızlı**: Anında kurulum  
✅ **Cloudflare Uyumlu**: Email Routing ile birlikte çalışır
