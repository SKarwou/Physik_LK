import { useProgress } from './progress';
export default function CodeCollection({ course, lessons }: { course: string; lessons: { id: string; title: string; word: string }[] }) {
  const progress = useProgress();
  const complete = lessons.filter(l => (progress[`${course}/${l.id}`] || 0) >= 8).length;
  return <aside className="code-collection"><div><h2>Dein Lösungssatz</h2><span>{complete} von {lessons.length} Wörtern gesammelt</span></div><p>Jedes bestandene Kapitel ergänzt ein Wort. Notiere die Wörter auch in deinem Heft. Dein Fortschritt bleibt in diesem Browser gespeichert.</p><ol>{lessons.map((l, i) => <li key={l.id} className={(progress[`${course}/${l.id}`] || 0) >= 8 ? 'earned' : ''}><a href={`#${l.id}`} aria-label={`${l.title}: ${(progress[`${course}/${l.id}`] || 0) >= 8 ? l.word : 'noch offen'}`}><small>{i + 1}</small><span>{(progress[`${course}/${l.id}`] || 0) >= 8 ? l.word : '•••'}</span></a></li>)}</ol>{complete === lessons.length && <p className="code-complete"><b>{lessons.map(l => l.word).join(' ')}</b><br />Alle Kapitel abgeschlossen – erkläre den Satz zum Abschluss mit einem eigenen Beispiel.</p>}</aside>;
}
