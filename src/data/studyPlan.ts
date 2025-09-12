export const studyPlan = {
  startDate: "2025-09-13",
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
      title: "TYT Açılış: Sayılar, Açılar, Paragraf",
      topics: [
        "TYT Mat: Temel Kavramlar; Sayı Basamakları; Bölünebilme–EBOB–EKOK",
        "TYT Geometri: Doğruda Açılar; Üçgende Açılar",
        "TYT Türkçe: Sözcükte Anlam; Deyim ve Atasözü; Söz Yorumu",
        "TYT Fizik: Fizik Bilimine Giriş; Madde ve Özellikleri",
        "TYT Coğrafya: Doğa ve İnsan; Dünya’nın  Şekli ve Hareketleri",
        "TYT Türkçe: Paragraf Temelleri (Konu–Ana/Yardımcı Düşünce)",
      ],
      focus: "Güçlü zemin: temel kavramlar + paragraf",
    },
    2: {
      title: "TYT Sayılar Derinleşme + Dilbilgisi",
      topics: [
        "TYT Mat: Rasyonel Sayılar; Basit Eşitsizlikler; Mutlak Değer",
        "TYT Mat: Üslü Sayılar; Köklü Sayılar",
        "TYT Türkçe: Cümlede Anlam; Paragrafta Yapı ve Düşünceyi Geliştirme Yolları",
        "TYT Kimya: Kimya Bilimi; Atom ve Periyodik Sistem",
        "TYT Biyoloji: Canlıların Ortak Özellikleri; Canlıların Temel Bileşenleri",
        "TYT Tarih: Tarih ve Zaman; İnsanlığın İlk Dönemleri",
      ],
      focus: "Temel matematik + paragraf ve fen-sosyal",
    },
    3: {
      title: "TYT Denklem–Eşitsizlik + Dil Bilgisi",
      topics: [
        "TYT Mat: Basit Eşitsizlikler; Mutlak Değer; Denklem Çözme",
        "TYT Mat: Çarpanlara Ayırma (Giriş)",
        "TYT Türkçe: Ses Bilgisi; Yazım Kuralları; Noktalama",
        "TYT Biyoloji: Hücre ve Organelleri; Hücre Zarından Madde Geçişi",
        "TYT Tarih: Orta Çağ’da Dünya; İlk ve Orta Çağlarda Türk Dünyası",
      ],
      focus: "Problem çözme + dil bilgisi temeli",
    },
    4: {
      title: "TYT Üslü–Köklü + Paragraf Teknikleri",
      topics: [
        "TYT Mat: Üslü Sayılar; Köklü Sayılar",
        "TYT Mat: Oran–Orantı",
        "TYT Türkçe: Paragrafta Anlatım Teknikleri; Düşünceyi Geliştirme Yolları",
        "TYT Fizik: Isı, Sıcaklık ve Genleşme",
        "TYT Coğrafya: Coğrafi Konum; Harita Bilgisi",
      ],
      focus: "Hız, doğruluk ve metin analizi",
    },
    5: {
      title: "TYT Problemler I + Sosyal",
      topics: [
        "TYT Mat: Sayı Problemleri; Kesir Problemleri; Yaş Problemleri",
        "TYT Mat: Oran–Orantı Problemleri; Denklem Kurma",
        "TYT Türkçe: Cümlede Anlam; Cümle Türleri; Cümlenin Ögeleri",
        "TYT Tarih: İslam Medeniyetinin Doğuşu; Türklerin İslamiyet’i Kabulü",
        "TYT Coğrafya: Atmosfer–Sıcaklık; İklimler",
      ],
      focus: "Çok disiplinli problem çözme",
    },
    6: {
      title: "TYT Problemler II + Kümeler",
      topics: [
        "TYT Mat: Hareket–Hız Problemleri; İşçi–Emek Problemleri",
        "TYT Mat: Kümeler; Kartezyen Çarpım; Mantık",
        "TYT Türkçe: Sözcükte Yapı/Ekler; Sözcük Türleri (İsim–Zamir–Sıfat–Zarf)",
        "TYT Fizik: Basınç; Sıvıların Kaldırma Kuvveti; Dinamik",
        "TYT Felsefe: Bilgi–Varlık–Ahlak Felsefesi",
      ],
      focus: "Karmaşık problem çözme + mantık",
    },
    7: {
      title: "TYT Fonksiyonlar + Elektrik",
      topics: [
        "TYT Mat: Fonksiyonlar; Denklem Çözme (Uygulamalar)",
        "TYT Geometri: Üçgende Yardımcı Elemanlar; Açıortay–Kenarortay",
        "TYT Türkçe: Fiiller; Fiilde Anlam (Kip–Kişi–Yapı); Ek Fiil",
        "TYT Fizik: Elektrik; Manyetizma; İş–Güç–Enerji",
        "TYT Din Kültürü: Bilgi ve İnanç; İslam ve İbadet",
      ],
      focus: "Soyut düşünme + uygulama",
    },
    8: {
      title: "TYT Sayma–Olasılık + Geometri",
      topics: [
        "TYT Mat: Permütasyon–Kombinasyon; Olasılık; Veri–İstatistik",
        "TYT Geometri: Üçgende Alan; Açı–Kenar Bağıntıları",
        "TYT Türkçe: Fiilimsi; Fiilde Çatı; Sözcük Grupları",
        "TYT Kimya: Kimyasal Türler Arası Etkileşimler; Kimyanın Temel Kanunları",
        "TYT Coğrafya: Basınç–Rüzgarlar; Nem–Yağış–Buharlaşma",
      ],
      focus: "TYT temelleri tamamlanır",
    },
    9: {
      title: "TYT Geo Derinleşme + Biyoloji",
      topics: [
        "TYT Geometri: Özel Üçgenler; Eşlik–Benzerlik",
        "TYT Geometri: Çokgenler; Özel Dörtgenler (Dikdörtgen–Kare–Yamuk)",
        "TYT Türkçe: Cümle Türleri; Anlatım Bozukluğu",
        "TYT Biyoloji: Canlıların Sınıflandırılması; Mitoz ve Eşeysiz Üreme",
        "TYT Tarih: Beylikten Devlete Osmanlı; Osmanlı Medeniyeti",
      ],
      focus: "Geometrik düşünce + biyoloji",
    },
    10: {
      title: "TYT Geo + AYT Kümeler Giriş",
      topics: [
        "AYT Mat: 9. Sınıf Kümeler (Temel–İşlemler)",
        "TYT Geometri: Dörtgenler (Paralelkenar–Eşkenar Dörtgen)",
        "TYT Fizik: Hareket ve Kuvvet; Dinamik",
        "TYT Kimya: Karışımlar; Asit–Baz–Tuz",
        "TYT Coğrafya: İç/Dış Kuvvetler; Su–Toprak–Bitkiler",
      ],
      focus: "TYT geo kapanışı + AYT giriş",
    },
    11: {
      title: "TYT Çember–Daire + AYT Denklemler",
      topics: [
        "AYT Mat: Birinci Derece Denklemler ve Eşitsizlikler",
        "TYT Geometri: Çember ve Daire; Çemberde Uzunluk",
        "TYT Kimya: Kimyasal Hesaplamalar; Kimya Her Yerde",
        "TYT Türkçe: Paragraf — Yapı; Yardımcı Düşünce",
      ],
      focus: "Cebir + çember uygulamaları",
    },
    12: {
      title: "TYT Analitik Başlangıç + Üreme",
      topics: [
        "AYT Mat: Üçgenler (Eşlik–Benzerlik–Alan) — Tekrar",
        "TYT Geometri: Analitik Geometri — Nokta ve Doğru",
        "TYT Biyoloji: Mayoz ve Eşeyli Üreme; Kalıtım",
        "TYT Tarih: Klasik Çağda Osmanlı Toplum Düzeni",
      ],
      focus: "Kanıtlama + analitik giriş",
    },
    13: {
      title: "AYT Trig Giriş + TYT Sosyal",
      topics: [
        "AYT Mat: Dik Üçgen ve Trigonometri; Trigonometrik Fonksiyonlar (Temel)",
        "TYT Türkçe: Paragrafta Yapı; Paragrafta Konu–Ana Düşünce",
        "TYT Tarih: Değişen Dünya Dengeleri; Değişim Çağında Avrupa ve Osmanlı",
        "TYT Coğrafya: Nüfus; Göç; Yerleşme",
      ],
      focus: "Trig giriş + sosyal yoğunluk",
    },
    14: {
      title: "AYT Fonksiyon Derinlik + TYT Katı",
      topics: [
        "AYT Mat: Fonksiyon Kavramı; Simetriler; Bileşke ve Ters",
        "AYT Mat: Fonksiyonların Özellikleri ve Dönüşümler",
        "TYT Geometri: Katı Cisimler (Prizma–Küp–Silindir–Piramit–Koni–Küre)",
        "TYT Kimya: Doğa ve Kimya; Kimyanın Temel Kanunları — Tekrar",
      ],
      focus: "Fonksiyonel düşünme + uzay algısı",
    },
    15: {
      title: "AYT Sayma + TYT Optik",
      topics: [
        "AYT Mat: Sıralama–Seçme (Permütasyon–Kombinasyon); Olasılık (Basit)",
        "TYT Geometri: Dönüşüm Geometrisi; Analitik Geometri Alıştırmaları",
        "TYT Fizik: Dalgalar; Optik",
        "TYT Felsefe: Din–Siyaset–Bilim Felsefesi; Dönem Felsefeleri",
      ],
      focus: "Sayma–olasılık ve optik",
    },
    16: {
      title: "TYT Genel Tekrar + Eksik Kapatma",
      topics: [
        "TYT Matematik: Çarpanlara Ayırma; Oran–Orantı; Problemler (Yüzde–Kâr–Zarar–Karışım–Grafik)",
        "TYT Türkçe: Tüm Dilbilgisi Başlıkları Hızlı Tekrar",
        "TYT Fen: Fizik (Basınç/Kaldırma/Dinamik); Kimya (Karışım/Asit–Baz); Biyoloji (Kalıtım/Ekoloji)",
        "TYT Sosyal: Tarih–Coğrafya Genel Tekrar",
      ],
      focus: "TYT sağlamlaştırma + kapatma",
    },
    17: {
      title: "İkinci Derece Denklemler",
      topics: [
        "AYT Mat: İkinci Derece Denklemler (Detaylı)",
        "AYT Mat: Parabol ve Grafik",
        "AYT Mat: Denklem ve Eşitsizlik Sistemleri",
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
        "AYT Mat: Fonksiyonlarda Uygulamalar (Bileşke–Ters)",
      ],
      focus: "Polinomial cebirler",
    },
    19: {
      title: "İleri Trigonometri",
      topics: [
        "AYT Mat: Yönlü Açılar",
        "AYT Mat: Trigonometrik Fonksiyonlar (İleri)",
        "AYT Fizik: Vektörler; Bağıl Hareket; Atışlar; İş–Güç–Enerji",
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
        "AYT Fizik: Elektrik Alan ve Potansiyel; Sığa (Kapasitörler)",
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
        "AYT Mat: Olasılık — Koşullu; Deneysel ve Teorik",
        "AYT Fizik: Manyetik Alan ve İndüksiyon; Alternatif Akım; Transformatörler",
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
        "AYT Fizik: Dalga Mekaniği — Kırınım, Girişim, Doppler",
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
