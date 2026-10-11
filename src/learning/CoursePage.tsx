import Link from '../Link';
import { MathText } from '../electric/Math';
import ChapterQuiz from './ChapterQuiz';
import CodeCollection from './CodeCollection';
import { useLesson } from './navigation';
import { useProgress } from './progress';
import type { CourseLesson, CourseSource } from './types';
import '../electric/electric.css';
export default function CoursePage({ slug, title, intro, lessons, sources = [] }: { slug: string; title: string; intro: string; lessons: CourseLesson[]; sources?: CourseSource[] }) {
  const active = useLesson(lessons.map(l => l.id)), progress = useProgress();
  const index = lessons.findIndex(l => l.id === active), lesson = lessons[index], next = lessons[index + 1];
  return <main className="ef-page learning-course"><header className="site-header compact"><Link href="/" className="brand"><span className="physics-brand-mark">φ</span><span>Physik-Lernlabor</span></Link><Link href="/" className="back-link">← Themen</Link></header><article className="shell ef-chapter">
    {lesson ? <><nav className="lesson-breadcrumb" aria-label="Kapitelpfad"><a href="#uebersicht">← {title}: Übersicht</a><span>Kapitel {index + 1} von {lessons.length}</span></nav><section className="ef-section course-lesson" key={lesson.id}><header><span className="kicker">{title}</span><h1 id="lesson-heading" tabIndex={-1}>{lesson.title}</h1><p><MathText>{lesson.lead}</MathText></p></header>{lesson.content}<ChapterQuiz course={slug} lesson={lesson.id} questions={lesson.questions} word={lesson.word} nextHref={next ? `#${next.id}` : '#uebersicht'} nextTitle={next?.title || 'Kapitelübersicht & Lösungssatz'} /></section><nav className="lesson-footer-nav" aria-label="Weitere Kapitel"><a href="#uebersicht">← Zur Übersicht</a>{next && <a href={`#${next.id}`}>Nächstes Kapitel: {next.title} →</a>}</nav></> : <><header className="course-overview-header"><span className="kicker">PHYSIK · LEISTUNGSFACH</span><h1>{title}</h1><p><MathText>{intro}</MathText></p><p className="course-hint">Wähle ein Kapitel. Du siehst immer nur den gewählten Abschnitt. Führe Messungen und Auswertungen im Heft durch. Bei fehlendem Versuchsaufbau helfen ausklappbare Ersatzdaten. Öffne Lösungen erst danach und sichere dein Wissen im Abschlussquiz.</p></header><nav className="lesson-grid" aria-label={`Kapitel: ${title}`}>{lessons.map(l => <a key={l.id} href={`#${l.id}`}><span className="lesson-status">{(progress[`${slug}/${l.id}`] || 0) >= 8 ? '✓ Abgeschlossen' : 'Entdecken & üben'}</span><h2>{l.title}</h2><p><MathText>{l.lead}</MathText></p><span>Kapitel öffnen →</span></a>)}</nav><CodeCollection course={slug} lessons={lessons} />{sources.length > 0 && <details className="course-sources"><summary>Fachliche Grundlagen & Quellen</summary><ul>{sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a></li>)}</ul></details>}</>}
    <footer className="ef-footer"><p>Physik-Lernlabor · Leistungsfach · Experimente, Erklärungen und eigene Denkwege.</p></footer>
  </article></main>;
}
