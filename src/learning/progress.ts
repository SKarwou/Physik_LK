import { useEffect, useState } from 'react';
const KEY = 'physik-lernfortschritt-v1';
type Progress = Record<string, number>;
function read(): Progress {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([, score]) => typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 10));
  } catch { return {}; }
}
export function recordScore(course: string, lesson: string, score: number): boolean {
  try {
    const progress = read(), key = `${course}/${lesson}`;
    progress[key] = Math.max(progress[key] || 0, score);
    localStorage.setItem(KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('physics-progress'));
    return true;
  } catch { return false; }
}
export function useProgress() {
  const [progress, setProgress] = useState(read);
  useEffect(() => {
    const refresh = () => setProgress(read());
    window.addEventListener('physics-progress', refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener('physics-progress', refresh); window.removeEventListener('storage', refresh); };
  }, []);
  return progress;
}
