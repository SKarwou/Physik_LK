import { useState } from 'react';
import { Chart, downloadCsv, fmt } from './LabUI';
import { MathText } from './Math';

const worksheets = [
  {
    id: 'feldkraft', title: '1 · Aus der Steigung wird eine Feldstärke',
    context: 'Eine positive Probeladung wird im selben homogenen Feld verändert. Eine Kraftmessung liefert folgende Werte:',
    xLabel: 'q in nC', yLabel: 'F in µN', xMax: 5, yMax: 12, ySteps: 6,
    values: [[1, 2.1], [2, 3.9], [3, 6.1], [4, 7.8], [5, 10.1]],
    tasks: ['Zeichne ein F-q-Diagramm und trage die Messwerte als kleine Kreuze ein.', 'Zeichne mit dem Lineal eine passende Ausgleichsgerade durch den Ursprung. Sie muss nicht durch jeden Messpunkt gehen.', 'Bestimme die Steigung mit einem großen Steigungsdreieck. Berechne daraus die Feldstärke in N/C.'],
    solution: String.raw`Die Punkte liegen ungefähr auf einer Ursprungsgeraden. $E=\frac{\Delta F}{\Delta q}\approx\frac{10\,\mathrm{\mu N}}{5\,\mathrm{nC}}=2{,}0\cdot10^3\,\frac{\mathrm{N}}{\mathrm{C}}$. Verwende für das Steigungsdreieck Punkte auf deiner Ausgleichsgeraden.`,
  },
  {
    id: 'coulomb', title: '2 · Was verrät der Abstand?',
    context: 'Zwei kleine geladene Kugeln tragen unveränderte Ladungen. Gemessen wird die Kraft bei verschiedenen Mittelpunktabständen.',
    xLabel: 'r in cm', yLabel: 'F in mN', xMax: 25, yMax: 1,
    values: [[5, .720], [10, .180], [15, .081], [20, .044], [25, .029]],
    tasks: ['Zeichne ein F-r-Diagramm. Trage zunächst nur Messkreuze ein.', 'Prüfe mit zwei Wertepaaren: Was passiert bei doppeltem Abstand? Formuliere eine Vermutung.', 'Berechne für alle Abstände 1/r² in 1/m². Zeichne im Heft ein zweites Diagramm F gegen 1/r² und eine passende Ausgleichsgerade.'],
    solution: String.raw`Bei doppeltem Abstand wird die Kraft ungefähr geviertelt: $F\propto\frac{1}{r^2}$. Die neuen x-Werte sind etwa $400;\ 100;\ 44{,}4;\ 25;\ 16\,\mathrm{m^{-2}}$. Im zweiten Diagramm liegen die Punkte annähernd auf einer Ursprungsgeraden.`,
  },
  {
    id: 'potential', title: '3 · Vom Potential zum Feld',
    context: 'Zwischen zwei parallelen Elektroden liegen 20 cm. Die Bezugselektrode bei x = 20 cm hat das Potential 0 V. Entlang der Feldrichtung wird gemessen:',
    xLabel: 'x in cm', yLabel: 'φ in V', xMax: 20, yMax: 10,
    values: [[0, 10], [4, 8.1], [8, 5.9], [12, 4.1], [16, 2.0], [20, 0]],
    tasks: ['Zeichne das φ-x-Diagramm mit Messkreuzen und einer Ausgleichsgeraden.', 'Bestimme den Betrag der Steigung. Rechne die Strecke in Meter um und ermittle daraus die Feldstärke.', 'Zeichne neben das Diagramm zwei Platten, drei Äquipotentiallinien und Feldpfeile. In welche Richtung zeigen die Pfeile?'],
    solution: String.raw`Das Potential nimmt annähernd linear ab. $E=\left|\frac{\Delta\varphi}{\Delta x}\right|\approx\frac{10\,\mathrm V}{0{,}20\,\mathrm m}=50\,\frac{\mathrm{V}}{\mathrm{m}}$. Die Feldpfeile zeigen von links nach rechts, zum kleineren Potential. Äquipotentiallinien verlaufen parallel zu den Platten.`,
  },
  {
    id: 'rc', title: '4 · Eine Entladung zeichnen',
    context: 'Ein auf 10 V geladener Kondensator wird über einen Widerstand entladen. Ein Voltmeter zeichnet die Spannung auf.',
    xLabel: 't in s', yLabel: 'U_C in V', xMax: 5, yMax: 10,
    values: [[0, 10.0], [.5, 6.1], [1, 3.7], [1.5, 2.2], [2, 1.4], [3, .5], [4, .2], [5, .1]],
    tasks: ['Übertrage die Messwerte in ein Spannung-Zeit-Diagramm. Verwende einzelne Messkreuze.', 'Skizziere von Hand eine glatte Ausgleichskurve. Verbinde die Messpunkte nicht als Zickzacklinie.', 'Lies die Zeit ab, bei der noch etwa 37 % der Anfangsspannung vorhanden sind. Was bedeutet diese Zeit?'],
    solution: String.raw`Es entsteht näherungsweise ein exponentieller Abfall. Bei $U_C\approx3{,}7\,\mathrm V$ liest man $t\approx1{,}0\,\mathrm s$ ab. Das ist die Zeitkonstante $\tau=R\cdot C$. Die Kurve nähert sich null; sie schneidet die Zeitachse im idealen Modell nicht.`,
  },
];

function PlottingTask({ sheet }: { sheet: typeof worksheets[number] }) {
  const [show, setShow] = useState(false);
  return <article className="ef-plot-task">
    <span className="ef-eyebrow">MESSWERTE → EIGENES DIAGRAMM · AFB I–II</span>
    <h3>{sheet.title}</h3><p>{sheet.context}</p>
    <div className="ef-table-wrap"><table><caption>Simulierte Messwerte mit kleiner Streuung für diese Zeichenaufgabe</caption><tbody>
      <tr><th scope="row">{sheet.xLabel}</th>{sheet.values.map(([x], i) => <td key={i}>{fmt(x, Number.isInteger(x) ? 0 : 1)}</td>)}</tr>
      <tr><th scope="row">{sheet.id === 'rc' ? <><MathText>{'$U_C$'}</MathText> in V</> : sheet.yLabel}</th>{sheet.values.map(([, y], i) => <td key={i}>{fmt(y, sheet.id === 'coulomb' ? 3 : 1)}</td>)}</tr>
    </tbody></table></div>
    <ol>{sheet.tasks.map(task => <li key={task}><MathText>{task}</MathText></li>)}</ol>
    <p className="ef-plot-instruction">Zeichne zuerst im Heft oder im ausgedruckten Raster. Die Vergleichspunkte bleiben bis zu deiner Kontrolle ausgeblendet.</p>
    <div className="ef-plot-screen"><Chart {...sheet} dots={show ? sheet.values.map(([x, y]) => ({ x, y })) : []} blank={!show} /></div>
    <div className="ef-plot-print"><Chart {...sheet} blank /></div>
    <div className="ef-toolbar"><button type="button" aria-pressed={show} onClick={() => setShow(!show)}>{show ? 'Diagramm ausblenden' : 'Diagramm zeichnen'}</button><button type="button" onClick={() => downloadCsv(`${sheet.id}-zeichenaufgabe.csv`, [[sheet.xLabel, sheet.yLabel], ...sheet.values.map(row => row.map(n => String(n).replace('.', ',')))])}>Messwerte als CSV</button></div>
    <details className="ef-plot-solution"><summary>Auswertung zur Selbstkontrolle</summary><p><MathText>{sheet.solution}</MathText></p></details>
  </article>;
}

export default function PlottingTasks() {
  return <div className="ef-plotting"><h3>Diagrammwerkstatt · Jetzt zeichnest du</h3><p>Vier Messreihen, vier eigene Diagramme. Die Werte sind didaktisch simuliert und leicht gestreut; sie stammen nicht aus einem real durchgeführten Versuch. Die Simulationen oben liefern dagegen ideale Modellwerte.</p><p>Beschrifte immer beide Achsen mit Größe und Einheit. Die Raster geben dir eine mögliche Skalierung vor. Messpunkte werden nicht automatisch verbunden; eine Ausgleichsgerade oder Ausgleichskurve zeichnest du selbst.</p>{worksheets.map(sheet => <PlottingTask key={sheet.id} sheet={sheet} />)}</div>;
}
