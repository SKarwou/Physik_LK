import { useId } from 'react';
import { MathFormula, MathText } from '../electric/Math';
import './formula-steps.css';

export interface FormulaStep { tex: string; comment: string }

/** Keep each equality next to the reasoning that produces it. */
export default function FormulaSteps({ title, intro, steps, conclusion }: {
  title: string;
  intro?: string;
  steps: FormulaStep[];
  conclusion?: string;
}) {
  const headingId = useId();
  return <section className="formula-steps" aria-labelledby={headingId}>
    <header><span className="formula-steps-eyebrow">RECHENWEG · SCHRITT FÜR SCHRITT</span><h3 id={headingId}><MathText>{title}</MathText></h3></header>
    {intro && <p className="formula-steps-intro"><MathText>{intro}</MathText></p>}
    <ol className="formula-steps-list">{steps.map((step, index) => <li key={index}>
      <span className="formula-step-number" aria-hidden="true">{index + 1}</span>
      <div className="formula-step-content"><div className="formula-step-equation"><MathFormula tex={step.tex} display /></div><p className="formula-step-comment"><MathText>{step.comment}</MathText></p></div>
    </li>)}</ol>
    {conclusion && <p className="formula-steps-conclusion"><MathText>{conclusion}</MathText></p>}
  </section>;
}
