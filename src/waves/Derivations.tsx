import FormulaSteps from '../components/FormulaSteps';
type Derivation = Parameters<typeof FormulaSteps>[0];
const t=String.raw;
const derivations:Record<string,Derivation[]>={
 wellengroessen:[{title:'Wie Wellenlänge, Frequenz und Geschwindigkeit zusammenhängen',intro:'Wir verfolgen einen Wellenberg einer periodischen Welle. Gemeint ist die Ausbreitung des Musters, nicht die Geschwindigkeit eines schwingenden Teilchens.',steps:[
  {tex:t`\Delta x=\lambda\quad\text{für}\quad\Delta t=T`,comment:'Während einer Periodendauer rückt ein bestimmter Wellenberg um genau eine Wellenlänge weiter.'},
  {tex:t`v=\frac{\Delta x}{\Delta t}=\frac\lambda T`,comment:'Den zurückgelegten Weg durch die benötigte Zeit teilen.'},
  {tex:t`f=\frac1T`,comment:'Die Frequenz zählt die vollständigen Perioden pro Sekunde.'},
  {tex:t`v=\lambda f`,comment:'Den Kehrwert der Periodendauer durch die Frequenz ersetzen.'},
 ],conclusion:'In einem dispersiven Medium kann diese Phasengeschwindigkeit von der Frequenz abhängen; die Formel behauptet nicht automatisch eine gleiche Geschwindigkeit aller Wellen.'}],
 reflexion:[{title:'Vom Echoabstand zur Entfernung',intro:'Die Quelle und der Empfänger befinden sich näherungsweise am selben Ort; die reflektierende Wand ruht. Die Schallgeschwindigkeit ist auf Hin- und Rückweg gleich.',steps:[
  {tex:t`s_{\mathrm{gesamt}}=d+d=2d`,comment:'Der Schall legt die Strecke bis zur Wand und wieder zurück zurück.'},
  {tex:t`v\Delta t=2d`,comment:'Für die gesamte gemessene Laufzeit den Zusammenhang zwischen Weg und Geschwindigkeit einsetzen.'},
  {tex:t`d=\frac{v\Delta t}{2}`,comment:'Beide Seiten durch zwei teilen. Ohne diesen Schritt würde man die doppelte Entfernung erhalten.'},
 ]}],
 'stehende-wellen':[{title:'Aus den Randbedingungen entstehen Eigenfrequenzen',intro:t`Eine ideale Saite der Länge $L$ ist an beiden Enden fest. Die Ausbreitungsgeschwindigkeit $v$ bleibt für die betrachteten Schwingungen gleich.`,steps:[
  {tex:t`L=n\frac{\lambda_n}{2}\quad(n=1,2,3,\ldots)`,comment:'Zwischen zwei benachbarten Knoten liegt eine halbe Wellenlänge. Auf die Saite passen ganzzahlige Anzahlen solcher Abschnitte.'},
  {tex:t`\lambda_n=\frac{2L}{n}`,comment:'Beide Seiten mit zwei multiplizieren und durch die positive Modenzahl teilen.'},
  {tex:t`f_n=\frac v{\lambda_n}`,comment:'Die Wellengleichung nach der Frequenz umstellen.'},
  {tex:t`f_n=\frac{nv}{2L}`,comment:'Die erlaubte Wellenlänge einsetzen und durch den Bruch teilen.'},
 ],conclusion:'Die ganzzahligen Vielfachen gelten für diese Randbedingungen. Eine einseitig geschlossene Luftsäule besitzt andere Randbedingungen.'}],
 schall:[{title:'Warum doppelte Intensität nicht doppelter Pegel ist',intro:t`Verglichen werden zwei Intensitätspegel mit derselben Bezugsintensität $I_0$. Die Aussage bezieht sich auf Intensität, nicht unmittelbar auf wahrgenommene Lautheit.`,steps:[
  {tex:t`\Delta L_I=10\left[\lg\!\left(\frac{I_2}{I_0}\right)-\lg\!\left(\frac{I_1}{I_0}\right)\right]\,\mathrm{dB}`,comment:'Die Definitionen der beiden Pegel voneinander abziehen. Die Zahlenwerte des Pegels werden in Dezibel angegeben.'},
  {tex:t`\Delta L_I=10\lg\!\left(\frac{I_2}{I_1}\right)\,\mathrm{dB}`,comment:'Die Differenz zweier Logarithmen ist der Logarithmus des Quotienten; die gemeinsame Bezugsintensität kürzt sich.'},
  {tex:t`\Delta L_I=10\lg2\,\mathrm{dB}\approx3{,}01\,\mathrm{dB}\quad\text{bei }I_2=2I_1`,comment:'Für eine Verdopplung das Verhältnis zwei einsetzen: Der Pegel wächst um etwa drei Dezibel.'},
 ]}],
 doppler:[{title:'Dopplerformel für eine sich nähernde Quelle',intro:t`Der Empfänger ruht in der Luft. Die Quelle bewegt sich direkt auf ihn zu mit $0\le v_Q<c_{\mathrm S}$; $c_{\mathrm S}$ ist die Schallgeschwindigkeit relativ zur ruhenden Luft.`,steps:[
  {tex:t`T_Q=\frac1{f_Q}`,comment:'Die Zeit zwischen zwei ausgesandten Wellenbergen ist die Periodendauer der Quelle.'},
  {tex:t`\lambda_{\mathrm{vorne}}=c_{\mathrm S}T_Q-v_QT_Q`,comment:'In dieser Zeit läuft der erste Wellenberg weiter; zugleich rückt die Quelle vor. Der nächste Berg startet daher näher am ersten.'},
  {tex:t`\lambda_{\mathrm{vorne}}=\frac{c_{\mathrm S}-v_Q}{f_Q}`,comment:'Die Periodendauer ausklammern und durch den Kehrwert der Quellfrequenz ersetzen.'},
  {tex:t`f_E=\frac{c_{\mathrm S}}{\lambda_{\mathrm{vorne}}}`,comment:'Der ruhende Empfänger zählt die mit Schallgeschwindigkeit vorbeikommenden Wellenberge.'},
  {tex:t`f_E=f_Q\frac{c_{\mathrm S}}{c_{\mathrm S}-v_Q}`,comment:'Die verkürzte Wellenlänge einsetzen. Der Nenner ist kleiner als die Schallgeschwindigkeit; die empfangene Frequenz steigt.'},
 ],conclusion:t`Bei direkter Entfernung wird der Wellenbergabstand größer: Im Nenner steht dann $c_{\mathrm S}+v_Q$. Diese akustische Herleitung darf nicht unverändert auf Licht übertragen werden.`}],
};
export default function WaveDerivations({lesson}:{lesson:string}) {return <>{derivations[lesson]?.map(d=><FormulaSteps key={d.title} {...d}/>)}</>;}
