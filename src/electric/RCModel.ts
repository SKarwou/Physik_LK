/** SI units, fixed reference direction: current into the capacitor's upper plate. */
export type RCMode = 'charge' | 'discharge' | 'hold';
export type RCParameters = { resistance: number; capacitance: number; sourceVoltage: number; initialVoltage: number; mode: RCMode };
export function rcState(time: number, p: RCParameters) {
  if (!(p.resistance > 0 && p.capacitance > 0) || ![time, p.resistance, p.capacitance, p.sourceVoltage, p.initialVoltage].every(Number.isFinite)) throw new Error('Ungültige RC-Parameter');
  const tau = p.resistance * p.capacitance;
  const target = p.mode === 'charge' ? p.sourceVoltage : 0;
  const voltage = p.mode === 'hold' ? p.initialVoltage : target + (p.initialVoltage - target) * Math.exp(-Math.max(0, time) / tau);
  const current = p.mode === 'hold' ? 0 : (target - voltage) / p.resistance;
  return { voltage, current, charge: p.capacitance * voltage, resistorVoltage: p.mode === 'hold' ? 0 : target - voltage, energy: .5 * p.capacitance * voltage ** 2, tau };
}
export const rcNumber = (n: number) => n.toLocaleString('de-DE', { maximumSignificantDigits: 5 });
export function rcArea(p: RCParameters, end: number, intervals: number, method: 'left' | 'right' | 'trapezoid') {
  const width = end / intervals;
  const bars = Array.from({ length: intervals }, (_, i) => {
    const left = Math.abs(rcState(i * width, p).current), right = Math.abs(rcState((i + 1) * width, p).current);
    const height = method === 'left' ? left : method === 'right' ? right : (left + right) / 2;
    return { time: i * width, left, right, height };
  });
  const estimate = bars.reduce((sum, b) => sum + b.height * width, 0);
  const exact = Math.abs(rcState(end, p).charge - p.capacitance * p.initialVoltage);
  return { bars, width, estimate, exact };
}
