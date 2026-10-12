import WaveDerivations from './Derivations';
import CoursePage from '../learning/CoursePage';
import {MathText,MathFormula} from '../electric/Math';
import {waveData, type WaveLessonData} from './lessonData';
import {waveQuestions} from './questions';
import {WaveSketch,WaveModel} from './WaveModels';
import './waves.css';
function Lesson({lesson:l}:{lesson:WaveLessonData}){return <div className='wave-content'>
 <aside className='wave-application'><span>WOZU BRAUCHE ICH DAS?</span><h2>{l.hook}</h2><p>{l.application}</p></aside><p className='wave-book'>Zum Nachschlagen im bereitgestellten Buch: {l.book}.</p>
 <section className='wave-experiment'><span className='kicker'>BEOBACHTEN · IM HEFT DOKUMENTIEREN</span><h2>{l.experiment}</h2><p><b>Material: </b>{l.materials}</p><WaveSketch kind={l.id}/><h3>Durchführung</h3><ol>{l.steps.map((s,i)=><li key={i}><MathText>{s}</MathText></li>)}</ol>
 <aside className='heft-step'><b>✎ Zuerst ins Heft</b><p><MathText>{l.task}</MathText></p><p>Notiere eigene Messwerte und Beobachtungen im Heft. Falls der Versuch nicht stattfinden kann, nutze die ausgefüllten Ersatzdaten unten. Auf der Website trägst du keine Messwerte ein.</p></aside>
 <details className='wave-fallback'><summary>Versuch nicht möglich? Ausgefüllte Ersatzdaten anzeigen</summary><p><MathText>{l.dataNote}</MathText></p><div className='wave-table-wrap'><table><caption>Datensatz zur Auswertung im Heft</caption><thead><tr>{l.columns.map(c=><th key={c} scope='col'><MathText>{c}</MathText></th>)}</tr></thead><tbody>{l.rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}><MathText>{c}</MathText></td>)}</tr>)}</tbody></table></div></details>
 <details><summary>Erst nach deiner Auswertung: Lösung und Interpretation</summary><p><MathText>{l.evaluation}</MathText></p></details></section>
 <section><h2>Erklärung · Schritt für Schritt</h2>{l.theory.map((s,i)=><p key={i}><MathText>{s}</MathText></p>)}<WaveDerivations lesson={l.id}/><div className='wave-formulas'>{l.formulas.map(f=><MathFormula key={f} tex={f} display/>)}</div><aside className='wave-memory'><b>💡 Merksatz</b><p><MathText>{l.memory}</MathText></p></aside></section>
 {l.model&&<WaveModel kind={l.model}/>}<section><h2>Üben und anwenden · im Heft</h2>{l.exercises.map(e=><article className='wave-exercise' key={e.title}><h3>{e.title}</h3><p><MathText>{e.task}</MathText></p><details><summary>Nach deinem Versuch: Lösung vergleichen</summary><p><MathText>{e.solution}</MathText></p></details></article>)}</section></div>}
export const waveLessons=waveData.map(l=>({id:l.id,title:l.title,lead:l.lead,word:l.word,content:<Lesson lesson={l}/>,questions:waveQuestions[l.id]}));
export default function WavesCourse(){return <CoursePage slug='wellen' title='Mechanische und elektromagnetische Wellen' intro='Vom Seilimpuls bis zur Funkantenne: Du untersuchst, wie Wellen sich ausbreiten, überlagern und Informationen übertragen. Die acht Kapitel folgen den Themen des bereitgestellten Physikbuchs. Versuche, Ersatzdaten und Auswertung gehören zusammen; deine Aufzeichnungen bleiben im Heft.' lessons={waveLessons} sources={[
 {label:'LEIFIphysik · Mechanische Wellen und Versuche',url:'https://www.leifiphysik.de/mechanik/mechanische-wellen'},
 {label:'LEIFIphysik · Wellenwanne mit Abbildungen der Versuchsanordnungen',url:'https://www.leifiphysik.de/mechanik/mechanische-wellen/versuche/wellenwanne'},
 {label:'LEIFIphysik · Akustischer Doppler-Effekt',url:'https://www.leifiphysik.de/akustik/akustische-wellen/grundwissen/doppler-effekt'},
 {label:'Universität Göttingen · Polarisationsversuch mit Abbildungen',url:'https://lehrportal.physik.uni-goettingen.de/get/text/6190'},
 {label:'LEIFIphysik · Elektromagnetische Wellen',url:'https://www.leifiphysik.de/elektrizitaetslehre/elektromagnetische-wellen'}]}/>}
