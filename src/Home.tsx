import Link from './Link';
import { chapters } from './chapters';
import cartoon from './electric/assets/physik-macht-spass.png';

export default function Home() {
  const electric = chapters.find(chapter => chapter.slug === 'elektrisches-feld')!;
  const upcoming = chapters.filter(chapter => chapter.slug !== 'elektrisches-feld');
  return <main className="physics-home">
    <header className="site-header"><Link href="/" className="brand"><span className="physics-brand-mark">φ</span><span>Physik-Lernlabor</span></Link><nav aria-label="Hauptnavigation"><a href="#lernweg">Die Themen ↓</a><Link href="/kapitel/elektrisches-feld">Zum ersten Kapitel →</Link></nav></header>
    <section className="physics-home-hero shell"><div><span className="kicker">ENTDECKEN · VERSTEHEN · AUSPROBIEREN</span><h1>Leistungsfach<br />Physik.<br /><em>Ein Lernlabor.</em></h1><p>Was steckt hinter den Dingen, die du beobachtest? Finde es heraus – mit Experimenten zum Anklicken, klaren Erklärungen und Aufgaben zum Selberdenken.</p><div className="ef-hero-actions"><Link className="button button-primary" href="/kapitel/elektrisches-feld">Mit Kapitel 01 starten →</Link><a href="#lernweg">Themen entdecken ↓</a></div></div><figure className="ef-cartoon"><img src={cartoon} width="1254" height="1254" alt="Eine neugierige Glühlampe freut sich über ein physikalisches Experiment." /><figcaption>Physik macht Spaß. Vor allem, wenn's klickt.</figcaption></figure></section>
    <section className="shell physics-first-chapter" id="lernweg"><div><span className="kicker">KAPITEL 01 · BEREIT ZUM ENTDECKEN</span><h2>{electric.title}</h2><p>Starte mit den Grundlagen aus der Mittelstufe. Kurble an der Influenzmaschine, zeichne Feldlinien und sammle eigene Messwerte.</p><div className="chapter-tags"><span>Teil 00–09</span><span>Interaktive Experimente</span><span>Lexikon & Übungen</span></div></div><Link className="button button-primary" href="/kapitel/elektrisches-feld">Kapitel öffnen →</Link></section>
    <section className="shell physics-upcoming"><span className="kicker">DAS KOMMT ALS NÄCHSTES</span><h2>Der Lernweg wächst weiter.</h2><p>Wir starten mit dem elektrischen Feld. Die weiteren Kapitel werden nach und nach ausgearbeitet.</p><div className="physics-upcoming-grid">{upcoming.map(chapter => <article key={chapter.slug}><span className="physics-status">In Vorbereitung</span><h3>{chapter.title}</h3><p>{chapter.teaser}</p></article>)}</div></section>
    <footer><div className="shell"><strong>Physik-Lernlabor</strong><span>Leistungsfach · Kursstufe · Baden-Württemberg</span><em>Neugierig bleiben.</em></div></footer>
  </main>;
}
