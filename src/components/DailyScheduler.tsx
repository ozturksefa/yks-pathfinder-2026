import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { studyPlan } from "@/data/studyPlan";
import { getActiveUserId, loadAvailability, saveAvailability, saveSchedule, loadSchedule, WeekSchedule } from "@/lib/storage";

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
  const topics: string[] = (studyPlan as any).weeklyPlan[week]?.topics ?? [];

  const topicMinutes = 120; // 2 hours per topic

  function generate() {
    // Simple greedy distribution
    const remaining = [...avail];
    const plan: WeekSchedule = {};
    topics.forEach((title, i) => {
      const key = `week_${week}_topic_${i}`;
      let placed = false;
      for (let d = 0; d < 7; d++) {
        if (remaining[d] >= topicMinutes) {
          remaining[d] -= topicMinutes;
          plan[d] = plan[d] || [];
          plan[d].push({ topicKey: key, topicTitle: title });
          placed = true;
          break;
        }
      }
      if (!placed) {
        // put in the day with max remaining
        let best = 0;
        for (let d = 1; d < 7; d++) if (remaining[d] > remaining[best]) best = d;
        plan[best] = plan[best] || [];
        plan[best].push({ topicKey: key, topicTitle: title });
        remaining[best] = Math.max(0, remaining[best] - topicMinutes);
      }
    });
    saveSchedule(userId, week, plan);
    setSchedule(plan);
  }

  function saveAvail() {
    const asTuple = [0,1,2,3,4,5,6].map((i) => Number(avail[i] || 0)) as any;
    saveAvailability(userId, asTuple);
  }

  return (
    <Card className="p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Günlük Planlayıcı (Hafta {week})</h3>
        <div className="text-sm text-muted-foreground">{topics.length} konu • {topicMinutes} dk/konu</div>
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
          </div>
        ))}
      </div>
      <div className="flex gap-3 mb-6">
        <Button variant="outline" onClick={saveAvail}>Süreleri Kaydet</Button>
        <Button onClick={generate}>Bu Hafta İçin Dağıt</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 7 }, (_, d) => d).map((d) => (
          <Card key={d} className="p-4">
            <div className="font-semibold mb-2">{dayNames[d]}</div>
            <div className="space-y-2">
              {(schedule[d] || []).length === 0 && (
                <div className="text-sm text-muted-foreground">Atama yok</div>
              )}
              {(schedule[d] || []).map((it) => (
                <div key={it.topicKey} className="text-sm p-2 border rounded-md">{it.topicTitle}</div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default DailyScheduler;

