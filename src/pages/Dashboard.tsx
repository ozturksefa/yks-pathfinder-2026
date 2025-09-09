import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProgressCard } from "@/components/ProgressCard";
import { SubjectCard } from "@/components/SubjectCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/hero-study.jpg";
import { Calendar, BookOpen, Target, TrendingUp, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { studyPlan } from "@/data/studyPlan";
import { decomposeTopic, totalSubtasksForPlan } from "@/lib/schedule";
import { getActiveUserId, loadCompletedTopics, loadSessions, loadGoals, addGoal, toggleGoal, deleteGoal, getNotes, setNotes, exportUserData, importUserData } from "@/lib/storage";
import { useState } from "react";

export const Dashboard = () => {
  const userId = getActiveUserId();
  const completed = useMemo(() => loadCompletedTopics(userId), [userId]);

  const TOTAL_TOPICS = useMemo(() => totalSubtasksForPlan((studyPlan as any).weeklyPlan), []);

  const startDate = new Date(studyPlan.startDate);
  const today = new Date();
  const diffDays = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const currentWeek = Math.min(studyPlan.totalWeeks, Math.max(1, Math.floor(diffDays / 7) + 1));
  const weekTopics = (studyPlan as any).weeklyPlan[currentWeek]?.topics ?? [];
  const weekKeys = weekTopics.map((_: string, i: number) => `week_${currentWeek}_topic_${i}`);
  const weeklyCompleted = weekKeys.filter((k: string) => completed.has(k)).length;
  const weeklyProgress = weekTopics.length ? Math.round((weeklyCompleted / weekTopics.length) * 100) : 0;

  const overallProgress = TOTAL_TOPICS ? Math.round((completed.size / TOTAL_TOPICS) * 100) : 0;
  const totalMinutes = useMemo(() => loadSessions(userId).reduce((sum, s) => sum + (s.minutes || 0), 0), [userId]);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10; // 1 decimal hour

  // Ders bazlı dağılımı basitçe topic metninden çıkaralım
  function normalizeSubject(t: string): "Matematik" | "Fizik" | "Kimya" | "Biyoloji" | "Türkçe" | "Tarih" | "Coğrafya" | "Diğer" {
    const s = t.toLowerCase();
    if (s.includes("mat") || s.includes("geometri")) return "Matematik";
    if (s.includes("fizik")) return "Fizik";
    if (s.includes("kimya")) return "Kimya";
    if (s.includes("biyoloji")) return "Biyoloji";
    if (s.includes("türkçe") || s.includes("turkçe") || s.includes("turkce")) return "Türkçe";
    if (s.includes("tarih")) return "Tarih";
    if (s.includes("coğrafya") || s.includes("cografya")) return "Coğrafya";
    return "Diğer";
  }

  const bySubject = new Map<string, { total: number; done: number; color: any; }>();
  const colorMap: Record<string, any> = {
    Matematik: 'math',
    Fizik: 'physics',
    Kimya: 'chemistry',
    Biyoloji: 'biology',
    Türkçe: 'turkish',
    Tarih: 'history',
    Coğrafya: 'geography',
    Diğer: 'secondary',
  };

  for (let w = 1; w <= studyPlan.totalWeeks; w++) {
    const topics: string[] = (studyPlan as any).weeklyPlan[w]?.topics ?? [];
    topics.forEach((topic, i) => {
      const sub = normalizeSubject(topic);
      const rec = bySubject.get(sub) ?? { total: 0, done: 0, color: colorMap[sub] };
      rec.total += 1;
      const key = `week_${w}_topic_${i}`;
      if (completed.has(key)) rec.done += 1;
      bySubject.set(sub, rec);
    });
  }

  const subjectList = ["Matematik", "Fizik", "Kimya", "Biyoloji"].map((name) => {
    // compute totals and done as subtasks
    let total = 0;
    let done = 0;
    let nextTopic = "";
    outer: for (let w = 1; w <= studyPlan.totalWeeks; w++) {
      const topics: string[] = (studyPlan as any).weeklyPlan[w]?.topics ?? [];
      for (let i = 0; i < topics.length; i++) {
        const t = topics[i];
        if (normalizeSubject(t) !== name) continue;
        const parts = decomposeTopic(t);
        total += parts.length;
        const topicKey = `week_${w}_topic_${i}`;
        if (completed.has(topicKey)) {
          done += parts.length;
        } else {
          let allSub = true;
          for (let j = 0; j < parts.length; j++) {
            const sk = `${topicKey}_part_${j}`;
            if (!completed.has(sk)) { allSub = false; }
            else done += 1;
          }
          if (!allSub && !nextTopic) nextTopic = t;
        }
      }
    }
    const progress = total ? Math.round((done / total) * 100) : 0;
    return {
      subject: name,
      color: colorMap[name] as any,
      progress,
      totalTopics: total,
      completedTopics: done,
      nextTopic: nextTopic || "Sıradaki konular planlandı",
    };
  });

  // Goals and notes state
  const [goals, setGoals] = useState(() => loadGoals(userId));
  const [newGoal, setNewGoal] = useState<{ title: string; due?: string; priority?: "low"|"med"|"high" }>({ title: "" });
  const [notes, setNotesState] = useState(() => getNotes(userId));

  function addNewGoal() {
    if (!newGoal.title.trim()) return;
    addGoal(userId, newGoal);
    setGoals(loadGoals(userId));
    setNewGoal({ title: "" });
  }

  function toggleGoalDone(id: string) {
    toggleGoal(userId, id);
    setGoals(loadGoals(userId));
  }

  function removeGoal(id: string) {
    deleteGoal(userId, id);
    setGoals(loadGoals(userId));
  }

  function saveNotes() {
    setNotes(userId, notes);
  }

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-float">
            YKS 2026 Hazırlık
            <br />
            <span className="text-yellow-300">Başarı Planın</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            10 Eylül 2025'ten 21 Haziran 2026'ya kadarki yolculuğunda 
            her adımını planla, takip et ve hedefe ulaş! 🎯
          </p>
          
          <div className="mb-12">
            <CountdownTimer />
          </div>

          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 transition-bounce"
            onClick={() => window.location.href = '/planner'}
          >
            <Target className="mr-2 h-5 w-5" />
            Çalışma Planımı Başlat
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Çalışma İstatistiklerin
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ProgressCard
              title="Tamamlanan Konu"
              value={completed.size}
              description="Toplam tamamlanan"
              color="primary"
              trend="up"
            />
            <ProgressCard
              title="Haftalık İlerleme"
              value={`${weeklyProgress}%`}
              description={`Hafta ${currentWeek}`}
              color="success"
              trend="up"
            />
            <ProgressCard
              title="Genel İlerleme"
              value={`${overallProgress}%`}
              description={`${completed.size}/${TOTAL_TOPICS} konu`}
              color="math"
              trend="up"
            />
            <ProgressCard
              title="Toplam Saat"
              value={`${totalHours}h`}
              description="~2saat/konu tahmini"
              color="turkish"
              trend="up"
            />
          </div>

          {/* Subjects Grid */}
          <h3 className="text-2xl font-bold mb-8">Ders Bazlı İlerleme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjectList.map((subject, index) => (
              <SubjectCard key={index} {...subject} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">
            Hızlı Eylemler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button 
              variant="outline" 
              size="lg" 
              className="p-8 h-auto flex flex-col items-center gap-4 card-elevated hover:bg-primary/5"
              onClick={() => window.location.href = '/tracker'}
            >
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold">Günlük Planlama</div>
                <div className="text-sm text-muted-foreground">Bugünkü programını ayarla</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="p-8 h-auto flex flex-col items-center gap-4 card-elevated hover:bg-primary/5"
              onClick={() => window.location.href = '/tracker'}
            >
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold">Konu Takibi</div>
                <div className="text-sm text-muted-foreground">Hangi konularda kaldığını gör</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="p-8 h-auto flex flex-col items-center gap-4 card-elevated hover:bg-primary/5"
            >
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold">Performans Analizi</div>
                <div className="text-sm text-muted-foreground">Grafiklerle gelişimini izle</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Coach Panel */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Hedefler ve Koç Notları
          </h2>
          <div className="flex justify-end gap-3 mb-4">
            <ExportImport userId={userId} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Goals */}
            <div className="p-6 bg-white rounded-lg border card-elevated">
              <h3 className="text-xl font-semibold mb-4">Hedefler</h3>
              <div className="space-y-3 mb-4 max-h-72 overflow-auto pr-2">
                {goals.length === 0 && (
                  <div className="text-sm text-muted-foreground">Henüz bir hedef yok.</div>
                )}
                {goals.map((g) => (
                  <div key={g.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className={`font-medium ${g.done ? 'line-through text-muted-foreground' : ''}`}>{g.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        {g.due && (<Badge variant="outline">Son tarih: {new Date(g.due).toLocaleDateString('tr-TR')}</Badge>)}
                        {g.priority && (<Badge variant="outline">Öncelik: {g.priority}</Badge>)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleGoalDone(g.id)}>
                        {g.done ? <CheckCircle2 className="h-5 w-5 text-success"/> : <Circle className="h-5 w-5 text-muted-foreground"/>}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeGoal(g.id)}>
                        <Trash2 className="h-5 w-5 text-destructive"/>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input placeholder="Hedef başlığı" value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} />
                <Input type="date" value={newGoal.due || ''} onChange={(e) => setNewGoal({ ...newGoal, due: e.target.value })} />
                <Button onClick={addNewGoal}>Ekle</Button>
              </div>
            </div>

            {/* Coach Notes */}
            <div className="p-6 bg-white rounded-lg border card-elevated">
              <h3 className="text-xl font-semibold mb-4">Koç Notları</h3>
              <Textarea className="min-h-40" value={notes} onChange={(e) => setNotesState(e.target.value)} placeholder="Koç notlarınızı girin..." />
              <div className="mt-3 text-right">
                <Button onClick={saveNotes}>Kaydet</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Export/Import widget
const ExportImport = ({ userId }: { userId: string }) => {
  const onExport = () => {
    const data = exportUserData(userId);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yks2026-${userId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { importUserData(userId, JSON.parse(String(reader.result))); window.location.reload(); } catch {}
    };
    reader.readAsText(file);
  };
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={onExport}>Verileri Dışa Aktar</Button>
      <label className="cursor-pointer">
        <input type="file" accept="application/json" className="hidden" onChange={onImport} />
        <span className="inline-block px-4 py-2 border rounded-md">İçe Aktar</span>
      </label>
    </div>
  );
};
