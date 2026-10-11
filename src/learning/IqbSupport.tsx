import {MathText} from '../electric/Math';
import {IQB_URL,iqbPractice} from './iqbPractice';
import './iqb-practice.css';

export function IqbReference({course,lesson}:{course?:string;lesson?:string}) {
 const entry=course&&lesson?iqbPractice[course]?.[lesson]:undefined;
 return <aside className="iqb-reference">
  <b>Dein Nachschlagewerk fürs Abitur</b>
  <a href={`${IQB_URL}#page=${entry?.page||15}`} target="_blank" rel="noreferrer">IQB-Formelsammlung öffnen{entry?` · Seite ${entry.page}`:' · Physik ab Seite 15'} ↗</a>
  {entry&&<p>Passend zu diesem Kapitel: <MathText>{entry.find}</MathText>.</p>}
  {!entry&&<p>Trainiere mit derselben Sammlung: Formel finden, Größen zuordnen, Voraussetzungen prüfen, im Heft rechnen und das Ergebnis begründen.</p>}
  <small>Seitenangaben: IQB-Fassung vom 14.02.2024. Größen und Einheiten ab S. 47, Vorsätze und Konstanten ab S. 50. Maßgeblich für deine Prüfung sind die Vorgaben deiner Schule und deines Landes.</small>
 </aside>;
}

export default function IqbPractice({course,lesson}:{course:string;lesson:string}) {
 const entry=iqbPractice[course]?.[lesson];
 if(!entry)return null;
 return <section className="iqb-practice" aria-label="Abiturtraining im Heft">
  <span className="kicker">NACHSCHLAGEN · ANWENDEN · BEGRÜNDEN</span>
  <h2>Abiturwerkstatt · jetzt selbst im Heft</h2>
  <p>Nutze <a href={`${IQB_URL}#page=${entry.page}`} target="_blank" rel="noreferrer">Seite {entry.page} der IQB-Formelsammlung ↗</a>: <MathText>{entry.find}</MathText>. Diese Aufgaben sind eigens für das Lernlabor erstellt.</p>
  <ol>
   <li><strong>Formel und Ansatz:</strong> <MathText>{entry.calculate}</MathText></li>
   <li><strong>Verstehen und begründen:</strong> <MathText>{entry.explain}</MathText></li>
  </ol>
  <p className="iqb-writing">✎ Arbeite auf Papier: Gegeben und gesucht → passende Formel mit Gültigkeitsbedingungen → Umstellen → Einsetzen mit Einheiten → Ergebnis und Plausibilitätsprüfung. Bei einer Begründung: Aussage → physikalischer Zusammenhang → Folgerung.</p>
  <details><summary>Nach deiner Bearbeitung: Lösung und Begründung vergleichen</summary><p><MathText>{entry.solution}</MathText></p></details>
  <details><summary>Selbstkontrolle für deinen Rechenweg</summary><ul><li>Habe ich Formelzeichen aus der Sammlung meiner Situation richtig zugeordnet?</li><li>Passen Modell und Voraussetzungen zur Aufgabe?</li><li>Habe ich Einheiten umgerechnet und das Ergebnis mit Einheit angegeben?</li><li>Passt die Größenordnung? Kann ich erklären, was sich beim Verdoppeln einer Größe verändert?</li></ul></details>
 </section>;
}
