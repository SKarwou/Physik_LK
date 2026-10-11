import {PlotGrid} from '../components/PlotGrid';
import { MathText } from './Math';
import { NotebookData } from './NotebookData';
import { useEffect, useState } from 'react';
import { Arrow, Choices, Formula, RevealChart, Slider, ZoomScene } from './LabUI';
import { MathFormula } from './Math';
import { rcArea, rcNumber as n, rcState, type RCMode, type RCParameters } from './RCModel';

const modeName = (mode: RCMode) => mode === 'charge' ? 'Aufladen' : mode === 'discharge' ? 'Entladen' : 'Offen';

function RCCircuit({ parameters: p, time }: { parameters: RCParameters; time: number }) {
  const v = rcState(time, p), level = Math.max(0, Math.min(1, v.voltage / p.sourceVoltage));
  const count = Math.round(level * 10);
  return <ZoomScene><svg className="ef-scene rc-circuit" viewBox="0 0 760 390" role="img" aria-label={'RC-Schaltung: ' + modeName(p.mode) + '; Amperemeter in Reihe, Voltmeter parallel zum Kondensator.'}>
    <g fill="none" stroke="#365445" strokeWidth="3" strokeLinejoin="round">
      <path d="M80 100H225 M80 100V201 M80 218V325H610 M280 145H355 M445 145H489 M541 145H610V207 M610 227V325 M225 220V325 M610 177H705V207 M705 259V295H610" />
      <rect x="355" y="131" width="90" height="28" rx="2" fill="#e7eddb" />
      <path d="M56 201H104 M66 218H94 M584 207H636 M584 227H636" />
      <circle cx="515" cy="145" r="26" fill="#fffefa" /><circle cx="705" cy="233" r="26" fill="#fffefa" />
      <path d={p.mode === 'charge' ? 'M280 145L231 103' : p.mode === 'discharge' ? 'M280 145L231 217' : 'M280 145L235 145'} stroke="#416839" strokeWidth="5" />
    </g>
    <g fill="#365445"><circle cx="225" cy="100" r="5" /><circle cx="225" cy="220" r="5" /><circle cx="280" cy="145" r="5" /><circle cx="610" cy="177" r="4" /><circle cx="610" cy="295" r="4" /></g>
    <g fill="#264936" fontSize="20"><text x="225" y="76" textAnchor="middle">A · Quelle</text><text x="225" y="250" textAnchor="middle">E · Entladen</text><text x="285" y="124">S</text><text x="400" y="118" textAnchor="middle">R</text><text x="515" y="152" textAnchor="middle">A</text><text x="705" y="240" textAnchor="middle">V</text><text x="73" y="180">+</text><text x="73" y="250">−</text><text x="25" y="287">U₀</text><text x="651" y="219">C</text></g>
    <Arrow x={470} y={85} dx={90} dy={0} color="#929e93" label="I &gt; 0" />
    {Math.abs(v.current) > p.sourceVoltage / p.resistance * .001 && <Arrow x={v.current > 0 ? 365 : 445} y={184} dx={(v.current > 0 ? 1 : -1) * (18 + 60 * Math.abs(v.current) * p.resistance / p.sourceVoltage)} dy={0} color="#bb6545" />}
    <g fontSize="14" textAnchor="middle">{Array.from({ length: count }, (_, i) => <g key={i}><text x={589 + i % 5 * 11} y={204 - Math.floor(i / 5) * 13} fill="#b4455e">+</text><text x={589 + i % 5 * 11} y={245 + Math.floor(i / 5) * 13} fill="#356296">−</text></g>)}</g>
    <text x="378" y="360" textAnchor="middle" fontSize="17" fill="#526858">{p.mode === 'hold' ? 'Offener Schalter: kein geschlossener Weg für den Strom.' : p.mode === 'charge' ? 'A: Quelle, R und C bilden einen geschlossenen Stromkreis.' : 'E: Nur R und C bilden den Stromkreis. Die Quelle ist abgetrennt.'}</text>
  </svg></ZoomScene>;
}

export default function RCExperiment() {
  const [r, setR] = useState(1000), [c, setC] = useState(10), [u, setU] = useState(20);
  const [mode, setMode] = useState<RCMode>('charge'), [initial, setInitial] = useState(0);
  const [time, setTime] = useState(0), [running, setRunning] = useState(false), [speed, setSpeed] = useState('model');
  const [graph, setGraph] = useState('voltage'), [notice, setNotice] = useState('');
  const [analysis, setAnalysis] = useState(false);
  const p: RCParameters = { resistance: r * 1000, capacitance: c * 1e-6, sourceVoltage: u, initialVoltage: initial, mode };
  const values = rcState(time, p), end = 5 * values.tau, rate = speed === 'real' ? 1 : end / 12;
  useEffect(() => {
    if (!running || mode === 'hold') return;
    let previous = performance.now();
    const interval = window.setInterval(() => {
      const now = performance.now(), dt = (now - previous) * rate / 1000; previous = now;
      setTime(t => Math.min(end, t + dt));
    }, 60);
    return () => window.clearInterval(interval);
  }, [running, mode, end, rate]);
  useEffect(() => { if (time >= end) setRunning(false); }, [time, end]);
  function reset(nextMode: RCMode, voltage: number, message: string) {
    setRunning(false); setMode(nextMode); setInitial(voltage); setTime(0); setNotice(message);
  }
  function switchTo(next: RCMode) {
    if (next === mode) return;
    reset(next, values.voltage, 'Umgeschaltet: Die Kondensatorspannung bleibt stetig. Die Zeit der neuen Phase beginnt bei null; notiere den neuen Anfangswert im Heft.');
  }
  function change(component: 'r' | 'c' | 'u', value: number) {
    if (component === 'r') setR(value); if (component === 'c') setC(value); if (component === 'u') setU(value);
    reset(mode, mode === 'discharge' ? (component === 'u' ? value : u) : 0, 'Neue Bauteilwerte: neuer Standardversuch. Beginne im Heft eine eigene Reihe mit diesen Einstellungen.');
  }
  function preset(resistance: number, capacitance: number, voltage: number) {
    setR(resistance); setC(capacitance); setU(voltage);
    reset('charge', 0, 'Versuch vorbereitet: leerer Kondensator, Aufladen, Zeit null.');
  }
  const source = { parameters: p, rows: [0,.5,1,1.5,2,2.5,3,4,5].map(factor => {
    const time = factor * values.tau, state = rcState(time,p);
    return { time, voltage:state.voltage, current:state.current, charge:state.charge };
  }) };
  const tau = source.parameters.resistance * source.parameters.capacitance;
  const iMax = Math.max(source.parameters.sourceVoltage, source.parameters.initialVoltage) / source.parameters.resistance * 1000;
  const yLabel = graph === 'voltage' ? 'U_C in V' : graph === 'charge' ? 'Q in µC' : graph === 'magnitude' ? '|I| in mA' : 'I in mA';
  const maximum = graph === 'voltage' ? source.parameters.sourceVoltage : graph === 'charge' ? source.parameters.sourceVoltage * source.parameters.capacitance * 1e6 : iMax;
  const dots = source.rows.map(row => ({ x: row.time, y: graph === 'voltage' ? row.voltage : graph === 'charge' ? row.charge * 1e6 : graph === 'magnitude' ? Math.abs(row.current) * 1000 : row.current * 1000 }));
  return <div className="ef-lab rc-experiment" id="rc-experiment">
    <header><span className="ef-eyebrow">VIRTUELLES EXPERIMENT · FÜR ALLE SECHS LERNBLÖCKE</span><h4>Ein Kondensator lädt sich auf – und entlädt sich wieder.</h4></header>
    <p>Aufbau: Gleichspannungsquelle, Umschalter S, Widerstand R und Kondensator C. Das Amperemeter A liegt <b>in Reihe</b>; das Voltmeter V liegt <b>parallel</b> zum Kondensator. Der graue Pfeil legt die positive technische Stromrichtung fest. Der orange Pfeil zeigt Richtung und relative Stärke des tatsächlichen Stroms.</p><p><b>Hast du die Bedienhilfe gelesen?</b> Lies zunächst die Werte mithilfe der direkten Zeiteingabe ab und notiere sie im Heft. Die Schritte stehen in der <a href="#rc-measurement-guide">Bedienhilfe in Lernblock 1</a>; für den nächsten Arbeitsauftrag nutzt du die Rücksprunglinks am Ende des Experiments.</p>
    <RCCircuit parameters={p} time={time} />
    <aside className="ef-task"><b>Forschungsauftrag vor dem Start</b><p>Sage voraus: Wie verändern sich Kondensatorspannung und Stromstärke nach dem Umschalten? Notiere eine Vermutung, notiere abgelesene Werte im Heft und zeichne sie dort zunächst selbst. Die Auswertung im Lerntext folgt danach.</p></aside>
    <h4>1 · Bauteile einstellen und den Anfangszustand wählen</h4>
    <div className="ef-toolbar rc-presets"><button onClick={() => preset(1000, 10, 20)}><MathText>{String.raw`Grundversuch · $1\,\mathrm{M\Omega}$, $10\,\mathrm{\mu F}$, $20\,\mathrm{V}$`}</MathText></button><button onClick={() => preset(10, 4, 10)}><MathText>{String.raw`Vergleich · $10\,\mathrm{k\Omega}$, $4\,\mathrm{\mu F}$, $10\,\mathrm{V}$`}</MathText></button><button onClick={() => preset(100, 47, 12)}><MathText>{String.raw`Übung · $100\,\mathrm{k\Omega}$, $47\,\mathrm{\mu F}$, $12\,\mathrm{V}$`}</MathText></button></div>
    <div className="rc-controls"><Slider label="Widerstand R" value={r} set={v => change('r', v)} min={.1} max={1000} step={.1} unit="kΩ" /><Slider label="Kapazität C" value={c} set={v => change('c', v)} min={1} max={1000} unit="µF" /><Slider label="Quellenspannung U₀" value={u} set={v => change('u', v)} min={2} max={24} unit="V" /></div>
    <p className="ef-model">Veränderte Bauteilwerte beginnen einen neuen Standardversuch. Notiere Vergleichswerte vorher im Heft.</p>
    <div className="ef-toolbar"><button onClick={() => reset('charge', 0, String.raw`Aufladen vorbereitet: $U_C(0) = 0$. Notiere den Anfangswert im Heft.`)}>Aufladen vorbereiten · leer</button><button onClick={() => reset('discharge', u, String.raw`Entladen vorbereitet: $U_C(0) = U_0$. Notiere den Anfangswert im Heft.`)}>Entladen vorbereiten · geladen</button></div>
    <Choices label="Schalterstellung · Umschalten erhält die momentane Kondensatorspannung" value={mode} set={switchTo} options={[{ value: 'charge', label: 'A · Aufladen' }, { value: 'discharge', label: 'E · Entladen' }, { value: 'hold', label: 'Offen · Halten' }]} />
    <h4>2 · Zeit verändern und beobachten</h4>
    <div className="ef-toolbar"><button disabled={mode === 'hold' || time >= end} aria-pressed={running} onClick={() => setRunning(!running)}>{running ? 'Zeit anhalten' : 'Zeit laufen lassen'}</button><button onClick={() => { setRunning(false); setTime(0); }}>Zum Phasenbeginn</button><label>Abspieltempo <select value={speed} onChange={e => setSpeed(e.target.value)}><option value="model">5 Zeitkonstanten in 12 s ansehen</option><option value="real">Echte Sekunden</option></select></label></div>
    <p className="ef-model">Die Messuhr zeigt immer die physikalische Zeit. Das Abspieltempo verändert nur die Wiedergabegeschwindigkeit. Du kannst die Zeit auch direkt eingeben und dabei ohne Zeitdruck messen.</p>
    <label className="rc-time">Modellzeit <MathFormula tex="t" /> in s <input type="number" aria-label="RC-Modellzeit in Sekunden" min={0} max={end} step="any" value={Number(time.toPrecision(6))} onChange={e => { const next = Number(e.target.value); if (Number.isFinite(next)) { setRunning(false); setTime(Math.min(end, Math.max(0, next))); } }} /></label>
    <input className="rc-time-range" type="range" aria-label="RC-Zeit verschieben" value={time} min={0} max={end} step={end / 1000} onChange={e => { setRunning(false); setTime(Number(e.target.value)); }} />
    <div className="ef-readings"><div><small>Messzeit t</small><strong>{n(time)} s</strong></div><div><small>Kondensatorspannung</small><strong>{n(values.voltage)} V</strong></div><div><small>Stromstärke mit Vorzeichen</small><strong>{n(values.current * 1000)}<MathText>{String.raw` $\mathrm{mA}$`}</MathText></strong></div><div><small>Stromstärkebetrag</small><strong>{n(Math.abs(values.current) * 1000)}<MathText>{String.raw` $\mathrm{mA}$`}</MathText></strong></div></div>
    <p>Plus und Minus auf den Platten zeigen Ladungsüberschuss bzw. Elektronenmangel, keine wandernden positiven Atomrümpfe. <b>Durch den isolierenden Zwischenraum fließen keine Elektronen.</b> Die Zeichen werden schematisch gezählt; die Spannung ist maßgeblich, auch wenn kleine Restladungen im Bild nicht sichtbar sind. Hier laufen keine Elektronen im Kreis.</p>
    <details className="rc-solution"><summary>Zusätzliche Größen für die spätere Auswertung</summary><label><input type="checkbox" checked={analysis} onChange={e => setAnalysis(e.target.checked)} /> Ladung auch in der Diagrammauswahl anzeigen</label><div className="ef-readings"><div><small>Ladung Q der oberen Platte</small><strong>{n(values.charge * 1e6)}<MathText>{String.raw` $\mathrm{\mu C}$`}</MathText></strong></div><div><small><MathText>{String.raw`Widerstandsspannung $U_{R}$`}</MathText></small><strong>{n(values.resistorVoltage)} V</strong></div><div><small><MathText>{String.raw`Zeitkonstante $\tau$`}</MathText></small><strong>{n(values.tau)} s</strong></div></div><p><MathText>{String.raw`Diese Größen werden aus den Bauteilwerten und der idealen RC-Gleichung berechnet. Ein reales Voltmeter misst die Kondensatorspannung; Q bestimmen wir daraus mithilfe der bekannten Kapazität.`}</MathText></p></details>
    <h4>3 · Im Heft protokollieren und auswerten</h4>
    <p className="rc-status" role="status"><MathText>{notice || String.raw`Beginne bei $t=0$ und notiere die Anzeigen direkt im Heft.`}</MathText></p>
    <p>Lege für jede Einstellung eine eigene Heftseite mit Schaltskizze, Bauteilwerten und Anfangsspannung an. Wähle die im Lernauftrag genannten Zeiten, lies Spannung und Stromstärke ab und notiere sie direkt auf Papier. Gehe erst danach zur Vergleichslösung.</p>
    <NotebookData description={String.raw`Berechnete Ersatzwerte für die gerade gewählten Einstellungen: $R=${n(r)}\,\mathrm{k\Omega}$, $C=${n(c)}\,\mathrm{\mu F}$, $U_0=${n(u)}\,\mathrm V$, Anfangsspannung $U_i=${n(initial)}\,\mathrm V$. Vorgang: ${modeName(mode)}. Die Tabelle ist vollständig ausgefüllt; sie dient als Alternative zur eigenen Heftmessung.`} headers={[String.raw`Zeit $t$ in $\mathrm s$`,String.raw`Kondensatorspannung $U_C$ in $\mathrm V$`,String.raw`Stromstärke $I$ in $\mathrm{mA}$`,String.raw`Plattenladung $Q$ in $\mathrm{\mu C}$`]} rows={source.rows.map(row => [row.time,row.voltage,row.current*1000,row.charge*1e6])} tasks={['Zeichne Spannung und Stromstärke getrennt gegen die Zeit in dein Heft. Verwende die gleiche Zeitskala.', 'Beschreibe Anfangswert, Richtung der Änderung und Grenzwert. Vergleiche gleiche Zeitabschnitte: Ist die Differenz oder der verbleibende Anteil ungefähr konstant?', String.raw`Prüfe die Zeitkonstante $\tau=RC$. Begründe das Vorzeichen des Stroms mit dem festen Bezugspfeil.`]} solution={String.raw`Für die aktuellen Bauteile ist $\tau=${n(values.tau)}\,\mathrm s$. Allgemein gilt $U_C(t)=U_0+(U_i-U_0)\mathrm e^{-t/\tau}$ beim Laden, $U_C(t)=U_i\mathrm e^{-t/\tau}$ beim Entladen. Mit $I=(U_0-U_C)/R$ beim Laden bzw. $I=-U_C/R$ beim Entladen ergeben sich Betrag und Vorzeichen. Bei offenem Schalter bleiben im Idealmodell Spannung und Ladung konstant; der Strom ist null.`} />
    <h4>4 · Erst selbst zeichnen, dann vergleichen</h4>
    <Choices label="Diagrammgröße" value={graph} set={setGraph} options={[{ value: 'voltage', label: String.raw`Kondensatorspannung $U_C$` }, { value: 'current', label: 'Stromstärke I mit Vorzeichen' }, { value: 'magnitude', label: 'Stromstärkebetrag |I|' }, ...(analysis ? [{ value: 'charge', label: 'Ladung Q' }] : [])]} />
    <RevealChart xMax={5 * tau} yMax={maximum} yMin={graph === 'current' ? -iMax : 0} ySteps={graph === 'current' ? 8 : 5} xLabel="t in s" yLabel={yLabel} dots={dots} />
    <p className="ef-model"><MathText>{String.raw`Das Vergleichsdiagramm zeigt die ausgefüllten Ersatzdaten für die aktuellen Einstellungen. Es gibt keine Verbindungslinien. Das Vorzeichen im $I - t$-Diagramm bezieht sich auf den festen grauen Pfeil in der Schaltung.`}</MathText></p>
    <details className="rc-solution"><summary>Was das Modell annimmt</summary><p><MathText>{String.raw`R und C sind konstant, die Quelle liefert eine konstante Spannung, Messgeräte belasten den Stromkreis nicht, Leitungen besitzen keinen zusätzlichen Widerstand und der Kondensator hat keine Leckströme. Aufladen beginnt im Standardversuch bei null, Entladen bei $U_{0}$. Beim direkten Umschalten wird dagegen die tatsächlich erreichte Kondensatorspannung übernommen. Ein ideal abgetrennter Kondensator behält seine Ladung.`}</MathText></p></details>
    <nav className="rc-experiment-return" aria-label="Vom Experiment zurück zum Lernauftrag"><span>Zurück zu deinem Lernblock:</span>{[1, 2, 3, 4, 5, 6].map(i => <a key={i} href={'#rc-block-' + i}>{i}</a>)}</nav>
  </div>;
}

export function RCIntegrationLab() {
  const [intervals, setIntervals] = useState('8'), [method, setMethod] = useState<'left' | 'right' | 'trapezoid'>('trapezoid');
  const [show, setShow] = useState(false);
  const p: RCParameters = { resistance: 1000000, capacitance: 10e-6, sourceVoltage: 20, initialVoltage: 20, mode: 'discharge' };
  const end = 20, area = rcArea(p, end, Number(intervals), method), bottom = 250;
  function pickIntervals(value: string) { setIntervals(value); setShow(false); }
  function pickMethod(value: 'left' | 'right' | 'trapezoid') { setMethod(value); setShow(false); }
  return <div className="ef-lab rc-area-lab">
    <h4><MathText>{String.raw`Flächenwerkstatt · Wie viel Ladung ist bis $20\,\mathrm{s}$ abgeflossen?`}</MathText></h4>
    <p><MathText>{String.raw`Grundversuch: $20\,\mathrm{V}$, $1\,\mathrm{M\Omega}$, $10\,\mathrm{\mu F}$; der Kondensator entlädt sich. Nutze den `}</MathText><b>positiven Stromstärkebetrag</b><MathText>{String.raw`. Die Fläche von 0 bis $20\,\mathrm{s}$ beschreibt die bereits abgeflossene Ladung, nicht die verbleibende Ladung.`}</MathText></p>
    <Choices label="Anzahl gleich breiter Zeitabschnitte" value={intervals} set={pickIntervals} options={['4', '8', '16', '32'].map(value => ({ value, label: value }))} />
    <Choices label="Näherungsverfahren" value={method} set={pickMethod} options={[{ value: 'left', label: 'Linke Rechtecke' }, { value: 'right', label: 'Rechte Rechtecke' }, { value: 'trapezoid', label: 'Trapeze' }]} />
    <p>Übertrage die Randwerte der Tabelle. Rechne die Flächen zuerst im Heft aus. Mit linken Rechtecken wird bei fallendem Strom überschätzt, mit rechten unterschätzt; Trapeze mitteln beide Höhen.</p>
    <div className="ef-table-wrap"><table><caption><MathText>{String.raw`Ideale Randwerte · $\Delta t = ${n(area.width)}\,\mathrm s$`}</MathText></caption><thead><tr><th><MathText>{String.raw`Zeit $t$ in $\mathrm s$`}</MathText></th><th><MathText>{String.raw`Stromstärkebetrag $|I|$ in $\mathrm{mA}$`}</MathText></th></tr></thead><tbody>{Array.from({ length: Number(intervals) + 1 }, (_, i) => <tr key={i}><td>{n(i * area.width)}</td><td>{n(Math.abs(rcState(i * area.width, p).current) * 1000)}</td></tr>)}</tbody></table></div>
    <div className="ef-toolbar"><button aria-expanded={show} onClick={() => setShow(!show)}>{show ? 'Flächenvergleich ausblenden' : 'Flächenvergleich einblenden'}</button></div>
    <svg className="ef-chart rc-area-chart" viewBox="0 0 720 330" role="img" aria-label={show ? 'Flächennäherung mit Stromwerten und Zeitabschnitten' : 'Leeres Raster für die eigene Flächennäherung'}>
      <PlotGrid left={80} top={40} width={560} height={210} gridSize={28}/>
      <foreignObject x="80" y="0" width="590" height="36"><div style={{fontSize:16}}><MathText>{String.raw`Stromstärkebetrag $|I|$ in $\mathrm{mA}$`}</MathText></div></foreignObject><foreignObject x="390" y="289" width="280" height="40"><div style={{fontSize:16,textAlign:"right"}}><MathText>{String.raw`Zeit $t$ in $\mathrm s$`}</MathText></div></foreignObject>
      {[0, 5, 10, 15, 20].map(t => <text key={t} x={80 + t * 28} y="277" textAnchor="middle">{t}</text>)}
      {[0, .005, .01, .015, .02].map(v => <text key={v} x="68" y={bottom - v / .02 * 210 + 5} textAnchor="end">{n(v)}</text>)}
      {show && area.bars.map((b, i) => {
        const x = 80 + b.time * 28, width = area.width * 28, leftY = bottom - (method === 'trapezoid' ? b.left : b.height) / .00002 * 210, rightY = bottom - (method === 'trapezoid' ? b.right : b.height) / .00002 * 210;
        return <path key={i} className="rc-area-piece" d={'M' + x + ' ' + bottom + 'V' + leftY + 'L' + (x + width) + ' ' + rightY + 'V' + bottom + 'Z'} fill="#cbe0b4" stroke="#54714d" />;
      })}
    </svg>
    {show && <div className="rc-area-result"><p>Näherung: <b>{n(area.estimate * 1e6)}<MathText>{String.raw` $\mathrm{\mu C}$`}</MathText></b><MathText>{String.raw`. Anfangsladung: $200\,\mathrm{\mu C}$. Verbleibende Ladung nach dieser Näherung: `}</MathText><b>{n((200e-6 - area.estimate) * 1e6)}<MathText>{String.raw` $\mathrm{\mu C}$`}</MathText></b>.</p>{area.estimate > 200e-6 && <p className="rc-notation"><b>Diese grobe Näherung ist für die Restladung zu ungenau.</b> Sie liefert mehr abgeflossene Ladung, als anfangs vorhanden war. Der rechnerisch negative Rest ist hier kein möglicher Ladungszustand: Die linken Rechtecke sind zu groß. Erhöhe die Anzahl der Zeitabschnitte oder verwende Trapeze.</p>}<details className="rc-solution"><summary>Exakter Vergleich und Erklärung</summary><Formula tex="Q_{\mathrm{ab}}(T)=Q_0\cdot\left(1-\mathrm e^{-\frac{T}{R\cdot C}}\right)" /><p><MathText>{String.raw`Bis $20\,\mathrm{s}$ fließen `}</MathText>{n(area.exact * 1e6)}<MathText>{String.raw` $\mathrm{\mu C}$ ab; auf der oberen Platte bleiben `}</MathText>{n(200 - area.exact * 1e6)}<MathText>{String.raw` $\mathrm{\mu C}$. Mehr Zeitabschnitte verbessern die Näherung. Die Trapezregel überschätzt die Fläche bei dieser nach oben gekrümmten Exponentialfunktion leicht.`}</MathText></p></details></div>}
  </div>;
}
