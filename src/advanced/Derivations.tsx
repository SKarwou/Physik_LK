import FormulaSteps from '../components/FormulaSteps';
type Derivation=Parameters<typeof FormulaSteps>[0];
const t=String.raw;
const derivations:Record<string,Derivation[]>={
 'lichtuhr:exercise-0':[{title:'Eigenzeit in Laborzeit umrechnen',steps:[
  {tex:t`\gamma=\frac1{\sqrt{1-(v/c)^2}}`,comment:'Mit dem Lorentzfaktor beginnen. Der Quotient aus Geschwindigkeit und Lichtgeschwindigkeit ist dimensionslos.'},
  {tex:t`\gamma=\frac1{\sqrt{1-0{,}80^2}}=\frac1{0{,}60}=\frac53`,comment:'Erst das Geschwindigkeitsverhältnis quadrieren, dann subtrahieren, wurzeln und den Kehrwert nehmen.'},
  {tex:t`\Delta t=\gamma\Delta\tau=\frac53\cdot4{,}0\,\mathrm{\mu s}\approx6{,}67\,\mathrm{\mu s}`,comment:'Die Eigenzeit mit dem dimensionslosen Faktor multiplizieren. Die Laborzeit zwischen diesen Ticks ist größer.'},
 ]}],
 'zeitdilatation:exercise-0':[{title:'Mittlere Lebensdauer ist nicht die Halbwertszeit',steps:[
  {tex:t`\frac{N(t)}{N_0}=e^{-t/\tau_0}`,comment:'Im Ruhesystem ist die mittlere Eigenlebensdauer die Zeitkonstante des exponentiellen Überlebensgesetzes.'},
  {tex:t`\ln\!\left(\frac12\right)=-\frac{t_{1/2,0}}{\tau_0}`,comment:'Für die Halbwertszeit den Überlebensanteil ein Halb einsetzen und logarithmieren.'},
  {tex:t`t_{1/2,0}=\tau_0\ln2=2{,}20\,\mathrm{\mu s}\cdot\ln2\approx1{,}525\,\mathrm{\mu s}`,comment:'Mit der negativen Eigenlebensdauer multiplizieren. Die Halbwertszeit ist kleiner als die mittlere Lebensdauer.'},
  {tex:t`t_{1/2}=\gamma t_{1/2,0}=5\cdot1{,}525\,\mathrm{\mu s}\approx7{,}62\,\mathrm{\mu s}`,comment:'Für die gleichförmig bewegte Population den Zeitdilatationsfaktor anwenden; intern mit ungerundeten Zwischenwerten rechnen.'},
 ]}],
 'kosmologie:exercise-1':[{title:'Die Hubble-Zeit mit nachvollziehbaren Einheiten',intro:'Berechnet wird eine charakteristische Zeitskala. Ohne ein Modell der gesamten Expansionsgeschichte ist sie kein genaues Alter des Universums.',steps:[
  {tex:t`H_0=70\,\frac{\mathrm{km}}{\mathrm{s\,Mpc}}`,comment:'Die vorgegebene Hubble-Konstante enthält eine Geschwindigkeit pro Entfernung.'},
  {tex:t`H_0=\frac{70\,\mathrm{km/s}}{3{,}086\cdot10^{19}\,\mathrm{km}}\approx2{,}27\cdot10^{-18}\,\mathrm{s^{-1}}`,comment:'Ein Megaparsec durch seine Länge in Kilometern ersetzen. Die Kilometer kürzen sich.'},
  {tex:t`t_H=\frac1{H_0}\approx4{,}41\cdot10^{17}\,\mathrm s`,comment:'Den Kehrwert bilden. Aus einer inversen Zeit wird eine Zeit.'},
  {tex:t`t_H\approx\frac{4{,}41\cdot10^{17}\,\mathrm s}{3{,}156\cdot10^7\,\mathrm{s/a}}\approx1{,}40\cdot10^{10}\,\mathrm a`,comment:'Durch die Sekunden pro Jahr teilen. Das Ergebnis sind etwa vierzehn Milliarden Jahre als Zeitskala.'},
 ]}],
 lichtuhr:[{title:'Zeitdilatation aus der Geometrie der Lichtuhr',intro:t`Zwei Spiegel haben den Abstand $d$ quer zur Bewegungsrichtung. Ein Tick ist ein Hin- und Rückweg. $\Delta\tau$ ist die Tickdauer im Ruhesystem der Uhr, $\Delta t$ die Tickdauer im Labor. Die Uhr bewegt sich gleichförmig mit $v<c$.`,steps:[
  {tex:t`d=\frac{c\Delta\tau}{2}`,comment:'Im Ruhesystem läuft das Licht senkrecht zwischen den Spiegeln. Für einen halben Tick ist der Lichtweg gleich dem Spiegelabstand.'},
  {tex:t`\left(\frac{c\Delta t}{2}\right)^2=d^2+\left(\frac{v\Delta t}{2}\right)^2`,comment:'Im Labor verläuft der halbe Lichtweg diagonal. Mit Pythagoras: Lichtweg als Hypotenuse, Spiegelabstand und seitliche Bewegung als Katheten.'},
  {tex:t`c^2\Delta t^2=c^2\Delta\tau^2+v^2\Delta t^2`,comment:'Den Spiegelabstand aus der ersten Zeile einsetzen und die Gleichung mit vier multiplizieren.'},
  {tex:t`(c^2-v^2)\Delta t^2=c^2\Delta\tau^2`,comment:'Den Bewegungsterm auf beiden Seiten abziehen und das Quadrat der Laborzeit ausklammern.'},
  {tex:t`\Delta t^2=\frac{\Delta\tau^2}{1-v^2/c^2}`,comment:'Durch den positiven Faktor links teilen und anschließend Zähler und Nenner durch das Quadrat der Lichtgeschwindigkeit teilen.'},
  {tex:t`\Delta t=\frac{\Delta\tau}{\sqrt{1-v^2/c^2}}=\gamma\Delta\tau`,comment:'Für positive Zeitdauern die positive Wurzel ziehen. Der zusätzliche Faktor ist der Lorentzfaktor.'},
 ],conclusion:'Emission und Rückkehr eines Ticks geschehen im Ruhesystem der Uhr am selben Ort. Deshalb ist diese Tickdauer die Eigenzeit.'}],
 laengenkontraktion:[{title:'Warum Gleichzeitigkeit zur Längenmessung gehört',intro:t`Ein Stab ruht im gestrichenen System. Dieses bewegt sich mit $+v$ entlang der Stabachse relativ zum Labor. Die beiden Endpositionen werden im Labor gleichzeitig gemessen.`,steps:[
  {tex:t`\Delta x'=\gamma(\Delta x-v\Delta t)`,comment:'Die räumliche Lorentztransformation für die beiden Messereignisse an den Enden des Stabs verwenden.'},
  {tex:t`\Delta t=0`,comment:'Die beiden Endpositionen müssen im Labor zur selben Zeit bestimmt werden; andernfalls wird keine Laborlänge gemessen.'},
  {tex:t`L_0=\gamma L`,comment:'Im Ruhesystem beträgt der Abstand der ruhenden Enden die Eigenlänge. Im Labor ist die gleichzeitige Ortsdifferenz die gemessene Länge.'},
  {tex:t`L=\frac{L_0}{\gamma}`,comment:'Durch den positiven Lorentzfaktor teilen.'},
 ],conclusion:'Die beiden Ereignisse sind im Ruhesystem des Stabs im Allgemeinen nicht gleichzeitig. Dort bewegen sich seine Enden jedoch nicht; ihr Abstand bleibt die Eigenlänge.'}],
 'energie-impuls':[{title:'Die Energie-Impuls-Beziehung überprüfen',intro:t`Zunächst ein Teilchen mit Ruhemasse $m>0$ und $v<c$. Wir verwenden $E=\gamma mc^2$ und $p=\gamma mv$.`,steps:[
  {tex:t`E^2-p^2c^2=\gamma^2m^2c^4-\gamma^2m^2v^2c^2`,comment:'Energie und Impuls einsetzen und die Quadrate vollständig bilden.'},
  {tex:t`E^2-p^2c^2=\gamma^2m^2c^4\left(1-\frac{v^2}{c^2}\right)`,comment:'Den gemeinsamen Faktor auf der rechten Seite ausklammern.'},
  {tex:t`\gamma^2\left(1-\frac{v^2}{c^2}\right)=1`,comment:'Die Definition des Lorentzfaktors einsetzen; die beiden Faktoren sind zueinander invers.'},
  {tex:t`E^2=p^2c^2+m^2c^4`,comment:'Die Vereinfachung übernehmen und den Impulsterm wieder auf die rechte Seite bringen.'},
 ],conclusion:t`Die relativistische Beziehung gilt auch für Photonen: Mit $m=0$ folgt $E=pc$. Die Ausdrücke $\gamma mv$ und $\gamma mc^2$ dürfen für ein Photon dagegen nicht als „null mal unendlich“ ausgewertet werden.`}],
 'gravitation-bahnen':[{title:'Von der Gravitationskraft zum dritten Keplerschen Gesetz',intro:t`Zunächst eine Kreisbahn mit Radius $r$ um eine kugelsymmetrische Zentralmasse $M$. Die Satellitenmasse $m$ sei gegenüber $M$ vernachlässigbar; Newtons Gravitation ist anwendbar.`,steps:[
  {tex:t`\frac{GMm}{r^2}=\frac{mv^2}{r}`,comment:'Die Gravitationskraft liefert genau die benötigte Zentripetalkraft. Es werden nicht zwei zusätzliche Kräfte addiert.'},
  {tex:t`v^2=\frac{GM}{r}`,comment:'Beide Seiten durch die Satellitenmasse teilen und mit dem Bahnradius multiplizieren.'},
  {tex:t`v=\frac{2\pi r}{T}`,comment:'Bei gleichförmiger Kreisbewegung ist die Geschwindigkeit Umfang durch Umlaufzeit.'},
  {tex:t`\frac{4\pi^2r^2}{T^2}=\frac{GM}{r}`,comment:'Den Ausdruck für die Geschwindigkeit quadrieren und in das Kraftgleichgewicht einsetzen.'},
  {tex:t`T^2=\frac{4\pi^2}{GM}r^3`,comment:'Mit dem Periodenquadrat und dem Radius multiplizieren; anschließend durch das Produkt aus Gravitationskonstante und Zentralmasse teilen.'},
 ],conclusion:t`Für eine elliptische Bahn wird $r$ durch die große Halbachse $a$ ersetzt. Das folgt aus der weitergehenden Kepler-Theorie, nicht aus der hier gezeigten Kreisbahnrechnung. Bei nicht vernachlässigbarer Begleitermasse steht $M+m$ im Nenner.`}],
 'sterne-spektren':[{title:'Sternleuchtkräfte vergleichen, ohne alle Konstanten einzusetzen',intro:t`Für zwei Sterne verwenden wir effektive Temperaturen und Radien. Es gilt die Stefan-Boltzmann-Beziehung; die tiefgestellte Sonne kennzeichnet Vergleichswerte der Sonne.`,steps:[
  {tex:t`\frac{L}{L_\odot}=\frac{4\pi R^2\sigma T^4}{4\pi R_\odot^2\sigma T_\odot^4}`,comment:'Die beiden Leuchtkraftgleichungen durcheinander teilen.'},
  {tex:t`\frac{L}{L_\odot}=\left(\frac{R}{R_\odot}\right)^2\left(\frac{T}{T_\odot}\right)^4`,comment:'Gleiche Konstanten kürzen und Radien beziehungsweise Temperaturen als dimensionslose Verhältnisse schreiben.'},
 ],conclusion:'Die Temperatur wird in Kelvin eingesetzt. Eine kleinere Temperatur kann durch eine größere Oberfläche überkompensiert werden.'}],
 kosmologie:[{title:'Von der Rotverschiebung zu einer nahen Galaxienentfernung',intro:t`Die Galaxie soll näherungsweise dem kosmischen Expansionsfluss folgen; Eigenbewegungen werden vernachlässigt. Verwendet wird nur der Bereich kleiner Rotverschiebung $z\ll1$.`,steps:[
  {tex:t`z=\frac{\lambda_{\mathrm{obs}}-\lambda_0}{\lambda_0}`,comment:'Zuerst die gemessene relative Wellenlängenänderung bestimmen. Beide Wellenlängen müssen in derselben Einheit stehen.'},
  {tex:t`v\approx cz`,comment:'Bei kleiner kosmologischer Rotverschiebung die lineare Geschwindigkeitsnäherung verwenden.'},
  {tex:t`H_0d\approx cz`,comment:'Dieselbe Rezessionsgeschwindigkeit durch die lineare Hubble-Lemaître-Beziehung ausdrücken.'},
  {tex:t`d\approx\frac{cz}{H_0}`,comment:'Durch die positive Hubble-Konstante teilen. Ihre Einheit muss zur Einheit der Lichtgeschwindigkeit passen.'},
 ],conclusion:t`Bei $c$ in $\mathrm{km/s}$ und $H_0$ in $\mathrm{km/(s\,Mpc)}$ folgt $d$ in Megaparsec. Bei großer Rotverschiebung oder dominierender Eigenbewegung ist dies kein zulässiger Entfernungsrechner.`}],
};
export default function AdvancedDerivations({lesson,exercise}:{lesson:string;exercise?:number}) {return <>{derivations[exercise===undefined?lesson:`${lesson}:exercise-${exercise}`]?.map(d=><FormulaSteps key={d.title} {...d}/>)}</>;}
