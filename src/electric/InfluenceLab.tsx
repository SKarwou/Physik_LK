import ExperimentGuide from './ExperimentGuide';
import { useState } from 'react';
import { Choices, Slider, Task, ZoomScene } from './LabUI';

export function ElectroscopeLab() {
  const [sign, setSign] = useState('negative'), [distance, setDistance] = useState(100), [charge, setCharge] = useState(0);
  const polarity = sign === 'negative' ? -1 : 1;
  const induction = (100 - distance) / 100 * .8 * polarity;
  const leaf = charge + induction, top = charge - induction;
  const angle = Math.min(55, Math.abs(leaf) * 48), color = (q: number) => q < 0 ? '#4862a5' : '#b8485b';
  return <div className="ef-lab ef-electroscope">
    <ExperimentGuide kind="electroscope" />
    <div className="ef-lab-grid"><div><Choices label="Ladung des Stabs" value={sign} set={setSign} options={[{ value: 'negative', label: 'Stab negativ' }, { value: 'positive', label: 'Stab positiv' }]} /><Slider label="Abstand des Stabs (schematisch)" value={distance} set={setDistance} min={0} max={100} unit="%" /><p>0 % bedeutet nah am Teller, 100 % außerhalb des hier dargestellten Einflussbereichs. Der Stab berührt den Teller beim Annähern noch nicht.</p><div className="ef-toolbar"><button type="button" onClick={() => { setCharge(polarity); setDistance(100); }}>Teller berühren, dann Stab entfernen</button><button type="button" onClick={() => { setCharge(0); setDistance(100); }}>Elektroskop neutralisieren</button></div></div>
      <svg className="ef-scene" viewBox="0 0 640 340" role="img" aria-label={`Elektroskop mit ${Math.abs(leaf) < .01 ? 'nicht ausgeschlagenem' : 'ausgeschlagenem'} Zeiger`}>
        <rect x="230" y="114" width="195" height="205" rx="20" fill="#f9fbf5" stroke="#aebdad" strokeWidth="2" />
        <rect x="310" y="97" width="40" height="21" rx="5" fill="#d8bb76" /><path d="M330 65V270 M295 320H365" stroke="#63736b" strokeWidth="7" />
        <ellipse cx="330" cy="66" rx="51" ry="12" fill="#d1dad4" stroke="#63736b" strokeWidth="2" />
        <path d={`M330 173l${Math.sin(angle * Math.PI / 180) * 105} ${Math.cos(angle * Math.PI / 180) * 105}`} stroke="#55655b" strokeWidth="7" strokeLinecap="round" className="ef-electroscope-needle" />
        <g fill={color(leaf)}>{Math.abs(leaf) > .05 && <><text x="307" y="232">{leaf < 0 ? '−' : '+'}</text><text x={330 + Math.sin(angle * Math.PI / 180) * 82 + 8} y={173 + Math.cos(angle * Math.PI / 180) * 82}>{leaf < 0 ? '−' : '+'}</text></>}</g>
        {Math.abs(top) > .05 && <text x="328" y="70" textAnchor="middle" fill={color(top)}>{top < 0 ? '− − −' : '+ + +'}</text>}
        <g transform={`translate(${30 - distance * .7} 45)`}><rect width="208" height="25" rx="12" fill={color(polarity)} /><text x="142" y="19" fill="white">{polarity < 0 ? '− − −' : '+ + +'}</text></g>
        <text x="490" y="77">Metallteller</text><path d="M470 72H385" stroke="#9aa99b" /><text x="482" y="174">Zeiger</text><text x="478" y="203">und Halterung</text>
        <text x="330" y="30" textAnchor="middle">{charge ? charge < 0 ? 'Nettoladung: negativ' : 'Nettoladung: positiv' : 'Gesamtladung: neutral'}</text>
      </svg>
    </div>
    <p role="status">{charge === 0 ? distance === 100 ? 'Das neutrale Elektroskop zeigt keinen Ausschlag. Nähere den Stab an.' : sign === 'negative' ? 'Der negative Stab verdrängt Elektronen vom Teller nach unten. Zeiger und Halterung sind beide negativ und stoßen sich ab. Insgesamt bleibt das Elektroskop neutral.' : 'Der positive Stab zieht Elektronen zum Teller. Unten entsteht an Zeiger und Halterung Elektronenmangel. Beide sind positiv und stoßen sich ab; die Gesamtladung bleibt null.' : 'Durch die Berührung wurde Ladung übertragen. Nach dem Entfernen des Stabs bleibt ein Ausschlag. Näherst du jetzt einen entgegengesetzt geladenen Stab, kann sich der Ausschlag zunächst verkleinern.'}</p>
    <p className="ef-model">Qualitatives Modell: Ausschlag und Ladungszeichen verdeutlichen die Umverteilung, ohne Kalibrierung in Coulomb. Ein zunächst neutrales Elektroskop weist eine elektrische Wirkung nach; aus dem Ausschlag allein erkennt man das Vorzeichen des Stabs nicht.</p>
  </div>;
}

function ChargeBalance({ positive, charged }: { positive: boolean; charged: boolean }) {
  const electrons = charged ? positive ? 5 : 11 : 8;
  return <div className="ef-charge-balance" data-balance={positive ? 'positive' : 'negative'}>
    <h4>{positive ? 'Kugel links' : 'Kugel rechts'} · {charged ? positive ? 'positiv' : 'negativ' : 'neutral'}</h4>
    <svg viewBox="0 0 300 205" role="img" aria-label={`Teilchenbilanz: 8 positive Ladungsanteile und ${electrons} Elektronen; ${charged ? positive ? 'Elektronenmangel' : 'Elektronenüberschuss' : 'neutral'}`}>
      <circle cx="150" cy="100" r="90" fill={charged ? positive ? '#fce7e5' : '#e7edf9' : '#f2f4ed'} stroke={positive ? '#b8485b' : '#4862a5'} strokeWidth="2" />
      {Array.from({ length: 8 }, (_, i) => <g key={`p${i}`}><circle cx={102 + i % 4 * 31} cy={66 + Math.floor(i / 4) * 43} r="10" fill="#b8485b" /><text x={102 + i % 4 * 31} y={71 + Math.floor(i / 4) * 43} textAnchor="middle" fill="white" fontSize="16">+</text></g>)}
      {Array.from({ length: electrons }, (_, i) => <g key={`e${i}`}><circle cx={95 + i % 4 * 34} cy={84 + Math.floor(i / 4) * 38} r="7" fill="#4862a5" /><text x={95 + i % 4 * 34} y={89 + Math.floor(i / 4) * 38} textAnchor="middle" fill="white" fontSize="14">−</text></g>)}
    </svg>
    <p><b>8 positive Ladungsanteile · {electrons} Elektronen</b><br />{charged ? positive ? '3 Elektronen fehlen: Elektronenmangel.' : '3 Elektronen zusätzlich: Elektronenüberschuss.' : 'Die Ladungen gleichen sich aus.'}</p>
  </div>;
}
export default function InfluenceMachine() {
  const [charged, setCharged] = useState(false);
  return <div className="ef-lab ef-influence-machine">
    <p><b>Der Aufbau:</b> Zwei isolierende Scheiben tragen Metallsegmente. Bürsten, Verbindungsstäbe und Sammelkämme ermöglichen die Ladungstrennung. Die beiden Konduktorkugeln (leitende Metallkugeln) sind elektrisch voneinander isoliert. Die Leidener Flaschen speichern zusätzliche Ladung wie Kondensatoren.</p>
    <Task><p>Vergleiche zunächst die beiden neutralen Kugeln. Klicke dann einmal auf „Einmal kurbeln“. Beschreibe für jede Kugel, was sich an der Elektronenzahl geändert hat. Prüfe auch die gesamte Ladungsbilanz beider Kugeln.</p></Task>
    <div className="ef-toolbar"><button type="button" disabled={charged} onClick={() => setCharged(true)}>Einmal kurbeln</button><button type="button" disabled={!charged} onClick={() => setCharged(false)}>Auf neutral zurücksetzen</button></div>
    <ZoomScene><svg className="ef-scene ef-machine-scene" viewBox="0 0 800 420" role="img" aria-label={`Feste Aufbauskizze einer Influenzmaschine: linke Kugel ${charged ? 'positiv' : 'neutral'}, rechte Kugel ${charged ? 'negativ' : 'neutral'}`}>
      <path d="M100 375H700 M315 305V372 M485 305V372" stroke="#63786b" strokeWidth="8" />
      <circle cx="415" cy="219" r="127" fill="#e6ecdf" stroke="#95a692" strokeWidth="3" /><circle cx="388" cy="219" r="121" fill="#f4f5eacc" stroke="#748e75" strokeWidth="3" />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x="479" y="211" width="24" height="16" rx="2" fill="#a5b3a3" transform={`rotate(${i * 22.5} 388 219)`} />)}
      <path d="M308 138L468 300 M332 300L493 140" stroke="#b49a64" strokeWidth="5" />
      <path d="M270 219H155V94H200 M535 219H645V94H600 M155 219V324 M645 219V324" fill="none" stroke="#677e6c" strokeWidth="5" />
      <path d="M268 192V246 M537 192V246" stroke="#677e6c" strokeWidth="5" />
      {[0,1,2,3,4].map(i => <path key={i} d={`M268 ${197+i*10}h12 M537 ${197+i*10}h-12`} stroke="#677e6c" strokeWidth="2" />)}
      <circle cx="215" cy="94" r="31" fill={charged ? '#dc8f96' : '#d1d9d0'} stroke="#b8485b" strokeWidth="2" /><circle cx="585" cy="94" r="31" fill={charged ? '#829bc9' : '#d1d9d0'} stroke="#4862a5" strokeWidth="2" />
      <text x="215" y="102" textAnchor="middle" fontSize="28">{charged ? '+' : '0'}</text><text x="585" y="102" textAnchor="middle" fontSize="28">{charged ? '−' : '0'}</text>
      <text x="215" y="38" textAnchor="middle">Konduktorkugel links</text><text x="585" y="38" textAnchor="middle">Konduktorkugel rechts</text>
      <path d="M127 312V363H183V312 M617 312V363H673V312 M183 350H617" fill="none" stroke="#718574" strokeWidth="3" /><path d="M155 310V346 M645 310V346" stroke="#b49a64" strokeWidth="5" />
      <circle cx="388" cy="219" r="13" fill="#677e6c" /><path d="M388 219H438V248" fill="none" stroke="#526b59" strokeWidth="6" /><circle cx="438" cy="249" r="9" fill="#b49a64" />
      <text x="395" y="82" textAnchor="middle" fontSize="16">Scheiben mit Metallsegmenten</text>
      <text x="102" y="270" textAnchor="middle" fontSize="16">Sammelkamm</text><text x="698" y="270" textAnchor="middle" fontSize="16">Sammelkamm</text>
      <text x="155" y="404" textAnchor="middle" fontSize="16">Leidener Flasche</text><text x="645" y="404" textAnchor="middle" fontSize="16">Leidener Flasche</text><text x="411" y="337" textAnchor="middle" fontSize="16">Kurbel</text>
    </svg></ZoomScene>
    <p className="ef-model">Feste, vereinfachte Aufbauskizze. „Einmal kurbeln“ steht für eine Aufladephase; die echte Maschine benötigt je nach Aufbau mehrere Umdrehungen. Das gezeigte Vorzeichen links/rechts ist ein Beispiel.</p>
    <div className="ef-charge-pair"><ChargeBalance positive charged={charged} /><ChargeBalance positive={false} charged={charged} /></div>
    <p className="ef-machine-explanation" role="status">{charged ? 'Die linke Kugel hat Elektronen abgegeben, die rechte hat Elektronen aufgenommen. Die positiven Ladungsanteile bleiben unverändert. Insgesamt sind weiterhin 16 Elektronen und 16 positive Ladungsanteile vorhanden: Es wurde Ladung getrennt.' : 'Beide Kugeln sind zunächst neutral: In jeder gleichen sich positive und negative Ladungen aus.'}</p>
    <h4>Was geschieht beim Kurbeln?</h4><ol className="ef-method-steps"><li><b>Beeinflussen:</b> Eine kleine anfängliche Ladungsunsymmetrie verschiebt durch Influenz Elektronen auf benachbarten leitenden Segmenten.</li><li><b>Trennen und sammeln:</b> Bürsten verbinden kurzzeitig Segmente. Durch die Drehung werden getrennte Ladungen weitertransportiert und über die Sammelkämme auf die Anschlüsse übertragen. Viele solche Vorgänge verstärken die Trennung.</li><li><b>Energie übertragen:</b> Du führst beim Kurbeln mechanisch Energie zu. Dadurch wächst die im elektrischen Feld gespeicherte Energie und zwischen den Kugeln entsteht eine Spannung.</li></ol>
    <aside className="ef-memory"><b>Positiv heißt Elektronenmangel.</b><p>Es entstehen keine zusätzlichen Protonen. Die positiven Atomrümpfe bleiben im Metall. In den beiden Bilanzbildern stehen die wenigen Zeichen stellvertretend für viele Teilchen; sie zeigen eine Zählbilanz, keine räumliche Verteilung. Die überschüssige Nettoladung liegt im elektrostatischen Gleichgewicht auf den Leiteroberflächen.</p></aside>
    <details className="ef-real"><summary>Kontrollfrage: Warum bleiben beide Kugeln zusammen neutral?</summary><div><p>Die eine Kugel verliert genau so viele Elektronen, wie die andere im Bilanzmodell gewinnt. Der Elektronenmangel ergibt eine positive, der gleich große Überschuss eine negative Nettoladung. Ihre Summe bleibt null. Die mechanisch zugeführte Energie verändert diese Ladungsbilanz nicht.</p></div></details>
    <p className="ef-model">Funktionsprinzip zum Nachlesen: <a href="https://www.coe.ufrj.br/~acmq/whyhow.html" target="_blank" rel="noreferrer">A. C. M. de Queiroz (UFRJ) · Wimshurst-Maschine</a>.</p>
  </div>;
}
