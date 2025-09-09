import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { studyPlan } from "@/data/studyPlan";
import { getActiveUserId, loadAvailability, saveAvailability, saveSchedule, loadSchedule, WeekSchedule, loadExamPrefs, saveExamPrefs } from "@/lib/storage";
import { optimizeWeekSchedule } from "@/lib/schedule";
import { Checkbox } from "@/components/ui/checkbox";

const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function currentWeekFrom(startISO: string) {
  const start = new Date(startISO).getTime();
  const now = Date.now();
  const days = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
  return Math.min(studyPlan.totalWeeks, Math.max(1, Math.floor(days / 7) + 1));
}

export const DailyScheduler = () => {
  const userId = getActiveUserId();
  const week = useMemo(() => currentWeekFrom(studyPlan.startDate), []);
  const [avail, setAvail] = useState<number[]>(() => loadAvailability(userId));
  const [schedule, setSchedule] = useState<WeekSchedule>(() => loadSchedule(userId, week));
  const [offDays, setOffDays] = useState<boolean[]>([false, false, false, false, false, false, true]);
  const examDefaults = loadExamPrefs(userId);
  const [examDay, setExamDay] = useState<number | null>(examDefaults.weekly ? examDefaults.day : 6);
  const [examMinutes, setExamMinutes] = useState<number>(examDefaults.minutes);
  const [analysisDay, setAnalysisDay] = useState<number | null>(examDefaults.analysisDay);
  const [analysisMinutes, setAnalysisMinutes] = useState<number>(examDefaults.analysisMinutes);
  const [saveAsDefault, setSaveAsDefault] = useState<boolean>(false);
  const topics: string[] = (studyPlan as any).weeklyPlan[week]?.topics ?? [];

  const analysisStartWeek = useMemo(() => {
    try {
      const plan: any = (studyPlan as any).weeklyPlan || {};
      let lastTYT = 1;
      for (let w = 1; w <= (studyPlan as any).totalWeeks; w++) {
        const ts: string[] = plan[w]?.topics ?? [];
        if (ts.some((t) => t.toLowerCase().includes('tyt'))) lastTYT = w;
      }
      return Math.max(1, lastTYT - 2);
    } catch {
      return 14;
    }
  }, []);

  function generate() {
    const plan = optimizeWeekSchedule({
      week,
      topics,
      availability: avail.map((n) => Number(n || 0)),
      offDays: offDays.map((v, i) => (v ? i : -1)).filter((i) => i >= 0),
      examDay,
      examMinutes,
      analysisDay,
      analysisMinutes,
      analysisStartWeek,
      minDailyWeekdayMinutes: 180,
      minDailyWeekendMinutes: 360,
      paragraphMinutes: 20,
    });
    saveSchedule(userId, week, plan);
    setSchedule(plan);
    if (saveAsDefault) {
      saveExamPrefs(userId, { weekly: true, day: examDay ?? 6, minutes: examMinutes, analysisDay: analysisDay ?? 0, analysisMinutes });
    }
  }

  function saveAvail() {
    const asTuple = [0,1,2,3,4,5,6].map((i) => Number(avail[i] || 0)) as any;
    saveAvailability(userId, asTuple);
  }

  return (
    <Card className="p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Günlük Planlayıcı (Hafta {week})</h3>
        <div className="text-sm text-muted-foreground">{topics.length} konu • her konu 3 alt görev</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-4">
        {dayNames.map((d, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-sm text-muted-foreground">{d}</div>
            <Input type="number" min={0} value={avail[idx]} onChange={(e) => {
              const v = Number(e.target.value);
              const copy = [...avail];
              copy[idx] = isNaN(v) ? 0 : v;
              setAvail(copy);
            }} />
            <div className="flex items-center gap-2 pt-1">
              <Checkbox id={`off-${idx}`} checked={offDays[idx]} onCheckedChange={(v) => {
                const arr = [...offDays];
                arr[idx] = Boolean(v);
                setOffDays(arr);
              }} />
              <label htmlFor={`off-${idx}`} className="text-xs">Tatil</label>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm w-28">Deneme Günü</label>
          <select className="border rounded px-2 py-1 text-sm" value={examDay ?? ''} onChange={(e) => setExamDay(e.target.value === '' ? null : Number(e.target.value))}>
            <option value="">Yok</option>
            {dayNames.map((d, i) => (<option key={i} value={i}>{d}</option>))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-28">Deneme Süresi</label>
          <Input type="number" min={0} value={examMinutes} onChange={(e) => setExamMinutes(Number(e.target.value || 0))} />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-28">Analiz Günü</label>
          <select className="border rounded px-2 py-1 text-sm" value={analysisDay ?? ''} onChange={(e) => setAnalysisDay(e.target.value === '' ? null : Number(e.target.value))}>
            <option value="">Yok</option>
            {dayNames.map((d, i) => (<option key={i} value={i}>{d}</option>))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-28">Analiz Süresi</label>
          <Input type="number" min={0} value={analysisMinutes} onChange={(e) => setAnalysisMinutes(Number(e.target.value || 0))} />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm">Varsayılan yap</label>
          <input type="checkbox" checked={saveAsDefault} onChange={(e) => setSaveAsDefault(e.target.checked)} />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={saveAvail}>Süreleri Kaydet</Button>
          <Button onClick={generate}>Optimizasyonu Çalıştır</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 7 }, (_, d) => d).map((d) => (
          <Card key={d} className="p-4">
            <div className="font-semibold mb-2">{dayNames[d]}</div>
            <div className="space-y-2">
              {(schedule[d] || []).length === 0 && (
                <div className="text-sm text-muted-foreground">Atama yok</div>
              )}
              {(schedule[d] || []).map((it, idx) => (
                <div
                  key={(it.subKey || it.topicKey) + ':' + idx}
                  className="text-sm p-2 border rounded-md flex items-center justify-between"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify({ fromDay: d, index: idx }));
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    try {
                      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                      if (data && typeof data.fromDay === 'number' && typeof data.index === 'number') {
                        setSchedule((prev) => {
                          const copy: WeekSchedule = JSON.parse(JSON.stringify(prev || {}));
                          const item = (copy[data.fromDay] || [])[data.index];
                          if (!item) return prev;
                          (copy[data.fromDay] || []).splice(data.index, 1);
                          copy[d] = copy[d] || [];
                          copy[d].splice(idx, 0, item);
                          saveSchedule(userId, week, copy);
                          return copy;
                        });
                      }
                    } catch {}
                  }}
                >
                  <span>{it.label || it.topicTitle}</span>
                  {typeof it.minutes === 'number' && (<span className="text-xs text-muted-foreground">{it.minutes} dk</span>)}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default DailyScheduler;
