import Link from "./Link";
import { chapters } from "./chapters";
import PhysicsLab from "./components/PhysicsLab";
import SolutionVault from "./components/SolutionVault";

export default function ModulePage({ slug }: { slug: string }) {
  const chapter = chapters.find((item) => item.slug === slug);
  if (!chapter) return <main className="empty-state"><h1>Kapitel nicht gefunden</h1><Link href="/">Zur Übersicht</Link></main>;

  return (
    <main>
      <header className="site-header compact">
        <Link href="/" className="brand"><span className="mini-atom">✦</span><span>Physik-Lernlabor</span></Link>
        <Link href="/" className="back-link">← Alle Kapitel</Link>
      </header>
      <article className="chapter-page shell">
        <header className="chapter-hero">
          <span className="kicker">{chapter.area} · etwa {chapter.hours} Unterrichtsstunden</span>
          <div className="chapter-title-row"><span className="chapter-number">{chapter.symbol}</span><div><h1>{chapter.title}</h1><p>{chapter.lead}</p></div></div>
          <div className="goal-list">{chapter.goals.map((goal) => <span key={goal}>✓ {goal}</span>)}</div>
        </header>

        <nav className="chapter-nav" aria-label="Kapitelinhalt">
          <a href="#theorie">Theorie</a><a href="#schaubild">Schaubild</a><a href="#labor">Labor</a><a href="#beispiel">Beispiel</a><a href="#experiment">Experiment</a><a href="#uebungen">Übungen</a><a href="#loesungen">Lösungen</a>
        </nav>

        <section id="theorie" className="content-section theory-section">
          <span className="section-index">01 · VERSTEHEN</span><h2>Theorie – Schritt für Schritt</h2>
          {chapter.theorySections.map((section) => <section className="theory-block" key={section.title}><h3>{section.title}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 42)}>{paragraph}</p>)}</section>)}
          <aside className="memory-card"><span>Merksatz</span><p>{chapter.memory}</p></aside>
        </section>

        <section id="schaubild" className="concept-flow" aria-label="Schaubild zum Kapitel">
          <div><span className="section-index">SCHAUBILD</span><h2>Der Denkweg im Kapitel</h2></div>
          <div className="flow-track">{chapter.flow.map((item, index) => <article key={item.label}><b>{index + 1}</b><h3>{item.label}</h3><p>{item.detail}</p>{index < chapter.flow.length - 1 ? <i>→</i> : null}</article>)}</div>
        </section>

        <section className="formula-board" aria-label="Formelübersicht">
          <div><span>Formelnetz</span><h2>Größen und Zusammenhänge</h2><p>Formeln gelten nie losgelöst von ihren Voraussetzungen. Prüfe vor jeder Anwendung, ob das verwendete Modell passt.</p></div>
          {chapter.formulas.map((formula) => <article key={formula.formula}><strong>{formula.formula}</strong><p>{formula.meaning}</p>{formula.condition ? <small>Gilt für: {formula.condition}</small> : null}</article>)}
        </section>

        <div id="labor"><PhysicsLab {...chapter.lab} /></div>

        <section id="beispiel" className="content-section">
          <span className="section-index">02 · ANWENDEN</span><h2>Vollständig gerechnetes Beispiel</h2>
          <div className="worked-example"><h3>{chapter.example.title}</h3><p>{chapter.example.task}</p>{chapter.example.steps.map((step, index) => <div className="work-step" key={step}><b>{index + 1}</b><p>{step}</p></div>)}<div className="example-result"><span>Ergebnis</span><strong>{chapter.example.result}</strong></div></div>
        </section>

        <section id="experiment" className="experiment-card">
          <div className="experiment-title"><span>03 · EXPERIMENTIEREN</span><h2>{chapter.experiment.title}</h2><p>{chapter.experiment.question}</p></div>
          <div className="experiment-layout"><div><h3>Material</h3><p>{chapter.experiment.materials}</p><h3>Durchführung</h3><ol>{chapter.experiment.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><div><h3>Auswertung</h3><ul>{chapter.experiment.evaluation.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        </section>

        <section className="deep-dive"><span>VERTIEFUNG</span><div><h2>{chapter.deepDive.title}</h2><p>{chapter.deepDive.text}</p></div></section>

        <section id="uebungen" className="content-section exercise-section">
          <div className="exercise-heading"><div><span className="section-index">04 · ÜBEN & ARGUMENTIEREN</span><h2>Aufgaben für Heft und Papier</h2></div><button onClick={() => window.print()} className="print-button">Aufgaben drucken</button></div>
          <p className="exercise-intro">Bearbeite Rechenaufgaben mit Gegeben–Gesucht–Ansatz–Rechnung–Antwortsatz. Bei Argumentationsaufgaben verwendest du Kriterien, physikalische Evidenz, Modellgrenzen und ein klares Urteil.</p>
          <div className="exercise-list">{chapter.exercises.map((exercise, index) => <article key={exercise.id}><div><span>{String(index + 1).padStart(2, "0")}</span><b>{exercise.level}</b></div><h3>{exercise.title}</h3><p>{exercise.prompt}</p>{exercise.hint ? <details className="hint"><summary>Denkanstoß</summary><p>{exercise.hint}</p></details> : null}<div className="paper-lines" aria-hidden="true"><i /><i /><i /></div></article>)}</div>
        </section>

        <SolutionVault slug={chapter.slug} exercises={chapter.exercises} />
      </article>
    </main>
  );
}
