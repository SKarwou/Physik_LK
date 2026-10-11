import { useEffect, useState } from 'react';
export function useLesson(ids: string[], aliases: Record<string, string> = {}) {
  const read = () => {
    let hash = '';
    try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { return ''; }
    const id = aliases[hash] || (hash === 'rc' || hash.startsWith('rc-') ? 'kondensator' : hash);
    return ids.includes(id) ? id : '';
  };
  const [active, setActive] = useState(read);
  const signature = ids.join('|') + JSON.stringify(aliases);
  useEffect(() => {
    const change = () => {
      setActive(read());
      requestAnimationFrame(() => {
        const hash = window.location.hash.slice(1);
        const target = (hash && !ids.includes(hash) ? document.getElementById(hash) : null) || document.getElementById('lesson-heading');
        if (target) { target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'start' }); }
        else window.scrollTo({ top: 0, behavior: 'instant' });
      });
    };
    if (window.location.hash) change();
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, [signature]);
  return active;
}
