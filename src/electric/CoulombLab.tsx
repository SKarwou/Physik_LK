import { useId, useState } from 'react';
import { Arrow, RevealChart, Choices, Formula, Slider, Task, downloadCsv, fmt } from './LabUI';
import { MathFormula } from './Math';
import { coulomb } from './physics';
import setupImage from './assets/coulomb-aufbau.png';

type Measurement = { q1: number; q2: number; r: number; f: number; sign: string };

function CoulombScene({ r, force, sign }: { r: number; force: number; sign: string }) {
  const gradientId = useId();
  const firstX = 390 - r * 10;
  const positive = sign === 'positive';
  const arrowLength = Math.min(150, Math.max(10, force * 180), positive ? 150 : r * 10 - 25);
  return <svg className="ef-scene ef-coulomb-scene" viewBox="0 0 720 405" role="img" aria-label="Kugel K₁ auf verschiebbarem Stativ und positive Kugel K₂ am Kraftsensor; r ist ihr Mittelpunktabstand">
    <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f9fbff" /><stop offset="1" stopColor="#9cabbf" /></linearGradient></defs>
    <rect x="20" y="377" width="680" height="2" rx="1" fill="#d8e2ef" />
    {/* K₁ and its isolated stand move together. K₂ stays mechanically fixed. */}
    <g className="ef-source-stand" stroke="#8393aa" strokeWidth="2">
      <path d={`M${firstX - 14} 334H${firstX + 14}L${firstX + 30} 373Q${firstX} 383 ${firstX - 30} 373Z`} fill={`url(#${gradientId})`} />
      <rect x={firstX - 4} y="240" width="8" height="100" rx="3" fill="#c8dce4" />
    </g>
    {/* Angled support and sensor housing follow the supplied experiment drawing. */}
    <g stroke="#8393aa" strokeWidth="2" strokeLinejoin="round">
      <path d="M555 236H585L600 272Q570 282 540 272Z" fill={`url(#${gradientId})`} />
      <rect x="566" y="112" width="8" height="130" rx="3" fill="#c8dce4" />
      <path d="M475 91L555 26H610L530 91Z" fill="#e1e7ef" />
      <path d="M530 91L610 26V90L530 155Z" fill="#b7c4d5" />
      <rect x="475" y="91" width="55" height="64" fill="#c7d2e0" />
      <path d="M610 51C655 27 661 91 690 118" fill="none" stroke="#c34c78" strokeWidth="3" />
      <path d="M498 132L390 224" stroke="#7f99a5" strokeWidth="9" strokeLinecap="round" />
      <path d="M498 132L390 224" stroke="#c5e0e7" strokeWidth="4" strokeLinecap="round" />
    </g>
    <text x="557" y="18" textAnchor="middle" fill="#40516d">Kraftsensor</text>
    <text x={firstX} y="186" textAnchor="middle" fill="#40516d">K₁ · Q</text>
    <text x="390" y="186" textAnchor="middle" fill="#40516d">K₂ · q</text>
    <circle cx={firstX} cy="224" r="21" fill={positive ? '#c7436c' : '#4862d5'} stroke="white" strokeWidth="2" />
    <text x={firstX} y="231" textAnchor="middle" fill="white" fontSize="23">{positive ? '+' : '−'}</text>
    <circle cx="390" cy="224" r="18" fill="#c7436c" stroke="white" strokeWidth="2" />
    <text x="390" y="231" textAnchor="middle" fill="white" fontSize="22">+</text>
    <g className="ef-coulomb-force"><Arrow x={390} y={224} dx={(positive ? 1 : -1) * arrowLength} dy={0} color="#c7436c" label="F⃗" /></g>
    <path d={`M${firstX} 250V272 M390 246V272 M${firstX} 264H390`} fill="none" stroke="#8b9ab0" strokeWidth="1.5" />
    <text x={(firstX + 390) / 2} y="295" textAnchor="middle" fill="#40516d">r = {r} cm</text>
    <g className="ef-coulomb-sensor">
      <rect x="442" y="300" width="240" height="61" rx="11" fill="#182743" />
      <text x="562" y="321" textAnchor="middle" fill="#b7eadd" fontSize="14">Messwert des Kraftsensors · |F|</text>
      <text x="562" y="348" textAnchor="middle" fill="white" fontSize="23">{fmt(force, 3)} mN</text>
    </g>
    <text x="360" y="397" textAnchor="middle" fill="#5b6980" fontSize="13">K₁ wird verschoben · K₂ bleibt am Sensor · Geometrie schematisch</text>
  </svg>;
}

export default function CoulombLab() {
  const [q1, setQ1] = useState(20), [q2, setQ2] = useState(10), [r, setR] = useState(10);
  const [sign, setSign] = useState('positive'), [axis, setAxis] = useState('r');
  const [rows, setRows] = useState<Measurement[]>([]);
  const force = coulomb(q1 * 1e-9, q2 * 1e-9, r / 100) * 1000;
  const matchingRows = rows.filter(a => a.q1 === q1 && a.q2 === q2);
  const maxForce = coulomb(q1 * 1e-9, q2 * 1e-9, .05) * 1000;
  const chartMax = Math.ceil(maxForce / .1) * .1;

  return <div className="ef-lab ef-coulomb-lab">
    <section className="ef-coulomb-step" data-step="setup" aria-labelledby="coulomb-setup-heading">
      <h3 id="coulomb-setup-heading">1 · Aufbau und Durchführung</h3>
      <div className="ef-coulomb-setup">
        <figure><img src={setupImage} width="496" height="440" alt="Versuchsskizze: Kugel K₁ auf einem Stativ, Kugel K₂ über einen Stab am Kraftsensor. Der Abstand r liegt zwischen den Kugelmittelpunkten." /><figcaption>Versuchsskizze: zwei geladene Kugeln und ein Kraftsensor.</figcaption></figure>
        <div><h4>Was zeigt der Aufbau?</h4>
          <p>Die kleine leitende Kugel <b>K₁</b> trägt die Quellladung <MathFormula tex="Q" />. Die Kugel <b>K₂</b> mit der positiven Ladung <MathFormula tex="q" /> ist über eine isolierende Halterung mit dem Kraftsensor verbunden. Er erfasst die Kraft, mit der die Kugeln einander abstoßen oder anziehen.</p>
          <p>Der Abstand <MathFormula tex="r" /> wird <b>zwischen den Kugelmittelpunkten</b> gemessen. Beide Kugeln bleiben bei jeder Messung in Ruhe. Das Stativ mit K₁ lässt sich verschieben.</p>
          <h4>So wird gemessen</h4>
          <ol><li>Den unbelasteten Kraftsensor nullen, die Kugeln laden und ihre Ladungen bestimmen.</li><li>Beide Ladungen unverändert lassen. K₁ schrittweise verschieben und für jeden Abstand den Kraftbetrag notieren.</li><li>Danach den Abstand festhalten und jeweils nur eine der beiden Ladungen verändern. Die übrigen Größen bleiben gleich.</li></ol>
        </div>
      </div>
    </section>

    <div data-step="task"><Task><p><b>Wie hängen Kraft, Abstand und Ladung zusammen?</b> Formuliere vor jeder Messreihe eine Vermutung.</p><ol>
      <li><b>Abstand untersuchen:</b> Halte beide Ladungen fest. Stelle nacheinander 5, 10, 15, 20, 25 und 30 cm ein und speichere jeweils einen Messwert.</li>
      <li><b>Ladung untersuchen:</b> Halte Abstand und Probeladung fest. Verdopple die Quellladung. Wiederhole den Vergleich anschließend für die Probeladung.</li>
      <li><b>Kraftrichtung untersuchen:</b> Wechsle das Vorzeichen von K₁. Beobachte den Kraftpfeil an K₂ und vergleiche die Kraftbeträge.</li>
    </ol></Task></div>

    <section className="ef-coulomb-step" data-step="simulation" aria-labelledby="coulomb-simulation-heading">
      <h3 id="coulomb-simulation-heading">2 · Einstellen und beobachten</h3>
      <p>Verändere mit den Schiebereglern jeweils eine Größe. Die Animation zeigt denselben Aufbau wie die Skizze: K₁ auf dem Stativ und K₂ am Kraftsensor.</p>
      <div className="ef-lab-grid"><div>
        <Slider label="Quellladung |Q|" value={q1} set={setQ1} min={5} max={40} unit="nC" />
        <Slider label="Positive Probeladung q (Coulomb)" value={q2} set={setQ2} min={1} max={20} unit="nC" />
        <Slider label="Abstand der Kugelmittelpunkte r" value={r} set={setR} min={5} max={30} unit="cm" />
        <Choices label="Vorzeichen der Quellladung auf K₁" value={sign} set={setSign} options={[{ value: 'positive', label: 'Q positiv' }, { value: 'negative', label: 'Q negativ' }]} />
      </div><div><CoulombScene r={r} force={force} sign={sign} />
        <div className="ef-readings"><div><small>Aktueller Mittelpunktabstand</small><strong>{r} cm</strong></div><div><small>Aktueller Kraftbetrag am Sensor</small><strong>{fmt(force, 3)} mN</strong></div></div>
        <p className="ef-model">Die elektrische Kraft auf K₂ zeigt {sign === 'positive' ? 'von K₁ weg: Die Kugeln stoßen sich ab.' : 'zu K₁ hin: Die Kugeln ziehen sich an.'} Der Sensor zeigt den Kraftbetrag. Die Pfeillänge ist für die Darstellung begrenzt; maßgeblich ist der Messwert. Die Kugelgröße bleibt beim Ändern der Ladung gleich.</p>
      </div></div>
    </section>

    <section className="ef-coulomb-step" data-step="measurements" aria-labelledby="coulomb-measurements-heading">
      <h3 id="coulomb-measurements-heading">3 · Messwerte aufzeichnen</h3>
      <p>Passt die Einstellung? Übernimm den angezeigten Messwert in dein Protokoll. Veränderte Regler überschreiben keine gespeicherten Werte.</p>
      <div className="ef-toolbar">
        <button disabled={rows.length >= 20} onClick={() => setRows(s => [...s, { q1, q2, r, f: force, sign }])}>Messwert aufnehmen ({rows.length}/20)</button>
        <button disabled={!rows.length} onClick={() => downloadCsv('coulomb-messwerte.csv', [['Q in nC', 'q in nC', 'r in cm', 'F in mN', 'Vorzeichen Q'], ...rows.map(a => [a.q1, a.q2, a.r, a.f, a.sign === 'positive' ? '+' : '−'])])}>CSV herunterladen</button>
        <button disabled={!rows.length} onClick={() => setRows([])}>Messwerte löschen</button>
      </div>
      <div className="ef-table-wrap"><table>
        <caption>Messprotokoll · berechnete Modellmesswerte der Simulation</caption>
        <thead><tr><th><MathFormula tex="\frac{Q}{\mathrm{nC}}" /></th><th><MathFormula tex="\frac{q}{\mathrm{nC}}" /></th><th><MathFormula tex="\frac{r}{\mathrm{cm}}" /></th><th><MathFormula tex="\frac{|F|}{\mathrm{mN}}" /></th></tr></thead>
        <tbody>{rows.length ? rows.map((a, i) => <tr key={i}><td>{a.sign === 'negative' ? '−' : '+'}{a.q1}</td><td>{a.q2}</td><td>{a.r}</td><td>{fmt(a.f, 3)}</td></tr>) : <tr><td colSpan={4} className="ef-empty-measurements">Noch keine Messwerte. Stelle den Versuch oben ein und klicke auf „Messwert aufnehmen“.</td></tr>}</tbody>
      </table></div>
    </section>

    <section className="ef-coulomb-step" data-step="diagram" aria-labelledby="coulomb-diagram-heading">
      <h3 id="coulomb-diagram-heading">4 · Messwerte im Diagramm</h3>
      <p>Zeichne mit deinen Messwerten zuerst ein eigenes Abstandsdiagramm. Blende die Messpunkte anschließend zur Kontrolle ein. Wiederhole dies für die zweite Darstellung.</p>
      <Choices label="Auswertung des Abstandsversuchs" value={axis} set={setAxis} options={[{ value: 'r', label: 'F gegen r' }, { value: 'inverse', label: 'F gegen 1/r²' }]} />
      <RevealChart xMax={axis === 'r' ? 30 : 400} yMax={chartMax} xLabel={axis === 'r' ? 'r in cm' : '1/r² in 1/m²'} yLabel="F in mN" xMathLabel={axis === 'inverse' ? String.raw`\frac{1}{r^2}\text{ in }\frac{1}{\mathrm{m^2}}` : undefined} dots={matchingRows.map(a => ({ x: axis === 'r' ? a.r : 1 / (a.r / 100) ** 2, y: a.f }))} />
      <p className="ef-model">Zum Einzeichnen verfügbar: {matchingRows.length} Messpunkte für die aktuell gewählten Ladungsbeträge (|Q| = {q1} nC, q = {q2} nC). Beide Vorzeichen von Q liefern denselben Kraftbetrag. Die Tabelle enthält auch Messungen mit anderen Ladungen. Messpunkte werden nicht verbunden; zeichne eine passende Ausgleichskurve bzw. Ausgleichsgerade selbst im Heft.</p>
    </section>

    <details className="ef-coulomb-step ef-coulomb-evaluation" data-step="evaluation" aria-labelledby="coulomb-evaluation-heading">
      <summary id="coulomb-evaluation-heading">5 · Auswertung und Formel anzeigen</summary><h3>Das Coulombsche Gesetz</h3>
      <p>Erkläre zuerst mit deinen Messwerten, was bei doppeltem Abstand und bei doppelter Ladung passiert. Vergleiche anschließend mit den Zusammenhängen:</p>
      <ul><li><b>Abstand:</b> Bei doppeltem Abstand sinkt der Kraftbetrag auf ein Viertel. Im Diagramm <MathFormula tex="F" /> gegen <MathFormula tex="\frac{1}{r^2}" /> liegen die idealen Messpunkte auf einer Ursprungsgeraden.</li>
        <li><b>Ladungen:</b> Verdoppelt man eine Ladung bei sonst gleichen Bedingungen, verdoppelt sich der Kraftbetrag. Verdoppelt man beide, vervierfacht er sich.</li>
        <li><b>Richtung:</b> Gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an. Beide Kugeln erfahren gleich große, entgegengesetzte elektrische Kräfte.</li></ul>
      <Formula tex={[String.raw`F=k\cdot\frac{|Q\cdot q|}{r^2}`, String.raw`k=\frac{1}{4\cdot\pi\cdot\varepsilon_0}\approx8{,}99\cdot10^9\,\frac{\mathrm N\cdot\mathrm{m^2}}{\mathrm{C^2}}`]} note="Betrag der Coulomb-Kraft im Vakuum, näherungsweise in Luft. Ladungen in C und Mittelpunktabstand in m einsetzen; dann erhältst du F in N." />
      <p className="ef-model"><b>Grenzen des Modells:</b> Die Simulation behandelt die Kugeln als Punktladungen. Im realen Versuch müssen ihre Radien klein gegenüber dem Abstand sein. Influenz, Luftfeuchtigkeit und Ladungsverlust können die Messwerte verändern; deshalb Ladungen kontrollieren und Halterungen elektrisch isolieren.</p>
    </details>
  </div>;
}
