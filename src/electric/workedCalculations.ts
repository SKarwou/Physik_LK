import type { FormulaStep } from '../components/FormulaSteps';
const t = String.raw;
export const workedCalculations: FormulaStep[][] = [
  [
    { tex: t`|Q|=n\cdot e`, comment: 'Jedes überschüssige Elektron trägt denselben Ladungsbetrag. Multipliziere die Anzahl mit der Elementarladung.' },
    { tex: t`|Q|=2{,}0\cdot10^{10}\cdot1{,}602\cdot10^{-19}\,\mathrm C`, comment: 'Setze die Anzahl ohne Einheit und die Elementarladung in Coulomb ein.' },
    { tex: t`|Q|=3{,}204\cdot10^{-9}\,\mathrm C`, comment: 'Multipliziere die Zahlenfaktoren und addiere die Zehnerexponenten: 10 − 19 = −9.' },
    { tex: t`Q=-3{,}204\,\mathrm{nC}`, comment: 'Nano bedeutet zehn hoch minus neun. Wegen des Elektronenüberschusses ist die Ladung negativ.' },
  ],
  [
    { tex: t`q=2{,}0\cdot10^{-9}\,\mathrm C`, comment: 'Rechne Nanocoulomb in Coulomb um, damit der Nenner in der Grundeinheit steht.' },
    { tex: t`F=8{,}0\cdot10^{-6}\,\mathrm N`, comment: 'Rechne Mikronewton in Newton um.' },
    { tex: t`E=\frac Fq`, comment: 'Gesucht ist die Kraft pro positiver Probeladung. Wähle deshalb die Definition der Feldstärke.' },
    { tex: t`E=\frac{8{,}0\cdot10^{-6}\,\mathrm N}{2{,}0\cdot10^{-9}\,\mathrm C}`, comment: 'Setze beide Werte mit ihren Einheiten ein.' },
    { tex: t`E=4{,}0\cdot10^3\,\frac{\mathrm N}{\mathrm C}`, comment: 'Teile 8 durch 2; beim Teilen der Zehnerpotenzen werden die Exponenten subtrahiert: −6 − (−9) = 3.' },
  ],
  [
    { tex: t`d=5{,}0\,\mathrm{cm}=0{,}050\,\mathrm m`, comment: 'Rechne den Plattenabstand in Meter um: durch 100 teilen.' },
    { tex: t`E=\frac Ud`, comment: 'Nutze den Zusammenhang für den Betrag eines homogenen Plattenfeldes; Randfelder bleiben unberücksichtigt.' },
    { tex: t`E=\frac{100\,\mathrm V}{0{,}050\,\mathrm m}`, comment: 'Setze Spannung und Plattenabstand ein.' },
    { tex: t`E=2000\,\frac{\mathrm V}{\mathrm m}`, comment: 'Berechne den Quotienten. Volt pro Meter ist gleichwertig zu Newton pro Coulomb.' },
  ],
  [
    { tex: t`q=3{,}0\cdot10^{-9}\,\mathrm C`, comment: 'Wandle Nanocoulomb in Coulomb um.' },
    { tex: t`F=q\cdot E`, comment: 'Die positive Ladung erfährt eine Kraft in Feldrichtung. Ihr Betrag ist Ladung mal Feldstärke.' },
    { tex: t`F=3{,}0\cdot10^{-9}\,\mathrm C\cdot2000\,\frac{\mathrm N}{\mathrm C}`, comment: 'Setze ein. Die Einheit Coulomb kürzt sich gegen Coulomb im Nenner.' },
    { tex: t`F=6{,}0\cdot10^{-6}\,\mathrm N=6{,}0\,\mathrm{\mu N}`, comment: 'Multipliziere und drücke das Ergebnis mit dem Vorsatz Mikro aus.' },
  ],
  [
    { tex: t`r=0{,}10\,\mathrm m`, comment: 'Die 10 Zentimeter werden in Meter umgerechnet. Der Abstand wird anschließend quadriert.' },
    { tex: t`F=k\frac{|Qq|}{r^2}`, comment: 'Nutze den Betrag des Coulomb-Gesetzes für zwei Punktladungen.' },
    { tex: t`F=8{,}99\cdot10^9\,\frac{\mathrm{N\,m^2}}{\mathrm{C^2}}\cdot\frac{(10\cdot10^{-9}\,\mathrm C)(20\cdot10^{-9}\,\mathrm C)}{(0{,}10\,\mathrm m)^2}`, comment: 'Setze beide Ladungen in Coulomb und den Abstand in Metern ein. Quadratmeter und Coulombquadrat kürzen sich.' },
    { tex: t`F=1{,}798\cdot10^{-4}\,\mathrm N`, comment: 'Berechne den Quotienten. Das Ergebnis hat die Einheit Newton.' },
    { tex: t`F=0{,}1798\,\mathrm{mN}`, comment: 'Multipliziere die Newton-Zahl mit 1000 für Millinewton. Beide Ladungen sind positiv, daher wirkt die Kraft abstoßend.' },
  ],
  [
    { tex: t`F_{\mathrm{neu}}=F_{\mathrm{alt}}\left(\frac r{2r}\right)^2`, comment: 'Die Kraft hängt umgekehrt vom Abstandsquadrat ab. Verwende das Verhältnis der alten zur neuen Entfernung.' },
    { tex: t`F_{\mathrm{neu}}=\frac{F_{\mathrm{alt}}}{4}`, comment: 'Kürze den alten Abstand. Das Quadrat von einem Halb ist ein Viertel.' },
    { tex: t`F_{\mathrm{neu}}=\frac{12\,\mathrm{mN}}4=3\,\mathrm{mN}`, comment: 'Setze die alte Kraft ein und teile durch vier. Die Ladungen bleiben unverändert.' },
  ],
  [
    { tex: t`U_{AB}=\varphi_A-\varphi_B`, comment: 'Beachte die vereinbarte Richtung: Potenzial bei A minus Potenzial bei B.' },
    { tex: t`U_{AB}=8\,\mathrm V-3\,\mathrm V`, comment: 'Setze die beiden Potenziale in dieser Reihenfolge ein.' },
    { tex: t`U_{AB}=5\,\mathrm V`, comment: 'Die Differenz ist positiv. Bei vertauschten Messspitzen ändert sich das Vorzeichen.' },
  ],
  [
    { tex: t`\Delta E_{\mathrm{kin}}=qU_{AB}`, comment: 'Wenn nur die elektrische Kraft wirkt, wird die abgegebene potenzielle Energie zu kinetischer Energie.' },
    { tex: t`\Delta E_{\mathrm{kin}}=2{,}0\cdot10^{-9}\,\mathrm C\cdot100\,\mathrm V`, comment: 'Rechne die Ladung in Coulomb um und setze ein. Coulomb mal Volt ergibt Joule.' },
    { tex: t`\Delta E_{\mathrm{kin}}=2{,}0\cdot10^{-7}\,\mathrm J`, comment: 'Multipliziere. Das positive Ergebnis bedeutet eine Zunahme der kinetischen Energie.' },
    { tex: t`\Delta E_{\mathrm{kin}}=0{,}20\,\mathrm{\mu J}`, comment: 'Ein Mikrojoule ist zehn hoch minus sechs Joule. Die potenzielle Energie nimmt um denselben Betrag ab.' },
  ],
  [
    { tex: t`E_{\mathrm{ges}}^2=E_1^2+E_2^2`, comment: 'Die beiden Feldvektoren stehen senkrecht. Deshalb gilt für den Betrag der Summe der Satz des Pythagoras.' },
    { tex: t`E_{\mathrm{ges}}=\sqrt{E_1^2+E_2^2}`, comment: 'Ziehe die positive Wurzel, weil ein Feldstärkebetrag nicht negativ ist.' },
    { tex: t`E_{\mathrm{ges}}=\sqrt{3^2+4^2}\,\frac{\mathrm{kN}}{\mathrm C}`, comment: 'Beide Beiträge stehen schon in derselben Einheit. Setze ihre Zahlenwerte ein.' },
    { tex: t`E_{\mathrm{ges}}=5\,\frac{\mathrm{kN}}{\mathrm C}`, comment: 'Unter der Wurzel steht 9 + 16 = 25. Die Beträge direkt zu addieren wäre bei senkrechten Vektoren falsch.' },
    { tex: t`\alpha=\arctan\left(\frac43\right)\approx53{,}1^\circ`, comment: 'Der Tangens des Winkels zur rechten Richtung ist die obere Komponente geteilt durch die rechte. Stelle den Rechner auf Grad.' },
  ],
  [
    { tex: t`C=\frac QU`, comment: 'Kapazität gibt an, wie viel Plattenladung pro Spannung gespeichert wird.' },
    { tex: t`C=\frac{20\,\mathrm{\mu C}}{10\,\mathrm V}`, comment: 'Setze Ladung und Spannung ein. Mikrocoulomb pro Volt ergibt Mikrofarad.' },
    { tex: t`C=2\,\mathrm{\mu F}`, comment: 'Teile 20 durch 10 und ergänze die Einheit der Kapazität.' },
  ],
  [
    { tex: t`A=200\,\mathrm{cm^2}=0{,}0200\,\mathrm{m^2}`, comment: 'Bei einer Fläche wird der Längen-Umrechnungsfaktor quadriert: Ein Quadratzentimeter entspricht zehn hoch minus vier Quadratmetern.' },
    { tex: t`d=2{,}0\,\mathrm{mm}=0{,}0020\,\mathrm m`, comment: 'Rechne den Plattenabstand in Meter um.' },
    { tex: t`C=\varepsilon_0\varepsilon_r\frac Ad`, comment: 'Wähle das Modell eines Plattenkondensators mit vernachlässigbaren Randfeldern.' },
    { tex: t`C=8{,}854\cdot10^{-12}\,\frac{\mathrm F}{\mathrm m}\cdot1\cdot\frac{0{,}0200\,\mathrm{m^2}}{0{,}0020\,\mathrm m}`, comment: 'Setze alle Werte ein. Die Meter im Flächen-Abstands-Quotienten kürzen sich mit Meter im Nenner der Feldkonstante.' },
    { tex: t`C=8{,}854\cdot10^{-11}\,\mathrm F=88{,}54\,\mathrm{pF}`, comment: 'Berechne die Kapazität und nutze: Ein Pikofarad entspricht zehn hoch minus zwölf Farad.' },
  ],
  [
    { tex: t`C=100\,\mathrm{\mu F}=10^{-4}\,\mathrm F`, comment: 'Rechne Mikrofarad in Farad um.' },
    { tex: t`E_{\mathrm{Kond}}=\frac12 CU^2`, comment: 'Wähle die Energieformel des idealen Kondensators. Die Spannung geht quadratisch ein.' },
    { tex: t`E_{\mathrm{Kond}}=\frac12\cdot10^{-4}\,\mathrm F\cdot(10\,\mathrm V)^2`, comment: 'Setze ein und quadriere die gesamte Spannungsangabe mit ihrer Einheit.' },
    { tex: t`E_{\mathrm{Kond}}=0{,}005\,\mathrm J=5\,\mathrm{mJ}`, comment: 'Berechne den Wert. Farad mal Voltquadrat ergibt Joule; für Millijoule multiplizierst du die Joule-Zahl mit 1000.' },
  ],
  [
    { tex: t`F=ma`, comment: 'Das zweite Newtonsche Gesetz verbindet Kraft und Beschleunigung bei konstanter Masse.' },
    { tex: t`a=\frac Fm`, comment: 'Teile beide Seiten durch die Masse, um die gesuchte Beschleunigung freizustellen.' },
    { tex: t`a=\frac{6{,}0\cdot10^{-16}\,\mathrm N}{2{,}0\cdot10^{-27}\,\mathrm{kg}}`, comment: 'Setze die Kraft in Newton und die Masse in Kilogramm ein.' },
    { tex: t`a=3{,}0\cdot10^{11}\,\frac{\mathrm m}{\mathrm{s^2}}`, comment: 'Teile die Zahlenfaktoren und subtrahiere die Exponenten: −16 − (−27) = 11. Newton pro Kilogramm ist Meter pro Sekundequadrat.' },
  ],
];
