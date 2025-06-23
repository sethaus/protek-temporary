'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BeakerIcon, 
  Squares2X2Icon, 
  LightBulbIcon, 
  WrenchScrewdriverIcon, 
  ShieldCheckIcon, 
  AcademicCapIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  BuildingOffice2Icon,
  CubeIcon,
  ClipboardDocumentCheckIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  UserGroupIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  FlagIcon,
  TrophyIcon,
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  VideoCameraIcon,
  DocumentArrowDownIcon,
  NewspaperIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  TruckIcon,
  CogIcon,
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  InformationCircleIcon,
  PuzzlePieceIcon,
  BuildingStorefrontIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'

interface MegaMenuLink {
  name: string
  href: string
  description: string
  icon: any
  productCount?: number
}

interface MegaMenuSection {
  title: string
  icon: any
  color: string
  description: string
  links: MegaMenuLink[]
}

interface FeaturedItem {
  name: string
  category: string
  href: string
  image: string
  badge: string
}

interface MegaMenu {
  sections: MegaMenuSection[]
  featured: {
    title: string
    items: FeaturedItem[]
  }
}

interface NavigationItem {
  name: string
  href: string
  megaMenu?: MegaMenu
}

// İletişim mega menu verisi
const iletisimMegaMenu: MegaMenu = {
  sections: [
    {
      title: 'İletişim Bilgileri',
      icon: PhoneIcon,
      color: 'primary',
      description: 'Bize ulaşmanın farklı yolları',
      links: [
        { 
          name: 'Genel Müdürlük', 
          href: '/iletisim#genel-mudurluk', 
          description: 'Ana ofisimiz ve genel müdürlük iletişim bilgileri', 
          icon: BuildingOffice2Icon
        },
        { 
          name: 'Satış Ekibi', 
          href: '/iletisim#satis-ekibi', 
          description: 'Satış temsilcilerimiz ve bölge müdürleri', 
          icon: UserGroupIcon
        },
        { 
          name: 'Teknik Servis', 
          href: '/iletisim#teknik-servis', 
          description: '7/24 teknik destek ve servis hizmetleri', 
          icon: WrenchScrewdriverIcon
        },
        { 
          name: 'Muhasebe', 
          href: '/iletisim#muhasebe', 
          description: 'Faturalandırma ve ödeme işlemleri', 
          icon: BanknotesIcon
        }
      ]
    },
    {
      title: 'Destek Hizmetleri',
      icon: ChatBubbleLeftRightIcon,
      color: 'secondary',
      description: 'Profesyonel destek hizmetlerimiz',
      links: [
        { 
          name: 'Canlı Destek', 
          href: '/iletisim#canli-destek', 
          description: 'Online canlı destek hattı', 
          icon: ChatBubbleLeftRightIcon
        },
        { 
          name: 'Uzaktan Erişim', 
          href: '/iletisim#uzaktan-erisim', 
          description: 'Uzaktan teknik destek ve çözüm hizmetleri', 
          icon: GlobeAltIcon
        },
        { 
          name: 'Eğitim Talepleri', 
          href: '/iletisim#egitim-talepleri', 
          description: 'Özel eğitim ve workshop talepleri', 
          icon: AcademicCapIcon
        },
        { 
          name: 'Şikayet ve Öneriler', 
          href: '/iletisim#sikayet-oneriler', 
          description: 'Geri bildirimleriniz bizim için değerli', 
          icon: EnvelopeIcon
        }
      ]
    },
    {
      title: 'Lojistik ve Teslimat',
      icon: TruckIcon,
      color: 'accent',
      description: 'Teslimat ve lojistik hizmetleri',
      links: [
        { 
          name: 'Kargo Takibi', 
          href: '/iletisim#kargo-takibi', 
          description: 'Sipariş ve kargo durumu sorgulama', 
          icon: TruckIcon
        },
        { 
          name: 'Teslimat Noktaları', 
          href: '/iletisim#teslimat-noktalari', 
          description: 'Türkiye geneli teslimat ağımız', 
          icon: MapPinIcon
        },
        { 
          name: 'Kurulum Hizmetleri', 
          href: '/iletisim#kurulum-hizmetleri', 
          description: 'Yerinde kurulum ve devreye alma', 
          icon: CogIcon
        }
      ]
    }
  ],
  featured: {
    title: "Sosyal Medya",
    items: [
      {
        name: "LinkedIn",
        category: "Bize hızlıca yazın.",
        href: "https://www.linkedin.com/company/protek-analytical-industrial-systems/posts/?feedView=all",
        image: "/images/linkedin-logo.svg",
        badge: "Takip Et"
      },
      {
        name: "Instagram",
        category: "Bizi takip edin.", 
        href: "https://www.instagram.com/protek.analitik/",
        image: "/images/instagram-logo.svg",
        badge: "Takip Et"
      }
    ]
  }
}

const navigation: NavigationItem[] = [
  {
    name: 'Hakkımızda',
    href: '/hakkimizda',
    megaMenu: {
      sections: [
        {
          title: 'Şirket Bilgileri',
          icon: BuildingOffice2Icon,
          color: 'primary',
          description: 'Protek Analitik hakkında detaylı bilgiler',
          links: [
            { 
              name: 'Şirketimiz', 
              href: '/hakkimizda#sirketimiz', 
              description: 'Misyon, vizyon ve değerlerimiz', 
              icon: BuildingOffice2Icon
            },
            { 
              name: 'Tarihçemiz', 
              href: '/hakkimizda#tarihcemiz', 
              description: 'Kuruluşumuzdan bugüne kadar olan yolculuğumuz', 
              icon: DocumentTextIcon
            },
            { 
              name: 'Yönetim Kadrosu', 
              href: '/hakkimizda#yonetim', 
              description: 'Deneyimli yönetim ekibimiz', 
              icon: UserGroupIcon
            },
            { 
              name: 'Organizasyon Şeması', 
              href: '/hakkimizda#organizasyon', 
              description: 'Şirket yapısı ve departmanlarımız', 
              icon: Squares2X2Icon
            }
          ]
        },
        {
          title: 'Kalite ve Sertifikalar',
          icon: TrophyIcon,
          color: 'secondary',
          description: 'Kalite standartları ve sertifikalarımız',
          links: [
            { 
              name: 'ISO Sertifikaları', 
              href: '/hakkimizda#iso-sertifikalari', 
              description: 'ISO 9001, ISO 14001 ve diğer sertifikalarımız', 
              icon: ShieldCheckIcon
            },
            { 
              name: 'Kalite Politikamız', 
              href: '/hakkimizda#kalite-politikasi', 
              description: 'Kalite yönetim sistemimiz ve politikalarımız', 
              icon: TrophyIcon
            },
            { 
              name: 'Akreditasyon', 
              href: '/hakkimizda#akreditasyon', 
              description: 'Laboratuvar akreditasyon belgeleri', 
              icon: AcademicCapIcon
            },
            { 
              name: 'Uygunluk Beyanları', 
              href: '/hakkimizda#uygunluk', 
              description: 'Ürün uygunluk beyanları ve CE belgeleri', 
              icon: ClipboardDocumentCheckIcon
            }
          ]
        },
        {
          title: 'Sosyal Sorumluluk',
          icon: FlagIcon,
          color: 'accent',
          description: 'Topluma ve çevreye olan sorumluluklarımız',
          links: [
            { 
              name: 'Çevre Politikası', 
              href: '/hakkimizda#cevre-politikasi', 
              description: 'Çevresel sorumluluklarımız ve sürdürülebilirlik', 
              icon: GlobeAltIcon
            },
            { 
              name: 'Sosyal Projeler', 
              href: '/hakkimizda#sosyal-projeler', 
              description: 'Toplumsal katkı projelerimiz', 
              icon: FlagIcon
            },
            { 
              name: 'Eğitim Desteği', 
              href: '/hakkimizda#egitim-destegi', 
              description: 'Üniversite ve araştırma kurumlarına desteğimiz', 
              icon: AcademicCapIcon
            }
          ]
        }
      ],
             featured: {
         title: "Başarı Hikayeleri",
         items: [
           {
             name: "25+ Yıllık Deneyim",
             category: "Kurumsal",
             href: "/hakkimizda#basari-hikayeleri",
             image: "/images/lab-2.jpg",
             badge: "Öne Çıkan"
           },
           {
             name: "1000+ Mutlu Müşteri",
             category: "Referanslar", 
             href: "/hakkimizda#referanslar",
             image: "/images/lab-3.jpg",
             badge: "Güvenilir"
           }
         ]
       }
    }
  },
  {
    name: 'Çözümler',
    href: '/cozumler',
    megaMenu: {
      sections: [
        {
          title: 'Endüstriyel Çözümler',
          icon: RocketLaunchIcon,
          color: 'primary',
          description: 'Sektöre özel analitik çözümler',
          links: [
            { 
              name: 'Gıda Güvenliği Çözümleri', 
              href: '/cozumler#gida-guvenligi', 
              description: 'Gıda analizi ve güvenlik test çözümleri', 
              icon: ShieldCheckIcon
            },
            { 
              name: 'Kalite Kontrol Sistemleri', 
              href: '/cozumler#kalite-kontrol', 
              description: 'Üretim kalite kontrol ve izleme sistemleri', 
              icon: ClipboardDocumentCheckIcon
            },
            { 
              name: 'AR-GE Laboratuvar Kurulumu', 
              href: '/cozumler#arge-laboratuvar', 
              description: 'Araştırma geliştirme laboratuvarı kurulum hizmetleri', 
              icon: AcademicCapIcon
            },
            { 
              name: 'Proses Optimizasyonu', 
              href: '/cozumler#proses-optimizasyonu', 
              description: 'Üretim süreç analizi ve optimizasyon hizmetleri', 
              icon: Cog6ToothIcon
            }
          ]
        },
        {
          title: 'Danışmanlık Hizmetleri',
          icon: LightBulbIcon,
          color: 'secondary',
          description: 'Uzman danışmanlık ve eğitim hizmetleri',
          links: [
            { 
              name: 'Teknik Danışmanlık', 
              href: '/cozumler#teknik-danismanlik', 
              description: 'Analitik metod geliştirme ve validasyon', 
              icon: WrenchScrewdriverIcon
            },
            { 
              name: 'Eğitim Programları', 
              href: '/cozumler#egitim-programlari', 
              description: 'Laboratuvar teknikleri ve cihaz eğitimleri', 
              icon: AcademicCapIcon
            },
            { 
              name: 'Kalibrasyon Hizmetleri', 
              href: '/cozumler#kalibrasyon', 
              description: 'Cihaz kalibrasyonu ve kalite güvence hizmetleri', 
              icon: Cog6ToothIcon
            },
            { 
              name: 'Bakım ve Onarım', 
              href: '/cozumler#bakim-onarim', 
              description: 'Preventif bakım ve teknik servis hizmetleri', 
              icon: WrenchScrewdriverIcon
            }
          ]
        },
        {
          title: 'Özel Projeler',
          icon: CubeIcon,
          color: 'accent',
          description: 'Müşteri özel ihtiyaçlarına yönelik çözümler',
          links: [
            { 
              name: 'Özel Cihaz Tasarımı', 
              href: '/cozumler#ozel-cihaz-tasarimi', 
              description: 'İhtiyaca özel analitik cihaz tasarım ve üretimi', 
              icon: CubeIcon
            },
            { 
              name: 'Yazılım Çözümleri', 
              href: '/cozumler#yazilim-cozumleri', 
              description: 'LIMS ve veri yönetim yazılım çözümleri', 
              icon: Squares2X2Icon
            },
            { 
              name: 'Sistem Entegrasyonu', 
              href: '/cozumler#sistem-entegrasyonu', 
              description: 'Mevcut sistemlerle entegrasyon çözümleri', 
              icon: ArrowTrendingUpIcon
            }
          ]
        }
      ],
             featured: {
         title: "Öne Çıkan Çözümler",
         items: [
           {
             name: "Turnkey Laboratuvar",
             category: "Komple Çözüm",
             href: "/cozumler#arge-laboratuvar",
             image: "/images/lab-4.jpg",
             badge: "Popüler"
           },
           {
             name: "Dijital Transformasyon",
             category: "Teknoloji", 
             href: "/cozumler#yazilim-cozumleri",
             image: "/images/lab-10.jpg",
             badge: "Yeni"
           }
         ]
       }
    }
  },
  {
    name: 'Ürünler',
    href: '/urunler',
    megaMenu: {
      sections: [
        {
          title: 'Laboratuvar Ekipmanları & Sarf Malzemeleri',
          icon: BeakerIcon,
          color: 'primary',
          description: 'Kapsamlı laboratuvar analiz çözümleri',
          links: [
            { 
              name: 'Fiziksel Analiz Ekipmanları', 
              href: '/urunler/laboratuvar-ekipmanlari/fiziksel-analiz', 
              description: 'Fiziksel özellik analizi için profesyonel ekipmanlar', 
              icon: BeakerIcon,
              productCount: 10
            },
            { 
              name: 'Kimyasal Analiz Ekipmanları', 
              href: '/urunler/laboratuvar-ekipmanlari/kimyasal-analiz', 
              description: 'Kimyasal kompozisyon analizi için gelişmiş cihazlar', 
              icon: BeakerIcon,
              productCount: 12
            },
            { 
              name: 'Mikrobiyoloji Analiz Ekipmanları', 
              href: '/urunler/laboratuvar-ekipmanlari/mikrobiyoloji-analiz', 
              description: 'Mikrobiyolojik test ve analiz sistemleri', 
              icon: Squares2X2Icon,
              productCount: 10
            },
            { 
              name: 'Moleküler Biyoloji / Genetik Analiz', 
              href: '/urunler/laboratuvar-ekipmanlari/molekuler-biyoloji', 
              description: 'DNA/RNA analiz teknolojileri', 
              icon: LightBulbIcon,
              productCount: 1
            },
            { 
              name: 'Test, Ölçü Kontrol Sistemleri', 
              href: '/urunler/laboratuvar-ekipmanlari/test-olcu-kontrol', 
              description: 'Hassas ölçüm ve kalibre kontrol cihazları', 
              icon: WrenchScrewdriverIcon,
              productCount: 12
            },
            { 
              name: 'Ambalaj ve Malzeme Test Sistemleri', 
              href: '/urunler/laboratuvar-ekipmanlari/ambalaj-test', 
              description: 'Ambalaj dayanıklılık ve kalite test cihazları', 
              icon: ShieldCheckIcon,
              productCount: 3
            },
            { 
              name: 'Araştırma ve Geliştirme Ekipmanları', 
              href: '/urunler/laboratuvar-ekipmanlari/arastirma-gelistirme', 
              description: 'AR-GE laboratuvarları için özel ekipmanlar', 
              icon: AcademicCapIcon,
              productCount: 2
            },
          ]
        },
        {
          title: 'Proses Kontrol & Hat Tipi Analiz',
          icon: Cog6ToothIcon,
          color: 'secondary',
          description: 'Gerçek zamanlı üretim kontrolü',
          links: [
            { 
              name: 'Hat Tipi Analiz Sistemleri', 
              href: '/urunler/proses-kontrol/hat-tipi-analiz', 
              description: 'Üretim hattında gerçek zamanlı analiz sistemleri', 
              icon: ArrowTrendingUpIcon,
              productCount: 1
            },
            { 
              name: 'Proses Sensörleri', 
              href: '/urunler/proses-kontrol/proses-sensorleri', 
              description: 'Üretim kontrolü için çeşitli sensör teknolojileri', 
              icon: Cog6ToothIcon,
              productCount: 1
            },
          ]
        },
        {
          title: 'Pilot Üretim & Simülasyon Sistemleri',
          icon: BuildingOffice2Icon,
          color: 'accent',
          description: 'Küçük ölçekli üretim ve test sistemleri',
          links: [
            { 
              name: 'Karıştırma ve Homojenizasyon', 
              href: '/urunler/pilot-uretim/karistirma', 
              description: 'Karıştırma, homojenizasyon ve dağıtma ekipmanları', 
              icon: CubeIcon,
              productCount: 1
            },
            { 
              name: 'Kurutma ve İşleme', 
              href: '/urunler/pilot-uretim/kurutma-isleme', 
              description: 'Spray dryer, fluid bed dryer ve kurutma sistemleri', 
              icon: BuildingOffice2Icon,
              productCount: 2
            },
            { 
              name: 'Filtrasyon ve Separasyon', 
              href: '/urunler/pilot-uretim/filtrasyon', 
              description: 'Filtrasyon, separasyon ve solid phase extraction sistemleri', 
              icon: ClipboardDocumentCheckIcon,
              productCount: 1
            },
          ]
        }
      ],
      featured: {
        title: "Öne Çıkan Ürünler",
        items: [
          {
            name: "Digital Refraktometre DR-A1",
            category: "Fiziksel Analiz",
            href: "/urunler/laboratuvar-ekipmanlari/fiziksel-analiz/brix-001",
            image: "/images/lab-1.jpg",
            badge: "Popüler"
          },
          {
            name: "Kjeldahl Protein Analiz Sistemi",
            category: "Kimyasal Analiz", 
            href: "/urunler/laboratuvar-ekipmanlari/kimyasal-analiz/protein-001",
            image: "/images/lab-7.jpg",
            badge: "Yeni"
          }
        ]
      }
    }
  },
  {
    name: 'Sektörler',
    href: '/sektorler',
    megaMenu: {
      sections: [
        {
          title: 'Gıda ve İçecek',
          icon: CubeIcon,
          color: 'primary',
          description: 'Gıda endüstrisi analiz çözümleri',
          links: [
            { 
              name: 'Süt ve Süt Ürünleri', 
              href: '/sektorler#sut-urunleri', 
              description: 'Süt kalitesi ve güvenlik analizleri', 
              icon: CubeIcon
            },
            { 
              name: 'Et ve Et Ürünleri', 
              href: '/sektorler#et-urunleri', 
              description: 'Et kalitesi ve beslenme değeri analizleri', 
              icon: CubeIcon
            },
            { 
              name: 'Tahıl ve Baklagiller', 
              href: '/sektorler#tahil-baklagil', 
              description: 'Tahıl kalitesi ve besin değeri analizleri', 
              icon: CubeIcon
            },
            { 
              name: 'İçecek Sanayi', 
              href: '/sektorler#icecek-sanayi', 
              description: 'Alkolsüz ve alkollü içecek analizleri', 
              icon: CubeIcon
            },
            { 
              name: 'Meyve ve Sebze İşleme', 
              href: '/sektorler#meyve-sebze', 
              description: 'Meyve sebze işleme kalite kontrolü', 
              icon: CubeIcon
            }
          ]
        },
        {
          title: 'Kimya ve Petrokimya',
          icon: BeakerIcon,
          color: 'secondary',
          description: 'Kimyasal üretim analiz çözümleri',
          links: [
            { 
              name: 'Petrol ve Türevleri', 
              href: '/sektorler#petrol-turevleri', 
              description: 'Petrol ürünleri kalite kontrol analizleri', 
              icon: BeakerIcon
            },
            { 
              name: 'Polimer ve Plastik', 
              href: '/sektorler#polimer-plastik', 
              description: 'Polimer karakterizasyon ve kalite testleri', 
              icon: BeakerIcon
            },
            { 
              name: 'Boya ve Kaplama', 
              href: '/sektorler#boya-kaplama', 
              description: 'Boya kalitesi ve performans testleri', 
              icon: BeakerIcon
            },
            { 
              name: 'Kimyasal Üretim', 
              href: '/sektorler#kimyasal-uretim', 
              description: 'Kimyasal ürün analiz ve karakterizasyon', 
              icon: BeakerIcon
            }
          ]
        },
        {
          title: 'İlaç ve Kozmetik',
          icon: AcademicCapIcon,
          color: 'accent',
          description: 'Farmasötik ve kozmetik analiz çözümleri',
          links: [
            { 
              name: 'İlaç Üretimi', 
              href: '/sektorler#ilac-uretimi', 
              description: 'Farmasötik kalite kontrol ve analizler', 
              icon: AcademicCapIcon
            },
            { 
              name: 'Kozmetik Ürünler', 
              href: '/sektorler#kozmetik-urunler', 
              description: 'Kozmetik güvenlik ve kalite testleri', 
              icon: AcademicCapIcon
            },
            { 
              name: 'Kişisel Bakım', 
              href: '/sektorler#kisisel-bakim', 
              description: 'Kişisel bakım ürünleri analiz hizmetleri', 
              icon: AcademicCapIcon
            },
            { 
              name: 'Vitamin ve Takviye', 
              href: '/sektorler#vitamin-takviye', 
              description: 'Besin takviyesi kalite kontrol analizleri', 
              icon: AcademicCapIcon
            }
          ]
        }
      ],
             featured: {
         title: "Sektör Çözümleri",
         items: [
           {
             name: "Gıda Güvenlik Paketi",
             category: "Gıda Sanayi",
             href: "/sektorler#sut-urunleri",
             image: "/images/lab-1.jpg",
             badge: "Kapsamlı"
           },
           {
             name: "QC Laboratuvar Kurulumu",
             category: "Kalite Kontrol", 
             href: "/sektorler#ilac-uretimi",
             image: "/images/lab-7.jpg",
             badge: "Profesyonel"
           }
         ]
       }
    }
  },
  {
    name: 'Kaynaklar',
    href: '/kaynaklar',
    megaMenu: {
      sections: [
        {
          title: 'Dokümantasyon',
          icon: DocumentTextIcon,
          color: 'primary',
          description: 'Teknik dökümanlar ve kılavuzlar',
          links: [
            { 
              name: 'Ürün Kataloğu', 
              href: '/kaynaklar#urun-katalogu', 
              description: 'Tüm ürünlerimizin detaylı kataloğu', 
              icon: BookOpenIcon
            },
            { 
              name: 'Teknik Kılavuzlar', 
              href: '/kaynaklar#teknik-kilavuzlar', 
              description: 'Cihaz kullanım ve bakım kılavuzları', 
              icon: DocumentTextIcon
            },
            { 
              name: 'Metod Örnekleri', 
              href: '/kaynaklar#metod-ornekleri', 
              description: 'Analiz metod örnekleri ve uygulamaları', 
              icon: ClipboardDocumentCheckIcon
            },
            { 
              name: 'Veri Sayfaları', 
              href: '/kaynaklar#veri-sayfalari', 
              description: 'Ürün teknik veri sayfaları', 
              icon: DocumentArrowDownIcon
            }
          ]
        },
        {
          title: 'Eğitim ve Destek',
          icon: AcademicCapIcon,
          color: 'secondary',
          description: 'Eğitim materyalleri ve destek hizmetleri',
          links: [
            { 
              name: 'Video Eğitimler', 
              href: '/kaynaklar#video-egitimler', 
              description: 'Cihaz kullanımı video eğitim serileri', 
              icon: VideoCameraIcon
            },
            { 
              name: 'Webinarlar', 
              href: '/kaynaklar#webinarlar', 
              description: 'Canlı eğitim oturumları ve kayıtları', 
              icon: AcademicCapIcon
            },
            { 
              name: 'FAQ', 
              href: '/kaynaklar#sss', 
              description: 'Sıkça sorulan sorular ve cevapları', 
              icon: QuestionMarkCircleIcon
            },
            { 
              name: 'Teknik Destek', 
              href: '/kaynaklar#teknik-destek', 
              description: 'Online teknik destek ve troubleshooting', 
              icon: WrenchScrewdriverIcon
            }
          ]
        },
        {
          title: 'Haberler ve Etkinlikler',
          icon: NewspaperIcon,
          color: 'accent',
          description: 'Sektör haberleri ve etkinlik duyuruları',
          links: [
            { 
              name: 'Şirket Haberleri', 
              href: '/kaynaklar#sirket-haberleri', 
              description: 'Şirket gelişmeleri ve duyurular', 
              icon: NewspaperIcon
            },
            { 
              name: 'Sektör Güncel', 
              href: '/kaynaklar#sektor-guncel', 
              description: 'Analitik sektör trendleri ve gelişmeleri', 
              icon: ArrowTrendingUpIcon
            },
            { 
              name: 'Etkinlik Takvimi', 
              href: '/kaynaklar#etkinlik-takvimi', 
              description: 'Fuar, seminer ve etkinlik duyuruları', 
              icon: CalendarDaysIcon
            },
            { 
              name: 'Başarı Hikayeleri', 
              href: '/kaynaklar#basari-hikayeleri', 
              description: 'Müşteri başarı hikayeleri ve case studyler', 
              icon: TrophyIcon
            }
          ]
        }
      ],
             featured: {
         title: "Öne Çıkan İçerik",
         items: [
           {
             name: "2024 Ürün Kataloğu",
             category: "Dokümantasyon",
             href: "/kaynaklar#urun-katalogu",
             image: "/images/lab-2.jpg",
             badge: "Yeni"
           },
           {
             name: "Laboratuvar Kurulum Rehberi",
             category: "Kılavuz", 
             href: "/kaynaklar#teknik-kilavuzlar",
             image: "/images/lab-3.jpg",
             badge: "Kapsamlı"
           }
         ]
       }
    }
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [megaMenuHovered, setMegaMenuHovered] = useState(false)
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null)
  const menuTimeoutRef = useRef<NodeJS.Timeout>()
  const pathname = usePathname()
  const router = useRouter()

  const handleMouseEnter = (itemName: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
    }
    setActiveMegaMenu(itemName)
    setMegaMenuHovered(true)
  }

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
      setMegaMenuHovered(false)
    }, 150)
  }

  const handleMegaMenuEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
    }
    setMegaMenuHovered(true)
  }

  const handleMegaMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
      setMegaMenuHovered(false)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current)
      }
    }
  }, [])

  const currentMegaMenu = activeMegaMenu === 'İletişim' 
    ? iletisimMegaMenu 
    : navigation.find(item => item.name === activeMegaMenu)?.megaMenu

  // Format link name to handle line breaks
  const formatLinkName = (name: string) => {
    if (name === 'Moleküler Biyoloji / Genetik Analiz') {
      return (
        <>
          Moleküler Biyoloji /<br />
          Genetik Analiz
        </>
      )
    }
    return name
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700'
      case 'secondary':
        return 'from-secondary-500 to-secondary-600 group-hover:from-secondary-600 group-hover:to-secondary-700'
      case 'accent':
        return 'from-accent-500 to-accent-600 group-hover:from-accent-600 group-hover:to-accent-700'
      default:
        return 'from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700'
    }
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's an anchor link to the iletisim page
    if (href.includes('#') && href.startsWith('/iletisim#')) {
      e.preventDefault()
      
      // Close mega menu
      setActiveMegaMenu(null)
      setMegaMenuHovered(false)
      
      const anchor = href.split('#')[1]
      
      // Navigate to the page first if we're not already there
      if (pathname !== '/iletisim') {
        router.push(href)
        return
      }
      
      // If we're already on the page, just scroll to the anchor
      const element = document.getElementById(anchor)
      if (element) {
        const headerHeight = 80
        const yPosition = element.offsetTop - headerHeight
        window.scrollTo({
          top: yPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  const getMenuIcon = (name: string) => {
    switch(name) {
      case 'Hakkımızda': return InformationCircleIcon
      case 'Çözümler': return PuzzlePieceIcon
      case 'Ürünler': return BuildingStorefrontIcon
      case 'Sektörler': return Squares2X2Icon
      case 'Kaynaklar': return DocumentMagnifyingGlassIcon
      default: return HomeIcon
    }
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-all duration-500 bg-white/70 backdrop-blur-lg">
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image 
                    src="/logo-protek.png" 
                    alt="Protek Analitik Logo" 
                    className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                    width={100}
                    height={40}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.megaMenu && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-md'
                    }`}
                  >
                    {item.name}
                    {item.megaMenu && (
                      <ChevronDownIcon 
                        className={`w-4 h-4 transition-transform ${
                          activeMegaMenu === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/teklif-al"
                className="px-5 py-2.5 text-sm font-medium text-[#001328] bg-white/60 backdrop-blur-sm border border-[#001328]/30 rounded-xl hover:bg-[#001328] hover:text-white hover:border-[#2A50F8] transition-all duration-700 hover:shadow-lg hover:scale-105 transform"
              >
                Teklif Al
              </Link>
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('İletişim')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <Link
                  href="/iletisim"
                  className="relative px-5 py-2.5 text-sm font-medium text-white bg-[#001328] rounded-xl hover:bg-gradient-to-r hover:from-[#001328] hover:via-[#2A50F8] hover:to-[#FF4766] transition-all duration-700 shadow-lg hover:shadow-2xl hover:scale-110 transform hover:-translate-y-2 flex items-center gap-2 overflow-hidden group before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-600 hover:before:left-[100%]"
                >
                  İletişim
                  <ChevronDownIcon 
                    className={`w-4 h-4 transition-transform ${
                      activeMegaMenu === 'İletişim' ? 'rotate-180' : ''
                    }`} 
                  />
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-md hover:bg-white/80 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-neutral-700" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-neutral-700" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mega Menu Overlay */}
      {activeMegaMenu && currentMegaMenu && (
        <div 
          className="fixed top-20 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-2xl"
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Main Categories - 3 columns */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {currentMegaMenu.sections.map((section) => {
                    const IconComponent = section.icon
                    return (
                      <div key={section.title} className="group">
                        {/* Section Header */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getColorClasses(section.color)} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex-shrink-0`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-neutral-900 text-sm leading-snug group-hover:text-primary-600 transition-colors break-words">
                                {section.title}
                              </h3>
                              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                                {section.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Section Links */}
                        <div className={`space-y-3 ${section.title === 'Laboratuvar Ekipmanları & Sarf Malzemeleri' ? 'max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 hover:scrollbar-thumb-neutral-400 pr-2' : ''}`}>
                          {section.links.map((link) => {
                            const LinkIcon = link.icon
                            return (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="group/link flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all duration-200 border border-transparent hover:border-neutral-200 hover:shadow-sm"
                                onClick={(e) => handleAnchorClick(e, link.href)}
                              >
                                <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover/link:bg-primary-100 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5">
                                  <LinkIcon className="w-4 h-4 text-neutral-600 group-hover/link:text-primary-600 transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="font-medium text-neutral-900 group-hover/link:text-primary-600 transition-colors text-sm leading-tight break-words">
                                      {formatLinkName(link.name)}
                                    </h4>
                                    {link.productCount && (
                                      <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full flex-shrink-0 mt-0.5">
                                        {link.productCount}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-neutral-500 leading-relaxed overflow-hidden" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                  }}>
                                    {link.description}
                                  </p>
                                </div>
                                <ArrowRightIcon className="w-4 h-4 text-neutral-400 group-hover/link:text-primary-500 group-hover/link:translate-x-1 transition-all flex-shrink-0 mt-1" />
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Featured Products Sidebar - 1 column */}
              <div className="lg:col-span-1 self-start">
                <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-6 border border-neutral-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md">
                      <BeakerIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-base">
                        {currentMegaMenu.featured.title}
                      </h3>
                      <p className="text-xs text-neutral-500">En popüler seçimler</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {currentMegaMenu.featured.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="group/featured block bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-neutral-100 hover:border-primary-200 hover:scale-[1.02] relative overflow-hidden"
                        onClick={(e) => handleAnchorClick(e, item.href)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-secondary-50/0 group-hover/featured:from-primary-50/50 group-hover/featured:to-secondary-50/50 transition-all duration-300"></div>
                        <div className="flex gap-3 relative z-10">
                          <div className="relative flex-shrink-0">
                            <Image 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover shadow-md"
                              width={64}
                              height={64}
                            />
                            <div className="absolute -top-2 -right-2">
                              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs px-2 py-1 rounded-full shadow-md font-medium">
                                {item.badge}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-neutral-900 group-hover/featured:text-primary-600 transition-colors text-sm leading-tight mb-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-neutral-500 mb-2">
                              {item.category}
                            </p>
                            <div className="flex items-center gap-1 text-[#001328] group-hover/featured:text-[#FF4766] transition-colors duration-500">
                              <span className="text-xs font-medium">İncele</span>
                              <ArrowRightIcon className="w-3 h-3 group-hover/featured:translate-x-1 transition-all duration-300" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Enhanced CTA Section */}
                  <div className="space-y-3">
                    <Link
                      href={(() => {
                        switch(activeMegaMenu) {
                          case 'Ürünler': return '/urunler'
                          case 'Hakkımızda': return '/hakkimizda'
                          case 'Çözümler': return '/cozumler'
                          case 'Sektörler': return '/sektorler'
                          case 'Kaynaklar': return '/kaynaklar'
                          case 'İletişim': return '/iletisim'
                          default: return '/urunler'
                        }
                      })()}
                      className="w-full bg-[#001328] text-white text-sm font-semibold py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#001328] hover:via-[#2A50F8] hover:to-[#FF4766] transition-all duration-700 shadow-lg hover:shadow-2xl hover:scale-110 transform hover:-translate-y-2 flex items-center justify-center gap-2 group relative overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-600 hover:before:left-[100%]"
                    >
                      {(() => {
                        switch(activeMegaMenu) {
                          case 'Ürünler': return 'Tüm Ürünleri Görüntüle'
                          case 'Hakkımızda': return 'Şirket Hakkında'
                          case 'Çözümler': return 'Tüm Çözümler'
                          case 'Sektörler': return 'Tüm Sektörler'
                          case 'Kaynaklar': return 'Tüm Kaynaklar'
                          case 'İletişim': return 'İletişim Bilgileri'
                          default: return 'Daha Fazla'
                        }
                      })()}
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link
                      href="/iletisim"
                      className="w-full border-2 border-[#001328] text-[#001328] text-sm font-medium py-2.5 px-4 rounded-xl hover:border-[#FF4766] hover:bg-gradient-to-r hover:from-[#001328] hover:via-[#2A50F8] hover:to-[#FF4766] hover:text-white transition-all duration-700 flex items-center justify-center gap-2 group transform hover:scale-110 hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-2xl before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-600 hover:before:left-[100%]"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      Hızlı Teklif Al
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] z-40 bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-2xl overflow-y-auto"
          >
            <div className="container-custom py-6">
              <div className="space-y-4">
                {navigation.map((item) => {
                  const IconComponent = getMenuIcon(item.name)
                  const isActive = activeMobileSubmenu === item.name
                  const hasSubmenu = item.megaMenu?.sections && item.megaMenu.sections.length > 0

                  return (
                    <div key={item.name} className="rounded-2xl bg-white border border-neutral-100 overflow-hidden">
                      <div 
                        className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-300 ${
                          pathname === item.href
                            ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-600'
                            : 'hover:bg-neutral-50'
                        }`}
                        onClick={() => {
                          if (hasSubmenu) {
                            setActiveMobileSubmenu(isActive ? null : item.name)
                          } else {
                            router.push(item.href)
                            setIsMenuOpen(false)
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${
                            pathname === item.href
                              ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                              : 'bg-neutral-100'
                          } flex items-center justify-center transition-all duration-300`}>
                            <IconComponent className={`w-5 h-5 ${
                              pathname === item.href ? 'text-white' : 'text-neutral-600'
                            }`} />
                          </div>
                          <div>
                            <span className="font-medium text-base">{item.name}</span>
                            {hasSubmenu && item.megaMenu && (
                              <p className="text-xs text-neutral-500 mt-0.5">
                                {item.megaMenu.sections?.length} alt kategori
                              </p>
                            )}
                          </div>
                        </div>
                        {hasSubmenu && (
                          <ChevronDownIcon className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                            isActive ? 'rotate-180' : ''
                          }`} />
                        )}
                      </div>

                      {/* Submenu */}
                      <AnimatePresence>
                        {hasSubmenu && isActive && item.megaMenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-neutral-100"
                          >
                            <div className="p-4 space-y-6">
                              {item.megaMenu.sections.map((section) => {
                                const SectionIcon = section.icon
                                return (
                                  <div key={section.title} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getColorClasses(section.color)} flex items-center justify-center`}>
                                        <SectionIcon className="w-4 h-4 text-white" />
                                      </div>
                                      <div>
                                        <h3 className="font-medium text-sm text-neutral-900">
                                          {section.title}
                                        </h3>
                                        <p className="text-xs text-neutral-500">
                                          {section.description}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 pl-11">
                                      {section.links.map((link) => {
                                        const LinkIcon = link.icon
                                        return (
                                          <Link
                                            key={link.name}
                                            href={link.href}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all duration-200 group"
                                            onClick={() => {
                                              setIsMenuOpen(false)
                                              handleAnchorClick(
                                                new MouseEvent('click') as unknown as React.MouseEvent<HTMLAnchorElement>,
                                                link.href
                                              )
                                            }}
                                          >
                                            <div className="w-6 h-6 rounded-lg bg-neutral-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                                              <LinkIcon className="w-3 h-3 text-neutral-600 group-hover:text-primary-600" />
                                            </div>
                                            <span className="text-sm text-neutral-700 group-hover:text-primary-600">
                                              {formatLinkName(link.name)}
                                            </span>
                                          </Link>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )
                              })}

                              {/* Featured Items */}
                              {item.megaMenu.featured && (
                                <div className="mt-6 pt-6 border-t border-neutral-100">
                                  <h3 className="text-sm font-medium text-neutral-900 mb-4">
                                    {item.megaMenu.featured.title}
                                  </h3>
                                  <div className="grid grid-cols-1 gap-4">
                                    {item.megaMenu.featured.items.map((featuredItem, idx) => (
                                      <Link
                                        key={idx}
                                        href={featuredItem.href}
                                        className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 hover:from-primary-50 hover:to-secondary-50/30 border border-neutral-200/50 transition-all duration-300 group"
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        <Image
                                          src={featuredItem.image}
                                          alt={featuredItem.name}
                                          width={48}
                                          height={48}
                                          className="rounded-lg object-cover"
                                        />
                                        <div>
                                          <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600">
                                            {featuredItem.name}
                                          </h4>
                                          <p className="text-xs text-neutral-500">
                                            {featuredItem.category}
                                          </p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}

                {/* CTA Buttons */}
                <div className="pt-4 space-y-3">
                  <Link
                    href="/teklif-al"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3.5 text-sm font-medium text-[#001328] bg-white border-2 border-[#001328] rounded-xl hover:bg-[#001328] hover:text-white transition-all duration-500 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <DocumentTextIcon className="w-5 h-5" />
                    Teklif Al
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/iletisim"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-[#001328] via-[#2A50F8] to-[#FF4766] rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    İletişime Geç
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 