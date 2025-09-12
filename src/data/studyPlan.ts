export const studyPlan = {
  startDate: "2025-09-10",
  examDate: "2026-06-21",
  totalWeeks: 40,
  strategy: {
    weeks1to8: "TYT Temel Kavramlar ve Güçlü Zemin",
    weeks9to16: "TYT Derinleştirme ve İlk AYT Konuları",
    weeks17to28: "AYT Ağırlıklı Çalışma ve TYT Pekiştirme",
    weeks29to36: "İleri AYT Konuları ve Entegrasyon",
    weeks37to40: "Genel Tekrar, Deneme ve Sınav Hazırlığı",
  },
  weeklyPlan: {
    1: {
      title: "Temel Kavramlar ve Sayılar",
      topics: [
        "TYT Mat: Temel Kavramlar, Sayı Basamakları",
        "TYT Türkçe: Sözcükte Anlam, Deyim ve Atasözü",
        "Fizik Temelleri: Fizik Bilimine Giriş",
      ],
      focus: "Güçlü zemin oluşturma",
    },
    2: {
      title: "Sayılar ve Paragraf",
      topics: [
        "TYT Mat: Bölünebilme, EBOB-EKOK, Rasyonel Sayılar",
        "TYT Türkçe: Paragraf, Cümlede Anlam",
        "TYT Kimya: Ki mya Bilimi, Atomun Yapısı",
      ],
      focus: "Temel matematiksel düşünce",
    },
    3: {
      title: "Denklemler ve Dilbilgisi",
      topics: [
        "TYT Mat: Basit Eşitsizlikler, Mutlak Değer",
        "TYT Türkçe: Ses Bilgisi, Yazım Kuralları",
        "TYT Biyoloji: Canlıların Ortak Özellikleri",
      ],
      focus: "Problem çözme becerileri",
    },
    4: {
      title: "Üslü Sayılar ve Metin Analizi",
      topics: [
        "TYT Mat: Üslü Sayılar, Köklü Sayılar",
        "TYT Türkçe: Noktalama İşaretleri, Anlatım Bozukluğu",
        "TYT Fizik: Madde ve Özellikleri, Isı-Sıcaklık",
      ],
      focus: "Hız ve doğruluk",
    },
    5: {
      title: "Problemler ve Sosyal Bilimler",
      topics: [
        "TYT Mat: Sayı Problemleri, Kesir Problemleri",
        "TYT Tarih: İlk Türk Devletleri, İslam Medeniyeti",
        "TYT Coğrafya: Dünya'nın Şekli, Harita Bilgisi",
      ],
      focus: "Çok disiplinli düşünme",
    },
    6: {
      title: "İleri Problemler ve Kümeler",
      topics: [
        "TYT Mat: Yaş-Hareket-İşçi Problemleri",
        "TYT Mat: Kümeler, Kartezyen Çarpım",
        "TYT Felsefe: Bilgi Felsefesi, Varlık Felsefesi",
      ],
      focus: "Karmaşık problem çözme",
    },
    7: {
      title: "Fonksiyonlar ve Elektrik",
      topics: [
        "TYT Mat: Fonksiyonlar, Mantık",
        "TYT Fizik: Elektrik, Manyetizma",
        "TYT Din: İnanç ve İbadet Temelleri",
      ],
      focus: "Soyut düşünme",
    },
    8: {
      title: "Olasılık ve TYT Geometri",
      topics: [
        "TYT Mat: Permütasyon-Kombinasyon, Olasılık",
        "TYT Geometri: Açılar, Üçgenler",
        "TYT Kimya: Periyodik Tablo, Maddenin Halleri",
      ],
      focus: "TYT temellerinin tamamlanması",
    },
    9: {
      title: "Geometri Derinleştirme",
      topics: [
        "TYT Geometri: Özel Üçgenler, Eşlik-Benzerlik",
        "TYT Mat: Veri-İstatistik",
        "TYT Biyoloji: Hücre ve Organelleri",
      ],
      focus: "Geometrik düşünce geliştirme",
    },
    10: {
      title: "İlk AYT Matematiği",
      topics: [
        "AYT Mat: 9.Sınıf Kümeler (Detaylı)",
        "TYT Geometri: Çokgenler, Dörtgenler",
        "TYT Fizik: Hareket ve Kuvvet",
      ],
      focus: "AYT'ye geçiş",
    },
    11: {
      title: "Denklem Sistemleri",
      topics: [
        "AYT Mat: Birinci Derece Denklemler",
        "TYT Geometri: Çember ve Daire",
        "TYT Kimya: Kimyasal Hesaplamalar",
      ],
      focus: "Cebirsel manipülasyon",
    },
    12: {
      title: "Üçgen Geometrisi",
      topics: [
        "AYT Mat: Üçgenler (Eşlik-Benzerlik-Alan)",
        "TYT Geometri: Analitik Geometri Temelleri",
        "TYT Biyoloji: Hücre Bölünmeleri",
      ],
      focus: "Geometrik kanıtlama",
    },
    13: {
      title: "Trigonometri Başlangıcı",
      topics: [
        "AYT Mat: Dik Üçgen ve Trigonometri",
        "AYT Mat: Trigonometrik Fonksiyonlar (Temel)",
        "TYT Sosyal: Osmanlı Kuruluş Dönemi",
      ],
      focus: "Trigonometrik düşünce",
    },
    14: {
      title: "Fonksiyonlar Derinlik",
      topics: [
        "AYT Mat: Fonksiyon Kavramı (Detaylı)",
        "AYT Mat: Fonksiyonların Özellikleri",
        "TYT Geometri: Katı Cisimler",
      ],
      focus: "Fonksiyonel düşünce",
    },
    15: {
      title: "Dörtgenler ve Sıralama",
      topics: [
        "AYT Mat: Dörtgenler ve Özellikleri",
        "AYT Mat: Sıralama ve Seçme (Permütasyon-Kombinasyon)",
        "TYT Fen: Dalgalar ve Optik",
      ],
      focus: "Sayma ve geometri",
    },
    16: {
      title: "TYT Genel Tekrarı",
      topics: [
        "TYT Matematik: Tüm Konular Hızlı Tekrar",
        "TYT Türkçe: Paragraf Odaklı Çalışma",
        "TYT Fen-Sosyal: Zayıf Konular Pekiştirme",
      ],
      focus: "TYT'yi sağlamlaştırma",
    },
    17: {
      title: "İkinci Derece Denklemler",
      topics: [
        "AYT Mat: İkinci Derece Denklemler (Detaylı)",
        "AYT Mat: Parabol ve Grafik",
        "AYT Fizik: Newton'un Hareket Yasaları",
      ],
      focus: "Kuadratik fonksiyonlar",
    },
    18: {
      title: "Polinomlar",
      topics: [
        "AYT Mat: Polinom Kavramı ve İşlemler",
        "AYT Mat: Polinomlarda Çarpanlara Ayırma",
        "AYT Kimya: Modern Atom Teorisi",
      ],
      focus: "Polinomial cebirler",
    },
    19: {
      title: "İleri Trigonometri",
      topics: [
        "AYT Mat: Yönlü Açılar",
        "AYT Mat: Trigonometrik Fonksiyonlar (İleri)",
        "AYT Fizik: Atışlar, İş-Güç-Enerji",
      ],
      focus: "Trigonometrik denklemler",
    },
    20: {
      title: "Analitik Geometri",
      topics: [
        "AYT Mat: Doğrunun Analitik İncelenmesi",
        "AYT Mat: Analitik Düzlemde Dönüşümler",
        "AYT Biyoloji: İnsan Fizyolojisi (Sinir Sistemi)",
      ],
      focus: "Koordinat sistemi",
    },
    21: {
      title: "Çember Geometrisi",
      topics: [
        "AYT Mat: Çemberin Temel Elemanları",
        "AYT Mat: Çemberde Açılar ve Teğet",
        "AYT Fizik: Elektrik Alan ve Potansiyel",
      ],
      focus: "Çember teoremi",
    },
    22: {
      title: "Katı Geometri",
      topics: [
        "AYT Mat: Katı Cisimlerin Hacim ve Alan",
        "AYT Mat: Uzay Geometrisi",
        "AYT Kimya: Gazlar",
      ],
      focus: "3 boyutlu düşünce",
    },
    23: {
      title: "Logaritma",
      topics: [
        "AYT Mat: Üstel Fonksiyonlar",
        "AYT Mat: Logaritma Fonksiyonu ve Denklemler",
        "AYT Biyoloji: Sindirim ve Dolaşım Sistemi",
      ],
      focus: "Üstel-logaritmik ilişkiler",
    },
    24: {
      title: "Diziler",
      topics: [
        "AYT Mat: Gerçek Sayı Dizileri",
        "AYT Mat: Aritmetik ve Geometrik Diziler",
        "AYT Fizik: Manyetik Alan ve İndüksiyon",
      ],
      focus: "Dizi ve seriler",
    },
    25: {
      title: "Limit Kavramı",
      topics: [
        "AYT Mat: Limit ve Süreklilik",
        "AYT Mat: Limit Hesaplama Teknikleri",
        "AYT Kimya: Sıvı Çözeltiler ve Çözünürlük",
      ],
      focus: "Limit anlayışı",
    },
    26: {
      title: "Türev Temelleri",
      topics: [
        "AYT Mat: Anlık Değişim Oranı ve Türev",
        "AYT Mat: Türev Alma Kuralları",
        "AYT Biyoloji: Solunum ve Boşaltım Sistemi",
      ],
      focus: "Değişim oranları",
    },
    27: {
      title: "Türev Uygulamaları",
      topics: [
        "AYT Mat: Türevin Uygulamaları (Ekstremum)",
        "AYT Mat: Grafik Çizimi",
        "AYT Fizik: Çembersel Hareket",
      ],
      focus: "Optimizasyon",
    },
    28: {
      title: "İntegral Başlangıcı",
      topics: [
        "AYT Mat: Belirsiz İntegral",
        "AYT Mat: Temel İntegral Kuralları",
        "AYT Kimya: Kimyasal Tepkimelerde Enerji",
      ],
      focus: "Ters türev",
    },
    29: {
      title: "Belirli İntegral",
      topics: [
        "AYT Mat: Belirli İntegral ve Alan Hesabı",
        "AYT Mat: İntegralle Alan ve Hacim",
        "AYT Fizik: Basit Harmonik Hareket",
      ],
      focus: "Geometrik uygulamalar",
    },
    30: {
      title: "Trigonometrik Denklemler",
      topics: [
        "AYT Mat: Toplam-Fark Formülleri",
        "AYT Mat: Trigonometrik Denklem Çözme",
        "AYT Biyoloji: Üreme Sistemi ve Gelişim",
      ],
      focus: "Trigonometrik manipülasyon",
    },
    31: {
      title: "Çemberin Analitik İncelemesi",
      topics: [
        "AYT Mat: Çemberin Denklemi",
        "AYT Mat: Çember ve Doğru İlişkileri",
        "AYT Kimya: Kimyasal Denge",
      ],
      focus: "Analitik çember",
    },
    32: {
      title: "İleri Fizik Konuları",
      topics: [
        "AYT Fizik: Dalga Mekaniği ve Girişim",
        "AYT Fizik: Atom Fiziği ve Radyoaktivite",
        "AYT Mat: Karmaşık Sayılar (Tekrar)",
      ],
      focus: "Modern fizik",
    },
    33: {
      title: "Organik Kimya",
      topics: [
        "AYT Kimya: Karbon Kimyasına Giriş",
        "AYT Kimya: Organik Bileşikler",
        "AYT Biyoloji: Genetik Şifre ve Protein Sentezi",
      ],
      focus: "Organik yapılar",
    },
    34: {
      title: "Biyolojik Süreçler",
      topics: [
        "AYT Biyoloji: Fotosentez ve Kemosentez",
        "AYT Biyoloji: Hücresel Solunum",
        "AYT Kimya: Asit-Baz Dengesi",
      ],
      focus: "Canlılık süreçleri",
    },
    35: {
      title: "Ekoloji ve Çevre",
      topics: [
        "AYT Biyoloji: Komünite ve Popülasyon Ekolojisi",
        "AYT Biyoloji: Bitki Biyolojisi",
        "AYT Fizik: Modern Fiziğin Uygulamaları",
      ],
      focus: "Ekolojik düşünce",
    },
    36: {
      title: "Elektrokimya ve Enerji",
      topics: [
        "AYT Kimya: Kimya ve Elektrik",
        "AYT Kimya: Enerji Kaynakları",
        "AYT Fizik: Kütle Çekim ve Kepler Yasaları",
      ],
      focus: "Enerji dönüşümleri",
    },
    37: {
      title: "Matematik Genel Tekrar",
      topics: [
        "TYT-AYT Mat: Tüm Konular Hızlı Geçiş",
        "Zayıf Matematik Konuları Pekiştirme",
        "Matematik Soru Çözüm Stratejileri",
      ],
      focus: "Matematik mükemmelliği",
    },
    38: {
      title: "Fen Bilimleri Entegrasyon",
      topics: [
        "AYT Fizik: Tüm Konular Özet",
        "AYT Kimya: Tüm Konular Özet",
        "AYT Biyoloji: Tüm Konular Özet",
      ],
      focus: "Fen bilimleri sinerji",
    },
    39: {
      title: "Son Tekrarlar ve Stratejiler",
      topics: [
        "TYT: Hız ve Doğruluk Çalışması",
        "AYT: Zor Soru Teknikleri",
        "Sınav Psikolojisi ve Zaman Yönetimi",
      ],
      focus: "Sınav hazırlığı",
    },
    40: {
      title: "Sınav Haftası Hazırlık",
      topics: [
        "Genel Özet ve Formül Tekrarı",
        "Motivasyon ve Rahatlama",
        "Son Kontroller ve Sınav Stratejisi",
      ],
      focus: "Sınav performansı",
    },
  },
} as const;

