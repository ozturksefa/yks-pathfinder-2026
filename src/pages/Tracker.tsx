import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle2, Circle, Clock, Target, PlusCircle, Play, Square, Timer } from "lucide-react";
import { getActiveUserId, loadCompletedTopics, saveCompletedTopics, clearCompletedTopics, getActiveTimer, setActiveTimer } from "@/lib/storage";
import { loadSessions, addSession, loadSchedule, loadAvailability, loadExamPrefs, saveSchedule } from "@/lib/storage";
import { LogStudyDialog } from "@/components/LogStudyDialog";
import { PomodoroSettings } from "@/components/PomodoroSettings";
import { loadPomodoroSettings } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";
import { decomposeTopic, totalSubtasksForPlan, optimizeWeekSchedule } from "@/lib/schedule";
import { studyPlan } from "@/data/studyPlan";

const LogButton = ({ topicKey, topicTitle }: { topicKey: string; topicTitle: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="mr-2">
        <PlusCircle className="h-4 w-4 mr-1" /> Süre Ekle
      </Button>
      <LogStudyDialog open={open} onOpenChange={setOpen} topicKey={topicKey} topicTitle={topicTitle} />
    </>
  );
};

/* moved: studyPlan now imported from data/studyPlan for single source of truth
const studyPlan = {
  startDate: "2025-09-10",
  examDate: "2026-06-21",
  totalWeeks: 40,
  strategy: {
    weeks1to8: "TYT Temel Kavramlar ve Güçlü Zemin",
    weeks9to16: "TYT Derinleştirme ve İlk AYT Konuları", 
    weeks17to28: "AYT Ağırlıklı Çalışma ve TYT Pekiştirme",
    weeks29to36: "İleri AYT Konuları ve Entegrasyon",
    weeks37to40: "Genel Tekrar, Deneme ve Sınav Hazırlığı"
  },
  weeklyPlan: {
    // HAFTA 1-8: TYT TEMELLERİ
    1: {
      title: "Temel Kavramlar ve Sayılar",
      topics: [
        "TYT Mat: Temel Kavramlar, Sayı Basamakları",
        "TYT Türkçe: Sözcükte Anlam, Deyim ve Atasözü", 
        "Fizik Temelleri: Fizik Bilimine Giriş"
      ],
      focus: "Güçlü zemin oluşturma"
    },
    2: {
      title: "Sayılar ve Paragraf",
      topics: [
        "TYT Mat: Bölünebilme, EBOB-EKOK, Rasyonel Sayılar",
        "TYT Türkçe: Paragraf, Cümlede Anlam",
        "TYT Kimya: Kimya Bilimi, Atomun Yapısı"
      ],
      focus: "Temel matematiksel düşünce"
    },
    3: {
      title: "Denklemler ve Dilbilgisi", 
      topics: [
        "TYT Mat: Basit Eşitsizlikler, Mutlak Değer",
        "TYT Türkçe: Ses Bilgisi, Yazım Kuralları",
        "TYT Biyoloji: Canlıların Ortak Özellikleri"
      ],
      focus: "Problem çözme becerileri"
    },
    4: {
      title: "Üslü Sayılar ve Metin Analizi",
      topics: [
        "TYT Mat: Üslü Sayılar, Köklü Sayılar", 
        "TYT Türkçe: Noktalama İşaretleri, Anlatım Bozukluğu",
        "TYT Fizik: Madde ve Özellikleri, Isı-Sıcaklık"
      ],
      focus: "Hız ve doğruluk"
    },
    5: {
      title: "Problemler ve Sosyal Bilimler",
      topics: [
        "TYT Mat: Sayı Problemleri, Kesir Problemleri",
        "TYT Tarih: İlk Türk Devletleri, İslam Medeniyeti",
        "TYT Coğrafya: Dünya'nın Şekli, Harita Bilgisi"
      ],
      focus: "Çok disiplinli düşünme"
    },
    6: {
      title: "İleri Problemler ve Kümeler",
      topics: [
        "TYT Mat: Yaş-Hareket-İşçi Problemleri",
        "TYT Mat: Kümeler, Kartezyen Çarpım",
        "TYT Felsefe: Bilgi Felsefesi, Varlık Felsefesi"
      ],
      focus: "Karmaşık problem çözme"
    },
    7: {
      title: "Fonksiyonlar ve Elektrik",
      topics: [
        "TYT Mat: Fonksiyonlar, Mantık", 
        "TYT Fizik: Elektrik, Manyetizma",
        "TYT Din: İnanç ve İbadet Temelleri"
      ],
      focus: "Soyut düşünme"
    },
    8: {
      title: "Olasılık ve TYT Geometri",
      topics: [
        "TYT Mat: Permütasyon-Kombinasyon, Olasılık",
        "TYT Geometri: Açılar, Üçgenler",
        "TYT Kimya: Periyodik Tablo, Maddenin Halleri"
      ],
      focus: "TYT temellerinin tamamlanması"
    },
    
    // HAFTA 9-16: TYT DERONLEŞTİRME + İLK AYT
    9: {
      title: "Geometri Derinleştirme",
      topics: [
        "TYT Geometri: Özel Üçgenler, Eşlik-Benzerlik",
        "TYT Mat: Veri-İstatistik",
        "TYT Biyoloji: Hücre ve Organelleri"
      ],
      focus: "Geometrik düşünce geliştirme"
    },
    10: {
      title: "İlk AYT Matematiği",
      topics: [
        "AYT Mat: 9.Sınıf Kümeler (Detaylı)",
        "TYT Geometri: Çokgenler, Dörtgenler", 
        "TYT Fizik: Hareket ve Kuvvet"
      ],
      focus: "AYT'ye geçiş"
    },
    11: {
      title: "Denklem Sistemleri",
      topics: [
        "AYT Mat: Birinci Derece Denklemler", 
        "TYT Geometri: Çember ve Daire",
        "TYT Kimya: Kimyasal Hesaplamalar"
      ],
      focus: "Cebirsel manipülasyon"
    },
    12: {
      title: "Üçgen Geometrisi", 
      topics: [
        "AYT Mat: Üçgenler (Eşlik-Benzerlik-Alan)",
        "TYT Geometri: Analitik Geometri Temelleri",
        "TYT Biyoloji: Hücre Bölünmeleri"
      ],
      focus: "Geometrik kanıtlama"
    },
    13: {
      title: "Trigonometri Başlangıcı",
      topics: [
        "AYT Mat: Dik Üçgen ve Trigonometri",
        "AYT Mat: Trigonometrik Fonksiyonlar (Temel)",
        "TYT Sosyal: Osmanlı Kuruluş Dönemi"
      ],
      focus: "Trigonometrik düşünce"
    },
    14: {
      title: "Fonksiyonlar Derinlik",
      topics: [
        "AYT Mat: Fonksiyon Kavramı (Detaylı)",
        "AYT Mat: Fonksiyonların Özellikleri",
        "TYT Geometri: Katı Cisimler"
      ],
      focus: "Fonksiyonel düşünce"
    },
    15: {
      title: "Dörtgenler ve Sıralama",
      topics: [
        "AYT Mat: Dörtgenler ve Özellikleri",
        "AYT Mat: Sıralama ve Seçme (Permütasyon-Kombinasyon)",
        "TYT Fen: Dalgalar ve Optik"
      ],
      focus: "Sayma ve geometri"
    },
    16: {
      title: "TYT Genel Tekrarı",
      topics: [
        "TYT Matematik: Tüm Konular Hızlı Tekrar",
        "TYT Türkçe: Paragraf Odaklı Çalışma", 
        "TYT Fen-Sosyal: Zayıf Konular Pekiştirme"
      ],
      focus: "TYT'yi sağlamlaştırma"
    },
    
    // HAFTA 17-28: AYT AĞIRLIKLI ÇALIŞMA
    17: {
      title: "İkinci Derece Denklemler",
      topics: [
        "AYT Mat: İkinci Derece Denklemler (Detaylı)",
        "AYT Mat: Parabol ve Grafik",
        "AYT Fizik: Newton'un Hareket Yasaları"
      ],
      focus: "Kuadratik fonksiyonlar"
    },
    18: {
      title: "Polinomlar",
      topics: [
        "AYT Mat: Polinom Kavramı ve İşlemler",
        "AYT Mat: Polinomlarda Çarpanlara Ayırma", 
        "AYT Kimya: Modern Atom Teorisi"
      ],
      focus: "Polinomial cebirler"
    },
    19: {
      title: "İleri Trigonometri",
      topics: [
        "AYT Mat: Yönlü Açılar",
        "AYT Mat: Trigonometrik Fonksiyonlar (İleri)",
        "AYT Fizik: Atışlar, İş-Güç-Enerji"
      ],
      focus: "Trigonometrik denklemler"
    },
    20: {
      title: "Analitik Geometri",
      topics: [
        "AYT Mat: Doğrunun Analitik İncelenmesi",
        "AYT Mat: Analitik Düzlemde Dönüşümler",
        "AYT Biyoloji: İnsan Fizyolojisi (Sinir Sistemi)"
      ],
      focus: "Koordinat sistemi"
    },
    21: {
      title: "Çember Geometrisi",
      topics: [
        "AYT Mat: Çemberin Temel Elemanları",
        "AYT Mat: Çemberde Açılar ve Teğet",
        "AYT Fizik: Elektrik Alan ve Potansiyel"
      ],
      focus: "Çember teoremi"
    },
    22: {
      title: "Katı Geometri",
      topics: [
        "AYT Mat: Katı Cisimlerin Hacim ve Alan",
        "AYT Mat: Uzay Geometrisi",
        "AYT Kimya: Gazlar"
      ],
      focus: "3 boyutlu düşünce"
    },
    23: {
      title: "Logaritma",
      topics: [
        "AYT Mat: Üstel Fonksiyonlar",
        "AYT Mat: Logaritma Fonksiyonu ve Denklemler",
        "AYT Biyoloji: Sindirim ve Dolaşım Sistemi"
      ],
      focus: "Üstel-logaritmik ilişkiler"
    },
    24: {
      title: "Diziler",
      topics: [
        "AYT Mat: Gerçek Sayı Dizileri",
        "AYT Mat: Aritmetik ve Geometrik Diziler",
        "AYT Fizik: Manyetik Alan ve İndüksiyon"
      ],
      focus: "Dizi ve seriler"
    },
    25: {
      title: "Limit Kavramı", 
      topics: [
        "AYT Mat: Limit ve Süreklilik",
        "AYT Mat: Limit Hesaplama Teknikleri",
        "AYT Kimya: Sıvı Çözeltiler ve Çözünürlük"
      ],
      focus: "Limit anlayışı"
    },
    26: {
      title: "Türev Temelleri",
      topics: [
        "AYT Mat: Anlık Değişim Oranı ve Türev",
        "AYT Mat: Türev Alma Kuralları",
        "AYT Biyoloji: Solunum ve Boşaltım Sistemi"
      ],
      focus: "Değişim oranları"
    },
    27: {
      title: "Türev Uygulamaları",
      topics: [
        "AYT Mat: Türevin Uygulamaları (Ekstremum)",
        "AYT Mat: Grafik Çizimi",
        "AYT Fizik: Çembersel Hareket"
      ],
      focus: "Optimizasyon"
    },
    28: {
      title: "İntegral Başlangıcı",
      topics: [
        "AYT Mat: Belirsiz İntegral",
        "AYT Mat: Temel İntegral Kuralları",
        "AYT Kimya: Kimyasal Tepkimelerde Enerji"
      ],
      focus: "Ters türev"
    },
    
    // HAFTA 29-36: İLERİ AYT VE ENTEGRASYON
    29: {
      title: "Belirli İntegral",
      topics: [
        "AYT Mat: Belirli İntegral ve Alan Hesabı",
        "AYT Mat: İntegralle Alan ve Hacim",
        "AYT Fizik: Basit Harmonik Hareket"
      ],
      focus: "Geometrik uygulamalar"
    },
    30: {
      title: "Trigonometrik Denklemler",
      topics: [
        "AYT Mat: Toplam-Fark Formülleri",
        "AYT Mat: Trigonometrik Denklem Çözme",
        "AYT Biyoloji: Üreme Sistemi ve Gelişim"
      ],
      focus: "Trigonometrik manipülasyon"
    },
    31: {
      title: "Çemberin Analitik İncelemesi",
      topics: [
        "AYT Mat: Çemberin Denklemi", 
        "AYT Mat: Çember ve Doğru İlişkileri",
        "AYT Kimya: Kimyasal Denge"
      ],
      focus: "Analitik çember"
    },
    32: {
      title: "İleri Fizik Konuları",
      topics: [
        "AYT Fizik: Dalga Mekaniği ve Girişim",
        "AYT Fizik: Atom Fiziği ve Radyoaktivite",
        "AYT Mat: Karmaşık Sayılar (Tekrar)"
      ],
      focus: "Modern fizik"
    },
    33: {
      title: "Organik Kimya",
      topics: [
        "AYT Kimya: Karbon Kimyasına Giriş",
        "AYT Kimya: Organik Bileşikler",
        "AYT Biyoloji: Genetik Şifre ve Protein Sentezi"
      ],
      focus: "Organik yapılar"
    },
    34: {
      title: "Biyolojik Süreçler",
      topics: [
        "AYT Biyoloji: Fotosentez ve Kemosentez",
        "AYT Biyoloji: Hücresel Solunum",
        "AYT Kimya: Asit-Baz Dengesi"
      ],
      focus: "Canlılık süreçleri"
    },
    35: {
      title: "Ekoloji ve Çevre",
      topics: [
        "AYT Biyoloji: Komünite ve Popülasyon Ekolojisi",
        "AYT Biyoloji: Bitki Biyolojisi",
        "AYT Fizik: Modern Fiziğin Uygulamaları"
      ],
      focus: "Ekolojik düşünce"
    },
    36: {
      title: "Elektrokimya ve Enerji",
      topics: [
        "AYT Kimya: Kimya ve Elektrik",
        "AYT Kimya: Enerji Kaynakları",
        "AYT Fizik: Kütle Çekim ve Kepler Yasaları"
      ],
      focus: "Enerji dönüşümleri"
    },
    
    // HAFTA 37-40: GENEL TEKRAR VE SINAV HAZIRLIĞI
    37: {
      title: "Matematik Genel Tekrar",
      topics: [
        "TYT-AYT Mat: Tüm Konular Hızlı Geçiş",
        "Zayıf Matematik Konuları Pekiştirme",
        "Matematik Soru Çözüm Stratejileri"
      ],
      focus: "Matematik mükemmelliği"
    },
    38: {
      title: "Fen Bilimleri Entegrasyon",
      topics: [
        "AYT Fizik: Tüm Konular Özet",
        "AYT Kimya: Tüm Konular Özet", 
        "AYT Biyoloji: Tüm Konular Özet"
      ],
      focus: "Fen bilimleri sinerji"
    },
    39: {
      title: "Son Tekrarlar ve Stratejiler",
      topics: [
        "TYT: Hız ve Doğruluk Çalışması",
        "AYT: Zor Soru Teknikleri",
        "Sınav Psikolojisi ve Zaman Yönetimi"
      ],
      focus: "Sınav hazırlığı"
    },
    40: {
      title: "Sınav Haftası Hazırlık",
      topics: [
        "Genel Özet ve Formül Tekrarı",
        "Motivasyon ve Rahatlama",
        "Son Kontroller ve Sınav Stratejisi"
      ],
      focus: "Sınav performansı"
    }
  }
};*/

export const Tracker = () => {
  const [activeView, setActiveView] = useState<"weekly" | "monthly">("weekly");
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const userId = getActiveUserId();
  const [activeTimer, setActiveTimerState] = useState<ReturnType<typeof getActiveTimer>>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [scheduleVersion, setScheduleVersion] = useState<number>(0);

  useEffect(() => {
    setCompletedTopics(loadCompletedTopics(userId));
    setActiveTimerState(getActiveTimer(userId));
  }, [userId]);

  // Auto-generate weekly schedule if missing for selected week
  useEffect(() => {
    try {
      const schedule = loadSchedule(userId, selectedWeek) as any;
      const hasItems = schedule && Object.keys(schedule).some((d) => (schedule[d] || []).length > 0);
      if (!hasItems) {
        const topics = getWeeklyPlan(selectedWeek);
        const availability = loadAvailability(userId);
        const offDays = availability.map((m, i) => (m ? -1 : i)).filter((i) => i >= 0);
        const prefs = loadExamPrefs(userId);
        const analysisStartWeek = (() => {
          try {
            const plan: any = (studyPlan as any).weeklyPlan || {};
            let lastTYT = 1;
            for (let w = 1; w <= (studyPlan as any).totalWeeks; w++) {
              const ts: string[] = plan[w]?.topics ?? [];
              if (ts.some((t) => t.toLowerCase().includes('tyt'))) lastTYT = w;
            }
            return Math.max(1, lastTYT - 2);
          } catch { return 14; }
        })();
        const plan = optimizeWeekSchedule({
          week: selectedWeek,
          topics,
          availability,
          offDays,
          examDay: prefs.weekly ? prefs.day : null,
          examMinutes: prefs.minutes,
          analysisDay: prefs.analysisDay,
          analysisMinutes: prefs.analysisMinutes,
          analysisStartWeek,
          minDailyMinutes: 180,
        });
        saveSchedule(userId, selectedWeek, plan);
        setScheduleVersion((v) => v + 1);
      }
    } catch {}
  }, [userId, selectedWeek]);

  useEffect(() => {
    let t: any;
    if (activeTimer) {
      const tick = () => {
        const started = new Date(activeTimer!.startedAt).getTime();
        setElapsed(Math.max(0, Math.floor((Date.now() - started) / 1000)));
        if (activeTimer?.durationSec) {
          const rem = Math.max(0, activeTimer.durationSec - Math.floor((Date.now() - started) / 1000));
          setRemaining(rem);
          if (rem === 0) {
            handleTimerComplete();
          }
        } else {
          setRemaining(null);
        }
      };
      tick();
      t = setInterval(tick, 1000);
    } else {
      setElapsed(0);
      setRemaining(null);
    }
    return () => t && clearInterval(t);
  }, [activeTimer]);

  function requestNotifyPermission() {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      try { Notification.requestPermission(); } catch {}
    }
  }

  function beep(freq = 880, ms = 400) {
    try {
      const settings = loadPomodoroSettings(userId);
      if (!settings.sound) return;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + ms/1000);
      setTimeout(() => { o.stop(); ctx.close(); }, ms + 50);
    } catch {}
  }

  const startPomodoro = (topicKey: string, topicTitle: string, workMin: number, breakMin: number, preset: string) => {
    requestNotifyPermission();
    const settings = loadPomodoroSettings(userId);
    const timer = {
      topicKey,
      topicTitle,
      startedAt: new Date().toISOString(),
      mode: 'focus' as const,
      durationSec: (settings.preset25.work === workMin ? settings.preset25.work : workMin) * 60,
      breakSec: (settings.preset25.break === breakMin ? settings.preset25.break : breakMin) * 60,
      preset,
    };
    setActiveTimer(userId, timer as any);
    setActiveTimerState(timer as any);
  };

  const startTimer = (topicKey: string, topicTitle: string) => {
    // If different timer is running, overwrite
    const timer = { topicKey, topicTitle, startedAt: new Date().toISOString() } as any;
    setActiveTimer(userId, timer);
    setActiveTimerState(timer);
  };

  const stopTimer = () => {
    if (!activeTimer) return;
    const started = new Date(activeTimer.startedAt).getTime();
    const minutes = Math.max(1, Math.round((Date.now() - started) / 60000));
    // Log session
    try {
      if (!activeTimer.durationSec || activeTimer.mode === 'focus') {
        addSession(userId, {
          topicKey: activeTimer.topicKey,
          topicTitle: activeTimer.topicTitle,
          minutes,
          date: new Date().toISOString(),
        });
      }
    } catch {}
    setActiveTimer(userId, null);
    setActiveTimerState(null);
  };

  const handleTimerComplete = () => {
    if (!activeTimer) return;
    // Beep + toast + notification
    beep();
    try { const s = loadPomodoroSettings(userId); if (s.notifications && typeof Notification !== 'undefined' && Notification.permission === 'granted') new Notification('Süre doldu', { body: activeTimer.topicTitle }); } catch {}

    if (activeTimer.mode === 'focus') {
      try {
        addSession(userId, {
          topicKey: activeTimer.topicKey,
          topicTitle: activeTimer.topicTitle,
          minutes: Math.round((activeTimer.durationSec || 0) / 60) || 0,
          date: new Date().toISOString(),
        });
      } catch {}
      const breakSec = activeTimer.breakSec || 0;
      const breakMin = Math.round(breakSec / 60);
      toast("Odak süresi bitti", {
        description: breakMin ? `Mola (${breakMin} dk) başlatmak ister misin?` : undefined,
      });
      const prefs = loadPomodoroSettings(userId);
      if (breakSec > 0 && prefs.autoBreak) {
        const timer = {
          topicKey: activeTimer.topicKey,
          topicTitle: activeTimer.topicTitle + ' • Mola',
          startedAt: new Date().toISOString(),
          mode: 'break' as const,
          durationSec: breakSec,
          preset: activeTimer.preset,
        };
        setActiveTimer(userId, timer as any);
        setActiveTimerState(timer as any);
        return;
      }
    } else if (activeTimer.mode === 'break') {
      toast("Mola bitti", { description: "Hazırsan odaklanmaya dön." });
    }
    setActiveTimer(userId, null);
    setActiveTimerState(null);
  };

  const TOTAL_TOPICS = useMemo(() => {
    return totalSubtasksForPlan((studyPlan as any).weeklyPlan);
  }, []);

  const toggleTopic = (topicKey: string) => {
    const updated = new Set(completedTopics);
    if (updated.has(topicKey)) {
      updated.delete(topicKey);
    } else {
      updated.add(topicKey);
    }
    setCompletedTopics(updated);
    saveCompletedTopics(userId, updated);
  };

  const getWeeklyPlan = (weekNum: number) => {
    if (weekNum >= 1 && weekNum <= 40) {
      return studyPlan.weeklyPlan[weekNum] ? studyPlan.weeklyPlan[weekNum].topics : [];
    }
    return [];
  };

  const getWeekTitle = (weekNum: number) => {
    return studyPlan.weeklyPlan[weekNum] ? studyPlan.weeklyPlan[weekNum].title : `${weekNum}. Hafta`;
  };

  const getWeekFocus = (weekNum: number) => {
    return studyPlan.weeklyPlan[weekNum] ? studyPlan.weeklyPlan[weekNum].focus : "";
  };

  const getMonthlyProgress = (monthNum: number) => {
    const weeksInMonth = 4;
    const startWeek = (monthNum - 1) * weeksInMonth + 1;
    const endWeek = startWeek + weeksInMonth - 1;
    
    let totalTopics = 0;
    let completedCount = 0;

    for (let week = startWeek; week <= endWeek; week++) {
      const weekTopics = getWeeklyPlan(week);
      const schedule = loadSchedule(userId, week) as any;
      if (schedule && Object.keys(schedule).length) {
        const items: string[] = [];
        for (let d = 0; d < 7; d++) {
          for (const it of (schedule[d] || [])) {
            if (it.subKey) items.push(it.subKey);
          }
        }
        totalTopics += items.length;
        completedCount += items.filter(k => completedTopics.has(k)).length;
      } else {
        // fallback by decomposed parts
        weekTopics.forEach((t, i) => {
          const parts = decomposeTopic(t);
          totalTopics += parts.length;
          const topicKey = `week_${week}_topic_${i}`;
          const topicDone = completedTopics.has(topicKey);
          if (topicDone) completedCount += parts.length;
          else parts.forEach((_, j) => { if (completedTopics.has(`${topicKey}_part_${j}`)) completedCount += 1; });
        });
      }
    }

    return { totalTopics, completedCount, percentage: totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0 };
  };

  const weekDates = (weekNum: number) => {
    const startDate = new Date(studyPlan.startDate);
    const weekStart = new Date(startDate.getTime() + (weekNum - 1) * 7 * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    return {
      start: weekStart.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
      end: weekEnd.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    };
  };

  const monthNames = [
    "Eylül 2025", "Ekim 2025", "Kasım 2025", "Aralık 2025",
    "Ocak 2026", "Şubat 2026", "Mart 2026", "Nisan 2026",
    "Mayıs 2026", "Haziran 2026"
  ];

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <Navigation />
      
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              YKS 2026 Plan Takibi
            </h1>
            <p className="text-lg text-muted-foreground">
              {(() => {
                const s = new Date(studyPlan.startDate);
                const e = new Date(studyPlan.examDate);
                const sStr = s.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                const eStr = e.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                return `${sStr} - ${eStr} • ${studyPlan.totalWeeks} Haftalık Süreç`;
              })()}
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Genel İlerleme</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {TOTAL_TOPICS ? Math.round((completedTopics.size / TOTAL_TOPICS) * 100) : 0}%
              </div>
              <Progress value={TOTAL_TOPICS ? (completedTopics.size / TOTAL_TOPICS) * 100 : 0} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {completedTopics.size}/{TOTAL_TOPICS} konu tamamlandı
              </p>
            </Card>

            <Card className="p-6 card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <CalendarDays className="h-8 w-8 text-success" />
                <h3 className="text-lg font-semibold">Aktif Hafta</h3>
              </div>
              <div className="text-3xl font-bold text-success mb-2">
                {selectedWeek}. Hafta
              </div>
              <p className="text-sm text-muted-foreground">
                {weekDates(selectedWeek).start} - {weekDates(selectedWeek).end}
              </p>
            </Card>

            <Card className="p-6 card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-8 w-8 text-warning" />
                <h3 className="text-lg font-semibold">Bu Hafta Çalışma Süresi</h3>
              </div>
              <div className="text-3xl font-bold text-warning mb-2">
                {(() => {
                  const sessions = loadSessions(userId);
                  const prefix = `week_${selectedWeek}_`;
                  const m = sessions.filter(s => s.topicKey.startsWith(prefix)).reduce((sum, s) => sum + (s.minutes||0), 0);
                  return `${m} dk`;
                })()}
              </div>
              <p className="text-sm text-muted-foreground">
                Kaydedilen süre toplamı
              </p>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "weekly" | "monthly")}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="weekly">Haftalık Takip</TabsTrigger>
              <TabsTrigger value="monthly">Aylık Takip</TabsTrigger>
            </TabsList>
            <PomodoroSettings />

            {/* Weekly View */}
            <TabsContent value="weekly" className="space-y-6">
              {/* This Week Schedule */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Bu Haftanın Planı</h3>
                  <Button variant="outline" size="sm" onClick={() => {
                    const topics = getWeeklyPlan(selectedWeek);
                    const availability = loadAvailability(userId);
                    const offDays = availability.map((m, i) => (m ? -1 : i)).filter((i) => i >= 0);
                    const prefs = loadExamPrefs(userId);
                    const analysisStartWeek = (() => {
                      try {
                        const plan: any = (studyPlan as any).weeklyPlan || {};
                        let lastTYT = 1;
                        for (let w = 1; w <= (studyPlan as any).totalWeeks; w++) {
                          const ts: string[] = plan[w]?.topics ?? [];
                          if (ts.some((t) => t.toLowerCase().includes('tyt'))) lastTYT = w;
                        }
                        return Math.max(1, lastTYT - 2);
                      } catch { return 14; }
                    })();
                    const plan = optimizeWeekSchedule({
                      week: selectedWeek,
                      topics,
                      availability,
                      offDays,
                      examDay: prefs.weekly ? prefs.day : null,
                      examMinutes: prefs.minutes,
                      analysisDay: prefs.analysisDay,
                      analysisMinutes: prefs.analysisMinutes,
                      analysisStartWeek,
                      minDailyMinutes: 180,
                    });
                    saveSchedule(userId, selectedWeek, plan);
                    setScheduleVersion((v) => v + 1);
                  }}>Yeniden Planla</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                  {(() => {
                    const schedule = loadSchedule(userId, selectedWeek) as any;
                    const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
                    return dayNames.map((name, idx) => (
                      <div key={idx} className="border rounded-lg p-3">
                        <div className="text-sm text-muted-foreground mb-2">{name}</div>
                        <div className="space-y-2">
                          {(schedule[idx] || []).length === 0 && (
                            <div className="text-xs text-muted-foreground">Atama yok</div>
                          )}
                          {(schedule[idx] || []).map((it: any) => {
                            const key = it.subKey || it.topicKey;
                            const done = completedTopics.has(key) || completedTopics.has(it.topicKey);
                            return (
                              <label key={key} className={`flex items-center justify-between gap-2 text-xs p-2 bg-muted rounded ${done ? 'line-through text-muted-foreground' : ''}`}>
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={done}
                                    onCheckedChange={() => {
                                      const updated = new Set(completedTopics);
                                      if (updated.has(it.topicKey)) updated.delete(it.topicKey);
                                      if (updated.has(key)) updated.delete(key); else updated.add(key);
                                      setCompletedTopics(updated);
                                      saveCompletedTopics(userId, updated);
                                    }}
                                  />
                                  <span>{it.label || it.topicTitle}</span>
                                </div>
                                {typeof it.minutes === 'number' && (<span className="text-[11px] text-muted-foreground">{it.minutes} dk</span>)}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </Card>
              {/* Week Selector */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Hafta Seçimi</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
                    <Button
                      key={week}
                      variant={selectedWeek === week ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedWeek(week)}
                      className={selectedWeek === week ? "bg-gradient-primary" : ""}
                    >
                      {week}
                    </Button>
                  ))}
                </div>
              </Card>

              {activeTimer && (
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Aktif Zamanlayıcı</h4>
                      <div className="text-sm text-muted-foreground">{activeTimer.topicTitle} {activeTimer.preset ? `(${activeTimer.preset} ${activeTimer.mode==='break'?'mola':'odak'})` : ''}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-lg">
                        {remaining !== null ? new Date(remaining * 1000).toISOString().substr(14, 5) : new Date(elapsed * 1000).toISOString().substr(11, 8)}
                      </div>
                      <Button variant="destructive" onClick={stopTimer}>
                        <Square className="h-4 w-4 mr-2"/> Durdur ve Kaydet
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Week Details */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">
                      {getWeekTitle(selectedWeek)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getWeekFocus(selectedWeek)}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {weekDates(selectedWeek).start} - {weekDates(selectedWeek).end}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {getWeeklyPlan(selectedWeek).map((topic, index) => {
                    const topicKey = `week_${selectedWeek}_topic_${index}`;
                    const schedule = loadSchedule(userId, selectedWeek) as any;
                    const plannedDay = (() => {
                      for (let d = 0; d < 7; d++) {
                        if ((schedule[d] || []).some((it: any) => it.topicKey === topicKey)) return d;
                      }
                      return null;
                    })();
                    const dayLabel = plannedDay !== null ? ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"][plannedDay] : null;
                    return (
                      <div key={topicKey} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                        <Checkbox
                          checked={completedTopics.has(topicKey)}
                          onCheckedChange={() => toggleTopic(topicKey)}
                        />
                        <div className="flex-1">
                          <div className={`font-medium ${completedTopics.has(topicKey) ? 'line-through text-muted-foreground' : ''}`}>
                            {topic}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>{index === 0 ? "Ana Konu" : index === 1 ? "Destekleyici Konu" : "Pekiştirme Konusu"}</span>
                            {dayLabel && (<span className="px-2 py-0.5 border rounded text-xs">Planlı: {dayLabel}</span>)}
                          </div>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                            {decomposeTopic(topic).map((p, j) => {
                              const subKey = `${topicKey}_part_${j}`;
                              const done = completedTopics.has(topicKey) || completedTopics.has(subKey);
                              return (
                                <label key={subKey} className={`flex items-center gap-2 text-xs p-2 border rounded ${done ? 'line-through text-muted-foreground' : ''}`}>
                                  <Checkbox
                                    checked={done}
                                    onCheckedChange={() => {
                                      const updated = new Set(completedTopics);
                                      if (updated.has(topicKey)) updated.delete(topicKey);
                                      const has = updated.has(subKey);
                                      if (has) updated.delete(subKey); else updated.add(subKey);
                                      setCompletedTopics(updated);
                                      saveCompletedTopics(userId, updated);
                                    }}
                                  />
                                  <span>{p.part} • {p.minutes} dk</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <LogButton topicKey={topicKey} topicTitle={topic} />
                          {activeTimer && activeTimer.topicKey === topicKey ? (
                            <Button variant="secondary" size="sm" onClick={stopTimer}>
                              <Square className="h-4 w-4 mr-1" /> Durdur
                            </Button>
                          ) : (
                            <>
                              <Button variant="outline" size="sm" onClick={() => startTimer(topicKey, topic)}>
                                <Play className="h-4 w-4 mr-1" /> Başlat
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => startPomodoro(topicKey, topic, 25, 5, '25/5')}>
                                <Timer className="h-4 w-4 mr-1" /> 25/5
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => startPomodoro(topicKey, topic, 50, 10, '50/10')}>
                                <Timer className="h-4 w-4 mr-1" /> 50/10
                              </Button>
                            </>
                          )}
                        </div>
                        {completedTopics.has(topicKey) ? (
                          <CheckCircle2 className="h-6 w-6 text-success" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {getWeeklyPlan(selectedWeek).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Bu hafta için henüz konu planlanmamış.
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Monthly View */}
            <TabsContent value="monthly" className="space-y-6">
              {/* Month Selector */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Ay Seçimi</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {monthNames.map((month, index) => (
                    <Button
                      key={index + 1}
                      variant={selectedMonth === index + 1 ? "default" : "outline"}
                      onClick={() => setSelectedMonth(index + 1)}
                      className={selectedMonth === index + 1 ? "bg-gradient-primary" : ""}
                    >
                      {month}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Month Progress */}
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-6">
                  {monthNames[selectedMonth - 1]} İlerlemesi
                </h3>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Aylık İlerleme</span>
                    <span className="text-lg font-bold text-primary">
                      {Math.round(getMonthlyProgress(selectedMonth).percentage)}%
                    </span>
                  </div>
                  <Progress value={getMonthlyProgress(selectedMonth).percentage} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {getMonthlyProgress(selectedMonth).completedCount}/{getMonthlyProgress(selectedMonth).totalTopics} konu tamamlandı
                  </p>
                </div>

                {/* Weekly breakdown for the month */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }, (_, i) => {
                    const weekNum = (selectedMonth - 1) * 4 + i + 1;
                    if (weekNum > 40) return null;
                    
                    const weekTopics = getWeeklyPlan(weekNum);
                    const keys = weekTopics.map((_, idx) => `week_${weekNum}_topic_${idx}`);
                    const completedInWeek = keys.filter(k => completedTopics.has(k)).length;
                    const weekProgress = weekTopics.length > 0 ? (completedInWeek / weekTopics.length) * 100 : 0;

                    return (
                      <Card key={weekNum} className="p-4 cursor-pointer hover:shadow-md transition-smooth" 
                            onClick={() => {setActiveView("weekly"); setSelectedWeek(weekNum);}}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Hafta {weekNum}</h4>
                          <Badge variant="outline">
                            {Math.round(weekProgress)}%
                          </Badge>
                        </div>
                        <Progress value={weekProgress} className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {completedInWeek}/{weekTopics.length} konu • 
                          {weekDates(weekNum).start} - {weekDates(weekNum).end}
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex gap-3 justify-end">
            <Button variant="outline" onClick={() => { clearCompletedTopics(userId); setCompletedTopics(new Set()); }}>
              İlerlemeyi Sıfırla
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
