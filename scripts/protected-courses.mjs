// Build-only configuration. Never import this module from browser source files.
export const protectedCourses = [
  { slug: 'magnetisches-feld', entry: 'src/magnetic/MagneticCourse.tsx', password: 'Magnetisches_Feld2' },
  { slug: 'elektrodynamik', entry: 'src/electrodynamics/ElectrodynamicsCourse.tsx', password: 'Elektromagnetische_Induktion3' },
  { slug: 'schwingungen', entry: 'src/oscillations/OscillationsCourse.tsx', password: 'Schwingungen4' },
  { slug: 'wellen', entry: 'src/waves/WavesCourse.tsx', password: 'Wellen5' },
  { slug: 'wellenoptik', entry: 'src/optics/OpticsCourse.tsx', password: 'Wellenoptik6' },
  { slug: 'quantenphysik-materie', entry: 'src/quantum/QuantumCourse.tsx', password: 'Quantenphysik_und_Materie7' },
  { slug: 'vertiefung', entry: 'src/advanced/AdvancedCourse.tsx', password: 'Vertiefendes_Themengebiet8' },
];
export const publicCourses = ['elektrisches-feld', 'denk-arbeitsweisen'];
