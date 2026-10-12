import FormulaSteps from '../components/FormulaSteps';
type Derivation=Parameters<typeof FormulaSteps>[0];
const t=String.raw;
const derivations:Record<string,Derivation[]>={
 lichtwellen:[{title:'Die Wellenlänge beim Übergang in ein Material',intro:'Wir betrachten eine monochromatische Welle an einer ruhenden Grenzfläche. Die Frequenz bleibt erhalten; der Brechungsindex gehört zu dieser Frequenz.',steps:[
  {tex:t`c=\lambda_0f`,comment:'Im Vakuum verknüpft die Wellengleichung Lichtgeschwindigkeit, Vakuumwellenlänge und Frequenz.'},
  {tex:t`v=\frac cn`,comment:'Die Definition des Brechungsindex nach der Phasengeschwindigkeit im Material umstellen.'},
  {tex:t`\lambda=\frac vf=\frac{c}{nf}`,comment:'Im Material gilt dieselbe Wellengleichung. Die Geschwindigkeit aus dem vorigen Schritt einsetzen.'},
  {tex:t`\lambda=\frac{\lambda_0}{n}`,comment:'Den Quotienten aus Vakuumlichtgeschwindigkeit und Frequenz durch die Vakuumwellenlänge ersetzen.'},
 ]}],
 doppelspalt:[{title:'Vom Gangunterschied zum Streifenabstand',intro:t`Gleichphasig beleuchtete schmale Spalte mit Mittenabstand $d$, Schirmabstand $L$. Wir verwenden die Fernfeldnäherung und betrachten kleine Winkel.`,steps:[
  {tex:t`\Delta s=d\sin\theta`,comment:'Die Wegdifferenz der beiden nahezu parallelen Strahlen ist die Projektion des Spaltabstands auf die Ausbreitungsrichtung.'},
  {tex:t`d\sin\theta_m=m\lambda`,comment:'Für helle Streifen ist der Gangunterschied ein ganzzahliges Vielfaches der Wellenlänge.'},
  {tex:t`\tan\theta_m=\frac{x_m}{L}`,comment:'Aus dem rechtwinkligen Dreieck zwischen Spaltmitte, Schirmmitte und Streifen die Schirmposition ausdrücken.'},
  {tex:t`\sin\theta_m\approx\tan\theta_m\approx\frac{x_m}{L}`,comment:t`Nur für $|x_m|\ll L$ dürfen Sinus und Tangens gleichgesetzt werden. Der Winkel ist dabei klein.`},
  {tex:t`x_m\approx\frac{m\lambda L}{d}`,comment:'In die Maximumsbedingung einsetzen, mit dem Schirmabstand multiplizieren und durch den Spaltabstand teilen.'},
  {tex:t`\Delta x=x_{m+1}-x_m\approx\frac{\lambda L}{d}`,comment:'Die Positionen zweier benachbarter Maxima subtrahieren. Die Ordnungszahl fällt heraus.'},
 ]}],
 einzelspalt:[{title:'Die Breite des zentralen Beugungsmaximums',intro:t`Gleichmäßig beleuchteter Spalt der Breite $a$, monochromatisches Licht und Fernfeld. Das Zentrum liegt bei $x=0$.`,steps:[
  {tex:t`\Delta s_{\mathrm{Paar}}=\frac a2\sin\theta_1=\frac\lambda2`,comment:'Für das erste Minimum werden Punkte aus den beiden Spalthälften gepaart. Ihre Beiträge sind bei einer halben Wellenlänge Wegdifferenz gegenphasig.'},
  {tex:t`a\sin\theta_1=\lambda`,comment:'Mit zwei multiplizieren. Die paarweise Auslöschung betrifft so den gesamten Spalt.'},
  {tex:t`\frac{x_1}{L}\approx\frac\lambda a`,comment:'Für kleine Winkel die Schirmgeometrie einsetzen. Dabei ist die erste Dunkelstelle rechts vom Zentrum gemeint.'},
  {tex:t`w=x_1-(-x_1)\approx\frac{2\lambda L}{a}`,comment:'Das Hauptmaximum reicht zwischen der linken und rechten ersten Dunkelstelle. Deshalb ist seine volle Breite doppelt so groß wie der Abstand zum Zentrum.'},
 ],conclusion:'Die Minima eines Einzelspalts sind nicht die Maxima eines Doppelspalts. Derselbe algebraische Ausdruck kann unter anderen Voraussetzungen eine andere Beobachtung beschreiben.'}],
 gitter:[{title:'Eine Wellenlänge aus einem Gitterbild berechnen',intro:t`Senkrechter Einfall auf ein Gitter. $\nu$ bezeichnet hier die Linienzahl pro Länge, $g$ den Abstand benachbarter Spalte und $m\ne0$ die bekannte Ordnung.`,steps:[
  {tex:t`g=\frac1\nu`,comment:'Die Linienzahl pro Länge in den Spaltabstand umrechnen. Eine Angabe pro Millimeter liefert zunächst Millimeter, nicht Meter.'},
  {tex:t`\sin\theta=\frac{x}{\sqrt{L^2+x^2}}`,comment:'Die Schirmgeometrie ohne Kleinwinkelnäherung auswerten: Gegenkathete durch Hypotenuse.'},
  {tex:t`g\sin\theta=m\lambda`,comment:'Die Bedingung für konstruktive Interferenz benachbarter Spalte verwenden.'},
  {tex:t`\lambda=\frac{g}{m}\frac{x}{\sqrt{L^2+x^2}}`,comment:'Durch die Ordnung teilen und den geometrischen Sinus einsetzen. Die Vorzeichen von Position und Ordnung müssen zusammenpassen.'},
 ],conclusion:t`Ein Maximum kann nur existieren, wenn $|m|\lambda\le g$. Bei großen Winkeln wäre das Ersetzen von Sinus durch $x/L$ unzulässig.`}],
 interferometer:[{title:'Warum ein wandernder Streifen nur einen halben Wellenweg verlangt',intro:t`Ein Michelson-Spiegel wird entlang seines Strahls in Luft verschoben. Wir verwenden die Wellenlänge $\lambda$ in Luft und zählen $N$ vollständige Helligkeitsperioden an einem festen Beobachtungsort.`,steps:[
  {tex:t`\Delta s=2\Delta d`,comment:'Der Strahl läuft zum Spiegel und zurück. Die Spiegelverschiebung ändert beide Wegabschnitte.'},
  {tex:t`\Delta\varphi=\frac{2\pi}{\lambda}\,2\Delta d`,comment:'Die Änderung des Gangunterschieds in eine Phasenänderung umrechnen.'},
  {tex:t`|\Delta\varphi|=2\pi N`,comment:'Jeder vollständige Hell-Dunkel-Hell-Zyklus entspricht einem vollen Phasenumlauf.'},
  {tex:t`|\Delta d|=\frac{N\lambda}{2}`,comment:'Die letzten beiden Beziehungen gleichsetzen und nach dem Betrag der Spiegelverschiebung auflösen.'},
 ],conclusion:'Die Streifenzahl allein bestimmt den Betrag. Für das Vorzeichen der Verschiebung braucht man zusätzliche Richtungsinformation.'}],
 'duenne-schichten':[{title:'Optischer Weg und Reflexionsphase gemeinsam zählen',intro:t`Zweistrahlmodell für eine freistehende Seifenhaut in Luft, Brechungsindex $n>1$, Dicke $d$, senkrechter Einfall. Genau eine der beiden Reflexionen erzeugt einen Phasensprung von $\pi$.`,steps:[
  {tex:t`\Delta\varphi_{\mathrm{Weg}}=\frac{2\pi}{\lambda_0}\,2nd`,comment:'Der im Film hin- und zurücklaufende Anteil legt den zusätzlichen optischen Weg zweimal Brechungsindex mal Dicke zurück.'},
  {tex:t`\Delta\varphi=\frac{4\pi nd}{\lambda_0}-\pi`,comment:'Den relativen Reflexionsphasensprung berücksichtigen. Hier wird die Phase des ersten Reflexionsanteils von der des zweiten abgezogen.'},
  {tex:t`\frac{4\pi nd}{\lambda_0}-\pi=2\pi m`,comment:'Für helle Reflexion müssen beide Beiträge gleichphasig sein, also sich um ein ganzzahliges Vielfaches einer vollen Phase unterscheiden.'},
  {tex:t`2nd=\left(m+\frac12\right)\lambda_0`,comment:'Auf beiden Seiten Pi addieren und anschließend mit der Vakuumwellenlänge durch zwei Pi multiplizieren.'},
  {tex:t`d_{\min}=\frac{\lambda_0}{4n}`,comment:'Für die kleinste positive Dicke die Ordnung null einsetzen und durch den doppelten Brechungsindex teilen.'},
 ],conclusion:'Bei einer Entspiegelungsschicht mit zwei gleichen Reflexionsphasensprüngen führt dieselbe Viertelwellendicke dagegen zu Gegenphase. Vollständige Auslöschung erfordert zusätzlich passende Amplituden.'}],
 polarisation:[{title:'Von der Feldprojektion zum Malus-Gesetz',intro:t`Linear polarisiertes Licht trifft auf einen idealen Analysator. $\alpha$ ist der Winkel zwischen Feldrichtung und Durchlassachse; $I_{\max}$ ist die Intensität bei paralleler Ausrichtung.`,steps:[
  {tex:t`E_{\parallel}=E_0\cos\alpha`,comment:'Die elektrische Feldamplitude auf die Durchlassachse projizieren.'},
  {tex:t`\frac{I}{I_{\max}}=\frac{E_{\parallel}^2}{E_0^2}`,comment:'Bei gleichem Medium ist die Intensität proportional zum Quadrat der Feldamplitude.'},
  {tex:t`\frac{I}{I_{\max}}=\cos^2\alpha`,comment:'Die Projektion einsetzen; die ursprüngliche Amplitude kürzt sich im Verhältnis.'},
  {tex:t`I=I_{\max}\cos^2\alpha`,comment:'Mit der maximalen Intensität multiplizieren. Der Kosinus wird quadriert, nicht der Winkel.'},
 ]}],
 aufloesung:[{title:'Von der Winkelauflösung zur kleinsten trennbaren Strecke',intro:t`Zwei gleich helle inkohärente Punkte im Abstand $s$, Entfernung $L$ und ideale kreisförmige Öffnung $D$. Die Winkel sind klein; verwendet wird das Rayleigh-Kriterium.`,steps:[
  {tex:t`\theta_R\approx1{,}22\frac\lambda D`,comment:'Den Rayleigh-Grenzwinkel aus dem Beugungsmuster der Kreisöffnung übernehmen. Der Faktor ist ein Ergebnis der Kreisapertur-Beugung, nicht einer geometrischen Umformung.'},
  {tex:t`\theta\approx\frac sL`,comment:'Den Winkelabstand der beiden Punkte mit der Kleinwinkelnäherung ausdrücken; der Winkel ist im Bogenmaß gemeint.'},
  {tex:t`\frac{s_{\min}}L\approx1{,}22\frac\lambda D`,comment:'An der Rayleigh-Grenze den Winkelabstand gleich dem Grenzwinkel setzen.'},
  {tex:t`s_{\min}\approx1{,}22\frac{\lambda L}{D}`,comment:'Beide Seiten mit der Entfernung multiplizieren. Eine größere Öffnung macht kleinere Punktabstände trennbar.'},
 ]}],
};
export default function OpticsDerivations({lesson}:{lesson:string}) {return <>{derivations[lesson]?.map(d=><FormulaSteps key={d.title} {...d}/>)}</>;}
