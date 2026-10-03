import { useState } from 'react';
import { Check, Choices, Formula, RevealChart, Slider, Task, ZoomScene, downloadCsv, fmt } from './LabUI';
import { MathFormula } from './Math';

type CircuitKind = 'single' | 'series' | 'parallel';
export function circuitValues(u: number, r1: number, r2: number, mode: CircuitKind) {
  const resistance = mode === 'single' ? r1 : mode === 'series' ? r1 + r2 : 1 / (1 / r1 + 1 / r2);
  return { resistance, current: u / resistance, power: u * u / resistance };
}
function Resistor({ x, y, label }: { x: number; y: number; label: string }) {
  return <g><rect x={x - 12} y={y - 30} width="24" height="60" fill="#fffefa" stroke="#244c3c" strokeWidth="3" /><text x={x + 21} y={y + 6} fill="#244c3c">{label}</text></g>;
}
export function CircuitLab() {
  const [u, setU] = useState(6), [r1, setR1] = useState(100), [r2, setR2] = useState(100);
  const [mode, setMode] = useState<CircuitKind>('single'), [closed, setClosed] = useState(false);
  const [meter, setMeter] = useState('ampere'), [placement, setPlacement] = useState('series');
  const [flow, setFlow] = useState('technical');
  const [rows, setRows] = useState<{ u: number; r1: number; r2: number; mode: CircuitKind; i: number }[]>([]);
  const correct = meter === 'ampere' ? placement === 'series' : placement === 'parallel';
  const values = circuitValues(u, r1, r2, mode);
  const current = closed && correct ? values.current : 0;
  const reading = !correct ? '—' : meter === 'ampere' ? `${fmt(current * 1000, 1)} mA` : `${fmt(closed ? u : 0, 1)} V`;
  const matches = rows.filter(row => row.mode === mode && row.r1 === r1 && (mode === 'single' || row.r2 === r2));
  return <div className="ef-lab ef-circuit-lab">
    <Task><ol><li>Schließe den Schalter. Miss die Stromstärke mit dem Amperemeter in Reihe.</li><li>Stelle bei festem Widerstand 2, 4, 6, 8 und 10 V ein. Nimm Messwerte auf und zeichne selbst ein Stromstärke-Spannung-Diagramm.</li><li>Miss anschließend die Spannung am gesamten Verbraucherbereich. Wo musst du das Voltmeter anschließen?</li><li>Vergleiche einen Widerstand mit zwei gleichen Widerständen in Reihe und parallel.</li></ol></Task>
    <div className="ef-lab-grid"><div>
      <Choices label="Verbraucher im Stromkreis" value={mode} set={setMode} options={[{ value: 'single', label: 'Ein Widerstand' }, { value: 'series', label: 'Reihenschaltung' }, { value: 'parallel', label: 'Parallelschaltung' }]} />
      <Slider label="Spannung der Quelle" value={u} set={setU} min={0} max={12} unit="V" />
      <Slider label="Widerstand R₁" value={r1} set={setR1} min={50} max={300} step={10} unit="Ω" />
      {mode !== 'single' && <Slider label="Widerstand R₂" value={r2} set={setR2} min={50} max={300} step={10} unit="Ω" />}
      <Choices label="Messgerät wählen" value={meter} set={setMeter} options={[{ value: 'ampere', label: 'Amperemeter (A)' }, { value: 'voltage', label: 'Voltmeter (V)' }]} />
      <Choices label="Messgerät anschließen" value={placement} set={setPlacement} options={[{ value: 'series', label: 'In Reihe' }, { value: 'parallel', label: 'Parallel zum Verbraucherbereich' }]} />
      <div className="ef-toolbar"><button type="button" aria-pressed={closed} onClick={() => setClosed(!closed)}>{closed ? 'Schalter öffnen' : 'Schalter schließen'}</button></div>
    </div><div>
      <ZoomScene><svg className="ef-scene ef-circuit-scene" viewBox="0 0 750 400" role="img" aria-label={`${closed ? 'Geschlossener' : 'Offener'} Stromkreis; ${meter === 'ampere' ? 'Amperemeter' : 'Voltmeter'} ${placement === 'series' ? 'in Reihe' : 'parallel zum Verbraucherbereich'}`}>
        <g fill="none" stroke="#244c3c" strokeWidth="3"><path d="M85 176V80H205 M260 80H325 M375 80H550V110 M550 290V330H85V196" /><path d={closed ? 'M205 80H260' : 'M205 80L252 48'} /><path d="M65 177H105 M74 196H96" strokeWidth="4" />
          {placement === 'series' ? <circle cx="350" cy="80" r="25" fill="#fffefa" /> : <path d="M325 80H375" />}
          {mode === 'single' ? <path d="M550 110V290" /> : mode === 'series' ? <path d="M550 110V290" /> : <path d="M490 200V110H610V290H490V200 M550 110H490 M550 290H490" />}
          {placement === 'parallel' && <><path d="M550 110H686V175 M686 225V290H550" /><circle cx="686" cy="200" r="25" fill="#fffefa" /></>}
        </g>
        <circle cx="205" cy="80" r="4" fill="#fffefa" stroke="#244c3c" strokeWidth="2" /><circle cx="260" cy="80" r="4" fill="#fffefa" stroke="#244c3c" strokeWidth="2" /><text x="48" y="167">+</text><text x="49" y="219">−</text><text x="27" y="263">{u} V</text>
        {placement === 'series' ? <text x="350" y="87" textAnchor="middle">{meter === 'ampere' ? 'A' : 'V'}</text> : <text x="686" y="207" textAnchor="middle">{meter === 'ampere' ? 'A' : 'V'}</text>}
        {mode === 'single' ? <Resistor x={550} y={200} label="R₁" /> : mode === 'series' ? <><Resistor x={550} y={145} label="R₁" /><Resistor x={550} y={255} label="R₂" /></> : <><Resistor x={490} y={200} label="R₁" /><Resistor x={610} y={200} label="R₂" /></>}
        {current > 0 && <g className="ef-circuit-flow" fill="none" stroke={flow === 'technical' ? '#b27822' : '#4c69b1'} strokeWidth="6" strokeDasharray="1 25" strokeLinecap="round" style={{ animationDirection: flow === 'technical' ? 'normal' : 'reverse', animationDuration: `${Math.max(.7, 3 - current * 10)}s` }}><path d="M110 80H185 M275 80H315 M390 80H470 M470 330H130" /></g>}
        <text x="350" y="35" textAnchor="middle">{placement === 'series' ? 'Messgerät im Stromweg' : 'Messgerät zwischen zwei Knoten'}</text>
        <text x="375" y="382" textAnchor="middle">{!correct ? 'Anschluss prüfen – siehe Hinweis unter dem Schaltbild' : closed ? 'Geschlossener Stromkreis' : 'Offener Schalter: kein dauerhafter Strom'}</text>
      </svg></ZoomScene>
      <Choices label="Bewegung im Draht darstellen" value={flow} set={setFlow} options={[{ value: 'technical', label: 'Technische Stromrichtung' }, { value: 'electrons', label: 'Elektronenbewegung' }]} />
      <p className={`ef-connection-feedback ${correct ? 'is-correct' : ''}`} role="status">{correct ? meter === 'ampere' ? 'Richtig: Durch das Amperemeter fließt der gesamte Strom. Sein Innenwiderstand soll sehr klein sein.' : 'Richtig: Das Voltmeter liegt parallel zum gesamten Verbraucherbereich. Es vergleicht zwei Potentiale und hat einen sehr großen Innenwiderstand.' : meter === 'ampere' ? 'Ein Amperemeter parallel zum Verbraucher würde diesen nahezu kurzschließen. Schließe es in Reihe an. Bei diesem Fehlanschluss ist die Simulation angehalten.' : 'Ein Voltmeter in Reihe unterbricht den Stromkreis im idealen Modell. Schließe es parallel zum Verbraucherbereich an.'}</p>
    </div></div>
    <div className="ef-readings"><div><small>Anzeige des Messgeräts</small><strong data-reading="meter">{reading}</strong></div><div><small>Schalter</small><strong>{closed ? 'geschlossen' : 'offen'}</strong></div></div>
    <p className="ef-model">Idealmodell: konstante ohmsche Widerstände, ideale Quelle und Messgeräte. Das Voltmeter misst über den gesamten Verbraucherbereich. Bei offenem Schalter liegt dort in dieser Schaltung keine Spannung an; an der Quelle bleibt die eingestellte Spannung bestehen. Die Bewegungspunkte sind stark verlangsamt: Im äußeren Stromkreis zeigt die technische Stromrichtung von + nach −, die Elektronendrift in Metalldrähten entgegengesetzt. Ladung wird im Widerstand nicht verbraucht; elektrische Energie wird übertragen.</p>
    <div className="ef-toolbar"><button type="button" disabled={!closed || !correct || meter !== 'ampere' || rows.length >= 20} onClick={() => setRows(previous => [...previous, { u, r1, r2, mode, i: current * 1000 }])}>Strommesswert aufnehmen ({rows.length}/20)</button><button type="button" disabled={!rows.length} onClick={() => downloadCsv('grundlagen-stromkreis.csv', [['U in V', 'I in mA', 'R1 in Ohm', 'R2 in Ohm', 'Schaltung'], ...rows.map(row => [row.u, row.i, row.r1, row.mode === 'single' ? '—' : row.r2, row.mode])])}>Messwerte als CSV</button><button type="button" disabled={!rows.length} onClick={() => setRows([])}>Messreihe löschen</button></div>
    <div className="ef-table-wrap"><table><caption>Deine Strommessung · ideale Modellwerte</caption><thead><tr><th>U in V</th><th>I in mA</th><th>R₁ in Ω</th><th>R₂ in Ω</th><th>Schaltung</th></tr></thead><tbody>{rows.length ? rows.map((row, i) => <tr key={i}><td>{row.u}</td><td>{fmt(row.i, 1)}</td><td>{row.r1}</td><td>{row.mode === 'single' ? '—' : row.r2}</td><td>{row.mode === 'single' ? 'Ein Widerstand' : row.mode === 'series' ? 'Reihe' : 'Parallel'}</td></tr>) : <tr><td colSpan={5}>Noch keine Messwerte. Schließe den Schalter und miss mit dem Amperemeter in Reihe.</td></tr>}</tbody></table></div>
    <RevealChart xMax={12} yMax={12 / values.resistance * 1000} xLabel="U in V" yLabel="I in mA" dots={matches.map(row => ({ x: row.u, y: row.i }))} />
    <p className="ef-model">Zum Einzeichnen: {matches.length} Messpunkte für die aktuell gewählte Schaltung und die aktuellen Widerstände. Die anderen Messungen bleiben in der Tabelle.</p>
    <details className="ef-real"><summary>Auswertung und Formeln einblenden</summary><div><Formula tex={[String.raw`R=\frac{U}{I}\quad\Rightarrow\quad I=\frac{U}{R}`, String.raw`R_{\mathrm{Reihe}}=R_1+R_2`, String.raw`\frac{1}{R_{\mathrm{parallel}}}=\frac{1}{R_1}+\frac{1}{R_2}`]} /><p>Bei konstantem Widerstand ist die Stromstärke proportional zur Spannung. Zwei gleiche Widerstände in Reihe halbieren den Gesamtstrom bei gleicher Quellenspannung. Parallel verdoppeln sie ihn gegenüber einem einzelnen Widerstand. In der Reihenschaltung ist die Stromstärke überall gleich; in der Parallelschaltung liegt an beiden Zweigen dieselbe Spannung an.</p></div></details>
  </div>;
}
export default function BasicsLab() {
  return <>
    <div className="ef-concept-grid"><div><span>LADUNG</span><h3>Plus, Minus, neutral</h3><p>Protonen tragen positive, Elektronen negative Ladung. Ein neutraler Körper enthält gleich große positive und negative Gesamtladungen. Elektronenüberschuss bedeutet negativ, Elektronenmangel positiv.</p></div><div><span>STROM</span><h3>Ladung in Bewegung</h3><p>Elektrischer Strom ist gerichteter Ladungstransport. Die Stromstärke beschreibt, wie viel Ladung pro Zeit durch einen Leiterquerschnitt fließt. Strom „verbraucht“ sich im Verbraucher nicht.</p></div><div><span>SPANNUNG</span><h3>Energie pro Ladung</h3><p>Eine Quelle trennt Ladungen. Zwischen ihren Polen liegt eine Spannung. Sie gibt an, wie viel Energie pro Ladung übertragen werden kann. Auch bei offenem Schalter kann eine Spannung vorliegen.</p></div></div>
    <h3>Die Größen aus der Mittelstufe</h3>
    <div className="ef-table-wrap"><table><thead><tr><th>Größe</th><th>Zeichen</th><th>Einheit</th><th>Zusammenhang</th></tr></thead><tbody>
      <tr><th>Elektrische Ladung</th><td>Q, q</td><td>Coulomb (C)</td><td><MathFormula tex="Q=n\,e" />; ganzzahliges n</td></tr>
      <tr><th>Stromstärke</th><td>I</td><td>Ampere (A)</td><td><MathFormula tex="I=\frac{\Delta Q}{\Delta t}" /> bei konstantem Strom</td></tr>
      <tr><th>Spannung</th><td>U</td><td>Volt (V)</td><td><MathFormula tex="U=\frac{W}{Q}" /> für den übertragenen Energiebetrag</td></tr>
      <tr><th>Widerstand</th><td>R</td><td>Ohm (Ω)</td><td><MathFormula tex="R=\frac{U}{I}" /></td></tr>
      <tr><th>Leistung</th><td>P</td><td>Watt (W)</td><td><MathFormula tex="P=UI=\frac{W_{\mathrm{el}}}{\Delta t}" /> bei konstanten Werten</td></tr>
      <tr><th>Elektrische Energie</th><td><MathFormula tex="W_{\mathrm{el}}" /></td><td>Joule (J)</td><td><MathFormula tex="W_{\mathrm{el}}=UI\,\Delta t" /> bei konstanten Werten</td></tr>
    </tbody></table></div>
    <p>Ein Formelzeichen ist keine Einheit: <MathFormula tex="W_{\mathrm{el}}" /> bezeichnet hier eine Energie, während W hinter einer Zahl die Einheit Watt bedeutet. Für einen ohmschen Widerstand bleibt <MathFormula tex="\frac{U}{I}" /> konstant; bei einer heiß werdenden Glühlampe ist das im Allgemeinen nicht der Fall.</p>
    <h3>Experiment · Strom und Spannung richtig messen</h3><CircuitLab />
    <h3>Basics üben</h3>
    <Check question="In 5,0 s fließt eine Ladung von 2,0 C durch einen Leiterquerschnitt. Berechne I in A." answer={.4} unit="A" hint="$I=\frac{\Delta Q}{\Delta t}$." solution="$I=\frac{2{,}0\,\mathrm C}{5{,}0\,\mathrm s}=0{,}40\,\mathrm A$." />
    <Check question="An einem Widerstand von 200 Ω liegt U = 6,0 V. Berechne I in mA." answer={30} unit="mA" hint="$I=\frac{U}{R}$; 1 A = 1000 mA." solution="$I=\frac{6{,}0\,\mathrm V}{200\,\Omega}=0{,}030\,\mathrm A=30\,\mathrm{mA}$." />
    <Check question="Ein Gerät nimmt bei 12 V einen Strom von 0,50 A auf. Welche Leistung hat es?" answer={6} unit="W" hint="$P=UI$." solution="$P=12\,\mathrm V\cdot0{,}50\,\mathrm A=6{,}0\,\mathrm W$." />
    <Check question="Ein Gerät mit P = 6,0 W läuft 20 s. Welche Energie wird übertragen?" answer={120} unit="J" hint="$W_{\mathrm{el}}=P\Delta t$." solution="$W_{\mathrm{el}}=6{,}0\,\mathrm W\cdot20\,\mathrm s=120\,\mathrm J$." />
    <details className="ef-real"><summary>Begriffscheck: Warum ist ein Körper positiv geladen?</summary><div><p>In einem gewöhnlichen geladenen Festkörper bedeutet positive Nettoladung meist <b>Elektronenmangel</b>. Die positiven Atomrümpfe wandern im Metalldraht nicht mit dem Strom. Gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an.</p></div></details>
  </>;
}
