import type { ReactNode } from 'react';
import { Formula } from './LabUI';
import { MathFormula, MathText } from './Math';

const tex = String.raw;
function T({ children }: { children: string }) { return <MathText>{children}</MathText>; }
export function WorkNow({ place = 'Im Heft', children }: { place?: string; children: ReactNode }) {
  return <aside className="rc-work-now"><b>Jetzt bist du dran · {place}</b><div>{children}</div></aside>;
}
export function Ready({ block, children }: { block: number; children: ReactNode }) {
  return <aside className="rc-ready"><b>Stopp vor Lernblock {block + 1}</b>{children}<p>Kannst du das noch nicht erklären? Lies den genannten Schritt erneut und verbessere deinen Heftaufschrieb. Gehe danach weiter.</p><a href={'#rc-block-' + (block + 1)}>Weiter zu Lernblock {block + 1}</a></aside>;
}
function Help({ title, children }: { title: string; children: ReactNode }) {
  return <details className="rc-hint"><summary>{title}</summary><div>{children}</div></details>;
}
export function ReadingFirst() {
  return <section className="rc-reading-first" id="rc-read-first">
    <span className="ef-eyebrow">START · DIE ERSTEN 15 MINUTEN VON LERNBLOCK 1</span>
    <h4>Bevor du experimentierst: Lies im Schulbuch Seite 124 und 125.</h4>
    <p>Öffne die Doppelseite „Auf- und Entladen eines Kondensators“. Lies zunächst beide Seiten. Du musst die Herleitungen auf Seite 125 dabei noch nicht selbst rechnen können. Wir gehen sie anschließend gemeinsam in kleinen Schritten durch.</p>
    <ol>
      <li><b>Seite 124: den Vorgang verstehen.</b> Lies den Überblick sowie die Abschnitte zum Aufladen und Entladen. Betrachte die Schaltung in „Experiment 1“. Verfolge mit dem Finger den Stromweg in Stellung a und danach in Stellung b.</li>
      <li><b>Seite 125: die Zusammenhänge kennenlernen.</b> Lies „Zeitkonstante“ und die mathematische Vertiefung zum Aufladen und Entladen. Suche in jeder Gleichung die Größen, die du schon kennst. Markiere in deinen Notizen unbekannte Zeichen oder Begriffe.</li>
      <li><b>Im Heft festhalten.</b> Schreibe die Überschrift „Aufladen und Entladen eines Kondensators“. Notiere darunter: Was geschieht mit der Kondensatorspannung? Was geschieht mit der Stromstärke? Warum braucht der Vorgang Zeit? Schreibe jeweils eine erste Vermutung.</li>
      <li><b>Offene Fragen sammeln.</b> Notiere mindestens eine Frage zur Doppelseite. Du prüfst am Ende der Lernstrecke, ob du sie inzwischen beantworten kannst.</li>
    </ol>
    <p><b>Danach arbeitest du auf dieser Website von Lernblock 1 bis 6.</b> Lies jeweils nur bis zum nächsten Arbeitsauftrag, bearbeite ihn und kontrolliere erst dann. Dein Heft zeigt deinen Fortschritt; führe es auch über mehrere Arbeitstage weiter.</p>
    <Help title="Orientierung: Welche Buchbezeichnungen entsprechen der Website?">
      <div className="ef-table-wrap"><table><thead><tr><th>Im Buch</th><th>Auf dieser Website</th></tr></thead><tbody>
        <tr><td>Schalterstellung a</td><td>A · Aufladen: Die Spannungsquelle ist angeschlossen.</td></tr>
        <tr><td>Schalterstellung b</td><td>E · Entladen: Die Quelle ist vom Entladekreis getrennt.</td></tr>
        <tr><td><MathFormula tex={tex`Q_C(t)`} /></td><td><T>{tex`Wir schreiben kurz $Q(t)$. Beides bezeichnet die Ladung auf einer Kondensatorplatte.`}</T></td></tr>
        <tr><td><T>{tex`Messspannung $U(t)$ am Voltmeter`}</T></td><td><T>{tex`$U_C(t)$: Spannung zwischen den Kondensatorplatten.`}</T></td></tr>
        <tr><td>Zwei Widerstände für die zwei Stromwege</td><td>Die Simulation verwendet in beiden Schalterstellungen denselben Widerstand. Bei gleichen R-Werten ergibt sich derselbe ideale Zeitverlauf.</td></tr>
      </tbody></table></div>
      <p>Das Vorzeichen des Entladestroms wird in Schritt 1.2 erklärt. Im Buch wird dessen Richtung für die Entladephase neu gewählt; auf der Website bleibt der Bezugspfeil fest.</p>
    </Help>
  </section>;
}
export function PrerequisiteRescue() {
  return <div className="rc-prerequisites" id="rc-prerequisites">
    <h4>Vorwissen auffrischen · Was bedeuten die Größen?</h4>
    <p>Du brauchst zunächst keine Exponentialfunktion. Diese vier Größen und drei Beziehungen genügen, um die Schaltung zu verstehen. Lies jede Zeile und erkläre sie anschließend in einem eigenen Satz.</p>
    <div className="ef-table-wrap"><table><thead><tr><th>Größe</th><th>Bedeutung im Versuch</th><th>Einheit</th><th>Womit verwechselst du sie leicht?</th></tr></thead><tbody>
      <tr><th><MathFormula tex="Q" /> · Ladung</th><td>Wie viel positive Ladung trägt die obere Platte? Die andere trägt die gleich große negative Ladung.</td><td>Coulomb · C</td><td>Q ist keine Stromstärke. Beim Laden wird Ladung getrennt; sie wird nicht neu erzeugt.</td></tr>
      <tr><th><MathFormula tex="U_C" /> · Spannung</th><td>Wie groß ist die Potentialdifferenz zwischen den Platten? Sie beschreibt eine Energieänderung pro transportierter Ladung.</td><td>Volt · V</td><td>Die Spannung am Kondensator ist während des Ladens meist kleiner als die Quellenspannung.</td></tr>
      <tr><th><MathFormula tex="I" /> · Stromstärke</th><td>Wie viel Ladung ändert sich pro Zeit? Das Vorzeichen gibt die Richtung relativ zum festgelegten Pfeil an.</td><td>Ampere · A</td><td>Es fließt im äußeren Leiter Strom; durch den isolierenden Plattenzwischenraum fließen keine Leitungselektronen.</td></tr>
      <tr><th><MathFormula tex="C" /> · Kapazität</th><td>Welche Plattenladung gehört zu einer bestimmten Kondensatorspannung? Hier ist C eine konstante Eigenschaft des Bauteils.</td><td>Farad · F</td><td>C als Formelzeichen bedeutet Kapazität. C hinter einem Ladungswert ist dagegen die Einheit Coulomb.</td></tr>
    </tbody></table></div>
    <div className="rc-foundation">
      <h5>Beziehung A · Von Spannung zu Ladung</h5>
      <Formula tex={tex`Q=C\cdot U_C`} />
      <p><T>{tex`Du kennst $C$ und misst $U_C$? Dann berechnest du die Plattenladung mit dieser Gleichung. Sie sagt bei konstantem C auch: doppelte Kondensatorspannung → doppelte Plattenladung.`}</T></p>
      <p><b>Warum brauchen wir sie später?</b> Der Versuch misst zunächst Spannungen. Die Herleitung soll aber die zeitliche Ladungsänderung beschreiben. Diese Beziehung verbindet beides.</p>
      <Help title="Umstellen vergessen? So wird aus Q = C · U_C die Spannung">
        <p>Teile beide Seiten durch C. Das C kürzt sich auf der rechten Seite. Vertausche anschließend die beiden Seiten der Gleichung.</p>
        <Formula tex={[tex`\frac{Q}{C}=\frac{C\cdot U_C}{C}`, tex`U_C=\frac{Q}{C}`]} />
      </Help>
      <h5>Beziehung B · Von Widerstandsspannung zu Strom</h5>
      <Formula tex={[tex`U_R=R\cdot I`, tex`I=\frac{U_R}{R}`]} />
      <p><T>{tex`Für den Strom durch R setzt du die Spannung $U_R$ ein, die wirklich am Widerstand liegt. Erst musst du aus der Schaltung herausfinden, wie groß $U_R$ ist. Du darfst nicht automatisch $U_0$ oder $U_C$ einsetzen.`}</T></p>
      <p><b>Warum brauchen wir sie später?</b> Der Widerstand begrenzt den Strom. Kleinerer Spannungsbetrag am Widerstand bedeutet bei gleichem R einen kleineren Strombetrag.</p>
      <h5>Beziehung C · Vom Ladungsunterschied zum mittleren Strom</h5>
      <Formula tex={tex`\overline I=\frac{\Delta Q}{\Delta t}`} />
      <p><T>{tex`$\Delta$ („Delta“) bedeutet Änderung. Berechne immer „späterer Wert minus früherer Wert“: $\Delta Q=Q(t_2)-Q(t_1)$ und $\Delta t=t_2-t_1$. Der Strich über I bezeichnet den Mittelwert über dieses Zeitintervall.`}</T></p>
      <p><b>Warum brauchen wir sie später?</b> Beim Entladen nimmt die gespeicherte Ladung ab. Ihre Änderung ist negativ. So verbinden wir die Richtung des Stroms mit der Ladungsänderung.</p>
    </div>
    <WorkNow><p>Schreibe die drei Beziehungen ab. Ergänze unter jede Formel einen Satz, der mit „Diese Gleichung benutze ich, wenn …“ beginnt. Bearbeite danach Aufgabe 1.</p></WorkNow>
    <Help title="Rechenhilfe: Präfixe, Einheiten und Taschenrechner">
      <p>Für die Berechnung von R · C verwendest du Ohm und Farad. Schreibe die Umrechnung vor dem Einsetzen auf:</p>
      <Formula tex={[tex`1\,\mathrm{k\Omega}=10^3\,\mathrm\Omega,\qquad 1\,\mathrm{M\Omega}=10^6\,\mathrm\Omega`, tex`1\,\mathrm{\mu F}=10^{-6}\,\mathrm F,\qquad 1\,\mathrm{mA}=10^{-3}\,\mathrm A`, tex`1\,\mathrm{\mu C}=10^{-6}\,\mathrm C,\qquad 1\,\mathrm{ms}=10^{-3}\,\mathrm s`]} />
      <p><T>{tex`Beispiel: $10\,\mathrm{\mu F}=10\cdot10^{-6}\,\mathrm F=10^{-5}\,\mathrm F$. Dagegen sind $1\,\mathrm{M\Omega}=10^6\,\mathrm\Omega$. Großes M und kleines m bedeuten sehr unterschiedliche Faktoren!`}</T></p>
      <p>Gib Zehnerpotenzen mit der Potenztaste oder der Taste „×10ˣ“ ein. Runde erst das Endergebnis. Eine Stromstärke in Ampere multiplizierst du mit 1000, um den Zahlenwert in Milliampere zu erhalten.</p>
      <Formula tex={tex`8\cdot10^{-6}\,\mathrm A=0{,}008\,\mathrm{mA}=8\,\mathrm{\mu A}`} />
    </Help>
  </div>;
}
export function FirstMeasurementGuide() {
  return <div className="rc-guided-protocol" id="rc-measurement-guide">
    <h4>Bedienhilfe · So nimmst du einen einzelnen Messwert auf</h4>
    <p>Das Experiment steht gleich darunter. Arbeite zuerst mit der direkten Zeiteingabe. Du brauchst den Vorgang dafür nicht in Echtzeit ablaufen zu lassen.</p>
    <ol>
      <li><b>Versuch festlegen.</b> Klicke „Grundversuch · 1 MΩ, 10 µF, 20 V“. Die drei Bauteilwerte sind damit eingestellt.</li>
      <li><b>Anfangszustand festlegen.</b> Klicke „Aufladen vorbereiten · leer“. Die Uhr steht auf 0 s und der Kondensator hat noch keine Spannung.</li>
      <li><b>Ersten Wert aufnehmen.</b> Lies bei 0 s die Kondensatorspannung und den vorzeichenbehafteten Strom ab. Klicke „Messwert aufnehmen“. Dieser Klick überträgt die Werte in die Tabelle.</li>
      <li><b>Nächsten Zeitpunkt untersuchen.</b> Schreibe 5 in das Feld „Messzeit t in s“. Lies die neuen Anzeigen ab und klicke erneut „Messwert aufnehmen“. Nur die Zeiteingabe allein speichert noch keinen Tabellenwert.</li>
      <li><b>Im Heft protokollieren.</b> <T>{tex`Übertrage je eine Tabellenzeile mit t, $U_C$ und I. Für eine ganze Reihe wiederholst du Schritt 4 mit den im Auftrag genannten Zeiten.`}</T></li>
      <li><b>Vor einem neuen Versuch sichern.</b> Klicke „Messreihe merken“. Vorbereitungsbuttons und geänderte Bauteilwerte starten eine neue aktuelle Tabelle; gemerkte Reihen findest du in „Tabelle und Diagramm anzeigen für“ wieder.</li>
      <li><b>Erst selbst zeichnen.</b> Übertrage die Messpunkte in dein Heft. Wähle erst danach die Diagrammgröße und klicke „Diagramm zeichnen“, um zu vergleichen.</li>
    </ol>
    <p><b>Wichtig beim Entladen:</b> „Entladen vorbereiten · geladen“ beginnt einen neuen Versuch mit der vollen Anfangsspannung. „E · Entladen“ schaltet dagegen den gerade vorhandenen Ladungszustand um. Diesen Unterschied brauchst du bei Aufgabe 18.</p>
  </div>;
}
export function ExponentialPrimer() {
  return <div className="rc-foundation" id="rc-exponential-help">
    <h4>Mathematik auffrischen · Exponentialfaktor und Ableitung</h4>
    <p>Eine gleichmäßige Abnahme um denselben <em>Betrag</em> wäre linear. Eine Abnahme, bei der in gleichen Zeiten derselbe <em>Anteil</em> übrig bleibt, ist exponentiell. Das hast du in Aufgabe 5 untersucht.</p>
    <p><T>{tex`Die natürliche Exponentialfunktion benutzt die feste Zahl $\mathrm e\approx2{,}71828$. In $\mathrm e^{-\frac{t}{R\cdot C}}$ steht e für diese Zahl, nicht für Energie und nicht für die Elementarladung. Den ganzen Ausdruck nennen wir Exponentialfaktor.`}</T></p>
    <ol>
      <li><b>Das Produkt im Nenner berechnen.</b><Formula tex={tex`R\cdot C=10^6\,\mathrm\Omega\cdot10^{-5}\,\mathrm F=10\,\mathrm s`} /><p><T>{tex`Ohm mal Farad ergibt Sekunde. R · C ist hier also eine Zeit. Für dieses Produkt führen wir in Lernblock 5 den Namen Zeitkonstante $\tau$ ein.`}</T></p></li>
      <li><b>Den Exponenten vollständig berechnen.</b><Formula tex={tex`-\frac{t}{R\cdot C}=-\frac{5\,\mathrm s}{10\,\mathrm s}=-0{,}5`} /><p>Die Sekunden kürzen sich. In der Potenz steht eine einheitenfreie Zahl.</p></li>
      <li><b>Die Exponentialfunktion auswerten.</b><Formula tex={tex`\mathrm e^{-0{,}5}\approx0{,}60653`} /><p>Auf dem Taschenrechner: die Funktion eˣ wählen und −0,5 als Exponenten eingeben. Bei vielen Geräten liegt eˣ über der Taste ln. Die Taste EXP oder EE dient häufig nur zur Eingabe von Zehnerpotenzen; sie ist dann nicht die Funktion eˣ. Prüfe die Beschriftung deines Geräts.</p></li>
      <li><b>Die Zahl deuten.</b><p>0,60653 bedeutet: Rund 60,65 % des Anfangswerts sind übrig. Zum Restwert kommst du, indem du den Anfangswert mit diesem Faktor multiplizierst.</p></li>
    </ol>
    <WorkNow><p><T>{tex`Berechne für $t=0$, $t=10\,\mathrm s$ und $t=20\,\mathrm s$ jeweils erst den Exponenten, dann den Faktor. Schreibe zu jedem Faktor den verbleibenden Prozentanteil.`}</T></p></WorkNow>
    <Help title="Kontrolle: drei Exponentialfaktoren">
      <Formula tex={[tex`t=0:\quad \mathrm e^0=1=100\,\%`, tex`t=10\,\mathrm s:\quad \mathrm e^{-1}\approx0{,}36788\approx36{,}79\,\%`, tex`t=20\,\mathrm s:\quad \mathrm e^{-2}\approx0{,}13534\approx13{,}53\,\%`]} />
    </Help>
    <Help title="Ableiten vergessen? Die Kettenregel in drei Rechenschritten">
      <p>Wir betrachten zunächst nur den Exponentialfaktor. R und C ändern sich während des Versuchs nicht.</p>
      <ol><li><b>Innere Funktion benennen.</b><Formula tex={tex`g(t)=-\frac{t}{R\cdot C}`} /></li>
        <li><b>Innere Funktion ableiten.</b><Formula tex={tex`g'(t)=-\frac{1}{R\cdot C}`} /><p>t wird beim Ableiten zu 1. Der konstante Faktor vor t bleibt stehen.</p></li>
        <li><b>Äußere Ableitung mal innere Ableitung.</b><Formula tex={tex`\frac{\mathrm d}{\mathrm dt}\mathrm e^{g(t)}=\mathrm e^{g(t)}\cdot g'(t)=-\frac{1}{R\cdot C}\cdot\mathrm e^{-\frac{t}{R\cdot C}}`} /><p>Die äußere Funktion eˣ bleibt beim Ableiten eˣ. Der zusätzliche Faktor entsteht durch die innere Funktion. Er darf nicht fehlen.</p></li></ol>
      <p>Ein konstanter Vorfaktor wie Q₀ wird einfach mitgeführt. Der Punkt in Q̇ ist eine Ableitungsnotation; der Malpunkt zwischen Faktoren bedeutet Multiplikation.</p>
    </Help>
  </div>;
}
export function FormulaDecisionGuide() {
  return <div id="rc-equation-choice" className="rc-equation-choice">
    <h4>6.2 · Welche Gleichung benutze ich wann?</h4>
    <p>Frage zuerst nach dem Vorgang und dann nach der gesuchten Größe. Die Differenzialgleichung erklärt den Verlauf. Wenn du einen Zahlenwert zu einer bestimmten Zeit berechnen willst, benutzt du in der Regel die zugehörige Zeitfunktion.</p>
    <div className="ef-table-wrap"><table><thead><tr><th>Was sagt die Aufgabe?</th><th>Dein Ansatz</th><th>Warum passt er?</th></tr></thead><tbody>
      <tr><td>C und momentane Kondensatorspannung sind bekannt; gesucht ist Q.</td><td><MathFormula tex={tex`Q=C\cdot U_C`} /></td><td>Diese Beziehung gilt zu jedem Zeitpunkt. Eine zusätzliche Exponentialrechnung ist dann nicht nötig.</td></tr>
      <tr><td>Beim Aufladen ist die momentane Kondensatorspannung bekannt; gesucht ist I.</td><td><MathFormula tex={tex`I=\frac{U_0-U_C}{R}`} /></td><td>Die Differenz ist die Spannung am Widerstand.</td></tr>
      <tr><td>Beim Entladen ist die momentane Kondensatorspannung bekannt; gesucht ist I.</td><td><MathFormula tex={tex`I=-\frac{U_C}{R}`} /></td><td>Die Quelle ist abgetrennt. Der Strom fließt entgegen dem festen Bezugspfeil.</td></tr>
      <tr><td><T>{tex`Ein leerer Kondensator wird geladen; gesucht ist $U_C$ nach t.`}</T></td><td><MathFormula tex={tex`U_C(t)=U_0\cdot\left(1-\mathrm e^{-\frac{t}{\tau}}\right)`} /></td><td>Die Klammer beschreibt den bereits erreichten Anteil der Endspannung.</td></tr>
      <tr><td><T>{tex`Ein Kondensator mit Anfangsspannung $U_i$ entlädt sich; gesucht ist $U_C$ nach t.`}</T></td><td><MathFormula tex={tex`U_C(t)=U_i\cdot\mathrm e^{-\frac{t}{\tau}}`} /></td><td>Der Faktor beschreibt den noch vorhandenen Anteil. Uᵢ ist die Spannung am Beginn dieser Entladephase.</td></tr>
      <tr><td>Wie lange dauert es bis zu einer vorgegebenen Spannung?</td><td>Passende Lade- oder Entladefunktion aufschreiben, den Exponentialterm isolieren, dann ln anwenden.</td><td>Die Zeit steht im Exponenten. Ein Logarithmus macht sie zugänglich.</td></tr>
      <tr><td>Eine Messreihe zeigt die Abnahme; R ist bekannt, C gesucht.</td><td><MathFormula tex={tex`C=\frac{\tau}{R}`} /></td><td>Bestimme τ zuerst bei etwa 36,8 % des Anfangswerts; stelle dann τ = R · C nach C um.</td></tr>
      <tr><td>Wie viel Ladung ist in einem Zeitabschnitt abgeflossen?</td><td><MathFormula tex={tex`Q_{\mathrm{ab}}=Q(0)-Q(T)`} /><br />oder Fläche unter dem Strombetrag-Zeit-Verlauf.</td><td>Die abgeflossene Ladung ist nicht die noch gespeicherte Restladung.</td></tr>
    </tbody></table></div>
    <h5>Ein vollständiges Rechenbeispiel · Entladen nach 5 s</h5>
    <p><T>{tex`Ein Kondensator ist anfangs auf 20 V geladen. $R=1\,\mathrm{M\Omega}$ und $C=10\,\mathrm{\mu F}$. Gesucht sind die Kondensatorspannung, die Plattenladung und der vorzeichenbehaftete Strom nach 5 s.`}</T></p>
    <ol>
      <li><b>Vorgang und Anfangszustand.</b> Die Quelle ist abgetrennt: Entladen. Der Anfangswert dieser Phase ist 20 V.</li>
      <li><b>Gegeben und gesucht notieren; Einheiten umrechnen.</b><Formula tex={[tex`R=10^6\,\mathrm\Omega,\quad C=10^{-5}\,\mathrm F,\quad U_i=20\,\mathrm V,\quad t=5\,\mathrm s`, tex`\tau=R\cdot C=10\,\mathrm s`]} /></li>
      <li><b>Zuerst die Spannung.</b> Weil ein Zeitpunkt gegeben ist, wählen wir die Entladefunktion.<Formula tex={tex`U_C(5\,\mathrm s)=20\,\mathrm V\cdot\mathrm e^{-\frac{5\,\mathrm s}{10\,\mathrm s}}\approx12{,}13\,\mathrm V`} /></li>
      <li><b>Jetzt die Ladung.</b> Die gerade berechnete Spannung benutzen wir in der bekannten Kondensatorbeziehung.<Formula tex={tex`Q=C\cdot U_C\approx10^{-5}\,\mathrm F\cdot12{,}13\,\mathrm V=121{,}3\,\mathrm{\mu C}`} /></li>
      <li><b>Jetzt den Strom.</b> Beim Entladen liefert der Kondensator die Spannung. Das Minuszeichen folgt aus unserer festen Stromrichtung.<Formula tex={tex`I=-\frac{U_C}{R}\approx-\frac{12{,}13\,\mathrm V}{10^6\,\mathrm\Omega}=-12{,}13\,\mathrm{\mu A}=-0{,}01213\,\mathrm{mA}`} /></li>
      <li><b>Ergebnis prüfen und antworten.</b> Die Spannung liegt zwischen 0 und 20 V; die Ladung ist kleiner als die Anfangsladung von 200 µC; der Strom ist negativ. Nach 5 s sind rund 12,13 V und 121,3 µC vorhanden, der Strom beträgt −0,01213 mA.</li>
    </ol>
    <WorkNow><p>Bearbeite denselben Zeitpunkt jetzt für einen <b>anfangs leeren Kondensator beim Aufladen</b>. <T>{tex`Bestimme wieder $U_C$, Q und I. Begründe insbesondere, welche Spannung du für den Strom einsetzen musst.`}</T></p></WorkNow>
    <Help title="Vergleichslösung: Aufladen nach 5 s">
      <Formula tex={[tex`U_C=20\,\mathrm V\cdot(1-\mathrm e^{-0{,}5})\approx7{,}87\,\mathrm V`, tex`Q=C\cdot U_C\approx78{,}69\,\mathrm{\mu C}`, tex`U_R=U_0-U_C\approx12{,}13\,\mathrm V`, tex`I=\frac{U_R}{R}\approx+0{,}01213\,\mathrm{mA}`]} />
      <p>Der Strombetrag ist für diese beiden Standardversuche zum gleichen Zeitpunkt gleich. Die Kondensatorspannungen sind verschieden: Die Ladespannung und die Entladespannung ergänzen sich hier zu 20 V.</p>
    </Help>
  </div>;
}
