const PREFIX = "yks2026";

function keyFor(userId: string, suffix: string) {
  return `${PREFIX}:${userId}:${suffix}`;
}

export function getActiveUserId(): string {
  try {
    const k = `${PREFIX}:user:active`;
    const existing = localStorage.getItem(k);
    if (existing) return existing;
    // default user id
    const def = "default";
    localStorage.setItem(k, def);
    return def;
  } catch {
    return "default";
  }
}

export function setActiveUserId(userId: string) {
  try {
    localStorage.setItem(`${PREFIX}:user:active`, userId);
  } catch {}
}

export function loadCompletedTopics(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(keyFor(userId, "progress"));
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

export function saveCompletedTopics(userId: string, completed: Set<string>) {
  try {
    const arr = Array.from(completed);
    localStorage.setItem(keyFor(userId, "progress"), JSON.stringify(arr));
  } catch {}
}

export function clearCompletedTopics(userId: string) {
  try {
    localStorage.removeItem(keyFor(userId, "progress"));
  } catch {}
}

// Active timer
export type ActiveTimer = {
  topicKey: string;
  topicTitle: string;
  subject?: string;
  startedAt: string; // ISO
  mode?: 'focus' | 'break' | 'free';
  durationSec?: number; // total seconds for countdown
  breakSec?: number; // optional linked break duration
  preset?: string; // e.g., "25/5" or "50/10"
};

function timerKey(userId: string) {
  return keyFor(userId, "activeTimer");
}

export function getActiveTimer(userId: string): ActiveTimer | null {
  try {
    const raw = localStorage.getItem(timerKey(userId));
    return raw ? (JSON.parse(raw) as ActiveTimer) : null;
  } catch {
    return null;
  }
}

export function setActiveTimer(userId: string, timer: ActiveTimer | null) {
  try {
    if (!timer) localStorage.removeItem(timerKey(userId));
    else localStorage.setItem(timerKey(userId), JSON.stringify(timer));
  } catch {}
}

// User profiles
export type UserProfile = { id: string; name: string; createdAt: string };

function usersKey() {
  return `${PREFIX}:users`;
}

export function getUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(usersKey());
    if (!raw) {
      const def: UserProfile[] = [{ id: "default", name: "Varsayılan", createdAt: new Date().toISOString() }];
      localStorage.setItem(usersKey(), JSON.stringify(def));
      return def;
    }
    return JSON.parse(raw) as UserProfile[];
  } catch {
    return [{ id: "default", name: "Varsayılan", createdAt: new Date().toISOString() }];
  }
}

export function createUser(name: string): UserProfile {
  const id = name.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 24) || `user-${Date.now()}`;
  const user: UserProfile = { id, name: name.trim() || "Kullanıcı", createdAt: new Date().toISOString() };
  const users = getUsers();
  const exists = users.find((u) => u.id === id);
  const newUsers = exists ? users : [...users, user];
  try { localStorage.setItem(usersKey(), JSON.stringify(newUsers)); } catch {}
  if (!exists) setActiveUserId(user.id);
  return exists ?? user;
}

export function setUserName(id: string, name: string) {
  const users = getUsers().map((u) => (u.id === id ? { ...u, name } : u));
  try { localStorage.setItem(usersKey(), JSON.stringify(users)); } catch {}
}

export function deleteUser(id: string) {
  const users = getUsers().filter((u) => u.id !== id);
  try { localStorage.setItem(usersKey(), JSON.stringify(users)); } catch {}
  const active = getActiveUserId();
  if (active === id) setActiveUserId(users[0]?.id || "default");
}

// Study sessions
export type StudySession = {
  id: string;
  topicKey: string; // week_X_topic_Y
  topicTitle: string;
  subject?: string;
  minutes: number;
  note?: string;
  date: string; // ISO
};

function sessionsKey(userId: string) {
  return keyFor(userId, "sessions");
}

export function loadSessions(userId: string): StudySession[] {
  try {
    const raw = localStorage.getItem(sessionsKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as StudySession[];
  } catch {
    return [];
  }
}

export function addSession(userId: string, session: Omit<StudySession, "id">) {
  const list = loadSessions(userId);
  const newItem: StudySession = { id: `s_${Date.now()}_${Math.random().toString(36).slice(2,8)}`, ...session };
  list.push(newItem);
  try { localStorage.setItem(sessionsKey(userId), JSON.stringify(list)); } catch {}
  return newItem;
}

export function clearSessions(userId: string) {
  try { localStorage.removeItem(sessionsKey(userId)); } catch {}
}

// Goals
export type Goal = { id: string; title: string; due?: string; priority?: "low"|"med"|"high"; done: boolean };

function goalsKey(userId: string) {
  return keyFor(userId, "goals");
}

export function loadGoals(userId: string): Goal[] {
  try {
    const raw = localStorage.getItem(goalsKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as Goal[];
  } catch {
    return [];
  }
}

export function addGoal(userId: string, g: Omit<Goal, "id"|"done">) {
  const list = loadGoals(userId);
  const newG: Goal = { id: `g_${Date.now()}`, done: false, ...g };
  list.push(newG);
  try { localStorage.setItem(goalsKey(userId), JSON.stringify(list)); } catch {}
  return newG;
}

export function toggleGoal(userId: string, id: string) {
  const list = loadGoals(userId).map((g) => (g.id === id ? { ...g, done: !g.done } : g));
  try { localStorage.setItem(goalsKey(userId), JSON.stringify(list)); } catch {}
}

export function deleteGoal(userId: string, id: string) {
  const list = loadGoals(userId).filter((g) => g.id !== id);
  try { localStorage.setItem(goalsKey(userId), JSON.stringify(list)); } catch {}
}

// Coach notes (free text)
function notesKey(userId: string) {
  return keyFor(userId, "coachNotes");
}

export function getNotes(userId: string): string {
  try { return localStorage.getItem(notesKey(userId)) || ""; } catch { return ""; }
}

export function setNotes(userId: string, text: string) {
  try { localStorage.setItem(notesKey(userId), text); } catch {}
}

// Export/Import
export function exportUserData(userId: string) {
  return {
    user: userId,
    progress: Array.from(loadCompletedTopics(userId)),
    sessions: loadSessions(userId),
    goals: loadGoals(userId),
    notes: getNotes(userId),
  };
}

export function importUserData(userId: string, data: any) {
  try {
    if (Array.isArray(data?.progress)) {
      localStorage.setItem(keyFor(userId, "progress"), JSON.stringify(data.progress));
    }
    if (Array.isArray(data?.sessions)) {
      localStorage.setItem(sessionsKey(userId), JSON.stringify(data.sessions));
    }
    if (Array.isArray(data?.goals)) {
      localStorage.setItem(goalsKey(userId), JSON.stringify(data.goals));
    }
    if (typeof data?.notes === "string") {
      localStorage.setItem(notesKey(userId), data.notes);
    }
  } catch {}
}

// Availability (minutes per day Mon..Sun)
export type Availability = [number, number, number, number, number, number, number];

function availabilityKey(userId: string) {
  return keyFor(userId, "availability");
}

export function loadAvailability(userId: string): Availability {
  try {
    const raw = localStorage.getItem(availabilityKey(userId));
    if (!raw) {
      const def: Availability = [120, 120, 120, 120, 120, 60, 60];
      localStorage.setItem(availabilityKey(userId), JSON.stringify(def));
      return def;
    }
    const arr = JSON.parse(raw);
    if (Array.isArray(arr) && arr.length === 7) return arr as Availability;
    return [120, 120, 120, 120, 120, 60, 60];
  } catch {
    return [120, 120, 120, 120, 120, 60, 60];
  }
}

export function saveAvailability(userId: string, a: Availability) {
  try { localStorage.setItem(availabilityKey(userId), JSON.stringify(a)); } catch {}
}

// Schedule per week
export type ScheduledItem = { topicKey: string; topicTitle: string };
export type WeekSchedule = Record<number, ScheduledItem[]>; // 0..6

function scheduleKey(userId: string, week: number) {
  return keyFor(userId, `schedule:week_${week}`);
}

export function loadSchedule(userId: string, week: number): WeekSchedule {
  try {
    const raw = localStorage.getItem(scheduleKey(userId, week));
    if (!raw) return {};
    return JSON.parse(raw) as WeekSchedule;
  } catch {
    return {};
  }
}

export function saveSchedule(userId: string, week: number, schedule: WeekSchedule) {
  try { localStorage.setItem(scheduleKey(userId, week), JSON.stringify(schedule)); } catch {}
}
