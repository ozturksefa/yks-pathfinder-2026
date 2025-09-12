// Utilities for subject inference, topic decomposition and weekly optimization

export type SubPart = { part: 'Konu'|'Soru'|'Tekrar'; minutes: number };
import { getActiveUserId, loadTemplates } from "@/lib/storage";

export function inferSubject(title: string): 'Matematik'|'Fizik'|'Kimya'|'Biyoloji'|'Türkçe'|'Tarih'|'Coğrafya'|'Diğer' {
  const s = title.toLowerCase();
  if (s.includes('mat') || s.includes('geometri')) return 'Matematik';
  if (s.includes('fizik')) return 'Fizik';
  if (s.includes('kimya')) return 'Kimya';
  if (s.includes('biyoloji')) return 'Biyoloji';
  if (s.includes('türkçe') || s.includes('turk')) return 'Türkçe';
  if (s.includes('tarih')) return 'Tarih';
  if (s.includes('coğrafya') || s.includes('cografya')) return 'Coğrafya';
  return 'Diğer';
}

export function decomposeTopic(title: string): SubPart[] {
  // try user templates first
  try {
    const user = getActiveUserId();
    const tpl = loadTemplates(user);
    const sub = inferSubject(title);
    const t = (tpl as any)[sub];
    if (t) return [
      { part: 'Konu', minutes: Number(t.Konu) || 0 },
      { part: 'Soru', minutes: Number(t.Soru) || 0 },
      { part: 'Tekrar', minutes: Number(t.Tekrar) || 0 },
    ];
  } catch {}
  const sub = inferSubject(title);
  // Heavier default for Matematik & Fizik
  if (sub === 'Matematik' || sub === 'Fizik') {
    return [
      { part: 'Konu', minutes: 70 },
      { part: 'Soru', minutes: 50 },
      { part: 'Tekrar', minutes: 20 },
    ];
  }
  if (sub === 'Kimya' || sub === 'Biyoloji') {
    return [
      { part: 'Konu', minutes: 60 },
      { part: 'Soru', minutes: 40 },
      { part: 'Tekrar', minutes: 20 },
    ];
  }
  // Türkçe/Sosyal
  return [
    { part: 'Konu', minutes: 45 },
    { part: 'Soru', minutes: 35 },
    { part: 'Tekrar', minutes: 15 },
  ];
}

export function totalSubtasksForWeek(topics: string[]): number {
  return topics.reduce((sum, t) => sum + decomposeTopic(t).length, 0);
}

export function totalSubtasksForPlan(plan: Record<number, { topics: string[] }>): number {
  let total = 0;
  for (const k of Object.keys(plan)) {
    const wk = Number(k);
    const topics = plan[wk]?.topics ?? [];
    total += totalSubtasksForWeek(topics);
  }
  return total;
}

// Optimizer: distribute decomposed parts across days honoring availability, off days and an optional exam block
export type OptimizeOptions = {
  week: number;
  topics: string[];
  availability: number[]; // minutes per day 0..6
  offDays?: number[]; // 0..6
  examDay?: number | null; // 0..6
  examMinutes?: number; // minutes
  analysisDay?: number | null;
  analysisMinutes?: number;
  analysisStartWeek?: number; // schedule analysis only from this week onward
  minDailyMinutes?: number; // enforce min capacity on non-off days
};

export type ScheduledItem = {
  topicKey: string; // week_X_topic_Y
  topicTitle: string;
  subKey: string; // week_X_topic_Y_part_Z
  label: string; // title + part
  minutes: number;
  subject: string;
};

export type WeekSchedule = Record<number, ScheduledItem[]>; // day -> items

const subjectWeight: Record<string, number> = {
  Matematik: 3, Fizik: 3, Kimya: 2, Biyoloji: 2, Türkçe: 1, Tarih: 1, Coğrafya: 1, Diğer: 1,
};

export function optimizeWeekSchedule(opts: OptimizeOptions): WeekSchedule {
  const { week, topics, availability } = opts;
  const off = new Set(opts.offDays || []);
  const minDaily = opts.minDailyMinutes ?? 0;
  const remain = availability.map((m, day) => {
    if (off.has(day)) return 0;
    const base = Math.max(0, m || 0);
    // Enforce minimum only if day is not off and user provided some capacity or wants minDaily
    return Math.max(base, minDaily);
  });
  const plan: WeekSchedule = {};

  // Place exam first if present
  if (opts.examDay !== undefined && opts.examDay !== null && (opts.examMinutes || 0) > 0) {
    const d = opts.examDay;
    const minutes = Math.min(remain[d] || 0, opts.examMinutes || 0);
    if (minutes > 0) {
      plan[d] = plan[d] || [];
      plan[d].push({
        topicKey: `week_${week}_exam`,
        topicTitle: `Deneme Sınavı (Hafta ${week})`,
        subKey: `week_${week}_exam_part_0`,
        label: `Deneme Sınavı • ${minutes} dk`,
        minutes,
        subject: 'Diğer',
      });
      remain[d] = Math.max(0, (remain[d] || 0) - minutes);
    }
  }
  // Place analysis task (prefer the assigned day, else next day after exam if exists)
  if (opts.analysisMinutes && opts.analysisMinutes > 0 && (!opts.analysisStartWeek || opts.week >= opts.analysisStartWeek)) {
    let ad = opts.analysisDay ?? null;
    if ((ad === null || ad === undefined) && (opts.examDay !== null && opts.examDay !== undefined)) {
      ad = Math.min(6, (opts.examDay as number) + 1);
    }
    if (ad !== null && !off.has(ad)) {
      const m = Math.min(remain[ad] || 0, opts.analysisMinutes);
      if (m > 0) {
        plan[ad] = plan[ad] || [];
        plan[ad].push({
          topicKey: `week_${week}_analysis`,
          topicTitle: `Deneme Analizi (Hafta ${week})`,
          subKey: `week_${week}_analysis_part_0`,
          label: `Deneme Analizi • ${m} dk`,
          minutes: m,
          subject: 'Diğer',
        });
        remain[ad] = Math.max(0, (remain[ad] || 0) - m);
      }
    }
  }

  // Build items list for all topics
  type Task = { title: string; subject: string; weight: number; part: SubPart; topicIndex: number; partIndex: number };
  const tasks: Task[] = [];
  topics.forEach((title, i) => {
    const subject = inferSubject(title);
    const weight = subjectWeight[subject] || 1;
    const parts = decomposeTopic(title);
    parts.forEach((part, j) => tasks.push({ title, subject, weight, part, topicIndex: i, partIndex: j }));
  });

  // Sort by weight desc then by part order (Konu>Soru>Tekrar), then by topic index
  const partOrder: Record<string, number> = { Konu: 0, Soru: 1, Tekrar: 2 } as any;
  tasks.sort((a, b) => b.weight - a.weight || partOrder[a.part.part] - partOrder[b.part.part] || a.topicIndex - b.topicIndex);

  const dayPref = [0,1,2,3,4,5,6]; // Prefer early week first

  function lastSubjectOfDay(day: number): string | null {
    const arr = plan[day] || [];
    return arr.length ? arr[arr.length - 1].subject : null;
  }

  const desiredMid: Record<string, number> = { Konu: 1, Soru: 3, Tekrar: 5 } as any;
  for (const t of tasks) {
    // Choose the best day: with enough remaining minutes, not off, subject rotation preferred, earlier in week
    let bestDay = -1;
    let bestScore = -Infinity;
    for (const d of dayPref) {
      if (off.has(d)) continue;
      const left = remain[d] || 0;
      const alignPenalty = Math.abs(d - (desiredMid[t.part.part] ?? 3)) * 5;
      const score = (left - t.part.minutes) // prefer enough capacity
        - (lastSubjectOfDay(d) === t.subject ? 50 : 0) // avoid same subject consecutive
        + (20 - d) // early in week baseline bonus
        - alignPenalty; // align part to week phase (Konu early, Soru mid, Tekrar late)
      if (left >= t.part.minutes && score > bestScore) {
        bestScore = score;
        bestDay = d;
      }
    }
    if (bestDay === -1) {
      // place to day with max remaining
      bestDay = dayPref.reduce((acc, d) => (remain[d] > remain[acc] ? d : acc), dayPref[0]);
    }
    plan[bestDay] = plan[bestDay] || [];
    const topicKey = `week_${week}_topic_${t.topicIndex}`;
    const subKey = `${topicKey}_part_${t.partIndex}`;
    plan[bestDay].push({
      topicKey,
      topicTitle: t.title,
      subKey,
      label: `${t.title} — ${t.part.part}`,
      minutes: t.part.minutes,
      subject: t.subject,
    });
    remain[bestDay] = Math.max(0, (remain[bestDay] || 0) - t.part.minutes);
  }

  return plan;
}
