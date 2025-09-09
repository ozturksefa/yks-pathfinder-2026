import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle2, Circle, Clock, Target } from "lucide-react";

const studyPlan = {
  startDate: "2025-09-10",
  examDate: "2026-06-21",
  totalWeeks: 40,
  subjects: {
    tyt: {
      matematik: [
        "Temel Kavramlar", "Sayılar", "Cebirsel İfadeler", "Denklemler", 
        "Eşitsizlikler", "Üslü Sayılar", "Köklü Sayılar", "Logaritma",
        "Fonksiyonlar", "Polinom Fonksiyonlar", "İkinci Derece Fonksiyonlar",
        "Üstel ve Logaritmik Fonksiyonlar", "Trigonometrik Fonksiyonlar",
        "Diziler", "Toplam Sembolü", "Limit", "Türev", "İntegral"
      ],
      turkce: [
        "Sözcükte Anlam", "Cümlede Anlam", "Paragrafta Anlam", "Metinde Anlam",
        "Dil Bilgisi", "Yazım Kuralları", "Noktalama İşaretleri", "Söz Sanatları"
      ],
      sosyal: [
        "Tarih", "Coğrafya", "Felsefe", "Din Kültürü", "T.C. İnkılap Tarihi"
      ],
      fen: [
        "Fizik Temelleri", "Kimya Temelleri", "Biyoloji Temelleri"
      ]
    },
    ayt: {
      matematik: [
        "Trigonometri", "Analitik Geometri", "Logaritma", "Diziler ve Seriler",
        "Limit ve Süreklilik", "Türev", "İntegral", "Olasılık"
      ],
      fizik: [
        "Kuvvet ve Hareket", "Enerji", "İtme ve Momentum", "Dalgalar",
        "Elektrik", "Manyetizma", "Atom Fiziği", "Modern Fizik"
      ],
      kimya: [
        "Atom Yapısı", "Periyodik Sistem", "Kimyasal Bağlar", "Gazlar",
        "Çözeltiler", "Asit-Baz", "Elektrokimya", "Organik Kimya"
      ],
      biyoloji: [
        "Hücre", "Hücre Bölünmesi", "Kalıtım", "Ekoloji", "Sinir Sistemi",
        "Dolaşım Sistemi", "Solunum Sistemi", "Boşaltım Sistemi"
      ]
    }
  }
};

export const Tracker = () => {
  const [activeView, setActiveView] = useState<"weekly" | "monthly">("weekly");
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const toggleTopic = (topic: string) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topic)) {
      newCompleted.delete(topic);
    } else {
      newCompleted.add(topic);
    }
    setCompletedTopics(newCompleted);
  };

  const getWeeklyPlan = (weekNum: number) => {
    const topicsPerWeek = 3;
    const allTopics = [
      ...studyPlan.subjects.tyt.matematik,
      ...studyPlan.subjects.tyt.turkce,
      ...studyPlan.subjects.ayt.matematik,
      ...studyPlan.subjects.ayt.fizik
    ];
    
    const startIndex = (weekNum - 1) * topicsPerWeek;
    return allTopics.slice(startIndex, startIndex + topicsPerWeek);
  };

  const getMonthlyProgress = (monthNum: number) => {
    const weeksInMonth = 4;
    const startWeek = (monthNum - 1) * weeksInMonth + 1;
    const endWeek = startWeek + weeksInMonth - 1;
    
    let totalTopics = 0;
    let completedCount = 0;

    for (let week = startWeek; week <= endWeek; week++) {
      const weekTopics = getWeeklyPlan(week);
      totalTopics += weekTopics.length;
      completedCount += weekTopics.filter(topic => completedTopics.has(topic)).length;
    }

    return { totalTopics, completedCount, percentage: totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0 };
  };

  const weekDates = (weekNum: number) => {
    const startDate = new Date("2025-09-10");
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
              10 Eylül 2025 - 21 Haziran 2026 • 40 Haftalık Süreç
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
                {Math.round((completedTopics.size / 50) * 100)}%
              </div>
              <Progress value={(completedTopics.size / 50) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {completedTopics.size}/50 konu tamamlandı
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
                <h3 className="text-lg font-semibold">Kalan Süre</h3>
              </div>
              <div className="text-3xl font-bold text-warning mb-2">
                {40 - selectedWeek} Hafta
              </div>
              <p className="text-sm text-muted-foreground">
                Sınava kalan hafta sayısı
              </p>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "weekly" | "monthly")}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="weekly">Haftalık Takip</TabsTrigger>
              <TabsTrigger value="monthly">Aylık Takip</TabsTrigger>
            </TabsList>

            {/* Weekly View */}
            <TabsContent value="weekly" className="space-y-6">
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

              {/* Week Details */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold">
                    {selectedWeek}. Hafta Planı
                  </h3>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {weekDates(selectedWeek).start} - {weekDates(selectedWeek).end}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {getWeeklyPlan(selectedWeek).map((topic, index) => (
                    <div key={topic} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                      <Checkbox
                        checked={completedTopics.has(topic)}
                        onCheckedChange={() => toggleTopic(topic)}
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${completedTopics.has(topic) ? 'line-through text-muted-foreground' : ''}`}>
                          {topic}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Gün {index + 1} • Tahmini Süre: 2-3 saat
                        </div>
                      </div>
                      {completedTopics.has(topic) ? (
                        <CheckCircle2 className="h-6 w-6 text-success" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  ))}
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
                    const completedInWeek = weekTopics.filter(topic => completedTopics.has(topic)).length;
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
        </div>
      </div>

      <Footer />
    </div>
  );
};