import { Fragment, memo } from 'react';
import katex from 'katex';

// Precisely identified legacy spellings also occur in exercise and unit labels.
// Keep ordinary slashes (e.g. school years and counts) as text.
const legacyMath: Record<string, string> = {
  'J/s': String.raw`\frac{\mathrm J}{\mathrm s}`,
  'N/kg': String.raw`\frac{\mathrm N}{\mathrm{kg}}`,
  'kN/C': String.raw`\frac{\mathrm{kN}}{\mathrm C}`,
  'N/C': String.raw`\frac{\mathrm N}{\mathrm C}`,
  'V/m': String.raw`\frac{\mathrm V}{\mathrm m}`,
  'F/m': String.raw`\frac{\mathrm F}{\mathrm m}`,
  'J/C': String.raw`\frac{\mathrm J}{\mathrm C}`,
  'm/s²': String.raw`\frac{\mathrm m}{\mathrm{s^2}}`,
  'm/s': String.raw`\frac{\mathrm m}{\mathrm s}`,
  '1/m²': String.raw`\frac{1}{\mathrm{m^2}}`,
  '1/r²': String.raw`\frac{1}{r^2}`,
  'F⃗/q': String.raw`\frac{\vec F}{q}`,
  'F/q': String.raw`\frac{F}{q}`,
  'U/d': String.raw`\frac{U}{d}`,
  'Q/U': String.raw`\frac{Q}{U}`,
  'qE/m': String.raw`\frac{q\cdot E}{m}`,
  'x/d': String.raw`\frac{x}{d}`,
  '½': String.raw`\frac{1}{2}`,
};
const legacyPattern = new RegExp(`(${Object.keys(legacyMath).sort((a, b) => b.length - a.length).map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

/** Native MathML keeps fractions and vectors crisp, accessible and available offline. */
export const MathFormula = memo(function MathFormula({ tex, display = false }: { tex: string; display?: boolean }) {
  const spaced = tex.replace(/\\cdot(?![A-Za-z])/g, String.raw`\,\cdot\,`);
  const html = katex.renderToString(display ? spaced : `\\displaystyle ${spaced}`, { output: 'mathml', displayMode: display, throwOnError: true, trust: false, strict: 'error' });
  return <span className={display ? 'ef-math ef-math-display' : 'ef-math'} dangerouslySetInnerHTML={{ __html: html }} />;
});

/** New formulas have explicit delimiters; a small exact map covers older labels. */
export function MathText({ children }: { children: string }) {
  return <>{children.split(/(\$[^$]+\$)/g).map((part, i) => part.startsWith('$') && part.endsWith('$')
    ? <MathFormula key={i} tex={part.slice(1, -1)} /> : <Fragment key={i}>{part.split(legacyPattern).map((text, j) => legacyMath[text] ? <MathFormula key={j} tex={legacyMath[text]} /> : text)}</Fragment>)}</>;
}
