import type { ReactNode } from 'react';
import './topic-pictogram.css';

const ink = '#355747', sage = '#adc6aa', gold = '#c79b45', blue = '#84a8ad', terracotta = '#c98e74';
const topics = ['elektrisches-feld', 'magnetisches-feld', 'elektrodynamik', 'schwingungen', 'wellen', 'wellenoptik', 'denk-arbeitsweisen', 'quantenphysik-materie', 'vertiefung'] as const;
export type TopicPictogramSlug = typeof topics[number];

function Arrow({ x, y, dx, dy, color = ink }: { x: number; y: number; dx: number; dy: number; color?: string }) {
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  return <g stroke={color} fill="none"><path d={`M${x} ${y}l${dx} ${dy}`} /><path d="M-7-4L0 0l-7 4" transform={`translate(${x + dx} ${y + dy}) rotate(${angle})`} /></g>;
}
function Spark({ x, y, r = 6 }: { x: number; y: number; r?: number }) {
  return <path d={`M${x} ${y-r}Q${x} ${y} ${x+r} ${y}Q${x} ${y} ${x} ${y+r}Q${x} ${y} ${x-r} ${y}Q${x} ${y} ${x} ${y-r}Z`} fill={gold} stroke="none" />;
}
function Sine({ y, amplitude, color }: { y: number; amplitude: number; color: string }) {
  return <path d={Array.from({ length: 81 }, (_, i) => `${i ? 'L' : 'M'}${22 + 1.95 * i} ${y - amplitude * Math.sin(i / 80 * Math.PI * 4)}`).join(' ')} stroke={color} strokeWidth="3.5" fill="none" />;
}

/** Decorative topic identifiers; the adjoining heading provides the accessible name. */
export default function TopicPictogram({ topic }: { topic: string }) {
  let motif: ReactNode;
  switch (topic) {
    case 'elektrisches-feld': motif = <>
      {[0, 1].map(i => <g key={i} fill="none" stroke={i ? sage : blue}><path d={`M49 72C70 ${20-i*15} 130 ${20-i*15} 151 72`} /><path d={`M49 72C70 ${124+i*8} 130 ${124+i*8} 151 72`} /></g>)}
      <Arrow x={71} y={72} dx={58} dy={0} color={gold}/><path d="M98 30l6 3-6 3m0 74l6 3-6 3" fill="none" stroke={blue}/>
      <circle cx="48" cy="72" r="20" fill="#f1d7c7" stroke={terracotta}/><circle cx="152" cy="72" r="20" fill="#d5e4e4" stroke={blue}/><path d="M39 72h18m-9-9v18M143 72h18" strokeWidth="3"/>
    </>; break;
    case 'magnetisches-feld': motif = <>
      <path d="M61 94V57a39 39 0 0 1 78 0v37" fill="none" stroke={ink} strokeWidth="25"/>
      <path d="M61 77v24" stroke={terracotta} strokeWidth="22"/><path d="M139 77v24" stroke={blue} strokeWidth="22"/>
      <path d="M71 91q29-24 58 0M65 112q35 22 70 0M48 109q52 55 104 0" fill="none" stroke={sage}/><Arrow x={89} y={81} dx={20} dy={0} color={gold}/><Spark x={169} y={35}/>
    </>; break;
    case 'elektrodynamik': motif = <>
      <path d="M37 95V112H157V95" fill="none" stroke={blue}/><path d="M35 66H170" stroke={sage} strokeWidth="8"/>
      {Array.from({length:8}, (_, i) => <ellipse key={i} cx={53+i*13} cy="65" rx="9" ry="28" fill="none" stroke={gold} strokeWidth="3"/>)}
      <path d="M27 65h-9M169 65h14"/><rect x="106" y="103" width="29" height="17" rx="4" fill="#fffaf0"/><path d="M111 113l7-5 5 6 6-4" stroke={gold} fill="none"/><Arrow x={59} y={20} dx={75} dy={0} color={blue}/><Spark x={179} y={24}/>
    </>; break;
    case 'schwingungen': motif = <>
      <path d="M39 24H164" strokeWidth="5"/>{[47,67,87,107,127,147].map(x=><path key={x} d={`M${x} 24l8-8`} stroke={sage}/>)}
      <path d="M96 26V109M96 26L49 101" stroke={sage} strokeDasharray="5 5" fill="none"/><path d="M96 26l47 75"/>
      <path d="M45 105Q97 142 151 105" fill="none" stroke={gold} strokeDasharray="4 5"/><path d="M147 109l5-4-1 7" fill="none" stroke={gold}/>
      <circle cx="143" cy="101" r="18" fill="#edcd80" stroke={gold}/><circle cx="96" cy="26" r="5" fill={ink}/><path d="M135 90q-6 3-6 9" stroke="#fff9e5" strokeWidth="4" fill="none"/>
    </>; break;
    case 'wellen': motif = <>
      <path d="M23 69H179" stroke={sage} strokeDasharray="3 6"/><Sine y={69} amplitude={28} color={blue}/><Sine y={92} amplitude={13} color={gold}/>
      <circle cx="42" cy="41" r="5" fill={gold} stroke="#fffaf0"/><Arrow x={72} y={24} dx={58} dy={0}/><path d="M34 119H166" stroke={sage}/>
    </>; break;
    case 'wellenoptik': motif = <>
      <path d="M74 107L111 30L154 107Z" fill="#e0eadd" stroke={blue}/><path d="M20 65H94L133 75" stroke={gold} strokeWidth="4" fill="none"/>
      <path d="M133 75L183 43" stroke={blue}/><path d="M135 79L185 68" stroke={sage}/><path d="M136 83L185 93" stroke={gold}/><path d="M138 88L179 116" stroke={terracotta}/><path d="M110 40l-24 54" stroke="#fffaf0" strokeWidth="3"/>
      <Spark x={48} y={34} r={5}/>
    </>; break;
    case 'denk-arbeitsweisen': motif = <>
      <rect x="41" y="24" width="81" height="92" rx="7" fill="#fffaf0" stroke={sage}/><path d="M57 25V115" stroke={sage}/>{[37,53,69,85,101].map(y=><path key={y} d={`M36 ${y}h10`} stroke={gold}/>)}
      <path d="M68 42h39m-39 14h30M68 78l7 7 15-19m-22 34h39" fill="none"/>
      <g transform="rotate(18 144 73)"><rect x="132" y="20" width="23" height="106" rx="4" fill="#f3e6bd" stroke={gold}/>{Array.from({length:10},(_,i)=><path key={i} d={`M133 ${29+i*10}h${i%2?7:12}`} stroke={gold}/>)}</g>
      <circle cx="169" cy="105" r="14" fill="#e4eeea" stroke={blue}/><path d="M169 96v9l7 3" fill="none" stroke={blue}/>
    </>; break;
    case 'quantenphysik-materie': motif = <>
      <ellipse cx="103" cy="71" rx="58" ry="34" transform="rotate(-32 103 71)" fill="#d8e5d1" stroke="none"/>
      <ellipse cx="103" cy="71" rx="34" ry="54" transform="rotate(-32 103 71)" fill="#d6e4e5" fillOpacity=".8" stroke="none"/>
      {[[68,57],[84,33],[124,34],[146,61],[135,100],[103,116],[63,89],[153,86],[81,107],[120,57]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill={blue} stroke="none"/>)}
      <circle cx="97" cy="65" r="10" fill={gold} stroke="#fffaf0"/><circle cx="111" cy="70" r="10" fill={terracotta} stroke="#fffaf0"/><circle cx="99" cy="80" r="10" fill={sage} stroke="#fffaf0"/>
      <path d="M24 36l8-7 4 10 8-7" fill="none" stroke={gold}/><Spark x={168} y={27} r={6}/>
    </>; break;
    case 'vertiefung': motif = <>
      <path d="M102 84V99m0 0l-31 29m31-29l32 29m-32-29v31" fill="none" stroke={ink} strokeWidth="3"/>
      <g transform="rotate(-25 101 65)"><rect x="64" y="49" width="81" height="31" rx="5" fill={sage}/><path d="M68 49v31m70-31v31" stroke={ink} strokeWidth="4"/><rect x="45" y="57" width="19" height="15" rx="3" fill={gold}/><path d="M145 49h9v31h-9" fill="#d7e7e6" stroke={blue}/><path d="M77 55h49" stroke="#f6faed" strokeWidth="3"/></g>
      <circle cx="102" cy="87" r="6" fill={gold}/><Spark x={163} y={19} r={8}/><Spark x={45} y={28} r={5}/><Spark x={178} y={72} r={4}/>
    </>; break;
    default: return null;
  }
  return <svg className="topic-pictogram" viewBox="0 0 200 145" aria-hidden="true" focusable="false" data-topic-pictogram={topic}>
    <path d="M34 34C63 6 139 9 167 37C197 66 183 115 146 131C104 148 39 129 23 96C13 72 18 51 34 34Z" fill="#f1f2e5"/>
    <g fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">{motif}</g>
  </svg>;
}
