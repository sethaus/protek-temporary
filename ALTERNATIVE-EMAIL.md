# Alternatif Email Servisleri

Gmail App Password sorunu yaşıyorsanız, bu alternatifleri kullanabilirsiniz:

## 1. Outlook/Hotmail SMTP (ÜCRETSİZ)

### Avantajlar:
- Tamamen ücretsiz
- App Password gerektirmez
- Kolay kurulum

### Kurulum:
```bash
# Environment Variables
OUTLOOK_USER=your-email@outlook.com
OUTLOOK_PASSWORD=your-regular-password
```

### API Route Değişikliği:
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail', // veya 'outlook'
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASSWORD,
  },
})
```

## 2. Yahoo Mail SMTP (ÜCRETSİZ)

### Kurulum:
```bash
# Environment Variables  
YAHOO_USER=your-email@yahoo.com
YAHOO_APP_PASSWORD=your-app-password
```

### API Route:
```javascript
const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: process.env.YAHOO_USER,
    pass: process.env.YAHOO_APP_PASSWORD,
  },
})
```

## 3. Yandex Mail SMTP (ÜCRETSİZ)

### Kurulum:
```bash
# Environment Variables
YANDEX_USER=your-email@yandex.com
YANDEX_PASSWORD=your-regular-password
```

### API Route:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.YANDEX_USER,
    pass: process.env.YANDEX_PASSWORD,
  },
})
```

## 4. Ethereal Email (TEST İÇİN)

Sadece test amaçlı, gerçek email göndermez:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'ethereal.user@ethereal.email',
    pass: 'ethereal.pass'
  }
})
```

## Hangisini Seçmeli?

1. **Outlook/Hotmail**: En kolay, app password gerektirmez
2. **Yahoo**: Güvenilir, app password gerekir
3. **Yandex**: Türkiye'de popüler, kolay kurulum
4. **Gmail**: En güvenilir ama app password sorunu var

## Önerilen Çözüm: Outlook

Outlook en kolay seçenek çünkü:
- App password gerektirmez
- Regular şifrenizi kullanabilirsiniz  
- Microsoft'un güvenilir altyapısı
- Ücretsiz
