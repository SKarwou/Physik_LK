import FormulaSteps, { type FormulaStep } from '../components/FormulaSteps';
import { useId, useState, type ReactNode } from 'react';
import { MathFormula, MathText } from './Math';
import TeacherExamples from './TeacherExamples';
export const fmt = (value: number, digits = 2) => value.toLocaleString('de-DE', { maximumFractionDigits: digits, minimumFractionDigits: digits });
export function Slider({ label, value, set, min, max, step = 1, unit = '' }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step?: number; unit?: string }) {
  return <label className="ef-slider"><span><span><MathText>{label}</MathText></span><output>{fmt(value, step < 1 ? 1 : 0)} <MathText>{unit}</MathText></output></span><input type="range" aria-label={label} value={value} min={min} max={max} step={step} onChange={e => set(+e.target.value)} /></label>;
}
export function Choices<T extends string>({ label, value, set, options }: { label: string; value: T; set: (v: T) => void; options: { value: T; label: ReactNode }[] }) {
  return <fieldset className="ef-choices"><legend>{label}</legend>{options.map(o => <button type="button" key={o.value} aria-label={typeof o.label === 'string' ? o.label : undefined} aria-pressed={value === o.value} onClick={() => set(o.value)}>{typeof o.label === 'string' ? <MathText>{o.label}</MathText> : o.label}</button>)}</fieldset>;
}
export function Formula({ tex, note }: { tex: string | string[]; note?: string }) {
  return <div className="ef-formula"><div className="ef-formula-lines">{(Array.isArray(tex) ? tex : [tex]).map(line => <MathFormula key={line} tex={line} display />)}</div>{note && <small><MathText>{note}</MathText></small>}</div>;
}
export function Task({ children }: { children: ReactNode }) { return <aside className="ef-task"><b>Dein Forschungsauftrag</b><div>{children}</div></aside>; }
export function ZoomScene({ children }: { children: ReactNode }) {
  const [zoom, setZoom] = useState(false);
  return <div className="ef-zoom-scene"><div className={`ef-scene-scroll${zoom ? ' is-zoomed' : ''}`} tabIndex={zoom ? 0 : undefined} aria-label={zoom ? 'Vergrößerte Skizze; bei Bedarf seitlich scrollen' : undefined}>{children}</div><button className="ef-zoom-button" type="button" aria-pressed={zoom} onClick={() => setZoom(!zoom)}>{zoom ? 'Skizze verkleinern' : 'Skizze vergrößern'}</button>{zoom && <p className="ef-model">Du kannst die vergrößerte Skizze seitlich verschieben.</p>}</div>;
}
export function RealExperiment({ title, children }: { title: string; children: ReactNode }) { return <details className="ef-real"><summary>Im Unterricht durchführen: {title}</summary><div>{children}<TeacherExamples experiment={title} /></div></details>; }
export function Check({ question, unit, hint, solution, steps }: { question: string; answer: number; unit: string; hint: string; solution: string; steps?: FormulaStep[] }) {
  return <section className="ef-check"><span className="ef-eyebrow">KURZ ÜBEN · IM HEFT</span><p><MathText>{question}</MathText></p><p>Schreibe Ansatz, Rechnung und Antwortsatz ins Heft. Gib dein Ergebnis in <MathText>{unit}</MathText> an.</p><details><summary>Bei Bedarf: Denkhilfe</summary><p><MathText>{hint}</MathText></p></details><details><summary>Erst danach: Rechenweg vergleichen</summary>{steps ? <FormulaSteps title="So gehst du vor" steps={steps} /> : <p><MathText>{solution}</MathText></p>}</details></section>;
}
export function SvgLabel({ text }: { text: string }) {
  return <>{text.split(/(_[A-Za-z]+)/g).map((part, i) => part.startsWith('_') ? <tspan key={i} baselineShift="sub" fontSize="70%">{part.slice(1)}</tspan> : <tspan key={i}>{part}</tspan>)}</>;
}
export function Arrow({ x, y, dx, dy, color = '#087f8c', label }: { x: number; y: number; dx: number; dy: number; color?: string; label?: string }) {
  const len = Math.hypot(dx, dy); if (len < .1) return null;
  const ux = dx / len, uy = dy / len, endX = x + dx, endY = y + dy;
  return <g stroke={color} fill={color}><line x1={x} y1={y} x2={endX} y2={endY} strokeWidth="3" /><path d={`M${endX},${endY} L${endX - 9 * ux + 4 * uy},${endY - 9 * uy - 4 * ux} L${endX - 9 * ux - 4 * uy},${endY - 9 * uy + 4 * ux}Z`} />{label && <text stroke="none" x={endX + 7} y={endY - 9} fontSize="15"><SvgLabel text={label} /></text>}</g>;
}
export function axisCaption(label: string, _legacyTex?: string): string {
  const labels: Record<string, string> = {
    'q in nC': String.raw`Probeladung $q$ in $\mathrm{nC}$`,
    'F in µN': String.raw`Kraft $F$ in $\mathrm{\mu N}$`,
    'F in mN': String.raw`Kraft $F$ in $\mathrm{mN}$`,
    'r in cm': String.raw`Mittelpunktabstand $r$ in $\mathrm{cm}$`,
    '1/r² in 1/m²': String.raw`Kehrwert des Abstandsquadrats $\frac{1}{r^2}$ in $\mathrm{m}^{-2}$`,
    'U in V': String.raw`Spannung $U$ in $\mathrm V$`,
    'I in mA': String.raw`Stromstärke $I$ in $\mathrm{mA}$`,
    '|I| in mA': String.raw`Stromstärkebetrag $|I|$ in $\mathrm{mA}$`,
    't in s': String.raw`Zeit $t$ in $\mathrm s$`,
    't in ms': String.raw`Zeit $t$ in $\mathrm{ms}$`,
    'U_C in V': String.raw`Kondensatorspannung $U_C$ in $\mathrm V$`,
    'Q in µC': String.raw`Plattenladung $Q$ in $\mathrm{\mu C}$`,
    'x in cm': String.raw`Ort $x$ in $\mathrm{cm}$`,
    'φ in V': String.raw`Potenzial $\varphi$ in $\mathrm V$`,
  };
  return labels[label] || label;
}
export type ChartPoint = { x: number; y: number };
const tick = (n: number) => n.toLocaleString('de-DE', { maximumSignificantDigits: 3 });
type ChartProps = { xMax: number; yMax: number; yMin?: number; xLabel: string; yLabel: string; xMathLabel?: string; dots?: ChartPoint[]; highlight?: ChartPoint; blank?: boolean; ySteps?: number };
export function RevealChart(props: ChartProps) {
  const signature = JSON.stringify([props.xMax, props.yMax, props.yMin, props.xLabel, props.yLabel, props.dots]);
  // New measurements or a new representation need a fresh, deliberate reveal.
  return <ChartRevealState key={signature} {...props} />;
}
function ChartRevealState(props: ChartProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  return <div className="ef-reveal-chart">
    <p className="ef-plot-instruction">Zeichne zuerst im Heft mit eigenen Werten oder den ausgefüllten Ersatzdaten. Danach kannst du das Vergleichsdiagramm öffnen.</p>
    <div className="ef-toolbar"><button type="button" aria-expanded={show} aria-controls={id} disabled={!props.dots?.length} onClick={() => setShow(!show)}>{show ? 'Diagramm ausblenden' : 'Diagramm zeichnen'}</button></div>
    {show && <div id={id}><Chart {...props} /></div>}
    <p className="ef-model" role="status">{show ? 'Messpunkte eingeblendet. Vergleiche sie mit deinem eigenen Diagramm.' : props.dots?.length ? 'Die Messpunkte sind ausgeblendet.' : 'Nutze die Ersatzdaten oder deine Aufzeichnungen im Heft.'}</p>
  </div>;
}
export function Chart({ xMax, yMax, yMin = 0, xLabel, yLabel, xMathLabel, dots = [], highlight, blank = false, ySteps = 5 }: ChartProps) {
  const height = ySteps * 56, bottom = 50 + height;
  const px = (x: number) => 80 + 560 * x / xMax, py = (y: number) => bottom - height * (y - yMin) / (yMax - yMin);
  const zero = py(Math.max(yMin, Math.min(yMax, 0)));
  const inRange = (p: ChartPoint) => Number.isFinite(p.x) && Number.isFinite(p.y) && p.x >= 0 && p.x <= xMax && p.y >= yMin && p.y <= yMax;
  return <svg className="ef-chart" viewBox={`0 0 720 ${bottom + 105}`} role="img" aria-label={`${blank ? 'Leeres Diagrammraster: ' : ''}${yLabel} in Abhängigkeit von ${xLabel}; Achsen mit Pfeilen, quadratisches Raster, keine Verbindungslinien`}>
    <rect x="80" y="50" width="560" height={height} fill="white" />
    <g className="ef-chart-grid" fill="none">{Array.from({ length: 21 }, (_, i) => <line key={`x${i}`} x1={80 + i * 28} x2={80 + i * 28} y1="50" y2={bottom} stroke={i % 4 === 0 ? '#bdcde0' : '#e0e8f2'} />)}{Array.from({ length: ySteps * 2 + 1 }, (_, i) => <line key={`y${i}`} x1="80" x2="640" y1={50 + i * 28} y2={50 + i * 28} stroke={i % 2 === 0 ? '#bdcde0' : '#e0e8f2'} />)}</g>
    <g className="ef-chart-axes" fill="#40516d" stroke="#40516d" strokeWidth="1.6"><path d={`M80 30V${bottom} M80 ${zero}H665`} fill="none" /><path d={`M80 28l-5 10h10Z M667 ${zero}l-10-5v10Z`} /></g>
    {Array.from({ length: ySteps + 1 }, (_, i) => { const y = yMin + i * (yMax - yMin) / ySteps; return <g key={`tick-y${i}`} fill="#40516d"><path d={`M75 ${py(y)}h5`} stroke="#40516d" /><text x="68" y={py(y) + 5} textAnchor="end">{tick(y)}</text></g>; })}
    {[0, .2, .4, .6, .8, 1].map(t => <g key={t} fill="#40516d"><path d={`M${px(t * xMax)} ${zero}v5`} stroke="#40516d" /><text x={px(t * xMax)} y={bottom + 25} textAnchor="middle">{tick(t * xMax)}</text></g>)}
    <foreignObject x="80" y="2" width="600" height="42"><div style={{ fontSize: 16, color: '#24304a' }}><MathText>{axisCaption(yLabel)}</MathText></div></foreignObject><foreignObject x="80" y={bottom + 36} width="600" height="62"><div style={{ fontSize: 16, textAlign: 'right', color: '#24304a' }}><MathText>{axisCaption(xLabel, xMathLabel)}</MathText></div></foreignObject>
    <g className="ef-chart-points" stroke="#ba3561" strokeWidth="2.3">{!blank && dots.filter(inRange).map((p, i) => <g key={i} className="ef-chart-point"><title>{`${xLabel}: ${tick(p.x)}; ${yLabel}: ${tick(p.y)}`}</title><path d={`M${px(p.x) - 4} ${py(p.y) - 4}l8 8 m-8 0l8-8`} /></g>)}</g>
    {!blank && highlight && inRange(highlight) && <circle className="ef-chart-current" cx={px(highlight.x)} cy={py(highlight.y)} r="6" fill="#08777e" stroke="white" strokeWidth="1.5" />}
  </svg>;
}
