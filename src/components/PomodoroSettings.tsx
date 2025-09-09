import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getActiveUserId, loadPomodoroSettings, savePomodoroSettings, PomodoroSettings } from "@/lib/storage";

export const PomodoroSettings = () => {
  const userId = getActiveUserId();
  const [s, setS] = useState<PomodoroSettings>(loadPomodoroSettings(userId));
  useEffect(() => setS(loadPomodoroSettings(userId)), [userId]);

  function onSave() { savePomodoroSettings(userId, s); }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Pomodoro Ayarları</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={s.sound} onChange={(e) => setS({ ...s, sound: e.target.checked })} />
          <label>Sesli uyarı</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={s.notifications} onChange={(e) => setS({ ...s, notifications: e.target.checked })} />
          <label>Tarayıcı bildirimi</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={s.autoBreak} onChange={(e) => setS({ ...s, autoBreak: e.target.checked })} />
          <label>Odak bitince otomatik mola</label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <label className="w-28 text-sm">25/5 Odak</label>
          <Input type="number" value={s.preset25.work} onChange={(e) => setS({ ...s, preset25: { ...s.preset25, work: Number(e.target.value || 0) } })} />
          <label className="w-16 text-sm">Mola</label>
          <Input type="number" value={s.preset25.break} onChange={(e) => setS({ ...s, preset25: { ...s.preset25, break: Number(e.target.value || 0) } })} />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-28 text-sm">50/10 Odak</label>
          <Input type="number" value={s.preset50.work} onChange={(e) => setS({ ...s, preset50: { ...s.preset50, work: Number(e.target.value || 0) } })} />
          <label className="w-16 text-sm">Mola</label>
          <Input type="number" value={s.preset50.break} onChange={(e) => setS({ ...s, preset50: { ...s.preset50, break: Number(e.target.value || 0) } })} />
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={onSave}>Kaydet</Button>
      </div>
    </Card>
  );
};

export default PomodoroSettings;

