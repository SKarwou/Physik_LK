import CoursePage from '../learning/CoursePage';
import {MathFormula,MathText} from '../electric/Math';
import {opticsData,type OpticsLessonData} from './lessonData';
import {opticsQuestions} from './questions';
import {OpticsSketch,SlitModel,MichelsonModel,PolarisationModel} from './OpticsModels';
import './optics.css';
export {opticsQuestions} from './questions';
function Lesson({lesson:l}:{lesson:OpticsLessonData}){
 return <div className="optics-content"><aside className="optics-application"><span>WOZU BRAUCHE ICH DAS?</span><h2>{l.hook}</h2><p>{l.application}</p></aside><p className="optics-book">Zum Nachschlagen: Themen aus Kapitel 10 „Wellenerscheinungen des Lichts“ des bereitgestellten Buchs, Seiten 244–270. Die Texte, Skizzen und Aufgaben hier sind eigenständig erstellt.</p>
 <section className="optics-experiment"><span className="kicker">BEOBACHTEN · VERMUTEN · IM HEFT AUSWERTEN</span><h2>{l.experiment}</h2><p><b>Material und Aufbau: </b>{l.materials}</p><OpticsSketch kind={l.id}/><h3>Durchführung</h3><ol>{l.steps.map((s,i)=><li key={i}><MathText>{s}</MathText></li>)}</ol><aside className="heft-step"><b>✎ Zuerst ins Heft</b><p><MathText>{l.task}</MathText></p><p>Notiere Aufbau, feste Größen, eigene Daten und Unsicherheiten auf Papier. Falls der Versuch nicht möglich ist, verwende die ausgefüllten Ersatzdaten. Die Website erfasst keine Messwerte.</p></aside>
 <details><summary>Versuch nicht möglich? Ausgefüllte Ersatzdaten öffnen</summary><p><MathText>{l.dataNote}</MathText></p><div className="optics-table-wrap"><table><caption>Didaktischer Ersatzdatensatz · keine behauptete reale Messung</caption><thead><tr>{l.columns.map(c=><th key={c} scope="col"><MathText>{c}</MathText></th>)}</tr></thead><tbody>{l.rows.map((row,i)=><tr key={i}>{row.map((c,j)=><td key={j}><MathText>{c}</MathText></td>)}</tr>)}</tbody></table></div></details>
 <details><summary>Nach der Heftauswertung: Lösung und Interpretation</summary><p><MathText>{l.evaluation}</MathText></p></details></section>
 <section><h2>Erklärung · Schritt für Schritt</h2>{l.theory.map((p,i)=><p key={i}><MathText>{p}</MathText></p>)}<div className="optics-formulas">{l.formulas.map(f=><MathFormula key={f} display tex={f}/>)}</div><aside className="optics-memory"><b>💡 Merksatz</b><p><MathText>{l.memory}</MathText></p></aside></section>
 {l.model==='slits'&&<SlitModel single={l.id==='einzelspalt'}/>} {l.model==='michelson'&&<MichelsonModel/>} {l.model==='polarisation'&&<PolarisationModel/>}
 <section><h2>Üben und anwenden · im Heft</h2>{l.exercises.map(e=><article className="optics-exercise" key={e.title}><h3>{e.title}</h3><p><MathText>{e.task}</MathText></p><details><summary>Erst nach deinem Versuch: Lösung vergleichen</summary><p><MathText>{e.solution}</MathText></p></details></article>)}</section></div>;
}
export const opticsLessons=opticsData.map(l=>({id:l.id,title:l.title,lead:l.lead,word:l.word,questions:opticsQuestions[l.id],content:<Lesson lesson={l}/>}));
export default function OpticsCourse(){
 return <CoursePage slug="wellenoptik" title="Wellenoptik" intro="Vom gebrochenen Lichtstrahl bis zum Beugungsscheibchen: Acht Kapitel verbinden klassische optische Versuche mit Modellen, Rechnungen und Anwendungen. Arbeite erst im Heft, vergleiche danach die Lösungen und sammle im Quiz die Wörter deines Lösungssatzes." lessons={opticsLessons} sources={[
 {label:'OpenStax · Huygens-Prinzip und Verbindung zur Strahlenoptik',url:'https://openstax.org/books/university-physics-volume-3/pages/1-6-huygenss-principle'},
 {label:'OpenStax · Doppelspalt und Interferenzbedingungen',url:'https://openstax.org/books/university-physics-volume-3/pages/3-2-mathematics-of-interference'},
 {label:'OpenStax · Einzelspalt-Intensität',url:'https://openstax.org/books/university-physics-volume-3/pages/4-2-intensity-in-single-slit-diffraction'},
 {label:'OpenStax · Optische Gitter',url:'https://openstax.org/books/university-physics-volume-3/pages/4-4-diffraction-gratings'},
 {label:'OpenStax · Michelson-Interferometer',url:'https://openstax.org/books/university-physics-volume-3/pages/3-5-the-michelson-interferometer'},
 {label:'OpenStax · Interferenz dünner Schichten',url:'https://openstax.org/books/university-physics-volume-3/pages/3-4-interference-in-thin-films'},
 {label:'OpenStax · Polarisation',url:'https://openstax.org/books/university-physics-volume-3/pages/1-7-polarization'},
 {label:'OpenStax · Kreisförmige Öffnungen und Auflösung',url:'https://openstax.org/books/university-physics-volume-3/pages/4-5-circular-apertures-and-resolution'}
 ]}/>;
}
