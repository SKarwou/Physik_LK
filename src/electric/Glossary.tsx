import { useState } from 'react';
import { MathFormula, MathText } from './Math';
import groups from './glossary.json';
import studentDocument from './assets/Glossar_Elektrisches_Feld_Schueler.docx?url';
import teacherDocument from './assets/Glossar_Elektrisches_Feld_Lehrkraft.docx?url';

const searchable = (value: string) => value.toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll('ß', 'ss');
const notation = (value: string) => value.replace(/\b(U_AB|U_C|E_pot|v_y)\b/g, '$$$1$$').replace('q/m', '$\\frac{q}{m}$');
export default function Glossary() {
  const [query, setQuery] = useState(''), [topic, setTopic] = useState('all');
  const [solutions, setSolutions] = useState(false), [opened, setOpened] = useState<number[]>([]);
  const count = groups.reduce((sum, group) => sum + group.entries.length, 0);
  const visible = groups.filter(group => topic === 'all' || String(group.id) === topic).map(group => ({ ...group, entries: group.entries.filter(entry => searchable(entry.term).includes(searchable(query.trim()))) })).filter(group => group.entries.length);
  return <section id="glossar" className="ef-glossary-workbook ef-lexicon" aria-labelledby="glossary-heading">
    <span className="ef-eyebrow">DEIN FACHWORTSCHATZ</span><h3 id="glossary-heading">Das Physik-Lexikon</h3>
    <p>Die Fachbegriffe des Kapitels auf einen Blick. Erkläre einen Begriff zuerst selbst und öffne ihn anschließend zum Nachschlagen oder Abschreiben. Unter jedem Begriff findest du die Mustererklärung, passende Formeln und wichtige Bedingungen. Darunter wird jedes Formelzeichen einzeln erklärt – mit Bedeutung und Einheit. Ein Pfeil über einem Zeichen kennzeichnet einen Vektor; Δ bedeutet Endwert minus Anfangswert.</p>
    <div className="ef-glossary-controls"><label>Fachbegriff suchen<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="z. B. Potential oder Feldstärke" /></label><label>Themenbereich<select value={topic} onChange={event => setTopic(event.target.value)}><option value="all">Alle Themenbereiche</option>{groups.map(group => <option key={group.id} value={group.id}>{group.title}</option>)}</select></label></div>
    <div className="ef-glossary-progress"><span>{visible.reduce((sum, group) => sum + group.entries.length, 0)} von {count} Begriffen</span></div>
    <div className="ef-toolbar"><button type="button" aria-expanded={solutions} onClick={() => { setSolutions(!solutions); setOpened([]); }}>{solutions ? 'Musterlösungen ausblenden' : 'Alle Musterlösungen einblenden'}</button></div>
    <div className="ef-lexicon-downloads"><a href={studentDocument} download="Glossar_Elektrisches_Feld_Schueler.docx">Begriffsliste zum Ausfüllen · Word</a><details><summary>Word-Fassung mit Erwartungshorizont</summary><p><a href={teacherDocument} download="Glossar_Elektrisches_Feld_Lehrkraft.docx">Lehrkraftfassung herunterladen</a></p></details><small>Ältere Word-Vorlagen: 57 ursprüngliche Begriffe, noch ohne die neuen Symbolerklärungen und die überarbeitete Energie-Schreibweise. Maßgeblich für dieses Kapitel ist das aktualisierte Online-Lexikon mit 64 Begriffen.</small></div>
    {!visible.length && <p role="status">Kein Fachbegriff gefunden. Probiere einen kürzeren Suchbegriff oder wähle alle Themenbereiche.</p>}
    {visible.map(group => <section key={group.id} className="ef-lexicon-group"><h4>{group.title}</h4><div className="ef-lexicon-grid">{group.entries.map(entry => {
      const show = solutions || opened.includes(entry.id);
      return <details key={entry.id} className="ef-lexicon-entry" data-term={entry.id} open={show} onToggle={event => {
        if (solutions) return;
        const isOpen = event.currentTarget.open;
        setOpened(previous => isOpen ? previous.includes(entry.id) ? previous : [...previous, entry.id] : previous.filter(id => id !== entry.id));
      }}><summary>{entry.term}</summary><div className="ef-glossary-answer"><b>Mustererklärung / Erwartungshorizont</b><p><MathText>{notation(entry.explanation)}</MathText></p>{entry.details.map((detail, i) => 'tex' in detail ? <MathFormula key={i} tex={detail.tex!} display /> : <p key={i}><MathText>{notation(detail.text!)}</MathText></p>)}{entry.quantities.length > 0 && <div className="ef-symbol-explanations"><h5>Größen und Formelzeichen erklärt</h5><dl>{entry.quantities.map(quantity => <div key={quantity.symbol}><dt><MathFormula tex={quantity.symbol} /></dt><dd><MathText>{notation(quantity.meaning)}</MathText><small><b>Einheit:</b> <MathText>{quantity.unit}</MathText></small></dd></div>)}</dl></div>}</div></details>;
    })}</div>{solutions && <p className="ef-glossary-topic-note"><MathText>{notation(group.note)}</MathText></p>}</section>)}
  </section>;
}
