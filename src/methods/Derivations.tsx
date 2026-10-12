import FormulaSteps from '../components/FormulaSteps';
type Derivation=Parameters<typeof FormulaSteps>[0];
const t=String.raw;
const derivations:Record<string,Derivation[]>={
 'formeln-rechnen:exercise-0':[{title:'Die Zahlen erst in die umgestellte Formel einsetzen',steps:[
  {tex:t`|v|=\sqrt{\frac{2E_{\mathrm{kin}}}{m}}`,comment:'Die im Kapitel hergeleitete Formel für den Geschwindigkeitsbetrag verwenden.'},
  {tex:t`|v|=\sqrt{\frac{2\cdot4{,}0\,\mathrm J}{0{,}50\,\mathrm{kg}}}`,comment:'Energie und Masse einschließlich ihrer Einheiten einsetzen.'},
  {tex:t`|v|=\sqrt{16\,\mathrm{m^2/s^2}}=4{,}0\,\mathrm{m/s}`,comment:'Zuerst den gesamten Ausdruck unter der Wurzel berechnen, dann Zahl und Einheit wurzeln.'},
 ]}],
 'diagramme:exercise-0':[{title:'Steigung und Anfangsort getrennt bestimmen',steps:[
  {tex:t`v=\frac{x_2-x_1}{t_2-t_1}`,comment:'Für die Gerade die Ortsdifferenz durch die zugehörige Zeitdifferenz teilen.'},
  {tex:t`v=\frac{1{,}1\,\mathrm m-0{,}5\,\mathrm m}{4\,\mathrm s-1\,\mathrm s}=0{,}20\,\mathrm{m/s}`,comment:'Beide Punkte in derselben Reihenfolge subtrahieren. Die Einheit der Steigung ist Meter pro Sekunde.'},
  {tex:t`x_0=x_1-vt_1`,comment:t`Aus $x_1=x_0+vt_1$ auf beiden Seiten den Bewegungsterm abziehen.`},
  {tex:t`x_0=0{,}5\,\mathrm m-0{,}20\,\mathrm{m/s}\cdot1\,\mathrm s=0{,}30\,\mathrm m`,comment:'Einen bekannten Punkt einsetzen. Als Kontrolle muss der zweite Punkt denselben Anfangsort liefern.'},
 ]}],
 'formeln-rechnen':[{title:'Eine Formel umstellen: Geschwindigkeit aus Energie',intro:t`Für eine nichtrelativistische Bewegung gilt die folgende kinetische Energie. $m>0$ und $E_{\mathrm{kin}}\ge0$ sind vorausgesetzt; gesucht ist der Geschwindigkeitsbetrag.`,steps:[
  {tex:t`E_{\mathrm{kin}}=\frac12mv^2`,comment:'Mit dem physikalischen Ansatz beginnen, bevor Zahlen eingesetzt werden.'},
  {tex:t`2E_{\mathrm{kin}}=mv^2`,comment:'Beide Seiten mit zwei multiplizieren; der Faktor ein Halb verschwindet.'},
  {tex:t`\frac{2E_{\mathrm{kin}}}{m}=v^2`,comment:'Beide Seiten durch die Masse teilen. Die Masse darf nicht null sein.'},
  {tex:t`|v|=\sqrt{\frac{2E_{\mathrm{kin}}}{m}}`,comment:'Die positive Wurzel des ganzen Quotienten liefert den Betrag. Die Energie allein legt die Richtung nicht fest.'},
  {tex:t`[v]=\sqrt{\frac{\mathrm J}{\mathrm{kg}}}=\frac{\mathrm m}{\mathrm s}`,comment:t`Einheiten prüfen: $\mathrm J=\mathrm{kg\,m^2/s^2}$. Erst danach Zahlen mit zusammenpassenden Einheiten einsetzen.`},
 ]}],
 diagramme:[{title:'Ein gekrümmter Zusammenhang wird zur Geraden',intro:t`Als Beispiel dient das Fadenpendel bei kleinen Winkeln. Wir leiten die geeigneten Diagrammachsen und die Bedeutung der Steigung her.`,steps:[
  {tex:t`T=2\pi\sqrt{\frac lg}`,comment:'Die Modellgleichung verwenden; Pendellänge und Ortsfaktor müssen positiv sein.'},
  {tex:t`T^2=\frac{4\pi^2}{g}l`,comment:'Beide Seiten quadrieren. Links entsteht das Periodenquadrat, rechts ein konstanter Faktor mal Länge.'},
  {tex:t`a=\frac{\Delta(T^2)}{\Delta l}=\frac{4\pi^2}{g}`,comment:t`Im Diagramm $T^2$ gegen $l$ ist dieser Faktor die Steigung. Ein Steigungsdreieck an der Ausgleichsgeraden verwenden, nicht beliebige verrauschte Nachbarpunkte.`},
  {tex:t`g=\frac{4\pi^2}{a}`,comment:'Die Steigungsbeziehung nach dem Ortsfaktor umstellen. Der Buchstabe a bezeichnet hier die Steigung, nicht eine Beschleunigung.'},
  {tex:t`[a]=\frac{\mathrm{s^2}}{\mathrm m}`,comment:'Die Einheit der senkrechten Achsengröße durch die Einheit der waagerechten teilen. Ihr Kehrwert ergibt die Einheit des Ortsfaktors.'},
 ]}],
 'modelle-simulation:exercise-1':[{title:'Eine Halbierungszeit mit Logarithmen bestimmen',intro:t`Im Modell ist die Temperaturdifferenz zur konstanten Umgebung $\Delta\vartheta(t)=\Delta\vartheta_0e^{-t/\tau}$. Nicht die Celsiusanzeige selbst wird halbiert. Es gilt $\tau>0$.`,steps:[
  {tex:t`\frac12\Delta\vartheta_0=\Delta\vartheta_0e^{-t_{1/2}/\tau}`,comment:'Die geforderte halbe Anfangsdifferenz als Zielwert in das Zeitgesetz einsetzen.'},
  {tex:t`\frac12=e^{-t_{1/2}/\tau}`,comment:'Durch die von null verschiedene Anfangsdifferenz teilen.'},
  {tex:t`\ln\!\left(\frac12\right)=-\frac{t_{1/2}}\tau`,comment:'Auf beiden Seiten den natürlichen Logarithmus anwenden. Logarithmus und Exponentialfunktion heben sich auf.'},
  {tex:t`t_{1/2}=\tau\ln2`,comment:t`Mit $-\tau$ multiplizieren und $\ln(1/2)=-\ln2$ nutzen.`},
  {tex:t`t_{1/2}=5{,}0\,\mathrm{min}\cdot\ln2\approx3{,}47\,\mathrm{min}`,comment:'Die Zeitkonstante des Beispiels einsetzen. Die Einheit der Zeitkonstante bleibt erhalten.'},
 ]}],
 'energie-bilanzen:exercise-1':[{title:'Energie und Leistung sauber bilanzieren',intro:'Beispiel Motor: In zehn Sekunden werden 500 Joule elektrisch zugeführt und 350 Joule mechanisch abgegeben. Die Bilanz umfasst auch Erwärmung und andere Energieübertragungen.',steps:[
  {tex:t`E_{\mathrm{zu}}=E_{\mathrm{nutz}}+E_{\mathrm{sonst}}`,comment:'Die zugeführte Energie auf die gewünschte und die übrigen Energieabgaben beziehungsweise Speicheränderungen aufteilen.'},
  {tex:t`E_{\mathrm{sonst}}=500\,\mathrm J-350\,\mathrm J=150\,\mathrm J`,comment:'Die Nutzenergie auf beiden Seiten abziehen. Diese Differenz verschwindet nicht aus der Gesamtbilanz.'},
  {tex:t`\eta=\frac{E_{\mathrm{nutz}}}{E_{\mathrm{zu}}}=\frac{350\,\mathrm J}{500\,\mathrm J}=0{,}70`,comment:'Nutzenergie durch zugeführte Energie teilen. Die Einheiten kürzen sich; der Wirkungsgrad beträgt siebzig Prozent.'},
  {tex:t`\bar P_{\mathrm{nutz}}=\frac{E_{\mathrm{nutz}}}{\Delta t}=\frac{350\,\mathrm J}{10\,\mathrm s}=35\,\mathrm W`,comment:'Für die mittlere Nutzleistung dieselbe mechanische Energie durch die betrachtete Dauer teilen.'},
 ]}],
};
export default function MethodDerivations({lesson,exercise}:{lesson:string;exercise?:number}) {return <>{derivations[exercise===undefined?lesson:`${lesson}:exercise-${exercise}`]?.map(d=><FormulaSteps key={d.title} {...d}/>)}</>;}
