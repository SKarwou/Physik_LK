import { useEffect, useState } from 'react';
import { Arrow, Choices, Formula, RevealChart, Slider, ZoomScene, downloadCsv } from './LabUI';
import { MathFormula } from './Math';
import { rcArea, rcNumber as n, rcState, type RCMode, type RCParameters } from './RCModel';

type Measurement = { time: number; voltage: number; current: number; charge: number };
type Series = { name: string; parameters: RCParameters; rows: Measurement[] };
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
  const [rows, setRows] = useState<Measurement[]>([]), [saved, setSaved] = useState<Series[]>([]);
  const [graph, setGraph] = useState('voltage'), [active, setActive] = useState('live'), [notice, setNotice] = useState('');
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
    setRunning(false); setMode(nextMode); setInitial(voltage); setTime(0); setRows([]); setActive('live'); setNotice(message);
  }
  function switchTo(next: RCMode) {
    if (next === mode) return;
    reset(next, values.voltage, 'Umgeschaltet: Die Kondensatorspannung bleibt stetig. Die Zeit der neuen Phase beginnt bei null; die aktuelle Messreihe wurde geleert.');
  }
  function change(component: 'r' | 'c' | 'u', value: number) {
    if (component === 'r') setR(value); if (component === 'c') setC(value); if (component === 'u') setU(value);
    reset(mode, mode === 'discharge' ? (component === 'u' ? value : u) : 0, 'Neue Bauteilwerte: neuer Standardversuch, neue Messreihe. Gemerkte Messreihen bleiben erhalten.');
  }
  function preset(resistance: number, capacitance: number, voltage: number) {
    setR(resistance); setC(capacitance); setU(voltage);
    reset('charge', 0, 'Versuch vorbereitet: leerer Kondensator, Aufladen, Zeit null.');
  }
  function capture() {
    const measurement = { time, voltage: values.voltage, current: values.current, charge: values.charge };
    setRows(old => [...old.filter(row => Math.abs(row.time - time) > end * 1e-8), measurement].sort((a, b) => a.time - b.time));
    setActive('live');
    setNotice('Messwert aufgenommen. Übertrage Zeit, Spannung und Stromstärke ins Heft.');
  }
  const series = active === 'live' ? { name: 'Aktueller Versuch', parameters: p, rows } : saved[Number(active)];
  const source = series || { name: 'Aktueller Versuch', parameters: p, rows };
  const tau = source.parameters.resistance * source.parameters.capacitance;
  const iMax = Math.max(source.parameters.sourceVoltage, source.parameters.initialVoltage) / source.parameters.resistance * 1000;
  const yLabel = graph === 'voltage' ? 'U_C in V' : graph === 'charge' ? 'Q in µC' : graph === 'magnitude' ? '|I| in mA' : 'I in mA';
  const maximum = graph === 'voltage' ? source.parameters.sourceVoltage : graph === 'charge' ? source.parameters.sourceVoltage * source.parameters.capacitance * 1e6 : iMax;
  const dots = source.rows.map(row => ({ x: row.time, y: graph === 'voltage' ? row.voltage : graph === 'charge' ? row.charge * 1e6 : graph === 'magnitude' ? Math.abs(row.current) * 1000 : row.current * 1000 }));
  return <div className="ef-lab rc-experiment" id="rc-experiment">
    <header><span className="ef-eyebrow">VIRTUELLES EXPERIMENT · FÜR ALLE SECHS LERNBLÖCKE</span><h4>Ein Kondensator lädt sich auf – und entlädt sich wieder.</h4></header>
    <p>Aufbau: Gleichspannungsquelle, Umschalter S, Widerstand R und Kondensator C. Das Amperemeter A liegt <b>in Reihe</b>; das Voltmeter V liegt <b>parallel</b> zum Kondensator. Der graue Pfeil legt die positive technische Stromrichtung fest. Der orange Pfeil zeigt Richtung und relative Stärke des tatsächlichen Stroms.</p>
    <RCCircuit parameters={p} time={time} />
    <aside className="ef-task"><b>Forschungsauftrag vor dem Start</b><p>Sage voraus: Wie verändern sich Kondensatorspannung und Stromstärke nach dem Umschalten? Notiere eine Vermutung, nimm eigene Messwerte auf und zeichne sie zunächst selbst. Die Auswertung im Lerntext folgt danach.</p></aside>
    <h4>1 · Bauteile einstellen und den Anfangszustand wählen</h4>
    <div className="ef-toolbar rc-presets"><button onClick={() => preset(1000, 10, 20)}>Grundversuch · 1 MΩ, 10 µF, 20 V</button><button onClick={() => preset(10, 4, 10)}>Vergleich · 10 kΩ, 4 µF, 10 V</button><button onClick={() => preset(100, 47, 12)}>Übung · 100 kΩ, 47 µF, 12 V</button></div>
    <div className="rc-controls"><Slider label="Widerstand R" value={r} set={v => change('r', v)} min={.1} max={1000} step={.1} unit="kΩ" /><Slider label="Kapazität C" value={c} set={v => change('c', v)} min={1} max={1000} unit="µF" /><Slider label="Quellenspannung U₀" value={u} set={v => change('u', v)} min={2} max={24} unit="V" /></div>
    <p className="ef-model">Veränderte Bauteilwerte beginnen einen neuen Standardversuch. Sichere Vergleichsmessungen vorher mit „Messreihe merken“.</p>
    <div className="ef-toolbar"><button onClick={() => reset('charge', 0, 'Aufladen vorbereitet: U_C(0) = 0. Nimm den Anfangswert auf.')}>Aufladen vorbereiten · leer</button><button onClick={() => reset('discharge', u, 'Entladen vorbereitet: U_C(0) = U₀. Nimm den Anfangswert auf.')}>Entladen vorbereiten · geladen</button></div>
    <Choices label="Schalterstellung · Umschalten erhält die momentane Kondensatorspannung" value={mode} set={switchTo} options={[{ value: 'charge', label: 'A · Aufladen' }, { value: 'discharge', label: 'E · Entladen' }, { value: 'hold', label: 'Offen · Halten' }]} />
    <h4>2 · Zeit verändern und beobachten</h4>
    <div className="ef-toolbar"><button disabled={mode === 'hold' || time >= end} aria-pressed={running} onClick={() => setRunning(!running)}>{running ? 'Zeit anhalten' : 'Zeit laufen lassen'}</button><button onClick={() => { setRunning(false); setTime(0); }}>Zum Phasenbeginn</button><label>Abspieltempo <select value={speed} onChange={e => setSpeed(e.target.value)}><option value="model">5 Zeitkonstanten in 12 s ansehen</option><option value="real">Echte Sekunden</option></select></label></div>
    <p className="ef-model">Die Messuhr zeigt immer die physikalische Zeit. Das Abspieltempo verändert nur die Wiedergabegeschwindigkeit. Du kannst die Zeit auch direkt eingeben und dabei ohne Zeitdruck messen.</p>
    <label className="rc-time">Messzeit <MathFormula tex="t" /> in s <input type="number" aria-label="RC-Messzeit in Sekunden" min={0} max={end} step="any" value={Number(time.toPrecision(6))} onChange={e => { const next = Number(e.target.value); if (Number.isFinite(next)) { setRunning(false); setTime(Math.min(end, Math.max(0, next))); } }} /></label>
    <input className="rc-time-range" type="range" aria-label="RC-Zeit verschieben" value={time} min={0} max={end} step={end / 1000} onChange={e => { setRunning(false); setTime(Number(e.target.value)); }} />
    <div className="ef-readings"><div><small>Messzeit t</small><strong>{n(time)} s</strong></div><div><small>Kondensatorspannung</small><strong>{n(values.voltage)} V</strong></div><div><small>Stromstärke mit Vorzeichen</small><strong>{n(values.current * 1000)} mA</strong></div><div><small>Stromstärkebetrag</small><strong>{n(Math.abs(values.current) * 1000)} mA</strong></div></div>
    <p>Plus und Minus auf den Platten zeigen Ladungsüberschuss bzw. Elektronenmangel, keine wandernden positiven Atomrümpfe. <b>Durch den isolierenden Zwischenraum fließen keine Elektronen.</b> Die Zeichen werden schematisch gezählt; die Spannung ist maßgeblich, auch wenn kleine Restladungen im Bild nicht sichtbar sind. Hier laufen keine Elektronen im Kreis.</p>
    <details className="rc-solution"><summary>Zusätzliche Größen für die spätere Auswertung</summary><label><input type="checkbox" checked={analysis} onChange={e => setAnalysis(e.target.checked)} /> Ladung und Zeitkonstante auch in Tabelle und Diagrammauswahl anzeigen</label><div className="ef-readings"><div><small>Ladung Q der oberen Platte</small><strong>{n(values.charge * 1e6)} µC</strong></div><div><small>Widerstandsspannung U_R</small><strong>{n(values.resistorVoltage)} V</strong></div><div><small>Zeitkonstante τ</small><strong>{n(values.tau)} s</strong></div></div><p>Diese Größen werden aus den Bauteilwerten und der idealen RC-Gleichung berechnet. Ein reales Voltmeter misst die Kondensatorspannung; Q bestimmen wir daraus mithilfe der bekannten Kapazität.</p></details>
    <h4>3 · Eigene Messwerte aufnehmen</h4>
    <div className="ef-toolbar"><button onClick={capture}>Messwert aufnehmen</button><button disabled={rows.length < 2 || active !== 'live'} onClick={() => { setSaved(old => [...old, { name: 'Reihe ' + (old.length + 1) + ' · ' + modeName(mode) + ' · ' + n(r) + ' kΩ · ' + n(c) + ' µF · ' + n(u) + ' V', parameters: { ...p }, rows: rows.map(row => ({ ...row })) }]); setNotice('Messreihe für den Vergleich gemerkt. Sie bleibt erhalten, während du neue Einstellungen untersuchst.'); }}>Messreihe merken</button><button disabled={!rows.length} onClick={() => { setRows([]); setActive('live'); setNotice('Aktuelle Tabelle geleert.'); }}>Aktuelle Tabelle leeren</button></div>
    <p className="rc-status" role="status">{notice || 'Noch keine Messwerte aufgenommen. Beginne bei t = 0.'}</p>
    <label className="rc-series-choice">Tabelle und Diagramm anzeigen für <select aria-label="RC-Messreihe auswählen" value={active} onChange={e => setActive(e.target.value)}><option value="live">Aktueller Versuch</option>{saved.map((item, i) => <option key={i} value={i}>{item.name}</option>)}</select></label>
    <div className="ef-table-wrap"><table><caption>{source.name} · {modeName(source.parameters.mode)} · R = {n(source.parameters.resistance / 1000)} kΩ · C = {n(source.parameters.capacitance * 1e6)} µF · U₀ = {n(source.parameters.sourceVoltage)} V · Anfangsspannung = {n(source.parameters.initialVoltage)} V. Ideale Modellwerte, ohne Streuung.</caption><thead><tr><th>t in s</th><th><MathFormula tex="U_C" /> in V</th><th>I in mA</th><th><MathFormula tex="|I|" /> in mA</th>{analysis && <th>Q in µC</th>}</tr></thead><tbody>{source.rows.length ? source.rows.map(row => <tr key={row.time}><td>{n(row.time)}</td><td>{n(row.voltage)}</td><td>{n(row.current * 1000)}</td><td>{n(Math.abs(row.current) * 1000)}</td>{analysis && <td>{n(row.charge * 1e6)}</td>}</tr>) : <tr><td colSpan={analysis ? 5 : 4}>Nimm zuerst Messwerte auf. Hier gibt es keine fertige Messreihe.</td></tr>}</tbody></table></div>
    <div className="ef-toolbar"><button disabled={!source.rows.length} onClick={() => downloadCsv('RC_Messreihe.csv', [['Vorgang', modeName(source.parameters.mode)], ['R in Ohm', source.parameters.resistance], ['C in F', source.parameters.capacitance], ['U0 in V', source.parameters.sourceVoltage], ['U_C(0) in V', source.parameters.initialVoltage], ['t in s', 'U_C in V', 'I in A', '|I| in A', 'Q in C'], ...source.rows.map(row => [row.time, row.voltage, row.current, Math.abs(row.current), row.charge])])}>Diese Messreihe als CSV</button></div>
    <p className="ef-model">Gemerkte Reihen gelten für diese geöffnete Seite. Sichere sie als CSV oder im Heft, bevor du die Seite schließt.</p>
    <h4>4 · Erst selbst zeichnen, dann vergleichen</h4>
    <Choices label="Diagrammgröße" value={graph} set={setGraph} options={[{ value: 'voltage', label: 'Kondensatorspannung U_C' }, { value: 'current', label: 'Stromstärke I mit Vorzeichen' }, { value: 'magnitude', label: 'Stromstärkebetrag |I|' }, ...(analysis ? [{ value: 'charge', label: 'Ladung Q' }] : [])]} />
    <RevealChart xMax={5 * tau} yMax={maximum} yMin={graph === 'current' ? -iMax : 0} ySteps={graph === 'current' ? 8 : 5} xLabel="t in s" yLabel={yLabel} dots={dots} />
    <p className="ef-model">Die Punkte stammen ausschließlich aus deiner ausgewählten Messreihe. Es gibt keine Verbindungslinien. Das Vorzeichen im I-t-Diagramm bezieht sich auf den festen grauen Pfeil in der Schaltung.</p>
    <details className="rc-solution"><summary>Was das Modell annimmt</summary><p>R und C sind konstant, die Quelle liefert eine konstante Spannung, Messgeräte belasten den Stromkreis nicht, Leitungen besitzen keinen zusätzlichen Widerstand und der Kondensator hat keine Leckströme. Aufladen beginnt im Standardversuch bei null, Entladen bei U₀. Beim direkten Umschalten wird dagegen die tatsächlich erreichte Kondensatorspannung übernommen. Ein ideal abgetrennter Kondensator behält seine Ladung.</p></details>
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
    <h4>Flächenwerkstatt · Wie viel Ladung ist bis 20 s abgeflossen?</h4>
    <p>Grundversuch: 20 V, 1 MΩ, 10 µF; der Kondensator entlädt sich. Nutze den <b>positiven Stromstärkebetrag</b>. Die Fläche von 0 bis 20 s beschreibt die bereits abgeflossene Ladung, nicht die verbleibende Ladung.</p>
    <Choices label="Anzahl gleich breiter Zeitabschnitte" value={intervals} set={pickIntervals} options={['4', '8', '16', '32'].map(value => ({ value, label: value }))} />
    <Choices label="Näherungsverfahren" value={method} set={pickMethod} options={[{ value: 'left', label: 'Linke Rechtecke' }, { value: 'right', label: 'Rechte Rechtecke' }, { value: 'trapezoid', label: 'Trapeze' }]} />
    <p>Übertrage die Randwerte der Tabelle. Rechne die Flächen zuerst im Heft aus. Mit linken Rechtecken wird bei fallendem Strom überschätzt, mit rechten unterschätzt; Trapeze mitteln beide Höhen.</p>
    <div className="ef-table-wrap"><table><caption>Ideale Randwerte · Δt = {n(area.width)} s</caption><thead><tr><th>t in s</th><th><MathFormula tex="|I|" /> in mA</th></tr></thead><tbody>{Array.from({ length: Number(intervals) + 1 }, (_, i) => <tr key={i}><td>{n(i * area.width)}</td><td>{n(Math.abs(rcState(i * area.width, p).current) * 1000)}</td></tr>)}</tbody></table></div>
    <div className="ef-toolbar"><button aria-expanded={show} onClick={() => setShow(!show)}>{show ? 'Flächenvergleich ausblenden' : 'Flächenvergleich einblenden'}</button></div>
    <svg className="ef-chart rc-area-chart" viewBox="0 0 720 330" role="img" aria-label={show ? 'Flächennäherung mit Stromwerten und Zeitabschnitten' : 'Leeres Raster für die eigene Flächennäherung'}>
      <g stroke="#d5dfd0">{Array.from({ length: 21 }, (_, i) => <line key={'x' + i} x1={80 + i * 28} x2={80 + i * 28} y1="40" y2={bottom} />)}{Array.from({ length: 11 }, (_, i) => <line key={'y' + i} x1="80" x2="640" y1={40 + i * 21} y2={40 + i * 21} />)}</g>
      <Arrow x={80} y={bottom} dx={580} dy={0} color="#405b47" /><Arrow x={80} y={bottom} dx={0} dy={-224} color="#405b47" />
      <text x="80" y="18">|I| in mA</text><text x="665" y="312" textAnchor="end">t in s</text>
      {[0, 5, 10, 15, 20].map(t => <text key={t} x={80 + t * 28} y="277" textAnchor="middle">{t}</text>)}
      {[0, .005, .01, .015, .02].map(v => <text key={v} x="68" y={bottom - v / .02 * 210 + 5} textAnchor="end">{n(v)}</text>)}
      {show && area.bars.map((b, i) => {
        const x = 80 + b.time * 28, width = area.width * 28, leftY = bottom - (method === 'trapezoid' ? b.left : b.height) / .00002 * 210, rightY = bottom - (method === 'trapezoid' ? b.right : b.height) / .00002 * 210;
        return <path key={i} className="rc-area-piece" d={'M' + x + ' ' + bottom + 'V' + leftY + 'L' + (x + width) + ' ' + rightY + 'V' + bottom + 'Z'} fill="#cbe0b4" stroke="#54714d" />;
      })}
    </svg>
    {show && <div className="rc-area-result"><p>Näherung: <b>{n(area.estimate * 1e6)} µC</b>. Anfangsladung: 200 µC. Verbleibende Ladung nach dieser Näherung: <b>{n((200e-6 - area.estimate) * 1e6)} µC</b>.</p><details className="rc-solution"><summary>Exakter Vergleich und Erklärung</summary><Formula tex="Q_{\mathrm{ab}}(T)=Q_0\cdot\left(1-\mathrm e^{-\frac{T}{R\cdot C}}\right)" /><p>Bis 20 s fließen {n(area.exact * 1e6)} µC ab; auf der oberen Platte bleiben {n(200 - area.exact * 1e6)} µC. Mehr Zeitabschnitte verbessern die Näherung. Die Trapezregel überschätzt die Fläche bei dieser nach oben gekrümmten Exponentialfunktion leicht.</p></details></div>}
  </div>;
}
