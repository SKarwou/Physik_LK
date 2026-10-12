import AdvancedDerivations from './Derivations';
import CoursePage from '../learning/CoursePage';
import {MathText,MathFormula} from '../electric/Math';
import {advancedData,type AdvancedLessonData} from './lessonData';
import {advancedQuestions} from './questions';
import {AdvancedSketch,AdvancedModel} from './AdvancedModels';
import './advanced.css';
export {advancedQuestions} from './questions';
function Lesson({data:d}:{data:AdvancedLessonData}){return <div className="adv-content">
 <aside className="adv-motivation"><b>Wofür brauchen wir das?</b><p>{d.motivation}</p></aside>
 <section className="adv-experiment"><span className="adv-tag">{d.mode}</span><h2>{d.experiment}</h2><p><b>Material und Einordnung: </b><MathText>{d.materials}</MathText></p><AdvancedSketch kind={d.id}/><h3>Schritt für Schritt untersuchen</h3><ol>{d.steps.map((s,i)=><li key={i}><MathText>{s}</MathText></li>)}</ol><aside className="adv-notebook"><b>✎ Erst im Heft auswerten</b><p><MathText>{d.task}</MathText></p><p>Lege deine Tabelle und deine Skizzen im Heft an. Beschrifte Achsen mit ausgeschriebener Größe, Symbol und Einheit. Auf der Website werden keine Messwerte eingetragen.</p></aside><details><summary>Ausgefüllte Ersatzdaten beziehungsweise Modelldaten anzeigen</summary><p><MathText>{d.dataNote}</MathText></p><div className="adv-table-wrap"><table><caption>Datensatz für die Auswertung im Heft</caption><thead><tr>{d.columns.map(c=><th key={c} scope="col"><MathText>{c}</MathText></th>)}</tr></thead><tbody>{d.rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}><MathText>{c}</MathText></td>)}</tr>)}</tbody></table></div></details><details><summary>Nach deiner Rechnung: Auswertung vergleichen</summary><p><MathText>{d.analysis}</MathText></p></details><details><summary>Danach: Deutung und Grenzen prüfen</summary><p><MathText>{d.interpretation}</MathText></p></details></section>
 <section><h2>Erklärung · Schritt für Schritt</h2>{d.theory.map((s,i)=><p key={i}><MathText>{s}</MathText></p>)}<AdvancedDerivations lesson={d.id}/><div className="adv-formulas">{d.formulas.map(f=><MathFormula key={f} tex={f} display/>)}</div><aside className="adv-memory"><b>💡 Merksatz</b><p><MathText>{d.memory}</MathText></p></aside></section>
 {d.model&&<AdvancedModel kind={d.model}/>}<section><h2>Üben und anwenden · im Heft</h2>{d.exercises.map((e,index)=><article className="adv-exercise" key={e.title}><h3>{e.title}</h3><p><MathText>{e.task}</MathText></p><details><summary>Lösung nach dem eigenen Versuch vergleichen</summary><AdvancedDerivations lesson={d.id} exercise={index}/><p><MathText>{e.solution}</MathText></p></details><details><summary>Ergebnis interpretieren</summary><p><MathText>{e.interpretation}</MathText></p></details></article>)}</section>
 </div>}
export const advancedLessons=advancedData.map((d,i)=>({id:d.id,title:d.title,lead:d.lead,word:d.word,content:<Lesson data={d}/>,questions:advancedQuestions[i]}));
export default function AdvancedCourse(){return <CoursePage slug="vertiefung" title="Vertiefung: Relativität und Astrophysik" intro="Dieses gewählte Vertiefungsthema verbindet Raum, Zeit und Energie mit Sternen und dem Universum. Es ist eine zusammenhängende Auswahl aus möglichen Vertiefungsgebieten. Gedankenexperimente, Schulversuche und berechnete Datensätze werden ausdrücklich unterschieden. Deine Untersuchungen und Rechnungen gehören ins Heft; jedes Kapitel endet mit einem Check und einem Codewort." lessons={advancedLessons} sources={[
 {label:'Einstein (1905) · Zur Elektrodynamik bewegter Körper, englische Übersetzung (Universität Illinois)',url:'https://courses.physics.illinois.edu/phys225/sp2026/Einstein1905.pdf'},
 {label:'OpenStax · Postulate und Inertialsysteme',url:'https://openstax.org/books/university-physics-volume-3/pages/5-1-invariance-of-physical-laws'},
 {label:'OpenStax · Zeitdilatation',url:'https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation'},
 {label:'OpenStax · Längenkontraktion',url:'https://openstax.org/books/university-physics-volume-3/pages/5-4-length-contraction'},
 {label:'OpenStax · Relativistischer Impuls',url:'https://openstax.org/books/university-physics-volume-3/pages/5-8-relativistic-momentum'},
 {label:'OpenStax · Relativistische Energie',url:'https://openstax.org/books/university-physics-volume-3/pages/5-9-relativistic-energy'},
 {label:'Max-Planck-Institut, Einstein Online · Zeitmessung und relativistische Korrekturen',url:'https://www.einstein-online.info/en/spotlight/how-time-is-made/'},
 {label:'MuLan-Kollaboration · Präzisionsmessung der Myonenlebensdauer',url:'https://arxiv.org/abs/1211.0960'},
 {label:'NASA · Umlaufbahnen und Kepler-Gesetze',url:'https://science.nasa.gov/solar-system/orbits-and-keplers-laws/'},
 {label:'OpenStax Astronomy · Helligkeit von Sternen',url:'https://openstax.org/books/astronomy-2e/pages/17-1-the-brightness-of-stars'},
 {label:'OpenStax Astronomy · Farben und Temperaturen',url:'https://openstax.org/books/astronomy-2e/pages/17-2-colors-of-stars'},
 {label:'ESA/Gaia · Das Hertzsprung-Russell-Diagramm',url:'https://www.esa.int/ESA_Multimedia/Images/2018/04/Gaia_s_Hertzsprung-Russell_diagram'},
 {label:'OpenStax Astronomy · Masse, Energie und Sternfusion',url:'https://openstax.org/books/astronomy-2e/pages/16-2-mass-energy-and-the-theory-of-relativity'},
 {label:'OpenStax Astronomy · Hauptreihe und Riesenphase',url:'https://openstax.org/books/astronomy-2e/pages/22-1-evolution-from-the-main-sequence-to-red-giants'},
 {label:'OpenStax Astronomy · Ende massearmer Sterne',url:'https://openstax.org/books/astronomy-2e/pages/23-1-the-death-of-low-mass-stars'},
 {label:'OpenStax Astronomy · Entwicklung massereicher Sterne',url:'https://openstax.org/books/astronomy-2e/pages/23-2-evolution-of-massive-stars-an-explosive-finish'},
 {label:'NASA · Kosmologische Rotverschiebung',url:'https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-cosmological-redshift/'},
 {label:'NASA · Hubble-Parameter und aktuelle Spannungen',url:'https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-constant-and-tension/'},
 ]}/>}
