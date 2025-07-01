export interface Product {
  id: string
  name: string
  model?: string
  description: string
  overview?: string  // Added field for general overview content
  image: string
  images?: string[]  // Optional field for multiple images
  category: string
  subcategory: string
  features: string[]
  applications: string[]
  specifications?: { [key: string]: string }
  dataSheet?: string
  price?: string
  isWarrantied?: boolean
  hasFreeShipping?: boolean
  catalogFiles?: string[]
  status?: 'draft' | 'published'  // Status for content readiness
  created_at: string
  updated_at?: string  // Added field for last update timestamp
}

export interface Subcategory {
  name: string
  key: string
  description: string
  products: Product[]
}

export interface Category {
  name: string
  key: string
  description: string
  icon: string
  subcategories: Subcategory[]
}

export const productCategories: Category[] = [
  {
    name: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
    key: 'laboratuvar-ekipmanlari',
    description: 'Laboratuvar işletmeleriniz için kapsamlı ekipman, malzeme ve kit çözümleri',
    icon: 'beaker',
    subcategories: [
      {
        name: 'Fiziksel Analiz Ekipmanları',
        key: 'fiziksel-analiz',
        description: 'Fiziksel özellik analizi için profesyonel ekipmanlar',
        products: [
          {
            id: 'brix-001',
            created_at: '2023-01-01T00:00:00.000Z',
            updated_at: '2023-12-15T10:30:00.000Z',
            name: 'Digital Refraktometre DR-A1',
            model: 'DR-A1',
            description: 'Brix ve refraktif indeks tayini için otomatik sıcaklık kompanzasyonlu dijital refraktometre',
            overview: 'Digital Refraktometre DR-A1, gıda endüstrisi ve içecek üretiminde en yüksek hassasiyetle Brix ve refraktif indeks ölçümü yapan profesyonel bir laboratuvar cihazıdır.\n\nBu gelişmiş refraktometre, otomatik sıcaklık kompanzasyonu teknolojisi sayesinde çevresel sıcaklık değişimlerinden etkilenmeden doğru sonuçlar verir. Su geçirmez tasarımı ile zorlu laboratuvar koşullarında güvenle kullanılabilir.\n\nKolay kalibasyon özelliği ile hızlı kurulum sağlar ve rutin bakım gereksinimlerini minimize eder. Özellikle şeker analizi, meyve suyu kalite kontrolü ve gıda üretim süreçlerinde tercih edilen güvenilir bir çözümdür.',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Otomatik sıcaklık kompanzasyonu', 'Su geçirmez tasarım', 'Kolay kalibasyon'],
            applications: ['Gıda endüstrisi', 'İçecek üretimi', 'Şeker analizi'],
            specifications: {
              'Ölçüm Aralığı': '0-85% Brix',
              'Hassasiyet': '±0.1% Brix',
              'Sıcaklık Aralığı': '10-40°C'
            }
          },
          {
            id: 'su-aktivite-001',
            created_at: '2023-01-02T00:00:00.000Z',
            updated_at: '2024-01-10T14:20:00.000Z',
            name: 'AquaLab 4TE Su Aktivite Ölçer',
            model: '4TE',
            description: 'Su aktivite tayini ve sorpsiyon-desorpsiyon analizi için yüksek hassasiyetli cihaz',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Hızlı ölçüm (5 dakika)', 'Yüksek hassasiyet', 'Otomatik kalibasyon'],
            applications: ['Gıda güvenliği', 'Raf ömrü tayini', 'Mikrobiyolojik güvenlik'],
            specifications: {
              'Ölçüm Aralığı': '0.000-1.000 aw',
              'Hassasiyet': '±0.003 aw',
              'Ölçüm Süresi': '5 dakika'
            }
          },
          {
            id: 'colorimeter-001',
            created_at: '2023-01-03T00:00:00.000Z',
            updated_at: '2023-11-28T09:15:00.000Z',
            name: 'Colorimeter CR-400',
            model: 'CR-400',
            description: 'Organoleptik analizler için profesyonel renk ölçüm cihazı',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['L*a*b* renk sistemi', 'Taşınabilir', 'Kolay kullanım'],
            applications: ['Gıda renk kontrolü', 'Kozmetik', 'Tekstil'],
            specifications: {
              'Illuminant': 'D65, A, C',
              'Observer': '2°, 10°',
              'Ölçüm Çapı': '8mm'
            }
          },
          {
            id: 'texture-001',
            created_at: '2023-01-04T00:00:00.000Z',
            updated_at: '2024-01-15T16:45:00.000Z',
            name: 'TA.XTplus Texture Analyser',
            description: 'Tekstürel yapı analizleri için gelişmiş doku analiz cihazı',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Çoklu test modları', 'Yüksek hassasiyet', 'Kolay kullanım'],
            applications: ['Gıda tekstürü', 'Malzeme testi', 'Kalite kontrol'],
            specifications: {
              'Kuvvet Aralığı': '0.1g - 50kg',
              'Hassasiyet': '0.1g',
              'Hız Aralığı': '0.01-40 mm/s'
            }
          },
          {
            id: 'particle-001',
            created_at: '2023-01-05T00:00:00.000Z',
            updated_at: '2024-01-08T11:30:00.000Z',
            name: 'Mastersizer 3000 Particle Size Analyzer',
            description: 'Tane dağılım analizleri için lazer difraksiyon teknolojisi',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Lazer difraksiyon', 'Geniş ölçüm aralığı', 'Yaş/kuru ölçüm'],
            applications: ['Partikül analizi', 'Emülsiyon analizi', 'Toz karakterizasyonu'],
            specifications: {
              'Ölçüm Aralığı': '0.01µm - 3.5mm',
              'Hassasiyet': '±1%',
              'Ölçüm Süresi': '< 10 saniye'
            }
          },
          {
            id: 'moisture-001',
            created_at: '2023-01-06T00:00:00.000Z',
            name: 'MA37 Moisture Analyzer',
            description: 'Rutubet (nem) / kuru madde tayini için halojenlı kurutma sistemi',
            image: '/images/lab-10.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Halojen ısıtma', 'Otomatik sonuçlandırma', 'GLP/GMP uyumlu'],
            applications: ['Gıda analizi', 'Kimyasal analiz', 'Kalite kontrol'],
            specifications: {
              'Kapasitet': '110g',
              'Hassasiyet': '1mg',
              'Sıcaklık Aralığı': '50-160°C'
            }
          },
          {
            id: 'ph-meter-001',
            created_at: '2023-01-07T00:00:00.000Z',
            name: 'SevenExcellence pH/Ion Meter',
            description: 'pH tayini ve iyon selektif ölçümler için gelişmiş metre',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Çoklu parametre', 'ISE fonksiyonu', 'Veri yönetimi'],
            applications: ['Su analizi', 'Gıda kontrolü', 'Çevre analizi'],
            specifications: {
              'pH Aralığı': '-2.000 to 20.000',
              'Hassasiyet': '±0.001 pH',
              'ISE Desteği': 'Var'
            }
          },
          {
            id: 'density-001',
            created_at: '2023-01-08T00:00:00.000Z',
            name: 'DMA 35 Portable Density Meter',
            description: 'Yoğunluk tayini için taşınabilir dijital yoğunlukmetre',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Taşınabilir', 'Hızlı ölçüm', 'Otomatik sıcaklık kompanzasyonu'],
            applications: ['İçecek üretimi', 'Alkol analizi', 'Kimyasal üretim'],
            specifications: {
              'Ölçüm Aralığı': '0-3 g/cm³',
              'Hassasiyet': '±0.001 g/cm³',
              'Numune Hacmi': '2ml'
            }
          },
          {
            id: 'karl-fischer-001',
            created_at: '2023-01-09T00:00:00.000Z',
            name: 'C30S Karl Fischer Coulometer',
            description: 'Karl Fischer nem tayini için yüksek hassasiyetli coulometre',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['ppm seviyesi hassasiyet', 'Otomatik drift kompanzasyonu', 'Solvent recovery'],
            applications: ['İlaç analizi', 'Petrokimya', 'Plastik üretim'],
            specifications: {
              'Ölçüm Aralığı': '10 µg - 200 mg H2O',
              'Hassasiyet': '1 µg H2O',
              'Ölçüm Süresi': '1-5 dakika'
            }
          },
          {
            id: 'viscometer-001',
            created_at: '2023-01-10T00:00:00.000Z',
            name: 'DV2T Viscometer',
            description: 'Viskozite tayini ve reolojik akışkanlık karakteristiği analizi',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Fiziksel Analiz Ekipmanları',
            features: ['Çoklu spindle seçeneği', 'Sıcaklık kontrolü', 'Veri kaydı'],
            applications: ['Boya üretimi', 'Gıda tekstürü', 'Kozmetik formülasyon'],
            specifications: {
              'Viskozite Aralığı': '1 - 13,000,000 cP',
              'Hassasiyet': '±1%',
              'Hız Aralığı': '0.01-250 RPM'
            }
          }
        ]
      },
      {
        name: 'Kimyasal Analiz Ekipmanları',
        key: 'kimyasal-analiz',
        description: 'Kimyasal kompozisyon analizi için gelişmiş cihazlar',
        products: [
          {
            id: 'protein-001',
            created_at: '2023-01-11T00:00:00.000Z',
            name: 'Kjeldahl Protein Analiz Sistemi K-439',
            description: 'Protein tayini için otomatik Kjeldahl distilasyon sistemi',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['Otomatik distilasyon', 'Steam distillation', 'Güvenlik sistemi'],
            applications: ['Gıda protein analizi', 'Yem analizi', 'Araştırma'],
            specifications: {
              'Analiz Süresi': '4 dakika/numune',
              'Su Tüketimi': '< 80ml/analiz',
              'Geri Kazanım': '> 99.5%'
            }
          },
          {
            id: 'yag-001',
            created_at: '2023-01-12T00:00:00.000Z',
            name: 'SoxROC Yağ Ekstraksiyon Sistemi',
            description: 'Yağ tayini için hızlı Soxhlet ekstraksiyon sistemi',
            image: '/images/lab-10.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['Hızlı ekstraksiyon', 'Çözücü geri kazanımı', 'Güvenli işlem'],
            applications: ['Gıda yağ analizi', 'Yem analizi', 'Tarımsal ürünler'],
            specifications: {
              'Numune Kapasitesi': '6 pozisyon',
              'Ekstraksiyon Süresi': '90-120 dakika',
              'Çözücü Kapasitesi': '250ml'
            }
          },
          {
            id: 'titrasyon-001',
            created_at: '2023-01-13T00:00:00.000Z',
            name: 'Excellence T7 Titrator',
            description: 'Asitlik, peroksit değeri ve sabunlaşma değeri tayini için otomatik titratör',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['One Click® titrasyonlar', 'InMotion autosampler', 'LabX yazılımı'],
            applications: ['Toplam asitlik', 'Peroksit değeri', 'Sabunlaşma değeri'],
            specifications: {
              'Hacim Aralığı': '0.01-100 ml',
              'Hassasiyet': '±0.1%',
              'Analiz Hızı': '100+ numune/gün'
            }
          },
          {
            id: 'fiber-001',
            created_at: '2023-01-14T00:00:00.000Z',
            name: 'FIWE Raw Fiber Extractor',
            description: 'Ham selüloz, lignin ve diyet lif analizleri için ekstraksiyon sistemi',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['Asit/baz hidroliz', 'Filtrasyon sistemi', 'Sıcaklık kontrolü'],
            applications: ['Gıda lif analizi', 'Yem analizi', 'Beslenme araştırmaları'],
            specifications: {
              'Kapasitet': '6 numune',
              'Sıcaklık': '100±2°C',
              'Filtrasyon': 'Otomatik'
            }
          },
          {
            id: 'salt-001',
            created_at: '2023-01-15T00:00:00.000Z',
            name: 'Chloride Analyzer 926',
            description: 'Tuz tayini için otomatik klorür analiz cihazı',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['Potansiyometrik titrasyon', 'Gümüş elektrot', 'Otomatik sonuç hesaplama'],
            applications: ['Gıda tuz analizi', 'Su analizi', 'Endüstriyel kontrol'],
            specifications: {
              'Ölçüm Aralığı': '0.01-25% NaCl',
              'Hassasiyet': '±0.1%',
              'Analiz Süresi': '2-3 dakika'
            }
          },
          {
            id: 'sfc-001',
            created_at: '2023-01-16T00:00:00.000Z',
            name: 'SFC Analyzer NMR-SFC',
            description: 'SFC / Katı yağ yüzdesi tayini için NMR teknolojisi',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['NMR teknolojisi', 'Sıcaklık programlamalı', 'Hızlı analiz'],
            applications: ['Margarin üretimi', 'Çikolata endüstrisi', 'Yağ araştırması'],
            specifications: {
              'SFC Aralığı': '0-100%',
              'Hassasiyet': '±0.5%',
              'Ölçüm Süresi': '30 saniye'
            }
          },
          {
            id: 'heavy-metals-001',
            created_at: '2023-01-17T00:00:00.000Z',
            name: 'AAS-240 Atomic Absorption Spectrometer',
            description: 'İz elementler ve ağır metal analizleri için atomik absorpsiyon spektrometresi',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['Çift ışın sistemi', 'Zeeman background correction', 'Otomatik dilution'],
            applications: ['Gıda güvenliği', 'Su analizi', 'Çevre monitoringi'],
            specifications: {
              'Elementler': '70+ element',
              'Hassasiyet': 'ppb seviyesi',
              'Analiz Hızı': '100+ numune/gün'
            }
          },
          {
            id: 'so2-001',
            created_at: '2023-01-18T00:00:00.000Z',
            name: 'SO2 Distillation Unit 323',
            description: 'Kükürt (SO2) tayini için distilasyon ünitesi',
            image: '/images/lab-10.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['Steam distillation', 'Otomatik SO2 tespiti', 'Soğutma sistemi'],
            applications: ['Şarap analizi', 'Meyve suyu', 'Konserve ürünler'],
            specifications: {
              'Ölçüm Aralığı': '1-1000 mg/L',
              'Hassasiyet': '±2%',
              'Distilasyon Süresi': '8 dakika'
            }
          },
          {
            id: 'nir-001',
            created_at: '2023-01-19T00:00:00.000Z',
            name: 'DS2500 NIR Analyzer',
            description: 'NIR spektrofotometrik ölçüm metodu ile çok hassas ve hızlı analiz',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Kimyasal Analiz Ekipmanları',
            features: ['Çoklu parametre analizi', 'Kalibrasyon modelleri', 'Hızlı sonuç'],
            applications: ['Tahıl analizi', 'Et ürünleri', 'Süt ürünleri'],
            specifications: {
              'Dalga Boyu': '400-2500 nm',
              'Analiz Süresi': '< 30 saniye',
              'Parametreler': '20+ parametre'
            }
          }
        ]
      },
      {
        name: 'Mikrobiyoloji Analiz Ekipmanları',
        key: 'mikrobiyoloji',
        description: 'Mikrobiyolojik analizler için kapsamlı ekipman ve malzemeler',
        products: [
          {
            id: 'nutrient-agar-001',
            created_at: '2023-01-20T00:00:00.000Z',
            name: 'Nutrient Agar Dehydrated Media',
            description: 'Genel amaçlı mikroorganizma kültürü için dehidrat besiyeri',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Steril formülasyon', 'Kolay hazırlık', 'Uzun raf ömrü'],
            applications: ['Bakteriyel kültür', 'Mikrobiyolojik analiz', 'Araştırma'],
            specifications: {
              'Paket Boyutu': '500g',
              'pH Değeri': '7.2 ± 0.2',
              'Raf Ömrü': '24 ay'
            }
          },
          {
            id: 'petrifilm-apc-001',
            created_at: '2023-01-21T00:00:00.000Z',
            name: '3M Petrifilm Aerobic Count Plates',
            description: 'Toplam aerobik bakteri sayısı için kullanıma hazır analiz plakaları',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Kullanıma hazır', 'Kolay uygulama', 'Hızlı sonuç'],
            applications: ['Gıda güvenliği', 'Su analizi', 'Çevre kontrolü'],
            specifications: {
              'Paket İçeriği': '25 plaka',
              'İnkübasyon Süresi': '48-72 saat',
              'Sıcaklık': '35°C'
            }
          },
          {
            id: 'petrifilm-ecoli-001',
            created_at: '2023-01-22T00:00:00.000Z',
            name: '3M Petrifilm E.coli/Coliform Count Plates',
            description: 'E.coli ve koliform bakterileri için özel analiz plakaları',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Spesifik tanımlama', 'Chromogenic substrat', 'FDA onaylı'],
            applications: ['Su analizi', 'Gıda güvenliği', 'Hijyen kontrolü'],
            specifications: {
              'Paket İçeriği': '25 plaka',
              'İnkübasyon Süresi': '24-48 saat',
              'Sıcaklık': '35°C'
            }
          },
          {
            id: 'pathogen-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Neogen Listeria Right Now Test',
            description: 'Listeria patojen mikroorganizması için hızlı test sistemi',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Rapid test', 'AOAC onaylı', 'Yüksek spesifite'],
            applications: ['Gıda güvenliği', 'Süt ürünleri', 'Et ürünleri'],
            specifications: {
              'Test Süresi': '60 dakika',
              'Hassasiyet': '1 CFU/25g',
              'Kit İçeriği': '50 test'
            }
          },
          {
            id: 'hygiene-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'SystemSURE Plus ATP Hygiene System',
            description: 'Hijyen kontrol ve izleme sistemleri için ATP bioluminesans',
            image: '/images/lab-10.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Anında sonuç', 'Sayısal okuma', 'Hafıza kapasitesi'],
            applications: ['Yüzey temizliği', 'HACCP kontrolü', 'Sanitasyon doğrulama'],
            specifications: {
              'Test Süresi': '15 saniye',
              'Ölçüm Aralığı': '0-9999 RLU',
              'Hafıza': '2000+ test'
            }
          },
          {
            id: 'dilution-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'BagMixer 400 Stomacher',
            description: 'Kullanıma hazır dilüsyon çözeltileri ve homojenizasyon sistemi',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Steril homojenizasyon', 'Ayarlanabilir hız', 'Timer fonksiyonu'],
            applications: ['Numune hazırlama', 'Mikrobiyolojik analiz', 'Gıda örnekleri'],
            specifications: {
              'Hacim Kapasitesi': '400ml',
              'Hız Aralığı': '4-10 darbe/saniye',
              'Timer': '10 saniye-10 dakika'
            }
          },
          {
            id: 'membrane-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Millipore Membrane Filtration System',
            description: 'Membran filtrasyon sistemleri ve analitik numune hazırlık',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['0.45µm membran', 'Steril filtrasyon', 'Çoklu numune'],
            applications: ['Su analizi', 'Sterilite testi', 'Partikül analizi'],
            specifications: {
              'Membran Boyutu': '47mm',
              'Por Boyutu': '0.45µm',
              'Kapasitet': '6 numune'
            }
          },
          {
            id: 'uht-sterilite-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'BacT/ALERT 3D System',
            description: 'UHT ambalajlarda hızlı sterilite kontrol sistemleri',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Otomatik deteksiyon', 'Kolorimetrik sensör', 'Sürekli monitöring'],
            applications: ['UHT ürünler', 'Sterilite kontrolü', 'Kalite güvence'],
            specifications: {
              'Kapasite': '240 şişe',
              'Deteksiyon Süresi': '6-24 saat',
              'Sıcaklık': '35±2°C'
            }
          },
          {
            id: 'air-quality-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'SAS Super ISO Microbial Air Sampler',
            description: 'Hava kalitesi ve ortamdan mikrobiyolojik kirlilik kontrol ürünleri',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Aktif hava örnekleme', 'ISO 14698 uyumlu', 'Programlanabilir'],
            applications: ['Temiz oda kontrolü', 'Hava kalitesi', 'Çevre monitöringi'],
            specifications: {
              'Örnekleme Hızı': '180 L/dakika',
              'Plaka Boyutu': '90mm',
              'Pil Ömrü': '8 saat'
            }
          },
          {
            id: 'media-prep-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'MediaPrep M25 Automated Media Dispenser',
            description: 'Otomatik besiyeri hazırlık ve steril dolum sistemleri',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Mikrobiyoloji Analiz Ekipmanları',
            features: ['Otomatik dolum', 'Hassas dozajlama', 'Steril koşullar'],
            applications: ['Besiyeri hazırlama', 'Plaka dökme', 'Tüp doldurma'],
            specifications: {
              'Kapasitet': '25L',
              'Dolum Hassasiyeti': '±1%',
              'Sıcaklık Kontrolü': '45-50°C'
            }
          }
        ]
      },
      {
        name: 'Moleküler Biyoloji/Genetik Analiz Ekipmanları',
        key: 'molekuler-biyoloji',
        description: 'DNA/RNA analizi ve GDO tespiti için gelişmiş sistemler',
        products: [
          {
            id: 'gdo-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Real-Time PCR GDO Analiz Sistemi',
            description: 'GDO/Tağşiş analizleri için real-time PCR sistemi',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Moleküler Biyoloji/Genetik Analiz Ekipmanları',
            features: ['Real-time analiz', 'Çoklu hedef', 'Hızlı sonuç'],
            applications: ['GDO tespiti', 'Tağşiş analizi', 'Tür teşhisi'],
            specifications: {
              'Kanal Sayısı': '4 kanal',
              'Numune Kapasitesi': '96 well',
              'Analiz Süresi': '2-3 saat'
            }
          }
        ]
      },
      {
        name: 'Test, Ölçü Kontrol Sistemleri',
        key: 'test-olcu',
        description: 'Çeşitli parametrelerin ölçümü için test ve kontrol cihazları',
        products: [
          {
            id: 'temp-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Testo 735-2 Precision Thermometer',
            description: 'Sıcaklık ölçüm cihazları - Yüksek hassasiyetli dijital termometre',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Çift kanal', 'MIN/MAX değerler', 'Alarm fonksiyonu'],
            applications: ['Gıda kontrolü', 'HVAC', 'Laboratuvar'],
            specifications: {
              'Ölçüm Aralığı': '-200°C to +1372°C',
              'Hassasiyet': '±0.1°C',
              'Yanıt Süresi': '1 saniye'
            }
          },
          {
            id: 'dewpoint-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'DewPoint Pro DP70',
            description: 'Çiğlenme noktası sıcaklığı ölçüm cihazları için taşınabilir sistem',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Hızlı ölçüm', 'Kalibrasyon sertifikası', 'Veri logger'],
            applications: ['Compressed air', 'Process monitoring', 'HVAC'],
            specifications: {
              'Ölçüm Aralığı': '-80 to +20°C Td',
              'Hassasiyet': '±2°C',
              'Equilibrium Süresi': '< 5 dakika'
            }
          },
          {
            id: 'humidity-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'HygroLog HL-NT2 Data Logger',
            description: 'Bağıl nem ölçüm cihazları için hassas sensör teknolojisi',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Veri kaydedici', 'USB çıkışı', 'LCD ekran'],
            applications: ['Depo kontrolü', 'İklim kontrolü', 'Kalite kontrol'],
            specifications: {
              'Nem Aralığı': '0-100% RH',
              'Hassasiyet': '±2% RH',
              'İşletim Sıcaklığı': '-30 to +70°C'
            }
          },
          {
            id: 'absolute-humidity-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'ABS-H1 Absolute Humidity Meter',
            description: 'Mutlak nem ölçüm cihazları için gelişmiş sensör teknolojisi',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['g/m³ ölçümü', 'Otomatik kompanzasyon', 'Trend analizi'],
            applications: ['Kurutma prosesleri', 'İklim kontrolü', 'Enerji yönetimi'],
            specifications: {
              'Ölçüm Aralığı': '0-2000 g/m³',
              'Hassasiyet': '±3% + 0.5 g/m³',
              'Çalışma Sıcaklığı': '0 to +50°C'
            }
          },
          {
            id: 'pressure-diff-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'DP-CALC 5825 Micromanometer',
            description: 'Fark basınç ölçüm cihazları için dijital mikromanometre',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Çift ported', 'Veri logging', 'MIN/MAX/AVG'],
            applications: ['HVAC testi', 'Temiz oda kontrolü', 'Filter test'],
            specifications: {
              'Ölçüm Aralığı': '±2500 Pa',
              'Hassasiyet': '±1% + 0.25 Pa',
              'Çözünürlük': '0.1 Pa'
            }
          },
          {
            id: 'pressure-abs-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'DPI 104 Digital Pressure Indicator',
            description: 'Mutlak basınç ölçüm cihazları için dijital gösterge',
            image: '/images/lab-10.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['0.25% hassasiyet', 'Intrinsically safe', 'Min/Max kayıt'],
            applications: ['Basınç kalibrasyonu', 'Sistem testi', 'Proses kontrolü'],
            specifications: {
              'Ölçüm Aralığı': '0-700 bar',
              'Hassasiyet': '±0.25%',
              'Çalışma Sıcaklığı': '-10 to +50°C'
            }
          },
          {
            id: 'velocity-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'TSI 9545 VelociCalc Air Velocity Meter',
            description: 'Hız ölçüm cihazları için çok fonksiyonlu hava hızı ölçer',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Çok parametre', 'Veri logging', 'USB bağlantı'],
            applications: ['HVAC commissioning', 'IAQ araştırması', 'Fume hood test'],
            specifications: {
              'Hız Aralığı': '0-50 m/s',
              'Hassasiyet': '±3% + 0.02 m/s',
              'Sıcaklık': '-18 to +93°C'
            }
          },
          {
            id: 'rpm-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'PCE-155 Digital Tachometer',
            description: 'Devir ölçüm cihazları için temassız dijital takometere',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Temassız ölçüm', 'Lazer pointer', 'MIN/MAX/AVG'],
            applications: ['Motor kontrolü', 'Fan testi', 'Ekipman bakımı'],
            specifications: {
              'Ölçüm Aralığı': '2.5-100,000 RPM',
              'Hassasiyet': '±0.05% + 1 digit',
              'Mesafe': '50-500mm'
            }
          },
          {
            id: 'flow-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'TSI 4040 Mass Flow Meter',
            description: 'Debi ölçüm cihazları için termal mass flow metre',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Kütlesel debi', 'Sıcaklık kompanzasyonu', 'Datalogging'],
            applications: ['Hava debisi ölçümü', 'HVAC balancing', 'Process monitoring'],
            specifications: {
              'Ölçüm Aralığı': '0-300 SLPM',
              'Hassasiyet': '±1.5% + 0.5% F.S.',
              'Çalışma Sıcaklığı': '0 to +50°C'
            }
          },
          {
            id: 'lux-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'LI-250A Light Meter',
            description: 'Lüx ve ışık şiddeti ölçüm cihazları için quantum sensör',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Quantum sensör', 'Underwater kullanım', 'Kalibrasyonlu'],
            applications: ['Aydınlatma tasarımı', 'Botanik araştırmaları', 'Sera kontrolü'],
            specifications: {
              'Ölçüm Aralığı': '0-10,000 µmol m⁻² s⁻¹',
              'Hassasiyet': '±5%',
              'Dalga Boyu': '400-700 nm'
            }
          },
          {
            id: 'co2-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'TSI 7545 IAQ-CALC CO2 Monitor',
            description: 'Karbondioksit ölçüm cihazları için iç hava kalitesi monitörü',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['NDIR teknolojisi', 'Çok parametre', 'Alarm sistemi'],
            applications: ['İç hava kalitesi', 'HVAC kontrolü', 'Güvenlik izleme'],
            specifications: {
              'Ölçüm Aralığı': '0-5000 ppm',
              'Hassasiyet': '±50 ppm + 3%',
              'Sıcaklık': '0 to +50°C'
            }
          },
          {
            id: 'co-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'BW GasAlert Extreme CO Monitor',
            description: 'Karbonmonoksit ölçüm cihazları için taşınabilir gaz dedektörü',
            image: '/images/lab-10.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Test, Ölçü Kontrol Sistemleri',
            features: ['Tek gaz deteksiyonu', 'Su geçirmez', 'Titreşim alarmı'],
            applications: ['İş güvenliği', 'Confined space', 'Emergency response'],
            specifications: {
              'Ölçüm Aralığı': '0-1000 ppm',
              'Hassasiyet': '1 ppm',
              'Alarm Seviyeleri': 'TWA, STEL, HIGH'
            }
          }
        ]
      },
      {
        name: 'Ambalaj ve Malzeme Test Sistemleri',
        key: 'ambalaj-test',
        description: 'Ambalaj malzemelerinin test ve analizi için özel sistemler',
        products: [
          {
            id: 'package-test-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Instron 3367 Universal Testing System',
            description: 'Ambalaj testleri için çekme, basma ve bükme test sistemi',
            image: '/images/lab-1.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Ambalaj ve Malzeme Test Sistemleri',
            features: ['Çok amaçlı test', 'Load cell seçenekleri', 'Bluehill yazılımı'],
            applications: ['Plastik film testi', 'Kağıt testi', 'Yapıştırıcı testi'],
            specifications: {
              'Maksimum Yük': '30 kN',
              'Test Hızı': '0.001-500 mm/min',
              'Hassasiyet': '±0.5%'
            }
          },
          {
            id: 'bottle-test-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'AGR TopLoad Tester TL-30',
            description: 'Gazlı/gazsız içeceklerde ve sıvı ürünlerde kalite kontrol ekipmanları',
            image: '/images/lab-2.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Ambalaj ve Malzeme Test Sistemleri',
            features: ['Top load test', 'Cam/plastik şişe', 'Otomatik raporlama'],
            applications: ['İçecek endüstrisi', 'Şişe üretimi', 'Kalite kontrolü'],
            specifications: {
              'Maksimum Yük': '3000 N',
              'Test Hızı': '5-25 mm/min',
              'Şişe Boyutu': '10-40mm çap'
            }
          },
          {
            id: 'can-test-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'CANNEED-CBT-1000 Can Testing System',
            description: 'PET/Preform ve metal kutu analiz cihazları için kapsamlı test sistemi',
            image: '/images/lab-3.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Ambalaj ve Malzeme Test Sistemleri',
            features: ['Çok parametre testi', 'Otomatik ölçüm', 'Veri yönetimi'],
            applications: ['Teneke kutu üretimi', 'Aerosol kutular', 'Metal ambalaj'],
            specifications: {
              'Test Parametreleri': '15+ test',
              'Kutu Boyutu': '50-1000ml',
              'Hassasiyet': '±0.1%'
            }
          }
        ]
      },
      {
        name: 'Araştırma ve Geliştirme Ekipmanları',
        key: 'arge-ekipmanlari',
        description: 'AR-GE laboratuvarları için gelişmiş analiz ve test ekipmanları',
        products: [
          {
            id: 'shelf-life-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'VSP2 Vent Sizing Package',
            description: 'Raf ömrü analizi için gelişmiş termal analiz sistemi',
            image: '/images/lab-4.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Araştırma ve Geliştirme Ekipmanları',
            features: ['Thermal screening', 'Adiabatic test', 'Güvenlik analizi'],
            applications: ['İlaç stabilitesi', 'Gıda raf ömrü', 'Kimyasal güvenlik'],
            specifications: {
              'Sıcaklık Aralığı': '-40 to +400°C',
              'Basınç': '0-150 bar',
              'Numune Boyutu': '1-10 ml'
            }
          },
          {
            id: 'stability-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'CLIMACELL 222 Stability Chamber',
            description: 'Ürün stabilizasyon testleri için iklim test odası',
            image: '/images/lab-7.jpg',
            category: 'Laboratuvar Ekipmanları, Sarf Malzemeler Ve Kitler',
            subcategory: 'Araştırma ve Geliştirme Ekipmanları',
            features: ['Hassas kontrol', 'ICH kılavuzları', 'Data logging'],
            applications: ['İlaç stabilitesi', 'Kozmetik testi', 'Elektronik testi'],
            specifications: {
              'Sıcaklık': '+5 to +70°C',
              'Nem': '10-98% RH',
              'Hacim': '222 L'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Proses Kontrol Ve Hat Tipi Analiz Çözümleri',
    key: 'proses-kontrol',
    description: 'Üretim hattında gerçek zamanlı analiz ve kontrol çözümleri',
    icon: 'cube',
    subcategories: [
      {
        name: 'Hat Tipi Analiz Sistemleri',
        key: 'hat-tipi-analiz',
        description: 'Üretim hattında gerçek zamanlı analiz sistemleri',
        products: [
          {
            id: 'nir-ft-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'FT-NIR Spektrometre FN-500',
            description: 'NIR, FT-NIR ve NMR spektrofotometrik ölçüm metodu ile çok hassas analiz',
            image: '/images/lab-3.jpg',
            category: 'Proses Kontrol Ve Hat Tipi Analiz Çözümleri',
            subcategory: 'Hat Tipi Analiz Sistemleri',
            features: ['Gerçek zamanlı analiz', 'Çoklu parametre', 'Kolay entegrasyon'],
            applications: ['Gıda üretimi', 'İlaç sanayii', 'Kimya'],
            specifications: {
              'Dalga Boyu': '1000-2500 nm',
              'Çözünürlük': '4 cm⁻¹',
              'Analiz Süresi': '< 30 saniye'
            }
          },
          {
            id: 'ph-redox-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'İnline pH/Redox Ölçer',
            description: 'pH/Redox ölçümü için hat tipi sensör sistemi',
            image: '/images/lab-4.jpg',
            category: 'Proses Kontrol Ve Hat Tipi Analiz Çözümleri',
            subcategory: 'Hat Tipi Analiz Sistemleri',
            features: ['Sürekli ölçüm', 'Otomatik temizlik', 'Alarm sistemi'],
            applications: ['İçecek üretimi', 'Kimya', 'Su arıtma'],
            specifications: {
              'pH Aralığı': '0-14 pH',
              'Hassasiyet': '±0.01 pH',
              'Sıcaklık Kompanzasyonu': 'Otomatik'
            }
          }
        ]
      },
      {
        name: 'Proses Sensörleri',
        key: 'proses-sensorleri',
        description: 'Üretim kontrolü için çeşitli sensör teknolojileri',
        products: [
          {
            id: 'seviye-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Ultrasonik Seviye Sensörü',
            description: 'Seviye sensörleri ve nokta seviye sensörleri',
            image: '/images/lab-7.jpg',
            category: 'Proses Kontrol Ve Hat Tipi Analiz Çözümleri',
            subcategory: 'Proses Sensörleri',
            features: ['Temassız ölçüm', 'Yüksek hassasiyet', 'Kolay kurulum'],
            applications: ['Tank kontrolü', 'Silo izleme', 'Proses kontrolü'],
            specifications: {
              'Ölçüm Aralığı': '0.2-30 m',
              'Hassasiyet': '±3mm',
              'Çıkış': '4-20mA'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Pilot Tipi Üretim ve Proses Simülasyon Sistemleri',
    key: 'pilot-uretim',
    description: 'Pilot ölçekte üretim ve proses geliştirme sistemleri',
    icon: 'wrench',
    subcategories: [
      {
        name: 'Karıştırma ve Homojenizasyon',
        key: 'karistirma',
        description: 'Karıştırma, homojenizasyon ve dağıtma ekipmanları',
        products: [
          {
            id: 'homoj-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Pilot Homojenizatör PH-100',
            description: 'Laboratuvar tipi yüksek basınç homojenizatörü',
            image: '/images/lab-10.jpg',
            category: 'Pilot Tipi Üretim ve Proses Simülasyon Sistemleri',
            subcategory: 'Karıştırma ve Homojenizasyon',
            features: ['Ayarlanabilir basınç', 'Kolay temizlik', 'Kompakt tasarım'],
            applications: ['Emülsiyon üretimi', 'Nano partikül', 'İlaç formülasyon'],
            specifications: {
              'Maksimum Basınç': '1500 bar',
              'Debi': '0.1-5 L/h',
              'Güç': '2.2 kW'
            }
          }
        ]
      },
      {
        name: 'Kurutma ve İşleme',
        key: 'kurutma-isleme',
        description: 'Spray dryer, fluid bed dryer ve kurutma sistemleri',
        products: [
          {
            id: 'spray-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Mini Spray Dryer SD-05',
            description: 'Spray dryer / Fluid bed dryer / Kuruma ve kurutma sistemleri',
            image: '/images/lab-1.jpg',
            category: 'Pilot Tipi Üretim ve Proses Simülasyon Sistemleri',
            subcategory: 'Kurutma ve İşleme',
            features: ['Kompakt tasarım', 'Kolay kullanım', 'Hızlı kurutma'],
            applications: ['Gıda tozu', 'İlaç granülü', 'Kimyasal ürünler'],
            specifications: {
              'Su Buharlaştırma': '0.5-1.5 L/h',
              'İnlet Sıcaklık': '120-220°C',
              'Outlet Sıcaklık': '60-120°C'
            }
          },
          {
            id: 'lyophilizer-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Laboratuvar Liyofilizatörü LF-10',
            description: 'Lyofilizasyon / Freeze drying (dondurarak kurutma) sistemi',
            image: '/images/lab-2.jpg',
            category: 'Pilot Tipi Üretim ve Proses Simülasyon Sistemleri',
            subcategory: 'Kurutma ve İşleme',
            features: ['Otomatik kontrol', 'Yüksek verim', 'GMP uyumlu'],
            applications: ['İlaç üretimi', 'Gıda koruma', 'Biyolojik ürünler'],
            specifications: {
              'Kapasitet': '1-10 L',
              'Sıcaklık': '-80°C to +60°C',
              'Vakum': '0.1 mbar'
            }
          }
        ]
      },
      {
        name: 'Filtrasyon ve Separasyon',
        key: 'filtrasyon',
        description: 'Filtrasyon, separasyon ve solid phase extraction sistemleri',
        products: [
          {
            id: 'membrane-mf-001',
            created_at: '2023-01-01T00:00:00.000Z',
            name: 'Membran Filtrasyon Sistemi MF-200',
            description: 'Filtrasyon ve separasyon için membran teknolojisi',
            image: '/images/lab-3.jpg',
            category: 'Pilot Tipi Üretim ve Proses Simülasyon Sistemleri',
            subcategory: 'Filtrasyon ve Separasyon',
            features: ['Çoklu membran seçeneği', 'Otomatik yıkama', 'Modüler tasarım'],
            applications: ['Su arıtma', 'Protein saflaştırma', 'Konsantrasyon'],
            specifications: {
              'Membran Alanı': '0.1-2 m²',
              'İşletim Basıncı': '1-10 bar',
              'Sıcaklık Aralığı': '5-80°C'
            }
          }
        ]
      }
    ]
  }
]

// Tüm ürünleri düz liste olarak alma
export const getAllProducts = (): Product[] => {
  return productCategories.flatMap(category => 
    category.subcategories.flatMap(subcategory => subcategory.products)
  )
}

// Kategoriye göre ürünleri alma
export const getProductsByCategory = (categoryKey: string): Product[] => {
  const category = productCategories.find(cat => cat.key === categoryKey)
  if (!category) return []
  return category.subcategories.flatMap(subcategory => subcategory.products)
}

// Alt kategoriye göre ürünleri alma
export const getProductsBySubcategory = (categoryKey: string, subcategoryKey: string): Product[] => {
  const category = productCategories.find(cat => cat.key === categoryKey)
  if (!category) return []
  const subcategory = category.subcategories.find(sub => sub.key === subcategoryKey)
  return subcategory ? subcategory.products : []
}

// Tek ürün alma
export const getProductById = (productId: string): Product | null => {
  const allProducts = getAllProducts()
  return allProducts.find(product => product.id === productId) || null
}

// Arama fonksiyonu
export const searchProducts = (query: string): Product[] => {
  const allProducts = getAllProducts()
  const searchTerm = query.toLowerCase()
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
    product.applications.some(app => app.toLowerCase().includes(searchTerm))
  )
}

// Kategori URL'leri için slug üretme
export const generateCategorySlug = (categoryName: string): string => {
  return categoryName
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Alt kategori URL'leri için slug üretme
export const generateSubcategorySlug = (subcategoryName: string): string => {
  return subcategoryName
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Ürün resimlerini alma fonksiyonu
export const getProductImages = (product: Product): string[] => {
  if (product.images && Array.isArray(product.images)) {
    return product.images
  }
  if (product.image) {
    return [product.image]
  }
  return ['/images/lab-1.jpg'] // Default image
} 