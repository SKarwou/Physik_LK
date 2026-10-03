import { useMemo, useState, type PointerEvent } from 'react';
import { Arrow, Choices, RealExperiment, Task } from './LabUI';
import { chargesFor, fieldAt, fieldLines, pathOf, type FieldKind, type Point } from './physics';
export default function FieldMapLab() {
  const [kind, setKind] = useState<FieldKind>('plate'), [on, setOn] = useState(false), [show, setShow] = useState(false), [draw, setDraw] = useState(false);
  const [strokes, setStrokes] = useState<Point[][]>([]), [active, setActive] = useState(false);
  const lines = useMemo(() => fieldLines(kind), [kind]);
  const grains = useMemo(() => {
    // One independently jittered grain per cell avoids correlated, empty diagonal bands.
    // Keep the seed and positions fixed when the field or electrode arrangement changes.
    let seed = 20261001;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const columns = 28, rows = 17;
    return Array.from({ length: columns * rows }, (_, i) => ({
      x: 82 + (i % columns + .18 + .64 * random()) * (476 / columns),
      y: 48 + (Math.floor(i / columns) + .18 + .64 * random()) * (286 / rows),
      angle: 180 * random(),
    }));
  }, []);
  function change(v: FieldKind) { setKind(v); setStrokes([]); setShow(false); }
  function point(e: PointerEvent<SVGSVGElement>): Point {
    const svg = e.currentTarget; const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM()!.inverse()); return { x: p.x, y: p.y };
  }
  return <div className="ef-lab"><Choices label="Elektrodenanordnung" value={kind} set={change} options={[{ value: 'plate', label: 'Platten' }, { value: 'positive', label: '+ Punktladung' }, { value: 'negative', label: '− Punktladung' }, { value: 'dipole', label: 'Dipol +/−' }, { value: 'pair', label: 'Zwei positive' }]} />
    <div className="ef-toolbar"><button aria-pressed={on} onClick={() => setOn(!on)}>{on ? 'Feld ausschalten' : 'Feld einschalten'}</button><button aria-pressed={draw} onClick={() => setDraw(!draw)}>Selbst zeichnen</button><button aria-pressed={show} onClick={() => setShow(!show)}>Feldlinien {show ? 'ausblenden' : 'vergleichen'}</button><button onClick={() => setStrokes([])}>Zeichnung löschen</button></div>
    <svg className={`ef-scene ${draw ? 'ef-draw' : ''}`} viewBox="0 0 640 380" role="img" aria-label="Ölwanne mit Grießkörnern und wählbarer Feldanordnung" onPointerDown={e => { if (!draw) return; e.currentTarget.setPointerCapture(e.pointerId); setActive(true); const p = point(e); setStrokes(s => [...s, [p]]); }} onPointerMove={e => { if (!active) return; const p = point(e); setStrokes(s => [...s.slice(0, -1), [...s[s.length - 1], p]]); }} onPointerUp={() => setActive(false)} onPointerCancel={() => setActive(false)}>
      <rect x="15" y="20" width="610" height="340" rx="28" fill="#fffae9" stroke="#dfcf99" />
      {grains.filter(p => !chargesFor(kind).some(c => Math.hypot(p.x - c.x, p.y - c.y) < 24)).map((p, i) => {
        const e = fieldAt(p, kind), angle = on && Math.hypot(e.x, e.y) > 1e-10 ? Math.atan2(e.y, e.x) * 180 / Math.PI : p.angle;
        return <line className="ef-grain" key={i} x1={p.x - 4} x2={p.x + 4} y1={p.y} y2={p.y} stroke="#9c7e38" strokeWidth="2.7" strokeLinecap="round" style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${p.x}px ${p.y}px`, transition: 'transform 700ms' }} />;
      })}
      {show && on && lines.map((line, i) => { const p = line[Math.floor(line.length * .45)], n = fieldAt(p, kind), length = Math.hypot(n.x, n.y); return <g key={i}><path d={pathOf(line)} fill="none" stroke="#177f91" strokeWidth="1.7" />{length > 1e-10 && <Arrow x={p.x} y={p.y} dx={14 * n.x / length} dy={14 * n.y / length} />}</g>; })}
      {kind === 'plate' ? <g><rect x="60" y="38" width="10" height="310" rx="3" fill={on ? "#cd4770" : "#8d98ae"} /><rect x="570" y="38" width="10" height="310" rx="3" fill={on ? "#4862d5" : "#8d98ae"} /><text x="35" y="190" fill="#ae2652">{on ? "+" : "0"}</text><text x="592" y="190" fill="#364ead">{on ? "−" : "0"}</text></g> : chargesFor(kind).map((c, i) => <g key={i}><circle cx={c.x} cy={c.y} r="19" fill={!on ? '#8d98ae' : c.q > 0 ? '#cd4770' : '#4862d5'} /><text x={c.x} y={c.y + 6} textAnchor="middle" fill="white">{!on ? '0' : c.q > 0 ? '+' : '−'}</text></g>)}
      {strokes.map((s, i) => <path key={i} d={pathOf(s)} stroke="#9a4ac8" strokeWidth="3" fill="none" />)}
    </svg>
    <p className="ef-model">{on ? 'Die länglichen Körnchen richten sich durch Polarisation aus. Ihre Achse zeigt den Verlauf, aber noch keine Pfeilrichtung.' : 'Feld aus: Die Körnchen liegen ungeordnet. Sage vor dem Einschalten ihre Ausrichtung voraus.'} Feldlinien sind Modelllinien, keine Flugbahnen. Die Punktladungsbilder zeigen einen Schnitt durch dreidimensionale Felder; das Plattenfeld ist ohne Randfelder idealisiert.</p>
    {draw && <p>Zeichne mit Maus, Stift oder Finger in die Wanne. Alternativ: Skizziere auf Papier und blende anschließend die Modelllinien ein.</p>}
    <Task><ol><li>Wähle eine Anordnung und skizziere zuerst deine Vermutung.</li><li>Schalte das Feld ein. Ergänze Pfeile: von der positiven Quelle zur negativen Senke bzw. ins Unendliche.</li><li>Vergleiche Plattenfeld, Radialfeld und Dipol. Erkläre den Feldnullpunkt zwischen zwei gleich großen positiven Ladungen.</li></ol></Task>
    <RealExperiment title="Grieß in Öl"><p><b>Material:</b> transparente Feldlinienwanne, isolierendes Öl, wenige Grießkörner, Platten- und Rundelektroden, zugelassenes schulisches Elektrostatikgerät.</p><p><b>Ablauf:</b> Elektroden im ausgeschalteten Zustand anordnen, Körner dünn verteilen, einschalten, Wanne vorsichtig anklopfen, Muster skizzieren. Vor jedem Umbau abschalten und Elektroden entladen. Hochspannungsaufbau ausschließlich durch die Lehrkraft nach Geräteanleitung und schulischer Gefährdungsbeurteilung.</p><p><b>Auswertung:</b> Die Körner polarisieren sich und bilden Ketten. Die Pfeilrichtung folgt aus der Wirkung auf eine positive Probeladung, nicht aus der Orientierung der Körner allein.</p></RealExperiment>
  </div>;
}
