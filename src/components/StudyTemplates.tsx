import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getActiveUserId, loadTemplates, saveTemplates, TemplatesMap, defaultTemplates } from "@/lib/storage";

const subjects: Array<keyof TemplatesMap> = ['Matematik','Fizik','Kimya','Biyoloji','Türkçe','Tarih','Coğrafya','Diğer'];

export const StudyTemplates = () => {
  const userId = getActiveUserId();
  const [tpl, setTpl] = useState<TemplatesMap>(loadTemplates(userId));

  useEffect(() => { setTpl(loadTemplates(userId)); }, [userId]);

  function setField(sub: keyof TemplatesMap, field: 'Konu'|'Soru'|'Tekrar', val: number) {
    setTpl((prev) => ({ ...prev, [sub]: { ...prev[sub], [field]: isNaN(val) ? 0 : val } }));
  }

  function onSave() { saveTemplates(userId, tpl); }
  function onReset() { const d = defaultTemplates(); setTpl(d); saveTemplates(userId, d); }

  return (
    <Card className="p-6 mt-8">
      <h3 className="text-xl font-semibold mb-4">Alt Görev Şablonları (dk)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((s) => (
          <Card key={s as string} className="p-4">
            <div className="font-semibold mb-3">{s}</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="w-20 text-sm">Konu</label>
                <Input type="number" value={tpl[s].Konu} onChange={(e) => setField(s, 'Konu', Number(e.target.value))} />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-20 text-sm">Soru</label>
                <Input type="number" value={tpl[s].Soru} onChange={(e) => setField(s, 'Soru', Number(e.target.value))} />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-20 text-sm">Tekrar</label>
                <Input type="number" value={tpl[s].Tekrar} onChange={(e) => setField(s, 'Tekrar', Number(e.target.value))} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <Button onClick={onSave}>Kaydet</Button>
        <Button variant="outline" onClick={onReset}>Varsayılanlara Dön</Button>
      </div>
    </Card>
  );
};

export default StudyTemplates;

