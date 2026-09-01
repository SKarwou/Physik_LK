import Link from "./Link";
import { chapters } from "./chapters";

function OrbitMark() {
  return <div className="orbit-mark" aria-hidden="true"><span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="nucleus" /></div>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link href="/" className="brand"><OrbitMark /><span>Physik-Lernlabor</span></Link>
        <nav aria-label="Hauptnavigation"><a href="#lernweg">Lernweg</a><a href="#arbeitsweise">So arbeitest du</a></nav>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <span className="kicker">Leistungsfach · Baden-Württemberg · Kursstufe</span>
          <h1>Physik verstehen.<br /><em>Argumentieren.</em> Anwenden.</h1>
          <p>Ein ausführlicher Lernweg für zwei Schuljahre: vom elektrischen Feld bis zur Quantenphysik – mit Herleitungen, Beispielen, Experimenten, Rechenaufgaben und abiturtypischen Begründungen.</p>
          <div className="hero-actions"><a className="button button-primary" href="#lernweg">Kapitel entdecken</a><span className="motto">✦ Physik macht Spaß!</span></div>
          <dl className="hero-stats"><div><dt>15</dt><dd>Lernkapitel</dd></div><div><dt>2</dt><dd>Schuljahre</dd></div><div><dt>AFB I–III</dt><dd>Abiturniveau</dd></div></dl>
        </div>
        <div className="hero-visual" aria-label="Abstrakte Darstellung physikalischer Modelle">
          <div className="field-card"><span className="field-dot dot-a">+</span><span className="field-dot dot-b">−</span><div className="field-lines"><i /><i /><i /><i /><i /></div><p>Beobachten <b>→</b> Modellieren <b>→</b> Prüfen</p></div>
          <div className="formula-chip chip-a">E = F/q</div><div className="formula-chip chip-b">E = h·f</div><div className="formula-chip chip-c">c = λ·f</div>
        </div>
      </section>

      <section className="shell intro-grid" id="arbeitsweise">
        <article><span>01</span><h2>Erst verstehen</h2><p>Jedes Kapitel beginnt anschaulich und führt Begriffe, Modelle und Formeln schrittweise ein.</p></article>
        <article><span>02</span><h2>Dann rechnen</h2><p>Vollständig vorgerechnete Beispiele zeigen Ansatz, Einheitenkontrolle und Plausibilitätsprüfung.</p></article>
        <article><span>03</span><h2>Schließlich urteilen</h2><p>Argumentationsaufgaben trainieren Operatoren wie erklären, beurteilen und bewerten.</p></article>
      </section>

      <section className="shell chapter-section" id="lernweg">
        <div className="section-heading"><div><span className="kicker">Dein Lernweg</span><h2>Vom Messen bis zum Quantenmodell</h2></div><p>Die Reihenfolge folgt dem zweijährigen Kurs. Du kannst trotzdem jederzeit in ein Kapitel einsteigen.</p></div>
        <div className="chapter-grid">
          {chapters.map((chapter, index) => (
            <Link key={chapter.slug} href={`/kapitel/${chapter.slug}`} className="chapter-card">
              <div className={`chapter-icon tone-${(index % 5) + 1}`}>{chapter.symbol}</div>
              <div className="chapter-meta"><span>Kapitel {String(index + 1).padStart(2, "0")}</span><span>{chapter.hours} UStd.</span></div>
              <h3>{chapter.title}</h3><p>{chapter.teaser}</p>
              <div className="chapter-tags">{chapter.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <b className="card-link">Kapitel öffnen <span>→</span></b>
            </Link>
          ))}
        </div>
      </section>

      <footer><div className="shell"><strong>Physik-Lernlabor</strong><span>Leistungsfach · Kursstufe 11/12 · Baden-Württemberg</span><em>Physik macht Spaß ✦</em></div></footer>
    </main>
  );
}
