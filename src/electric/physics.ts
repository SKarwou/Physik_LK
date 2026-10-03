// SI units unless explicitly stated; display coordinates are used only for field maps.
export const EPS0 = 8.8541878128e-12;
export const K = 1 / (4 * Math.PI * EPS0);
export const ELEMENTARY_CHARGE = 1.602176634e-19;
export const coulomb = (q1: number, q2: number, r: number) => K * Math.abs(q1 * q2) / r ** 2;
export const plateField = (voltage: number, distance: number) => voltage / distance;
export const capacitance = (area: number, distance: number, er: number) => EPS0 * er * area / distance;
export function rcValues(t: number, r: number, c: number, u: number, charging: boolean) {
  const decay = Math.exp(-t / (r * c));
  return { voltage: u * (charging ? 1 - decay : decay), current: (charging ? 1 : -1) * u / r * decay };
}
export type Point = { x: number; y: number };
export type Charge = Point & { q: number };
export type FieldKind = 'plate' | 'positive' | 'negative' | 'dipole' | 'pair';
export function chargesFor(kind: FieldKind): Charge[] {
  if (kind === 'plate') return [];
  if (kind === 'positive' || kind === 'negative') return [{ x: 320, y: 190, q: kind === 'positive' ? 1 : -1 }];
  return [{ x: 205, y: 190, q: 1 }, { x: 435, y: 190, q: kind === 'pair' ? 1 : -1 }];
}
export function fieldAt(p: Point, kind: FieldKind): Point {
  if (kind === 'plate') return { x: 1 / 15000, y: 0 };
  return chargesFor(kind).reduce((e, c) => {
    const dx = p.x - c.x, dy = p.y - c.y;
    const r = Math.max(1, Math.hypot(dx, dy));
    return { x: e.x + c.q * dx / r ** 3, y: e.y + c.q * dy / r ** 3 };
  }, { x: 0, y: 0 });
}
export function fieldLines(kind: FieldKind): Point[][] {
  if (kind === 'plate') return Array.from({ length: 9 }, (_, i) => [{ x: 70, y: 62 + 32 * i }, { x: 570, y: 62 + 32 * i }]);
  const charges = chargesFor(kind);
  // Trace outgoing lines and also incoming branches that enter the visible window.
  // A line already traced from a positive charge must not be drawn a second time.
  return charges.flatMap(c => Array.from({ length: 16 }, (_, i) => {
    const direction = c.q > 0 ? 1 : -1;
    const a = 2 * Math.PI * (i + .5) / 16;
    let p = { x: c.x + 20 * Math.cos(a), y: c.y + 20 * Math.sin(a) };
    const points = [p];
    for (let step = 0; step < 700; step++) {
      const e = fieldAt(p, kind), n = Math.hypot(e.x, e.y);
      if (n < 1e-10) break;
      const mid = { x: p.x + direction * 1.5 * e.x / n, y: p.y + direction * 1.5 * e.y / n };
      const m = fieldAt(mid, kind), mn = Math.hypot(m.x, m.y);
      if (mn < 1e-10) break;
      p = { x: p.x + direction * 3 * m.x / mn, y: p.y + direction * 3 * m.y / mn };
      points.push(p);
      if (p.x < 15 || p.x > 625 || p.y < 22 || p.y > 358 || charges.some(q => Math.hypot(p.x - q.x, p.y - q.y) < 19)) break;
    }
    if (direction < 0 && charges.some(q => q.q > 0 && Math.hypot(p.x - q.x, p.y - q.y) < 21)) return [];
    return direction < 0 ? points.reverse() : points;
  })).filter(points => points.length > 1);
}
export const pathOf = (points: Point[]) => points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

export const NX = 81, NY = 49;
// Conducting, uniform water layer, insulating rectangular walls, circular electrodes.
// Laplace equation with fixed electrode potentials (left 1, right 0).
export function solveTank(): Float64Array {
  const v = new Float64Array(NX * NY).fill(.5), fixed = new Uint8Array(NX * NY);
  for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) {
    const i = y * NX + x;
    if ((x - 20) ** 2 + (y - 24) ** 2 <= 9) { v[i] = 1; fixed[i] = 1; }
    if ((x - 60) ** 2 + (y - 24) ** 2 <= 9) { v[i] = 0; fixed[i] = 1; }
  }
  for (let iteration = 0; iteration < 4000; iteration++) {
    let change = 0;
    for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) {
      const i = y * NX + x;
      if (fixed[i]) continue;
      let sum = 0, n = 0;
      if (x > 0) { sum += v[i - 1]; n++; } if (x < NX - 1) { sum += v[i + 1]; n++; }
      if (y > 0) { sum += v[i - NX]; n++; } if (y < NY - 1) { sum += v[i + NX]; n++; }
      const delta = 1.75 * (sum / n - v[i]); v[i] += delta;
      change = Math.max(change, Math.abs(delta));
    }
    if (change < 1e-8) break;
  }
  return v;
}
export function tankPotential(v: Float64Array, x: number, y: number) {
  const gx = Math.max(0, Math.min(NX - 1, x * (NX - 1))), gy = Math.max(0, Math.min(NY - 1, y * (NY - 1)));
  const ix = Math.min(NX - 2, Math.floor(gx)), iy = Math.min(NY - 2, Math.floor(gy));
  const dx = gx - ix, dy = gy - iy;
  return (1 - dy) * ((1 - dx) * v[iy * NX + ix] + dx * v[iy * NX + ix + 1]) + dy * ((1 - dx) * v[(iy + 1) * NX + ix] + dx * v[(iy + 1) * NX + ix + 1]);
}
export function contour(v: Float64Array, level: number): string {
  let path = '';
  for (let y = 0; y < NY - 1; y++) for (let x = 0; x < NX - 1; x++) {
    const corners = [{ x, y }, { x: x + 1, y }, { x: x + 1, y: y + 1 }, { x, y: y + 1 }];
    const hits: Point[] = [];
    for (let a = 0; a < 4; a++) {
      const b = (a + 1) % 4, pa = corners[a], pb = corners[b], va = v[pa.y * NX + pa.x], vb = v[pb.y * NX + pb.x];
      if ((va >= level) !== (vb >= level)) {
        const t = (level - va) / (vb - va); hits.push({ x: 40 + (pa.x + t * (pb.x - pa.x)) * 7, y: 40 + (pa.y + t * (pb.y - pa.y)) * 7 });
      }
    }
    for (let i = 0; i + 1 < hits.length; i += 2) path += pathOf([hits[i], hits[i + 1]]);
  }
  return path;
}
