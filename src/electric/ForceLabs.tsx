import ExperimentGuide from './ExperimentGuide';
import { useEffect, useState } from 'react';
import { MathFormula, MathText } from './Math';
import { Arrow, Formula, RealExperiment, Slider, Task, fmt } from './LabUI';
import { plateField } from './physics';
export function PlateLab() {
  const [u, setU] = useState(200), [d, setD] = useState(10), [q, setQ] = useState(2), [x, setX] = useState(20), [y, setY] = useState(50), [run, setRun] = useState(false);
  const e = plateField(u, d / 100), force = q * e / 1000, energyTransferred = q * u * x / 100 / 1000;
  useEffect(() => {
    if (!run) return;
    const start = performance.now(); const initial = x;
    const timer = window.setInterval(() => { const next = Math.min(95, initial + ((performance.now() - start) / 1000) * 20); setX(next); if (next >= 95) setRun(false); }, 30);
    return () => window.clearInterval(timer);
  }, [run]);
  const update = (set: (n: number) => void) => (n: number) => { setRun(false); set(n); };
  return <div className="ef-lab">
    <ExperimentGuide kind="plate" />
    <Task><ol><li>Halte U und d fest. Miss F für q = 1, 2, 3, 4 und 5 nC. Zeichne F gegen q: Was bedeutet die Steigung?</li><li>Verschiebe die Probeladung waagrecht und senkrecht. Begründe, warum ihre Kraft gleich bleibt.</li><li>Verdopple U, anschließend d. Trenne die Versuche und erkläre jeweils die Änderung.</li></ol></Task><div className="ef-lab-grid"><div><Slider label="Plattenspannung U" value={u} set={update(setU)} min={0} max={500} step={10} unit="V" /><Slider label="Plattenabstand d" value={d} set={update(setD)} min={5} max={20} unit="cm" /><Slider label="Positive Probeladung q" value={q} set={update(setQ)} min={1} max={5} unit="nC" /><Slider label="Position x/d" value={x} set={update(setX)} min={5} max={95} unit="%" /><Slider label="Höhe der Probeladung" value={y} set={update(setY)} min={15} max={85} unit="%" /></div><div>
      <svg className="ef-scene" viewBox="0 0 640 380" role="img" aria-label="Positive Probeladung zwischen einer positiven linken und negativen rechten Platte">
        <rect x="65" y="40" width="510" height="285" fill="#eef3ff" />{u > 0 && [80, 130, 190, 250, 300].map(yy => <g key={yy}><line x1="80" x2="560" y1={yy} y2={yy} stroke="#abb9d8" /><Arrow x={420} y={yy} dx={35} dy={0} color="#8a9cc3" /></g>)}
        <rect x="65" y="40" width="12" height="285" rx="4" fill="#cd4770" /><rect x="563" y="40" width="12" height="285" rx="4" fill="#4862d5" /><text x="60" y="29" fill="#ae2652">+ · φ = {u} V</text><text x="490" y="29" fill="#364ead">− · φ = 0 V</text>
        <circle cx={77 + x * 4.86} cy={50 + y * 2.6} r="17" fill="#c7436c" /><text x={77 + x * 4.86} y={56 + y * 2.6} textAnchor="middle" fill="white">+</text><Arrow x={77 + x * 4.86} y={50 + y * 2.6} dx={Math.min(force * 10, 590 - (77 + x * 4.86))} dy={0} color="#c7436c" label={force ? 'F⃗' : undefined} />
        <path d="M77 340V348H563V340" fill="none" stroke="#71809c" /><text x="320" y="370" textAnchor="middle">d = {d} cm · Geometrie schematisch</text>
      </svg><div className="ef-readings"><div><small>Feldstärke E</small><strong>{fmt(e, 0)} <MathText>N/C</MathText></strong></div><div><small>Kraft F = q · E</small><strong>{fmt(force)} µN →</strong></div></div></div></div>
    <Formula tex={["E=\\frac{F}{q}=\\frac{U}{d}", "\\vec F=q\\cdot\\vec E\\qquad F=\\frac{q\\cdot U}{d}"]} note="q in C, U in V, d in m → E in N/C = V/m; F in N" />
    <p>Bei festem U und d bleiben Kraft und Feldstärke an jedem Ort zwischen den idealen Platten gleich. Verdopple q: F verdoppelt sich, E bleibt gleich. Verdopple U: E und F verdoppeln sich. Der Kraftpfeil wächst mit F; bei Randnähe wird er aus Platzgründen gekürzt. Maßgeblich bleibt der angezeigte Kraftbetrag.</p>
    <div className="ef-toolbar"><button onClick={() => { if (run) { setRun(false); } else { setX(5); setRun(true); } }}>{run ? 'Animation pausieren' : 'Energieübertragung zeigen'}</button><button onClick={() => { setRun(false); setU(200); setD(10); setQ(2); setX(20); setY(50); }}>Zurücksetzen</button></div>
    <p>Bei x = {fmt(x, 0)} % von d: Spannungsabfall U₀ₓ = {fmt(u * x / 100)} V; übertragener Energiebetrag ΔEₑₗ,₀ₓ = <b>{fmt(energyTransferred, 3)} µJ</b>. Die potentielle Energie der Ladung nimmt um diesen Betrag ab. Die Animation verschiebt die Ladung geführt; sie zeigt keine freie Flugbahn und keine reale Zeit.</p>
    <Formula tex={["\\Delta E_{\\mathrm{el}}=F\\cdot d=q\\cdot E\\cdot d", "\\Delta E_{\\mathrm{el}}=q\\cdot\\frac{U}{d}\\cdot d=q\\cdot U"]} note="Vollständiger Weg von + nach −; konstantes Feld und q > 0: ΔE_el ist hier der übertragene positive Energiebetrag. Die Änderung der potentiellen Energie ist negativ: $\Delta E_{\mathrm{pot}}=-q\cdot U$." />

    <RealExperiment title="Kraft auf eine geladene Probekugel"><p><b>Material:</b> große Kondensatorplatten, kleine isoliert befestigte geladene Probekugel, empfindlicher Kraftsensor, Spannungsquelle und Ladungsmessgerät. Die Kugel ist mechanisch mit dem Sensor verbunden; ein ungeladener Kraftsensor allein misst die gesuchte Coulomb-Kraft nicht.</p><p><b>Ablauf:</b> Sensor nullen, Kugelladung bestimmen, q und d konstant halten und U schrittweise variieren. Danach bei festem Feld die Kugelladung verändern. F-U- und F-q-Diagramm erstellen. Sensor und Halterung möglichst außerhalb des Feldes; Störung des Feldes, Ladungsverlust und Empfindlichkeit diskutieren. Hochspannung nur als Lehrkraftversuch nach Geräteanleitung.</p></RealExperiment>
  </div>;
}
export { default as CoulombLab } from './CoulombLab';
