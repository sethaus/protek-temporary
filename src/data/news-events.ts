// Haber ve etkinlik veri tipleri
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'sirket-haberleri' | 'sektor-guncel' | 'basari-hikayeleri';
  publishDate: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  content: string;
  eventType: 'fuar' | 'seminer' | 'webinar' | 'workshop' | 'konferans';
  startDate: string;
  endDate?: string;
  location: string;
  imageUrl: string;
  registrationUrl?: string;
  featured?: boolean;
}

// Örnek haberler
export const newsData: NewsItem[] = [
  {
    id: 'new-laboratory-equipment-2024',
    title: 'Protek Analitik 2024 Yılında Yeni Laboratuvar Ekipmanları Serisi Tanıttı',
    summary: 'Gıda analizi alanında çığır açacak yeni ürün serimiz ile laboratuvarlarınızın verimliliğini artırın.',
    content: `Protek Analitik olarak, 2024 yılının ilk çeyreğinde gıda analizi sektöründe devrim niteliğinde yeni ürünlerimizi tanıtmaktan büyük mutluluk duyuyoruz.

## Yeni Ürün Serisi Özellikler

### Hızlı Protein Analiz Sistemi (HPA-2024)
- **30 saniyede** protein analizi
- %99.8 doğruluk oranı
- Otomatik kalibrasyon özelliği
- Kullanıcı dostu arayüz

### Mikrobiyal Hızlı Test Kiti (MHT-Pro)
- E.coli, Salmonella, Listeria testi bir arada
- 15 dakikada sonuç
- Sahada kullanım imkanı
- 500+ test kapasitesi

### Smart Lab Entegrasyon Sistemi
- IoT tabanlı veri toplama
- Gerçek zamanlı raporlama
- Mobil uygulama desteği
- Bulut tabanlı veri saklama

## Sektördeki Etkisi

Bu yeni ürün serisi ile laboratuvarlar:
- Test sürelerini %80 oranında kısaltabilecek
- İnsan hatası riskini minimize edecek
- Maliyet tasarrufu sağlayacak
- Kalite güvencesini artıracak

Ürünlerimiz hakkında detaylı bilgi için teknik ekibimizle iletişime geçebilirsiniz.`,
    category: 'sirket-haberleri',
    publishDate: '2024-03-15',
    imageUrl: '/images/lab-1.jpg',
    tags: ['Yeni Ürün', 'Laboratuvar Ekipmanları', 'Gıda Analizi', 'Teknoloji'],
    featured: true
  },
  {
    id: 'ai-analytics-trend-2024',
    title: 'Yapay Zeka ve Analitik Sektörde 2024 Trendleri',
    summary: 'Analitik laboratuvarlarda yapay zeka kullanımının arttığı 2024 yılında sektördeki gelişmeleri inceliyoruz.',
    content: `Analitik sektöründe yapay zeka kullanımı her geçen gün artarak devam ediyor. 2024 yılının ilk yarısında gözlemlenen trendleri ve gelecek öngörülerini sizler için derledik.

## AI Destekli Analiz Sistemleri

### Otomatik Sonuç Yorumlama
- Machine learning algoritmaları ile sonuç analizi
- Anormal değerlerin otomatik tespiti
- Tahminsel bakım önerileri

### Akıllı Kalite Kontrol
- Real-time kalite takibi
- Süreç optimizasyonu önerileri
- Otomatik alarm sistemleri

## Sektördeki Uygulamalar

### Gıda Sektörü
- Kontaminasyon tespitinde %95 başarı
- Raf ömrü tahmin doğruluğu artışı
- Beslenme değeri analizinde hızlanma

### Farmasötik Sektör
- Drug discovery sürecinde hızlanma
- Kalite kontrol otomasyonu
- Regülasyon uygunluk takibi

## Gelecek Öngörüleri

2024'ün ikinci yarısında:
- Blockchain entegrasyonu
- IoT sensörlerin yaygınlaşması
- Cloud-based lab management
- Augmented reality destekli eğitimler

Protek Analitik olarak bu trendeleri yakından takip ediyor ve müşterilerimize en güncel teknolojileri sunmaya devam ediyoruz.`,
    category: 'sektor-guncel',
    publishDate: '2024-02-28',
    imageUrl: '/images/lab-2.jpg',
    tags: ['Yapay Zeka', 'Teknoloji Trendleri', 'Analitik', 'İnovasyon'],
    featured: true
  },
  {
    id: 'gida-fabrikasi-success-story',
    title: 'Büyük Gıda Fabrikası Kalite Kontrol Sistemini %300 Verimli Hale Getirdi',
    summary: 'Türkiye\'nin önde gelen gıda üreticilerinden biri, Protek Analitik çözümleri ile kalite kontrol süreçlerini kökten değiştirdi.',
    content: `Türkiye'nin önde gelen gıda üreticilerinden Mega Food A.Ş., Protek Analitik'in sağladığı entegre laboratuvar çözümleri ile kalite kontrol süreçlerinde çarpıcı iyileştirmeler elde etti.

## Proje Öncesi Durum

Mega Food A.Ş.'nin kalite kontrol laboratuvarında:
- Test sonuçları için 24-48 saat bekleme süresi
- Manuel veri girişinden kaynaklı hatalar
- Yüksek işgücü maliyeti
- Stok yönetiminde zorluklar

## Uygulanan Çözümler

### 1. Hızlı Test Sistemi Kurulumu
- **Protein analiz sistemi**: 30 saniyede sonuç
- **Mikrobiyal test kiti**: 15 dakikada tespit
- **pH ve asitlik ölçüm**: Anlık sonuç

### 2. Otomasyon Entegrasyonu
- LIMS (Laboratory Information Management System)
- Otomatik veri aktarımı
- Real-time raporlama sistemi

### 3. Personel Eğitimi
- 2 haftalık yoğun eğitim programı
- Sürekli teknik destek
- Sertifikasyon programı

## Elde Edilen Sonuçlar

### Verimlilik Artışı
- **%300** test hızı artışı
- **%85** insan hatası azalışı
- **%60** maliyet tasarrufu

### Kalite İyileştirmesi
- **%99.9** test doğruluğu
- **%95** müşteri memnuniyeti
- **Sıfır** geri çağırma vakası

### Operasyonel Faydalar
- 24/7 test kapasitesi
- Gerçek zamanlı kalite takibi
- Predictive maintenance ile kesintisiz üretim

## Müşteri Görüşü

*"Protek Analitik'in çözümleri sayesinde kalite kontrol süreçlerimizi tamamen dönüştürdük. Artık daha hızlı, güvenilir ve ekonomik test sonuçları alıyoruz. Bu da müşteri memnuniyetimizi ve rekabet gücümüzü önemli ölçüde artırdı."*

**- Dr. Ahmet Yılmaz, Kalite Kontrol Müdürü, Mega Food A.Ş.**

## Projenin Aşamaları

### Faz 1: Analiz ve Planlama (2 hafta)
- Mevcut durum analizi
- İhtiyaç belirleme
- Çözüm tasarımı

### Faz 2: Kurulum ve Entegrasyon (3 hafta)
- Ekipman kurulumu
- Sistem entegrasyonu
- Test ve validasyon

### Faz 3: Eğitim ve Devreye Alma (2 hafta)
- Personel eğitimi
- Süreç optimizasyonu
- Canlı destek

Bu başarı hikayesi, doğru analitik çözümlerle nasıl dramatik iyileştirmeler elde edilebileceğinin mükemmel bir örneğidir.`,
    category: 'basari-hikayeleri',
    publishDate: '2024-01-20',
    imageUrl: '/images/lab-3.jpg',
    tags: ['Başarı Hikayesi', 'Gıda Sektörü', 'Verimlilik', 'Kalite Kontrol'],
    featured: false
  },
  {
    id: 'iso-17025-accreditation',
    title: 'Protek Analitik ISO/IEC 17025 Akreditasyonu Yeniledi',
    summary: 'Laboratuvar test ve kalibrasyon standartlarında en üst seviye kalite güvencesi sertifikamızı yeniledik.',
    content: `Protek Analitik, laboratuvar test ve kalibrasyon faaliyetleri için uluslararası standart olan ISO/IEC 17025:2017 akreditasyonunu başarıyla yenilemiştir.

## ISO/IEC 17025 Nedir?

ISO/IEC 17025, test ve kalibrasyon laboratuvarlarının yeterliliği için genel şartları belirleyen uluslararası standarttır. Bu standart:

- Laboratuvarın teknik yeterliliğini garanti eder
- Sonuçların güvenilirliğini sağlar
- Uluslararası tanınırlık kazandırır
- Müşteri güvenini artırır

## Akreditasyon Kapsamı

Yenilenen akreditasyonumuz şu alanları kapsamaktadır:

### Kimyasal Analizler
- HPLC/GC-MS analizleri
- ICP-OES element analizi
- Spektrofotometrik analizler
- Titrimetrik analizler

### Mikrobiyal Testler
- Patojen mikroorganizma tespiti
- Toplam mikroorganizma sayımı
- Maya ve küf analizi
- Probiyotik bakteri tespiti

### Fiziksel Testler
- pH ve asitlik ölçümü
- Viskozite analizı
- Yoğunluk ölçümü
- Renk analizi

## Sürekli İyileştirme

Bu akreditasyon yenileme sürecinde:

- Laboratuvar altyapısı modernize edildi
- Personel eğitimleri güncellenildi
- Kalite yönetim sistemi optimize edildi
- Yeni analiz metotları eklendi

## Müşterilerimize Faydaları

- **Güvenilir sonuçlar**: Uluslararası standartlarda test sonuçları
- **Yasal uygunluk**: Regülasyon gereksinimlerini karşılama
- **İhracat desteği**: Uluslararası kabul görebilir raporlar
- **Maliyet avantajı**: Tekrar test ihtiyacının ortadan kalkması

Bu başarı, kaliteye olan bağlılığımızın ve müşteri memnuniyetini ön planda tutma anlayışımızın bir kanıtıdır.`,
    category: 'sirket-haberleri',
    publishDate: '2024-01-10',
    imageUrl: '/images/lab-4.jpg',
    tags: ['ISO 17025', 'Akreditasyon', 'Kalite Güvencesi', 'Sertifikasyon']
  },
  {
    id: 'green-chemistry-sustainability',
    title: 'Yeşil Kimya ve Sürdürülebilirlik: Analitik Sektörün Geleceği',
    summary: 'Çevre dostu analiz yöntemleri ve sürdürülebilir laboratuvar uygulamaları ile geleceği şekillendiriyoruz.',
    content: `Çevre bilinci ve sürdürülebilirlik, analitik kimya sektöründe de giderek önem kazanıyor. Yeşil kimya prensipleri doğrultusunda geliştirilen yeni metot ve teknolojiler inceliyoruz.

## Yeşil Kimya Prensipleri

### 1. Atık Önleme
- Kaynak optimizasyonu
- Minimum numune kullanımı
- Geri dönüşüm sistemleri

### 2. Safer Solvents
- Su bazlı çözücü sistemleri
- Düşük toksisiteli alternatifler
- Solvent-free metotlar

### 3. Enerji Verimliliği
- Düşük enerjili cihazlar
- Optimize edilmiş süreçler
- Renewable energy kullanımı

## Sektördeki Uygulamalar

### Mikroextraction Teknikleri
- SPME (Solid Phase Microextraction)
- Minimum örnek miktarı
- Solvent-free extraction

### Green Chromatography
- Ultra-short columns
- High temperature LC
- Supercritical fluid chromatography

### Biosensors
- Enzyme-based detection
- Biodegradable materials
- Low power consumption

## Protek Analitik'in Katkıları

- Eco-friendly ürün serisi geliştirme
- Enerji verimli cihaz seçenekleri
- Geri dönüşüm programları
- Carbon footprint azaltma projesi

Gelecek nesillere temiz bir dünya bırakmak için sektör olarak sorumluluğumuzu yerine getiriyoruz.`,
    category: 'sektor-guncel',
    publishDate: '2024-01-05',
    imageUrl: '/images/lab-10.jpg',
    tags: ['Yeşil Kimya', 'Sürdürülebilirlik', 'Çevre', 'İnovasyon']
  }
];

// Örnek etkinlikler
export const eventsData: EventItem[] = [
  {
    id: 'analitik-istanbul-2024',
    title: 'Analitik İstanbul 2024 Fuarı',
    description: 'Türkiye\'nin en büyük analitik kimya ve laboratuvar teknolojileri fuarında bizimle buluşun.',
    content: `Analitik İstanbul 2024 Fuarı'nda Protek Analitik olarak sizlerle buluşmaktan büyük mutluluk duyuyoruz.

## Fuar Programımız

### Stand Lokasyonu: B-205
- **Alan**: 120 m² özel tasarım stand
- **Demo Zone**: Canlı cihaz demonstrasyonları
- **Meeting Room**: Özel görüşme alanı
- **Product Display**: Tüm ürün gamımız

### Canlı Demonstrasyonlar

#### Günlük Demo Programı (11:00-17:00)
- **11:00-12:00**: Hızlı Protein Analiz Sistemi
- **13:00-14:00**: Mikrobiyal Test Kitleri
- **15:00-16:00**: Smart Lab Entegrasyon Sistemi
- **16:00-17:00**: AI Destekli Kalite Kontrol

### Özel Sunum: "Geleceğin Laboratuvarları"
- **Tarih**: 18 Nisan 2024
- **Saat**: 14:00-15:00
- **Konu**: Yapay zeka ve IoT destekli laboratuvar çözümleri
- **Konuşmacı**: Dr. Mehmet Özkan, CTO

### Networking Etkinlikleri

#### Welcome Kokteyli
- **Tarih**: 17 Nisan 2024, 18:00-20:00
- **Yer**: Fuar Center Kokteyl Salonu
- **Davetiye**: Stand ziyaretçilerine özel

#### Teknik Workshop
- **Konu**: "Modern Gıda Analiz Teknikleri"
- **Tarih**: 19 Nisan 2024, 10:00-12:00
- **Katılım**: Ücretsiz (Ön kayıt gerekli)

## Fuar Özel Fırsatları

### Early Bird Kampanyası
- %25 indirim tüm ürünlerde
- Ücretsiz kurulum hizmeti
- 3 yıl garanti
- **Geçerlilik**: Fuar süresince

### Trade-in Programı
- Eski cihazınızı getirin
- Yeni cihaz alımında extra indirim
- Teknik değerlendirme hizmeti

## Randevu Alın

Fuar süresince yoğunluk yaşanmaması için:
- Online randevu sistemi
- Özel görüşme alanı
- Teknik uzman eşliğinde ürün incelemesi

**Randevu**: info@protekanalitik.com
**Tel**: 0212 123 45 67

Analitik İstanbul 2024'te görüşmek üzere!`,
    eventType: 'fuar',
    startDate: '2024-04-17',
    endDate: '2024-04-20',
    location: 'İstanbul Fuar Center, Yeşilköy',
    imageUrl: '/images/lab-1.jpg',
    registrationUrl: 'https://example.com/analitik-istanbul-2024-kayit',
    featured: true
  },
  {
    id: 'gida-analizi-webinar-2024',
    title: 'Gıda Güvenliği ve Hızlı Analiz Teknikleri Webinarı',
    description: 'Gıda güvenliği konusunda en son gelişmeleri ve hızlı analiz tekniklerini online seminerimizde öğrenin.',
    content: `Gıda güvenliği alanında çalışan profesyoneller için hazırladığımız özel webinar serimizin ilk oturumu.

## Webinar İçeriği

### Bölüm 1: Gıda Güvenliği Trendleri (30 dk)
- 2024 regülasyon değişiklikleri
- Yeni kontaminasyon riskleri
- Global gıda güvenliği standartları
- **Konuşmacı**: Dr. Ayşe Kaya, Gıda Güvenliği Uzmanı

### Bölüm 2: Hızlı Test Teknolojileri (45 dk)
- Rapid mikrobiyal detection
- Real-time PCR uygulamaları
- Immunoassay teknikleri
- Portable test devices
- **Konuşmacı**: Mühendis Can Demir, R&D Manager

### Bölüm 3: Case Study Sunumu (30 dk)
- Büyük gıda üreticisinde uygulama
- Maliyet-fayda analizi
- ROI hesaplamaları
- **Konuşmacı**: Proje Yöneticisi Selin Aktaş

### Q&A Oturumu (15 dk)
- Interaktif soru-cevap
- Teknik danışmanlık
- Ürün önerileri

## Katılım Bilgileri

- **Platform**: Zoom Pro
- **Dil**: Türkçe
- **Sertifika**: Katılım sertifikası verilecek
- **Kayıt**: Online ön kayıt zorunlu
- **Kapasitet**: 500 kişi

## Hedef Kitle

- Gıda mühendisleri
- Kalite kontrol uzmanları
- Laboratuvar yöneticileri
- HACCP koordinatörleri
- Gıda güvenliği denetmenleri

## Webinar Öncesi Hazırlık

### Gönderilecek Materyaller
- Sunum PDF'leri
- Teknik dökümanlar
- Ürün broşürleri
- Demo video linkleri

### Ön Bilgi Anketi
- Katılımcı profili
- Beklentiler
- Güncel ihtiyaçlar
- Teknik seviye

## Webinar Sonrası

### Follow-up
- Sunum kayıtları paylaşımı
- Ek teknik dökümanlar
- 1-1 teknik görüşme fırsatı
- Özel fiyat teklifi

Bu webinar, gıda güvenliği alanında güncel kalmanızı ve yeni teknolojileri keşfetmenizi sağlayacak.`,
    eventType: 'webinar',
    startDate: '2024-03-25',
    location: 'Online (Zoom)',
    imageUrl: '/images/lab-7.jpg',
    registrationUrl: 'https://example.com/gida-analizi-webinar-kayit',
    featured: true
  },
  {
    id: 'hplc-workshop-ankara',
    title: 'HPLC Analiz Teknikleri Uygulamalı Workshop',
    description: 'HPLC cihazları ile ileri analiz teknikleri öğrenin. Hands-on pratik uygulamalar dahil.',
    content: `HPLC (High Performance Liquid Chromatography) konusunda derinlemesine bilgi ve pratik deneyim kazanacağınız 2 günlük workshop.

## Program Detayları

### 1. Gün: Teori ve Temel Uygulamalar

#### 09:00-10:30 | HPLC Temelleri
- Kromatografi prensipleri
- Sistem bileşenleri
- Kolon seçimi kriterleri
- **Eğitmen**: Dr. Mustafa Özdemir

#### 10:45-12:00 | Method Development
- Analitik metot geliştirme süreci
- Optimizasyon stratejileri
- Validasyon parametreleri

#### 13:00-14:30 | Troubleshooting
- Yaygın problemler ve çözümler
- Sistem bakımı
- Performans optimizasyonu

#### 14:45-17:00 | Hands-on Uygulama 1
- Sistem kurulumu
- Sample preparation
- İlk analiz

### 2. Gün: İleri Teknikler ve Özel Uygulamalar

#### 09:00-10:30 | İleri HPLC Teknikleri
- UHPLC uygulamaları
- 2D-LC teknikleri
- MS detection

#### 10:45-12:00 | Özel Uygulama Alanları
- Farmasötik analizler
- Gıda ve içecek analizi
- Çevre örnekleri

#### 13:00-14:30 | Data Analysis & Software
- Chromatography software kullanımı
- Peak integration
- Quantitative analysis

#### 14:45-17:00 | Hands-on Uygulama 2
- Karmaşık örnekler
- Method validation
- Rapor yazımı

## Workshop Özellikler

### Katılımcı Sayısı
- **Maksimum**: 12 kişi
- **Minimum**: 6 kişi
- Küçük grup avantajı

### Laboratuvar Olanakları
- Son model HPLC sistemleri
- Çeşitli detector seçenekleri
- Professional software

### Sertifikasyon
- Protek Analitik Workshop Sertifikası
- CPD (Continuing Professional Development) puanları
- LinkedIn credential

## Ön Koşullar

### Gerekli Bilgi Seviyesi
- Temel kimya bilgisi
- Laboratuvar deneyimi (tercihan)
- Analitik kimya background

### Getirmeniz Gerekenler
- Laptop (analiz software için)
- Notebook ve kalem
- Kendi örnekleriniz (opsiyonel)

## Workshop Maliyeti

### Erken Kayıt (30 gün öncesi)
- **Bireysel**: 2.500 TL + KDV
- **Kurumsal (3+ kişi)**: %15 indirim

### Normal Kayıt
- **Bireysel**: 3.000 TL + KDV

### Dahil Olanlar
- 2 gün eğitim
- Öğle yemeği ve ikramlar
- Workshop materyalleri
- Sertifika
- 6 ay teknik destek

HPLC konusunda uzmanlaşmak için kaçırılmayacak fırsat!`,
    eventType: 'workshop',
    startDate: '2024-04-10',
    endDate: '2024-04-11',
    location: 'Protek Analitik Eğitim Merkezi, Ankara',
    imageUrl: '/images/lab-2.jpg',
    registrationUrl: 'https://example.com/hplc-workshop-kayit',
    featured: false
  },
  {
    id: 'mikrobiyal-analiz-semineri',
    title: 'Mikrobiyal Analiz ve Rapid Detection Semineri',
    description: 'Modern mikrobiyal analiz teknikleri ve hızlı tespit yöntemlerini öğrenin.',
    content: `Gıda ve ilaç sektöründe kritik önem taşıyan mikrobiyal analiz konusunda güncel bilgiler.

## Seminer Kapsamı

### Session 1: Mikrobiyal Kontaminasyon
- Gıda patojenleri
- Risk assessment
- Critical control points

### Session 2: Traditional Methods
- Kültür bazlı testler
- Standard protocols
- Quality control

### Session 3: Rapid Methods
- PCR teknikleri
- Immunoassays
- Biosensors

### Session 4: Future Trends
- NGS applications
- Automation
- AI integration

## Konuşmacılar

- **Prof. Dr. Zehra Yılmaz** - Gıda Mikrobiyolojisi Uzmanı
- **Dr. Okan Tekin** - Rapid Detection Specialist
- **Mikrobiyolog Deniz Aydın** - Quality Assurance Manager

## Katılım Detayları

- **Süre**: 1 gün (6 saat)
- **Sertifika**: Katılım belgesi
- **Materyal**: Presentation files, technical papers

Bu seminer, mikrobiyal analiz alanında güncel kalmanızı sağlayacak.`,
    eventType: 'seminer',
    startDate: '2024-03-20',
    location: 'İstanbul Teknik Üniversitesi Konferans Salonu',
    imageUrl: '/images/lab-3.jpg',
    registrationUrl: 'https://example.com/mikrobiyal-seminer-kayit',
    featured: false
  }
];

// Utility functions
export function getNewsByCategory(category: NewsItem['category']): NewsItem[] {
  return newsData.filter(news => news.category === category);
}

export function getFeaturedNews(): NewsItem[] {
  return newsData.filter(news => news.featured);
}

export function getEventsByType(eventType: EventItem['eventType']): EventItem[] {
  return eventsData.filter(event => event.eventType === eventType);
}

export function getFeaturedEvents(): EventItem[] {
  return eventsData.filter(event => event.featured);
}

export function getUpcomingEvents(): EventItem[] {
  const today = new Date().toISOString().split('T')[0];
  return eventsData.filter(event => event.startDate >= today);
} 