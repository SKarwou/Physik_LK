import { MathText } from './Math';

export type DataRow = (string | number)[];
export function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: DataRow[] }) {
  return <div className="ef-table-wrap"><table><caption><MathText>{caption}</MathText></caption><thead><tr>{headers.map(header => <th key={header} scope="col"><MathText>{header}</MathText></th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((value, j) => <td key={j}>{typeof value === 'number' ? value.toLocaleString('de-DE', { maximumSignificantDigits: 4 }) : <MathText>{value}</MathText>}</td>)}</tr>)}</tbody></table></div>;
}
export function NotebookData({ title = 'Ersatzdaten für die Auswertung im Heft', description, headers, rows, tasks, solution }: { title?: string; description: string; headers: string[]; rows: DataRow[]; tasks: string[]; solution: string }) {
  return <section className="ef-notebook-data"><p><b>✎ Auswertung im Heft:</b> Halte Aufbau, Einstellungen und eigene Beobachtungen auf Papier fest. Falls der Versuch nicht möglich ist, öffne die ausgefüllten Ersatzdaten.</p><details className="ef-real"><summary>{title}</summary><p><MathText>{description}</MathText></p><DataTable caption="Didaktische Beispieldaten · keine im Unterricht aufgenommenen Messwerte" headers={headers} rows={rows} /></details><ol>{tasks.map(task => <li key={task}><MathText>{task}</MathText></li>)}</ol><details className="ef-plot-solution"><summary>Erst nach der Heftauswertung: Lösung und Interpretation</summary><p><MathText>{solution}</MathText></p></details></section>;
}
