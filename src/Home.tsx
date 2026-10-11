import Link from './Link';
import cartoon from './electric/assets/physik-macht-spass.png';
const fields = [
  {slug: 'elektrisches-feld', title: 'Elektrisches Feld', text: 'Ladungen, Kräfte und Energie – mit vertrauten Experimenten und zehn Lernkapiteln.', symbol: 'E'},
  {slug: 'magnetisches-feld', title: 'Magnetisches Feld', text: 'Von Kompass und Spule zu Teilchenbahnen und dem Vergleich der drei Felder.', symbol: 'B'},
  {slug: 'elektrodynamik', title: 'Elektromagnetisches Feld', text: 'Elektrodynamik: Induktion, Generator, Transformator und das Zusammenspiel der Felder.', symbol: 'Φ'},
];
export default function Home() {
  return <main className="physics-home">
    <header className="site-header"><Link href="/" className="brand"><span className="physics-brand-mark">φ</span><span>Physik-Lernlabor</span></Link><nav aria-label="Hauptnavigation"><a href="#lernweg">Themen entdecken ↓</a></nav></header>
    <section className="physics-home-hero shell"><div><span className="kicker">ENTDECKEN · VERSTEHEN · AUSPROBIEREN</span><h1>Leistungsfach Physik.<br /><em>Ein Lernlabor.</em></h1><p>Wähle dein Thema. Experimentiere, halte deine Gedanken im Heft fest und entdecke die Physik Schritt für Schritt.</p><a className="button button-primary" href="#lernweg">Themen entdecken ↓</a></div><figure className="ef-cartoon"><img src={cartoon} width="1254" height="1254" alt="Eine neugierige Glühlampe freut sich über ein physikalisches Experiment." /><figcaption>Physik macht Spaß. Vor allem, wenn's klickt.</figcaption></figure></section>
    <section className="shell physics-topics" id="lernweg"><span className="kicker">KLASSEN 11/12 · LEISTUNGSFACH</span><h2>Themen</h2><div className="topic-group-heading"><h3>Elektromagnetische Felder</h3><p>Drei Lernbereiche. Du entscheidest, wo du einsteigst.</p></div><div className="topic-fields">{fields.map(field => <Link key={field.slug} href={`/kapitel/${field.slug}`} className="topic-card"><div><span className="topic-symbol" aria-hidden="true">{field.symbol}</span><span className="physics-status">Bereit zum Entdecken</span></div><h3>{field.title}</h3><p>{field.text}</p><span className="topic-open">Kapitel wählen →</span></Link>)}</div><div className="topic-upcoming">{['Denk- und Arbeitsweisen der Physik', 'Schwingungen', 'Wellen', 'Wellenoptik', 'Quantenphysik und Materie', 'Vertiefendes Themengebiet'].map(title => <article key={title}><span className="physics-status">In Vorbereitung</span><h3>{title}</h3></article>)}</div></section>
    <footer><div className="shell"><strong>Physik-Lernlabor</strong><span>Leistungsfach · Kursstufe · Baden-Württemberg</span><em>Neugierig bleiben.</em></div></footer>
  </main>;
}
