import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from '../Link';
import { protectedCourses, type ProtectedSlug } from './courses';
import { unlockCourse, type UnlockedCourse } from './unlock';
import './access.css';

export default function ProtectedCourse({ slug }: { slug: ProtectedSlug }) {
  const course = protectedCourses[slug];
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [opened, setOpened] = useState<UnlockedCourse | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const request = useRef<AbortController | null>(null);
  const resource = useRef<UnlockedCourse | null>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => () => { request.current?.abort(); resource.current?.release(); }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setError(''); setBusy(true);
    try {
      const unlocked = await unlockCourse(slug, password, controller.signal);
      resource.current = unlocked;
      setOpened(unlocked); setPassword(''); setShowPassword(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (reason) {
      if (!controller.signal.aborted) {
        setError(reason instanceof Error ? reason.message : 'Das Thema konnte nicht geöffnet werden. Bitte versuche es erneut.');
        input.current?.focus();
      }
    } finally { if (!controller.signal.aborted) setBusy(false); }
  }

  function lock() {
    request.current?.abort();
    resource.current?.release(); resource.current = null;
    setOpened(null); setPassword(''); setError(''); setBusy(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  if (opened) {
    const Content = opened.Component;
    return <><aside className="course-access-bar" aria-label="Zugang zum Lernbereich"><span>✓ {course.title} geöffnet</span><button type="button" onClick={lock}>Thema wieder sperren</button></aside><Content /></>;
  }
  return <main className="course-access-page">
    <header className="site-header compact"><Link href="/" className="brand"><span className="physics-brand-mark">φ</span><span>Physik-Lernlabor</span></Link><Link href="/" className="back-link">← Themen</Link></header>
    <section className="course-access-card shell" aria-labelledby="access-title">
      <div className="course-access-art" aria-hidden="true"><span>{course.symbol}</span><svg viewBox="0 0 120 120" fill="none"><path d="M38 53V35a22 22 0 0 1 44 0v18" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/><rect x="24" y="49" width="72" height="58" rx="15" fill="#ecdca5" stroke="currentColor" strokeWidth="4"/><circle cx="60" cy="72" r="6" fill="currentColor"/><path d="M60 77v12" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg></div>
      <span className="kicker">DEIN NÄCHSTER LERNBEREICH</span><h1 id="access-title">{course.title}</h1>
      <p>Dieses Thema öffnest du mit dem Passwort deiner Lehrkraft. Danach stehen dir alle Unterkapitel, Experimente und Aufgaben dieses Lernbereichs zur Verfügung.</p>
      <form onSubmit={submit} aria-busy={busy}>
        <label htmlFor="course-password">Passwort für diesen Lernbereich</label>
        <div className="course-password-row"><input ref={input} id="course-password" type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} required aria-invalid={!!error} aria-describedby={error ? 'course-access-error' : 'course-access-note'} disabled={busy}/><button className="course-password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-pressed={showPassword}>{showPassword ? 'Verbergen' : 'Anzeigen'}</button></div>
        <button type="submit" className="button button-primary" disabled={busy}>{busy ? 'Thema wird geöffnet …' : 'Thema öffnen →'}</button>
        {error && <p id="course-access-error" className="course-access-error" role="alert">{error}</p>}
        <p id="course-access-note" className="course-access-note">Die Freigabe gilt für diese geöffnete Seite. Nach dem Neuladen ist das Passwort erneut nötig.</p>
      </form>
      <div className="course-free-links"><span>Ohne Passwort entdecken:</span><Link href="/kapitel/elektrisches-feld">Elektrisches Feld →</Link><Link href="/kapitel/denk-arbeitsweisen">Denk- und Arbeitsweisen der Physik →</Link></div>
    </section>
  </main>;
}
