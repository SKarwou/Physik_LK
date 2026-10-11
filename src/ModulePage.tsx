import { useEffect } from 'react';
import MethodsCourse from './methods/MethodsCourse';
import ElectricFieldChapter from './electric/ElectricFieldChapter';
import { electricChapter } from './electric/chapter';
import ProtectedCourse from './access/ProtectedCourse';
import { isProtectedSlug } from './access/courses';
import Link from './Link';

const legacyRoutes: Record<string, { slug: string; lesson?: string }> = {
  'elektromagnetisches-feld': { slug: 'elektrodynamik' },
  induktion: { slug: 'elektrodynamik' },
  'gekreuzte-felder': { slug: 'magnetisches-feld', lesson: 'gekreuzte-felder' },
  photonen: { slug: 'quantenphysik-materie', lesson: 'photoeffekt' },
  quantenobjekte: { slug: 'quantenphysik-materie', lesson: 'quanteninterferenz' },
  atomphysik: { slug: 'quantenphysik-materie' },
  laserprojekt: { slug: 'vertiefung' },
  'werkzeuge-experimentieren': { slug: 'denk-arbeitsweisen' },
  'teilchen-im-e-feld': { slug: 'elektrisches-feld', lesson: 'teilchen' },
  'kondensator-rc': { slug: 'elektrisches-feld', lesson: 'kondensator' },
};

function LegacyRoute({ target }: { target: { slug: string; lesson?: string } }) {
  const href = `/kapitel/${target.slug}${target.lesson ? `#${target.lesson}` : ''}`;
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', `kapitel/${target.slug}`);
    url.hash = target.lesson || '';
    window.location.replace(url);
  }, [target]);
  return <main className="empty-state"><h1>Dieses Kapitel hat einen neuen Platz.</h1><Link href={href}>Zum aktuellen Lernbereich →</Link></main>;
}

export default function ModulePage({ slug }: { slug: string }) {
  if (isProtectedSlug(slug)) return <ProtectedCourse key={slug} slug={slug} />;
  if (slug === 'denk-arbeitsweisen') return <MethodsCourse />;
  if (slug === 'elektrisches-feld') return <ElectricFieldChapter chapter={electricChapter} />;
  if (legacyRoutes[slug]) return <LegacyRoute target={legacyRoutes[slug]} />;
  // Older generic pages are intentionally not rendered: they duplicated protected lessons.
  return <main className="empty-state"><h1>{slug === 'abiturtraining' ? 'Abiturtraining findest du jetzt in jedem Lernkapitel.' : 'Kapitel nicht gefunden'}</h1><Link href="/">Zur Themenübersicht →</Link></main>;
}
