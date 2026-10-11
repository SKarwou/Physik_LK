import { useMemo, useState } from 'react';
import { MathText } from '../electric/Math';
import { recordScore, useProgress } from './progress';
import type { QuizQuestion } from './types';
export function isCorrect(selected: number[], correct: number[]) {
  return selected.length === correct.length && correct.every(index => selected.includes(index));
}
export default function ChapterQuiz({ course, lesson, word, questions, nextHref, nextTitle }: {
  course: string; lesson: string; word: string; questions: QuizQuestion[]; nextHref?: string; nextTitle?: string;
}) {
  const [answers, setAnswers] = useState<number[][]>(() => questions.map(() => []));
  const [current, setCurrent] = useState(0), [score, setScore] = useState<number | null>(null);
  const [saved, setSaved] = useState(true), [message, setMessage] = useState('');
  const progress = useProgress();
  const earned = (progress[`${course}/${lesson}`] || 0) >= 8 || (score !== null && score >= 8);
  const order = useMemo(() => questions.map((q, qi) => {
    let seed = [...lesson].reduce((a, c) => a + c.charCodeAt(0), qi * 97 + 13);
    const indices = q.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) { seed = (seed * 1664525 + 1013904223) >>> 0; const j = seed % (i + 1); [indices[i], indices[j]] = [indices[j], indices[i]]; }
    return indices;
  }), [lesson, questions]);
  const q = questions[current];
  if (!q) return null;
  function evaluate() {
    if (answers.some(a => !a.length)) { setMessage('Beantworte zuerst alle zehn Fragen. Über die Fragennummern kannst du zurückgehen.'); return; }
    const result = questions.filter((question, i) => isCorrect(answers[i], question.correct)).length;
    setScore(result); setSaved(recordScore(course, lesson, result)); setMessage('');
  }
  function retry() { setScore(null); setAnswers(questions.map(() => [])); setCurrent(0); setMessage(''); }
  return <section className="chapter-quiz" aria-labelledby={`quiz-${lesson}`}>
    <span className="kicker">ABSCHLUSSQUIZ</span><h2 id={`quiz-${lesson}`}>Dein Wissen. Dein Codewort.</h2>
    <p>Erst im Heft rechnen und begründen, dann Antworten auswählen. Ab <b>8 von 10 richtigen Fragen</b> erhältst du ein Wort. Bei mehreren richtigen Antworten zählt eine Frage nur, wenn du genau die richtigen auswählst. Du kannst das Quiz wiederholen.</p>
    {score === null ? <>
      <nav className="quiz-question-nav" aria-label="Quizfragen">{questions.map((_, i) => <button key={i} type="button" aria-label={`Frage ${i + 1}${answers[i].length ? ', beantwortet' : ', noch offen'}`} aria-current={i === current ? 'step' : undefined} className={answers[i].length ? 'answered' : ''} onClick={() => { setCurrent(i); setMessage(''); }}>{i + 1}{answers[i].length ? ' ✓' : ''}</button>)}</nav>
      <form onSubmit={e => { e.preventDefault(); if (current < questions.length - 1) setCurrent(current + 1); else evaluate(); }}>
        <fieldset className="quiz-options"><legend><span>Frage {current + 1} von {questions.length} · {q.correct.length === 1 ? 'Eine Antwort auswählen' : 'Alle richtigen Antworten auswählen'}</span><MathText>{q.prompt}</MathText></legend>
          {order[current].map(index => <label key={index}><input type={q.correct.length === 1 ? 'radio' : 'checkbox'} name={`quiz-${lesson}-${current}`} checked={answers[current].includes(index)} onChange={() => { setMessage(''); setAnswers(prev => prev.map((a, i) => i !== current ? a : q.correct.length === 1 ? [index] : a.includes(index) ? a.filter(x => x !== index) : [...a, index])); }} /><span><MathText>{q.options[index]}</MathText></span></label>)}
        </fieldset>
        <div className="learning-actions"><button type="button" className="ef-action" disabled={current === 0} onClick={() => setCurrent(current - 1)}>← Vorige Frage</button><button className="button button-primary">{current < questions.length - 1 ? 'Nächste Frage →' : 'Quiz auswerten'}</button></div>
        <p role="status">{message}</p>
      </form>
    </> : <div className="quiz-result" aria-live="polite">
      <h3>{score} von {questions.length} richtig · {score >= 8 ? 'Geschafft!' : 'Noch ein Versuch lohnt sich.'}</h3>
      <p>{score >= 8 ? 'Dein Codewort ist freigeschaltet. Jetzt kannst du mit dem nächsten Kapitel weitermachen.' : 'Lies die Erklärungen zu deinen Antworten und bearbeite die passenden Stellen im Kapitel noch einmal. Du brauchst mindestens acht richtige Fragen.'}</p>
      <div className="quiz-review">{questions.map((question, i) => <details key={i}><summary>{isCorrect(answers[i], question.correct) ? '✓ Richtig' : '↻ Noch nicht richtig'} · Frage {i + 1}</summary><p><MathText>{question.prompt}</MathText></p><p><b>Richtige Antwort{question.correct.length > 1 ? 'en' : ''}: </b>{question.correct.map((c, j) => <span key={c}>{j > 0 ? ' · ' : ''}<MathText>{question.options[c]}</MathText></span>)}</p><p><MathText>{question.explanation}</MathText></p></details>)}</div>
      <button className="ef-action" onClick={retry}>Quiz erneut bearbeiten</button>
    </div>}
    {earned && <aside className="quiz-reward"><span>Dein gesammeltes Codewort</span><strong>{word}</strong>{nextHref && <a className="button button-primary" href={nextHref}>Weiter: {nextTitle} →</a>}</aside>}
    {!saved && <p role="status">Dein Ergebnis gilt für diesen Versuch. Der Browser erlaubt gerade keine dauerhafte Speicherung. Notiere dein Codewort im Heft.</p>}
  </section>;
}
