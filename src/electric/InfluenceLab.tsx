import { useEffect, useState } from 'react';
import { Choices, Slider, Task, ZoomScene } from './LabUI';

export function ElectroscopeLab() {
  const [sign, setSign] = useState('negative'), [distance, setDistance] = useState(100), [charge, setCharge] = useState(0);
  const polarity = sign === 'negative' ? -1 : 1;
  const induction = (100 - distance) / 100 * .8 * polarity;
  const leaf = charge + induction, top = charge - induction;
  const angle = Math.min(55, Math.abs(leaf) * 48), color = (q: number) => q < 0 ? '#4862a5' : '#b8485b';
  return <div className="ef-lab ef-electroscope">
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

type MachineState = { tick: number; stored: number; strength: number; sparks: number; flashed: boolean };
export function machineStep(state: MachineState, seeded: boolean, connected: boolean, capacity: number, threshold: number): MachineState {
  const tick = state.tick + 1;
  const strength = seeded && connected ? Math.min(18, Math.max(1, state.strength) * 1.11) : state.strength;
  const stored = state.stored + (tick % 4 === 0 && seeded && connected ? strength * 2 : 0);
  const flashed = stored / capacity >= threshold;
  return { tick, strength, stored: flashed ? 0 : stored, sparks: state.sparks + Number(flashed), flashed };
}
const initialMachine: MachineState = { tick: 0, stored: 0, strength: 1, sparks: 0, flashed: false };
const phases = [
  { title: 'Ladung sammeln', text: 'Die Sammelkämme übertragen Ladung auf die beiden getrennten Anschlüsse. Links wächst der Elektronenüberschuss, rechts der Elektronenmangel. Die Spannung steigt.' },
  { title: 'Durch Influenz verschieben', text: 'Eine kleine Restladung beeinflusst einen leitenden Sektor der anderen Scheibe. Elektronen werden angezogen oder abgestoßen.' },
  { title: 'Über die Bürsten trennen', text: 'Der Neutralisator verbindet kurzzeitig gegenüberliegende Sektoren. Elektronen können zwischen ihnen fließen; die Sektoren erhalten entgegengesetzte Ladungen.' },
  { title: 'Mit den Scheiben transportieren', text: 'Beim Weiterdrehen verlassen die Sektoren die Bürsten und nehmen ihre Ladung mit. Die gegenläufige zweite Scheibe verstärkt die Trennung durch weitere Influenz.' },
];
function Disc({ x, rotation, back, strength, seedOnly = false }: { x: number; rotation: number; back: boolean; strength: number; seedOnly?: boolean }) {
  return <g><circle cx={x} cy="270" r="118" fill={back ? '#eef0fa' : '#edf4e5'} stroke={back ? '#a6afc8' : '#92aa86'} strokeWidth="3" />
    {Array.from({ length: 16 }, (_, i) => {
      const angle = (i * 22.5 + rotation) * Math.PI / 180;
      const positive = seedOnly || Math.cos(angle + (back ? 1 : -1) * Math.PI / 4) > 0;
      const charged = strength > 0 && (!seedOnly || i === 0);
      return <g key={i} transform={`translate(${x + 92 * Math.cos(angle)} ${270 + 92 * Math.sin(angle)}) rotate(${i * 22.5 + rotation})`}><rect x="-19" y="-9" width="38" height="18" rx="3" fill={charged ? positive ? '#dc8f96' : '#829bc9' : '#d5dbd6'} stroke="#7f8c86" /><text x="0" y="6" textAnchor="middle" fill="#183e32" fontSize="16" transform={`rotate(${-i * 22.5 - rotation})`}>{charged ? positive ? '+' : '−' : ''}</text></g>;
    })}
    <circle cx={x} cy="270" r="15" fill="#526a59" />
    <text x={x} y="425" textAnchor="middle" fill="#375541">{back ? 'Rückscheibe ↶' : 'Vorderscheibe ↷'}</text>
  </g>;
}
export default function InfluenceMachine() {
  const [state, setState] = useState<MachineState>(initialMachine), [running, setRunning] = useState(false);
  const [seed, setSeed] = useState('residual'), [neutralizer, setNeutralizer] = useState(true), [jars, setJars] = useState('with'), [gap, setGap] = useState(2);
  const capacity = jars === 'with' ? 2 : 1, threshold = 18 + gap * 8;
  const voltage = state.stored / capacity;
  const phase = phases[state.tick % 4];
  function reset(nextSeed = seed, nextJars = jars) { setRunning(false); setSeed(nextSeed); setJars(nextJars); setState({ ...initialMachine, strength: nextSeed === 'residual' ? 1 : 0 }); }
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setState(previous => machineStep(previous, seed === 'residual', neutralizer, capacity, threshold)), 650);
    return () => clearInterval(timer);
  }, [running, seed, neutralizer, capacity, threshold]);
  useEffect(() => {
    if (!state.flashed) return;
    const timer = window.setTimeout(() => setState(previous => ({ ...previous, flashed: false })), 600);
    return () => clearTimeout(timer);
  }, [state.flashed]);
  const symbols = Math.min(5, Math.ceil(voltage / 7));
  return <div className="ef-lab ef-influence-machine">
    <p>Eine Influenzmaschine trennt vorhandene Ladungen und erzeugt dadurch eine hohe Spannung. Die Energie kommt aus deiner Kurbelarbeit. Hier ist eine <b>Wimshurst-Maschine</b> mit zwei gegenläufigen Scheiben schematisch dargestellt.</p>
    <Task><ol><li>Kurble schrittweise. Beobachte die Sektoren, die Sammler und das Spannungsniveau.</li><li>Trenne den Neutralisator. Nimmt die gespeicherte Ladung weiter zu?</li><li>Vergleiche einen Neustart mit und ohne Leidener Flaschen. Wann entsteht der erste Funke?</li><li>Starte das ideale Modell ohne Restladung. Warum hilft Kurbeln allein dort nicht?</li></ol></Task>
    <div className="ef-machine-controls"><div className="ef-toolbar"><button type="button" disabled={running} onClick={() => setState(previous => machineStep(previous, seed === 'residual', neutralizer, capacity, threshold))}>Ein Stück kurbeln</button><button type="button" aria-pressed={running} onClick={() => setRunning(!running)}>{running ? 'Kurbel anhalten' : 'Kurbel starten'}</button><button type="button" disabled={!state.stored} onClick={() => { setRunning(false); setState(previous => ({ ...previous, stored: 0, flashed: false })); }}>Sammler entladen</button><button type="button" onClick={() => reset()}>Versuch zurücksetzen</button></div>
    <Choices label="Startbedingung (neuer Versuch)" value={seed} set={value => reset(value)} options={[{ value: 'residual', label: 'Mit kleiner Restladung' }, { value: 'none', label: 'Ideal ohne Restladung' }]} />
    <Choices label="Ladung speichern (neuer Versuch)" value={jars} set={value => reset(seed, value)} options={[{ value: 'with', label: 'Mit Leidener Flaschen' }, { value: 'without', label: 'Ohne Leidener Flaschen' }]} />
    <button className="ef-action" type="button" aria-pressed={neutralizer} onClick={() => setNeutralizer(!neutralizer)}>Neutralisator {neutralizer ? 'trennen' : 'verbinden'}</button>
    <Slider label="Funkenstrecke (relative Länge)" value={gap} set={setGap} min={1} max={3} />
    </div>
    <ZoomScene><svg className="ef-scene ef-machine-scene" viewBox="0 0 800 565" role="img" aria-label={`Influenzmaschine mit zwei gegenläufigen Scheiben; ${state.sparks} Funken; ${Math.round(voltage / threshold * 100)} Prozent des modellierten Überschlagsniveaus`}>
      <text x="400" y="25" textAnchor="middle" fill="#375541">Scheiben zur Übersicht nebeneinander dargestellt</text>
      <g fill="none" stroke="#849387" strokeWidth="4"><path d="M135 270H91V88H330 M665 270H709V88H470 M91 270V454 M709 270V454" /><path d="M135 239V301 M665 239V301" strokeWidth="5" />{[0, 1, 2, 3, 4].map(i => <path key={i} d={`M135 ${245 + i * 12}h12 M665 ${245 + i * 12}h-12`} strokeWidth="2" />)}</g>
      <Disc x={260} rotation={state.tick * 22.5} back={false} seedOnly={state.strength <= 1} strength={seed === 'residual' ? state.strength : 0} /><Disc x={540} rotation={-state.tick * 22.5} back strength={seed === 'residual' && state.strength > 1 ? state.strength : 0} />
      <g stroke={neutralizer ? '#b28843' : '#a8afa9'} strokeWidth="6" strokeDasharray={neutralizer ? undefined : '9 8'}><path d="M183 347L337 193 M463 193L617 347" /></g>
      <text x="400" y="154" textAnchor="middle" fill="#83632e">Neutralisatoren und Bürsten</text>
      <g><circle cx={370 - gap * 10} cy="88" r="21" fill="#829bc9" /><circle cx={430 + gap * 10} cy="88" r="21" fill="#dc8f96" /><path d={`M330 88H${370 - gap * 10} M470 88H${430 + gap * 10}`} stroke="#849387" strokeWidth="4" /><text x={370 - gap * 10} y="95" textAnchor="middle">−</text><text x={430 + gap * 10} y="95" textAnchor="middle">+</text></g>
      {state.flashed && <path className="ef-machine-spark" d={`M${392 - gap * 10} 88L390 75L409 95L420 77L${408 + gap * 10} 88`} stroke="#e2a72e" strokeWidth="5" fill="none" />}
      <text x="400" y="57" textAnchor="middle" fill="#375541">Funkenstrecke</text>
      <text x="84" y="323" textAnchor="middle" fill="#4862a5">Sammler −</text><text x="716" y="323" textAnchor="middle" fill="#b8485b">Sammler +</text>
      <text x="90" y="352" textAnchor="middle" fill="#4862a5">{'−'.repeat(symbols)}</text><text x="710" y="352" textAnchor="middle" fill="#b8485b">{'+'.repeat(symbols)}</text>
      {jars === 'with' ? <g><path d="M58 447V510H124V447 M676 447V510H742V447" fill="#e5ede7" stroke="#647867" strokeWidth="3" /><path d="M91 454V495 M709 454V495 M91 465H110 M709 465H690" stroke="#b28843" strokeWidth="5" /><path d="M124 499H676" stroke="#647867" strokeWidth="2" /><text x="91" y="540" textAnchor="middle">Leidener Flasche</text><text x="709" y="540" textAnchor="middle">Leidener Flasche</text></g> : <text x="400" y="532" textAnchor="middle">Nur die kleinere Kapazität der Anschlüsse</text>}
      <g transform={`translate(400 466) rotate(${state.tick * 22.5})`} stroke="#385641" strokeWidth="6"><circle r="29" fill="#e0ead8" /><path d="M0 0H57" /><circle cx="57" r="10" fill="#b28843" /></g><text x="400" y="555" textAnchor="middle">Kurbelarbeit → elektrische Energie</text>
    </svg></ZoomScene>
    <div className="ef-readings"><div><small>Sammler links · Modellladung</small><strong data-machine="negative">−{Math.round(state.stored)}</strong></div><div><small>Sammler rechts · Modellladung</small><strong data-machine="positive">+{Math.round(state.stored)}</strong></div><div><small>Funken bisher</small><strong data-machine="sparks">{state.sparks}</strong></div></div>
    <label className="ef-voltage-level">Spannungsniveau bis zum Überschlag<progress max={threshold} value={voltage} /><span>{Math.round(voltage / threshold * 100)} % · relative Modellskala</span></label>
    <div className="ef-machine-explanation" role="status"><b>{seed === 'none' ? 'Keine anfängliche Ladungsunsymmetrie' : !neutralizer ? 'Neutralisator getrennt' : state.tick === 0 ? 'Bereit: Eine kleine Restladung ist vorhanden' : state.flashed ? 'Funke: Ladungsausgleich!' : phase.title}</b><p>{seed === 'none' ? 'Im vollkommen neutralen, symmetrischen Idealmodell beginnt keine Verstärkung. In Wirklichkeit sind kleine Restladungen bzw. Unsymmetrien meist vorhanden.' : !neutralizer ? 'Im vereinfachten Modell wird ohne die leitende Verbindung über die Bürsten keine weitere Ladung gesammelt. Bereits gespeicherte Ladung bleibt erhalten.' : state.flashed ? 'Die Luft in der Funkenstrecke wird leitfähig. Ladung gleicht sich zwischen den Anschlüssen aus; das Spannungsniveau fällt. Danach kann die Maschine erneut aufladen.' : state.tick === 0 ? 'Mit der Kurbel setzt du die Scheiben in Bewegung. Die Ladungszeichen stellen Überschuss bzw. Mangel an Elektronen dar.' : phase.text}</p></div>
    <details className="ef-real"><summary>Aufbau und Funktionsweise genauer erklärt</summary><div><ol><li><b>Scheiben und Sektoren:</b> Zwei isolierende Scheiben tragen leitende Metallsegmente und drehen entgegengesetzt. Eine kleine anfängliche Ladungsunsymmetrie setzt die Verstärkung in Gang.</li><li><b>Neutralisatoren:</b> Leitende Stangen verbinden über Bürsten gegenüberliegende Segmente einer Scheibe. Die elektrische Wirkung benachbarter Ladungen verschiebt Elektronen in dieser Verbindung. Die Segmente werden mit entgegengesetzten Ladungen voneinander getrennt.</li><li><b>Rückkopplung und Sammler:</b> Geladene Segmente beeinflussen weitere Segmente. Spitze Sammelkämme übertragen Ladung auf die Anschlüsse. Dort entstehen Elektronenüberschuss und Elektronenmangel.</li><li><b>Leidener Flaschen:</b> Das sind Kondensatoren. Ihre inneren Beläge sind mit je einem Anschluss verbunden, die äußeren miteinander. Sie vergrößern die Speicherkapazität: Für dieselbe Spannung muss mehr Ladung getrennt werden. Ein Funke kann dadurch mehr Energie umsetzen.</li><li><b>Energiebilanz:</b> Beim Kurbeln leistest du Arbeit gegen elektrische Kräfte. Ladung wird getrennt, nicht aus dem Nichts erzeugt. Die Ladungsbilanz bleibt erhalten.</li></ol><p>Das Modell zeigt die Vorgänge nacheinander; in der echten Maschine laufen sie an vielen Sektoren gleichzeitig ab. Die Scheiben liegen dort dicht hintereinander. Farbbereiche und Zahlen sind qualitative Modellgrößen, keine Vorhersage realer Coulomb- oder Voltwerte. Leckströme und Luftfeuchtigkeit sind nicht modelliert. Am realen Hochspannungsgerät arbeitet die Lehrkraft nach Geräteanleitung; geladene Teile werden nicht berührt.</p><p className="ef-model">Zum Vertiefen: <a href="https://www.leifiphysik.de/elektrizitaetslehre/ladungen-felder-mittelstufe/versuche/influenzmaschine-von-holtz-und-wimshurst" target="_blank" rel="noreferrer">LEIFIphysik · Influenzmaschine</a> · <a href="https://www.coe.ufrj.br/~acmq/whyhow.html" target="_blank" rel="noreferrer">A. C. M. de Queiroz (UFRJ) · Funktionsprinzip</a></p></div></details>
  </div>;
}
