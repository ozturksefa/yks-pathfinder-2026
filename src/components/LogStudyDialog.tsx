import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addSession, getActiveUserId } from "@/lib/storage";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  topicKey: string | null;
  topicTitle: string | null;
};

function inferSubject(title: string): string | undefined {
  const s = title.toLowerCase();
  if (s.includes("mat")) return "Matematik";
  if (s.includes("fizik")) return "Fizik";
  if (s.includes("kimya")) return "Kimya";
  if (s.includes("biyoloji")) return "Biyoloji";
  if (s.includes("türkçe") || s.includes("turk")) return "Türkçe";
  if (s.includes("tarih")) return "Tarih";
  if (s.includes("coğrafya") || s.includes("cografya")) return "Coğrafya";
  return undefined;
}

export const LogStudyDialog = ({ open, onOpenChange, topicKey, topicTitle }: Props) => {
  const [minutes, setMinutes] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const onSave = () => {
    if (!topicKey || !topicTitle) return;
    const m = parseInt(minutes, 10);
    if (!m || m <= 0) return;
    const userId = getActiveUserId();
    addSession(userId, {
      topicKey,
      topicTitle,
      subject: inferSubject(topicTitle),
      minutes: m,
      note,
      date: new Date().toISOString(),
    });
    setMinutes("");
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Çalışma Süresi Ekle</DialogTitle>
          <DialogDescription>
            {topicTitle || "Konu"} için çalıştığın süreyi ve notu ekle.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-sm">Dakika</label>
            <Input placeholder="örn: 30" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Not (opsiyonel)</label>
            <Textarea placeholder="Kısa not..." value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Vazgeç</Button>
          <Button onClick={onSave}>Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogStudyDialog;

