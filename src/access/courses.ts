// Public navigation metadata only. Passwords belong to the build process.
export const protectedCourses = {
  'magnetisches-feld': { title: 'Magnetisches Feld', number: 2, symbol: 'B' },
  elektrodynamik: { title: 'Elektromagnetische Induktion', number: 3, symbol: 'Φ' },
  schwingungen: { title: 'Schwingungen', number: 4, symbol: 'T' },
  wellen: { title: 'Wellen', number: 5, symbol: 'λ' },
  wellenoptik: { title: 'Wellenoptik', number: 6, symbol: '◉' },
  'quantenphysik-materie': { title: 'Quantenphysik und Materie', number: 7, symbol: 'ψ' },
  vertiefung: { title: 'Vertiefendes Themengebiet', number: 8, symbol: '✦' },
} as const;

export type ProtectedSlug = keyof typeof protectedCourses;
export function isProtectedSlug(slug: string): slug is ProtectedSlug {
  return Object.prototype.hasOwnProperty.call(protectedCourses, slug);
}
