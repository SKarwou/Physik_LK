
import { useId } from 'react';
import { MathText } from '../electric/Math';
const applications: Record<string,{ title:string; text:string; question:string }> = {
 bewegungsinduktion:{title:'Wie entsteht Spannung durch Bewegung?',text:'Im Generator bewegen sich Leiter und Magnetfeld gegeneinander. Der bewegte Leiterstab ist der einfachste Ausschnitt daraus: Die Lorentzkraft trennt Ladungen und macht eine Spannung messbar. So kannst du den Übergang von Mechanik zur Elektrizität erklären.',question:'Welche Messgröße muss beim doppelt so schnellen Bewegen doppelt so groß werden?'},
 'fluss-faraday':{title:'Warum liefert eine ruhende Spule trotzdem Spannung?',text:'Ein induktiver Aufnehmer registriert einen vorbeibewegten Magneten mit einer feststehenden Spule. Entscheidend ist die Änderung des Flusses durch die Spule. Das Induktionsgesetz erklärt deshalb sowohl bewegte Leiter als auch völlig ruhende elektrische Bauteile.',question:'Warum liefert ein ruhender Magnet neben derselben Spule nach dem Einrichten keine dauerhafte Spannung?'},
 'lenz-wirbelstroeme':{title:'Wie bremst man ohne Reibkontakt?',text:'Eine Wirbelstrombremse bewegt einen leitenden Körper durch ein Magnetfeld. Die dabei entstehenden Ströme wandeln Bewegungsenergie in Wärme um. Der fallende Magnet im Kupferrohr zeigt dieselbe Energiebilanz in einem leicht beobachtbaren Versuch.',question:'Warum muss die Bremskraft der Bewegung entgegenwirken, obwohl Kupfer kein Ferromagnet ist?'},
 generator:{title:'Woher kommt die Energie beim Fahrraddynamo?',text:'Der Fahrraddynamo wandelt einen Teil der mechanischen Arbeit beim Fahren in elektrische Energie um. Die rotierende Spule im Modell zeigt, wie periodische Flussänderung eine Wechselspannung ergibt; im realen Dynamo kann stattdessen der Magnet rotieren.',question:'Warum spürst du bei einem belasteten Generator einen zusätzlichen Widerstand gegen die Drehung?'},
 transformator:{title:'Wie macht man aus einer Wechselspannung eine andere?',text:'Ein Schulnetzgerät kann mit einem Transformator eine geeignete kleine Wechselspannung bereitstellen. Ein gemeinsamer veränderlicher magnetischer Fluss koppelt zwei elektrisch getrennte Wicklungen. Die Windungszahlen legen das ideale Spannungsverhältnis fest.',question:'Warum kann eine höhere Ausgangsspannung bei gleicher Leistung nicht zugleich einen höheren Ausgangsstrom liefern?'},
 selbstinduktion:{title:'Warum kann Ausschalten eine Spannungsspitze erzeugen?',text:'Beim Abschalten einer Relais- oder Elektromagnetspule fließt der Strom zunächst weiter. Ohne geeigneten Strompfad kann eine hohe Spannung entstehen. Der RL-Kreis erklärt den zeitlichen Stromverlauf und warum reale Schaltungen eine passende Schutzbeschaltung brauchen.',question:'Kann die Stromstärke einer idealen Spule bei endlicher Spannung sprunghaft auf null fallen?'},
 spulenenergie:{title:'Wohin geht die Energie eines abgeschalteten Elektromagneten?',text:'Zum Aufbauen des Magnetfelds muss eine Quelle Energie liefern. Beim Abschalten kann diese Feldenergie an den verbleibenden Stromkreis zurückgegeben und dort in Wärme umgesetzt werden. Induktivität und Stromstärke bestimmen, wie viel Energie verfügbar ist.',question:'Warum vervierfacht ein doppelter Strom bei unveränderter Induktivität die gespeicherte Energie?'},
 maxwell:{title:'Wie können Felder Energie ohne Draht übertragen?',text:'Bei der induktiven Kopplung gelangt Energie zwischen elektrisch getrennten Spulen durch das elektromagnetische Feld. Die Maxwell-Beschreibung verbindet die bisherigen Gesetze und erklärt darüber hinaus elektromagnetische Wellen, wie sie etwa bei Funkübertragung genutzt werden.',question:'Welche Beobachtung beweist der Spulenversuch unmittelbar — und weshalb ist er noch kein vollständiger Nachweis einer frei laufenden elektromagnetischen Welle?'}
};
export function ElectrodynamicsApplication({id}:{id:string}) {
 const a=applications[id];
 return <aside className="ed-application"><span>Wozu brauchst du das?</span><h3>{a.title}</h3><p><MathText>{a.text}</MathText></p><p><strong>Deine Leitfrage:</strong> {a.question}</p></aside>;
}
export function RLCircuit() {
 const id=useId();
 return <figure className="ed-sketch"><svg viewBox="0 0 640 290" role="img" aria-labelledby={id}><title id={id}>RL-Schaltung mit Umschalter: Einschaltkontakt verbindet Widerstand und Spule mit der Quelle; Ausschaltkontakt schließt Widerstand und Spule ohne Quelle zu einem Kreis. Schutzbeschaltung und Messanschlüsse sind vereinfacht.</title>
 <path d="M70 120V80H180M70 170V220H505V186M180 120V220M250 80H310M380 80H505V95" fill="none" stroke="#234c3a" strokeWidth="3"/>
 <circle cx="70" cy="145" r="25" stroke="#234c3a" fill="white"/><text x="63" y="139">+</text><text x="63" y="163">−</text>
 <circle cx="180" cy="80" r="5" fill="white" stroke="#234c3a"/><circle cx="180" cy="120" r="5" fill="white" stroke="#234c3a"/><circle cx="250" cy="80" r="5" fill="#234c3a"/>
 <path d="M250 80L184 88" stroke="#234c3a" strokeWidth="4"/><path d="M250 80L184 117" stroke="#899e90" strokeWidth="3" strokeDasharray="5 4"/>
 <rect x="310" y="65" width="70" height="30" fill="#f1e5ce" stroke="#967749" strokeWidth="3"/>
 <path d="M505 95c-22 0 -22 18 0 18c-22 0 -22 18 0 18c-22 0 -22 18 0 18c-22 0 -22 18 0 18v19" fill="none" stroke="#ae713d" strokeWidth="4"/>
 <circle cx="327" cy="220" r="22" fill="white" stroke="#234c3a"/><text x="320" y="226">A</text>
 <text x="152" y="61">Ein</text><text x="147" y="148">Aus</text>
 <foreignObject x="276" y="12" width="145" height="42"><div className="ed-svg-formula"><span><MathText>{String.raw`Widerstand $R$`}</MathText></span></div></foreignObject>
 <foreignObject x="521" y="113" width="112" height="42"><div className="ed-svg-formula"><span><MathText>{String.raw`Spule $L$`}</MathText></span></div></foreignObject>
 <foreignObject x="10" y="246" width="250" height="38"><div className="ed-svg-formula"><span><MathText>{String.raw`Kleinspannungsquelle $U_0$`}</MathText></span></div></foreignObject>
 <text x="375" y="270" fontSize="14">Stromsensor im gemeinsamen Kreis</text>
 </svg><figcaption>Prinzipskizze für den Lehrerversuch. Beim Ausschalten bleibt der Kreis aus Spule und Widerstand geschlossen. Reale Schutzbeschaltung und geeigneter Umschalter werden von der Lehrkraft passend zum Gerät gewählt.</figcaption></figure>;
}
