import { useEffect, useRef, useState } from 'react';
import { Arrow } from './LabUI';

// A local wire excerpt, never an electron circulating around the circuit.
// Opposite random steps in pairs keep the thermal motion unbiased on average.
const initial = (() => {
  let seed = 9031;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  return Array.from({ length: 32 }, (_, i) => ({ x: 43 + (i % 8 + .12 + .76 * random()) * 69, y: 76 + (Math.floor(i / 8) + .12 + .76 * random()) * 30 }));
})();
export default function ConductionModel({ conducting }: { conducting: boolean }) {
  const [particles, setParticles] = useState(initial);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (paused) return;
    let visible = false, seed = 4817;
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
    if (region.current) observer.observe(region.current);
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const timer = window.setInterval(() => {
      if (!visible) return;
      const steps = Array.from({ length: 16 }, () => ({ x: (random() - .5) * 11, y: (random() - .5) * 11 }));
      setParticles(previous => previous.map((p, i) => {
        const step = steps[Math.floor(i / 2)], direction = i % 2 ? -1 : 1;
        const x = 36 + ((p.x - 36 + step.x * direction - (conducting ? .38 : 0) + 568) % 568);
        const nextY = p.y + step.y * direction;
        return { x, y: nextY < 76 ? 152 - nextY : nextY > 200 ? 400 - nextY : nextY };
      }));
    }, 90);
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, [conducting, paused]);
  return <div className="ef-conduction-model" ref={region}>
    <h4>Die Lupe im Draht: Wie bewegen sich die Elektronen?</h4>
    <p>Überall im Metalldraht gibt es bereits bewegliche Elektronen. Sie bewegen sich ungeordnet und ändern häufig ihre Richtung. Beim Schließen des Stromkreises breitet sich die Änderung des elektrischen Feldes sehr schnell aus. Das Feld bewirkt zusätzlich eine langsame gemeinsame <b>Drift</b> der Elektronen.</p>
    <svg className="ef-scene" viewBox="0 0 640 285" role="img" aria-label={`Vergrößerter gerader Drahtabschnitt: ungeordnete Elektronenbewegung ${conducting ? 'mit langsamer Drift nach links' : 'ohne gerichtete Drift'}`}>
      <rect x="25" y="65" width="590" height="148" rx="14" fill={conducting ? '#eff4e5' : '#f3f3ee'} stroke="#bec9b7" />
      {Array.from({ length: 32 }, (_, i) => <g key={i}><circle cx={65 + i % 8 * 73} cy={87 + Math.floor(i / 8) * 33} r="11" fill="#dba6a3" /><text x={65 + i % 8 * 73} y={92 + Math.floor(i / 8) * 33} textAnchor="middle" fill="#813e45" fontSize="15">+</text></g>)}
      {particles.map((p, i) => <g key={i} className="ef-local-electron" data-electron={i}><circle cx={p.x} cy={p.y} r="5.5" fill="#4862a5" /><text x={p.x} y={p.y + 3.5} fill="white" fontSize="11" textAnchor="middle">−</text></g>)}
      {conducting ? <><Arrow x={222} y={34} dx={190} dy={0} color="#a17424" /><text x="320" y="21" textAnchor="middle" fontSize="16">Feld und technische Stromrichtung →</text><Arrow x={412} y={244} dx={-190} dy={0} color="#4862a5" /><text x="320" y="275" textAnchor="middle" fontSize="16">← langsame Elektronendrift im Mittel</text></> : <><text x="320" y="33" textAnchor="middle" fontSize="16">Keine dauerhafte gerichtete Drift</text><text x="320" y="256" textAnchor="middle" fontSize="16">Ungeordnete Bewegung bleibt vorhanden</text></>}
    </svg>
    <button className="ef-action" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Teilchenbewegung fortsetzen' : 'Teilchenbewegung pausieren'}</button>
    <p className="ef-model">Qualitatives, stark vergrößertes und verlangsamtes Ausschnittmodell; Größen und Geschwindigkeiten sind nicht maßstäblich. Blau: bewegliche Elektronen. Rosa: positive Atomrümpfe mit festen mittleren Gitterplätzen; ihre Wärmeschwingungen sind hier weggelassen. Elektronen dürfen den Ausschnitt verlassen und andere eintreten.</p>
    <aside className="ef-memory"><b>Schnelle elektrische Wirkung · langsame Elektronendrift</b><p>Die Lampe wartet nicht darauf, dass ein bestimmtes Elektron einmal den Stromkreis durchläuft. Die Feldänderung erreicht die schon vorhandenen Elektronen rasch. „Weiterschubsen“ kann diese gemeinsame Reaktion veranschaulichen; es ist keine Kette starrer Kugeln. Bei Gleichstrom kommt zur ungeordneten Bewegung ein gerichteter Ladungstransport hinzu. Ein bloßes Hin- und Herschwingen ohne mittlere Drift würde keinen dauerhaften Gleichstrom ergeben.</p></aside>
    <p className="ef-model">Vertiefung: <a href="https://openstax.org/books/university-physics-volume-2/pages/9-2-model-of-conduction-in-metals" target="_blank" rel="noreferrer">OpenStax · Leitung in Metallen</a>.</p>
  </div>;
}
