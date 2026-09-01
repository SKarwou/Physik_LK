import { useMemo, useState } from "react";

type Variable = { key: string; label: string; min: number; max: number; step: number; initial: number; unit: string };
type LabSpec = { variables: Variable[]; calculate: (v: Record<string, number>) => { value: string; label: string; detail: string; meter: number } };

const k = 8.9875517923e9;
const h = 6.62607015e-34;
const e = 1.602176634e-19;
const me = 9.1093837e-31;
const u = 1.6605390666e-27;

const specs: Record<string, LabSpec> = {
  reaction: {
    variables: [{ key: "s", label: "Fangstrecke", min: 5, max: 40, step: 0.5, initial: 18, unit: "cm" }],
    calculate: ({ s }) => ({ value: `${Math.sqrt(2 * s / 100 / 9.81).toFixed(3)} s`, label: "Reaktionszeit", detail: "t wächst mit der Quadratwurzel aus s – nicht proportional.", meter: s / 40 }),
  },
  coulomb: {
    variables: [
      { key: "q1", label: "Ladung Q₁", min: 5, max: 80, step: 1, initial: 20, unit: "nC" },
      { key: "q2", label: "Ladung Q₂", min: 5, max: 80, step: 1, initial: 35, unit: "nC" },
      { key: "r", label: "Abstand r", min: 2, max: 20, step: 0.5, initial: 6, unit: "cm" },
    ],
    calculate: ({ q1, q2, r }) => { const f = k * q1 * 1e-9 * q2 * 1e-9 / (r / 100) ** 2; return { value: `${(f * 1e3).toFixed(3)} mN`, label: "Coulomb-Kraft", detail: "Verdopple r: Der Kraftbetrag fällt auf ein Viertel.", meter: Math.min(1, f / .01) }; },
  },
  particleE: {
    variables: [
      { key: "E", label: "Feldstärke", min: 1, max: 100, step: 1, initial: 40, unit: "kN/C" },
      { key: "q", label: "Ladungszahl", min: 1, max: 3, step: 1, initial: 1, unit: "e" },
      { key: "m", label: "Masse", min: 1, max: 40, step: 1, initial: 1, unit: "u" },
    ],
    calculate: ({ E, q, m }) => { const a = q * e * E * 1e3 / (m * u); return { value: `${a.toExponential(2)} m/s²`, label: "Beschleunigung", detail: "Größere Ladung verstärkt, größere Masse verringert a.", meter: Math.min(1, a / 1e13) }; },
  },
  capacitor: {
    variables: [
      { key: "R", label: "Widerstand", min: 1, max: 100, step: 1, initial: 15, unit: "kΩ" },
      { key: "C", label: "Kapazität", min: 10, max: 500, step: 10, initial: 220, unit: "μF" },
      { key: "U", label: "Spannung", min: 1, max: 24, step: 1, initial: 12, unit: "V" },
    ],
    calculate: ({ R, C, U }) => { const tau = R * 1e3 * C * 1e-6; const energy = .5 * C * 1e-6 * U ** 2; return { value: `${tau.toFixed(2)} s · ${(energy * 1e3).toFixed(1)} mJ`, label: "Zeitkonstante · Energie", detail: "R verändert τ, aber bei festem C und U nicht die gespeicherte Energie.", meter: Math.min(1, tau / 20) }; },
  },
  magnetic: {
    variables: [
      { key: "B", label: "Magnetfeld", min: 1, max: 200, step: 1, initial: 80, unit: "mT" },
      { key: "v", label: "Geschwindigkeit", min: 1, max: 30, step: 1, initial: 8, unit: "10⁵ m/s" },
      { key: "m", label: "Teilchenmasse", min: 1, max: 40, step: 1, initial: 4, unit: "u" },
    ],
    calculate: ({ B, v, m }) => { const radius = m * u * v * 1e5 / (e * B * 1e-3); return { value: `${(radius * 100).toFixed(2)} cm`, label: "Kreisbahnradius", detail: "Bei gleicher Ladung gilt r ∝ m·v/B.", meter: Math.min(1, radius / 2) }; },
  },
  crossed: {
    variables: [
      { key: "E", label: "Elektrisches Feld", min: 5, max: 100, step: 1, initial: 30, unit: "kV/m" },
      { key: "B", label: "Magnetfeld", min: 20, max: 500, step: 10, initial: 200, unit: "mT" },
    ],
    calculate: ({ E, B }) => { const v = E * 1e3 / (B * 1e-3); return { value: `${v.toExponential(2)} m/s`, label: "Durchlassgeschwindigkeit", detail: "Die Ladung kürzt sich im Kräftegleichgewicht heraus.", meter: Math.min(1, v / 3e6) }; },
  },
  induction: {
    variables: [
      { key: "N", label: "Windungszahl", min: 50, max: 1200, step: 50, initial: 500, unit: "" },
      { key: "phi", label: "Flussänderung", min: .05, max: 2, step: .05, initial: .84, unit: "mWb" },
      { key: "dt", label: "Änderungszeit", min: 10, max: 500, step: 10, initial: 80, unit: "ms" },
    ],
    calculate: ({ N, phi, dt }) => { const voltage = N * phi * 1e-3 / (dt * 1e-3); return { value: `${voltage.toFixed(2)} V`, label: "Mittlere Induktionsspannung", detail: "Schnellere Flussänderung und mehr Windungen erhöhen |U_ind|.", meter: Math.min(1, voltage / 30) }; },
  },
  oscillation: {
    variables: [
      { key: "m", label: "Masse", min: .05, max: 2, step: .05, initial: .4, unit: "kg" },
      { key: "D", label: "Federkonstante", min: 5, max: 100, step: 1, initial: 25, unit: "N/m" },
    ],
    calculate: ({ m, D }) => { const T = 2 * Math.PI * Math.sqrt(m / D); return { value: `${T.toFixed(3)} s`, label: "Periodendauer", detail: "T wächst mit √m und fällt mit 1/√D.", meter: Math.min(1, T / 3) }; },
  },
  wave: {
    variables: [
      { key: "f", label: "Frequenz", min: 50, max: 1000, step: 10, initial: 340, unit: "Hz" },
      { key: "lambda", label: "Wellenlänge", min: .1, max: 3, step: .05, initial: 1, unit: "m" },
    ],
    calculate: ({ f, lambda }) => ({ value: `${(f * lambda).toFixed(1)} m/s`, label: "Ausbreitungsgeschwindigkeit", detail: "In einem festen Medium ist c fest; dann sind f und λ umgekehrt proportional.", meter: Math.min(1, f * lambda / 1200) }),
  },
  optics: {
    variables: [
      { key: "lambda", label: "Wellenlänge", min: 380, max: 700, step: 5, initial: 532, unit: "nm" },
      { key: "d", label: "Spaltabstand", min: .1, max: 1, step: .05, initial: .25, unit: "mm" },
      { key: "L", label: "Schirmabstand", min: .5, max: 3, step: .1, initial: 2, unit: "m" },
    ],
    calculate: ({ lambda, d, L }) => { const y = lambda * 1e-9 * L / (d * 1e-3); return { value: `${(y * 1e3).toFixed(2)} mm`, label: "Streifenabstand", detail: "Kleinwinkelnäherung: Δy ≈ λL/d.", meter: Math.min(1, y / .02) }; },
  },
  photoelectric: {
    variables: [
      { key: "f", label: "Frequenz", min: 4, max: 12, step: .1, initial: 8, unit: "10¹⁴ Hz" },
      { key: "W", label: "Austrittsarbeit", min: 1.5, max: 5, step: .05, initial: 2.3, unit: "eV" },
    ],
    calculate: ({ f, W }) => { const energy = h * f * 1e14 / e; const kinetic = Math.max(0, energy - W); return { value: kinetic > 0 ? `${kinetic.toFixed(2)} eV` : "kein Austritt", label: "Maximale kinetische Energie", detail: kinetic > 0 ? "Die Photonenergie übersteigt die Austrittsarbeit." : "Die Frequenz liegt unter der Grenzfrequenz.", meter: Math.min(1, kinetic / 4) }; },
  },
  uncertainty: {
    variables: [{ key: "dx", label: "Ortsstreuung", min: .05, max: 5, step: .05, initial: .2, unit: "nm" }],
    calculate: ({ dx }) => { const dp = h / (4 * Math.PI * dx * 1e-9); return { value: `${dp.toExponential(2)} kg·m/s`, label: "Minimale Impulsstreuung", detail: "Kleinere Ortsstreuung erzwingt eine größere Impulsstreuung.", meter: Math.min(1, .2 / dx) }; },
  },
  atom: {
    variables: [
      { key: "ni", label: "Anfangsniveau nᵢ", min: 2, max: 8, step: 1, initial: 3, unit: "" },
      { key: "nf", label: "Endniveau n𝒇", min: 1, max: 5, step: 1, initial: 2, unit: "" },
    ],
    calculate: ({ ni, nf }) => {
      const high = Math.max(ni, nf);
      const low = Math.min(ni, nf);
      if (high === low) return { value: "0 eV · keine Spektrallinie", label: "Kein Übergang", detail: "Anfangs- und Endniveau sind gleich. Deshalb wird weder ein Photon emittiert noch absorbiert.", meter: 0 };
      const de = 13.6 * (1 / low ** 2 - 1 / high ** 2);
      const lambda = 1239.841984 / de;
      return { value: `${de.toFixed(3)} eV · ${lambda.toFixed(0)} nm`, label: "Photonenergie · Wellenlänge", detail: `Übergang zwischen n=${high} und n=${low}.`, meter: Math.min(1, de / 13.6) };
    },
  },
  laser: {
    variables: [{ key: "de", label: "Energiedifferenz", min: .8, max: 4, step: .02, initial: 1.96, unit: "eV" }],
    calculate: ({ de }) => { const lambda = 1239.841984 / de; const region = lambda < 380 ? "UV" : lambda > 780 ? "Infrarot" : "sichtbar"; return { value: `${lambda.toFixed(0)} nm · ${region}`, label: "Laserwellenlänge", detail: "Größere Energiedifferenz bedeutet kürzere Wellenlänge.", meter: Math.min(1, de / 4) }; },
  },
  exam: {
    variables: [
      { key: "points", label: "Gesamtpunkte", min: 40, max: 120, step: 5, initial: 90, unit: "P" },
      { key: "time", label: "Gesamtzeit", min: 180, max: 300, step: 10, initial: 300, unit: "min" },
      { key: "check", label: "Kontrollreserve", min: 10, max: 45, step: 5, initial: 25, unit: "min" },
    ],
    calculate: ({ points, time, check }) => { const perPoint = (time - check) / points; return { value: `${perPoint.toFixed(2)} min/P`, label: "Arbeitszeit pro Punkt", detail: `${check} Minuten bleiben für Kontrolle und Rückkehr zu markierten Stellen.`, meter: Math.min(1, perPoint / 5) }; },
  },
};

export default function PhysicsLab({ kind, title, intro }: { kind: string; title: string; intro: string }) {
  const spec = specs[kind] ?? specs.reaction;
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(spec.variables.map((v) => [v.key, v.initial])));
  const result = useMemo(() => spec.calculate(values), [spec, values]);

  return (
    <section className="physics-lab" aria-label={title}>
      <div className="lab-intro"><span>Interaktives Labor</span><h2>{title}</h2><p>{intro}</p></div>
      <div className="lab-grid">
        <div className="lab-controls">
          {spec.variables.map((variable) => (
            <label key={variable.key}>
              <span>{variable.label}<b>{values[variable.key]} {variable.unit}</b></span>
              <input type="range" min={variable.min} max={variable.max} step={variable.step} value={values[variable.key]} onChange={(event) => setValues((old) => ({ ...old, [variable.key]: Number(event.target.value) }))} />
            </label>
          ))}
        </div>
        <div className="lab-result">
          <div className="result-orbit"><i style={{ transform: `scale(${0.55 + result.meter * .5})` }} /></div>
          <span>{result.label}</span><strong>{result.value}</strong><p>{result.detail}</p>
        </div>
      </div>
    </section>
  );
}
