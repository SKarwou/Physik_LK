import FormulaSteps from '../components/FormulaSteps';
type Derivation = Parameters<typeof FormulaSteps>[0];
const t = String.raw;
const derivations: Record<string, Derivation[]> = {
  federpendel: [{title:'Von der Rückstellkraft zur Periodendauer',intro:t`Wir betrachten eine masselose lineare Feder, eine Masse $m>0$ und vernachlässigbare Reibung. $s$ wird von der Gleichgewichtslage gemessen.`,steps:[
    {tex:t`m\ddot s=-Ds`,comment:'Newton und das Hookesche Gesetz gleichsetzen. Das Minuszeichen zeigt: Die Kraft wirkt der Auslenkung entgegen.'},
    {tex:t`\ddot s=-\frac Dm s`,comment:t`Beide Seiten durch die positive Masse $m$ teilen.`},
    {tex:t`s(t)=\hat s\cos(\omega_0t+\varphi_0)`,comment:'Einen harmonischen Lösungsansatz wählen. Amplitude und Anfangsphase werden später aus den Anfangsbedingungen bestimmt.'},
    {tex:t`\dot s(t)=-\hat s\omega_0\sin(\omega_0t+\varphi_0)`,comment:t`Einmal nach der Zeit ableiten; durch die Kettenregel kommt der Faktor $\omega_0$ hinzu.`},
    {tex:t`\ddot s(t)=-\omega_0^2s(t)`,comment:'Noch einmal ableiten und den Kosinusausdruck wieder durch die Auslenkung ersetzen.'},
    {tex:t`\omega_0^2=\frac Dm`,comment:'Die Koeffizienten der beiden Bewegungsgleichungen vergleichen. So gilt die Gleichung für die gesamte nichttriviale Schwingung; an Nulldurchgängen muss nicht durch die Auslenkung geteilt werden.'},
    {tex:t`T=\frac{2\pi}{\omega_0}=2\pi\sqrt{\frac mD}`,comment:t`Eine volle Periode entspricht $2\pi$ Phasenfortschritt. Die positive Wurzel für die Kreisfrequenz einsetzen.`},
  ],conclusion:'Im idealen linearen Modell hängt die Periode von Masse und Federkonstante ab, nicht von der Amplitude.'}],
  fadenpendel: [{title:'Warum die Pendelperiode von der Länge abhängt',intro:t`Modell: punktförmige Masse, masseloser undehnbarer Faden der Länge $l$, keine Reibung. Der Winkel $\alpha$ wird im Bogenmaß angegeben.`,steps:[
    {tex:t`m\ddot s=-mg\sin\alpha`,comment:'Nur die tangentiale Gewichtskomponente beschleunigt entlang des Kreisbogens. Die Fadenspannung wirkt radial.'},
    {tex:t`s=l\alpha`,comment:'Die vorzeichenbehaftete Bogenlänge ist Länge mal Winkel; diese Beziehung gilt für konstante Pendellänge.'},
    {tex:t`\ddot s\approx-\frac gl s`,comment:t`Für $|\alpha|\ll1$ gilt $\sin\alpha\approx\alpha=s/l$. Einsetzen und die Masse kürzen.`},
    {tex:t`\omega_0^2\approx\frac gl`,comment:t`Mit der harmonischen Form $\ddot s=-\omega_0^2s$ vergleichen. Erst die Kleinwinkelnäherung macht die Bewegung harmonisch.`},
    {tex:t`T\approx2\pi\sqrt{\frac lg}`,comment:'Die positive Kreisfrequenz in die Beziehung zwischen Periode und Kreisfrequenz einsetzen.'},
    {tex:t`g\approx\frac{4\pi^2l}{T^2}`,comment:'Zur Bestimmung des Ortsfaktors quadrieren, mit dem Ortsfaktor multiplizieren und durch das Periodenquadrat teilen.'},
  ],conclusion:'Die Pendelmasse kürzt sich heraus. Große Startwinkel verletzen die Näherung; dann ist diese Periodenformel nicht mehr genau.'}],
  energie: [{title:'Aus der Energiebilanz wird die Geschwindigkeit',intro:t`Horizontales, reibungsfreies Federpendel: $s=0$ ist die Gleichgewichtslage, $\hat s$ die Amplitude.`,steps:[
    {tex:t`E_{\mathrm{ges}}=\frac12D\hat s^2`,comment:'Am Umkehrpunkt ist die Geschwindigkeit null; die gesamte Energie liegt in der Feder.'},
    {tex:t`\frac12mv^2+\frac12Ds^2=\frac12D\hat s^2`,comment:'An einem beliebigen Ort addieren sich kinetische und elastische Energie zur gleichen Gesamtenergie.'},
    {tex:t`mv^2=D(\hat s^2-s^2)`,comment:'Auf beiden Seiten die momentane Federenergie abziehen und anschließend mit zwei multiplizieren.'},
    {tex:t`|v|=\sqrt{\frac Dm(\hat s^2-s^2)}`,comment:t`Durch $m$ teilen und die positive Wurzel nehmen: Gesucht ist der Betrag, nicht die Bewegungsrichtung. Es gilt $|s|\le\hat s$.`},
    {tex:t`v_{\max}=\hat s\sqrt{\frac Dm}`,comment:'In der Gleichgewichtslage ist die elastische Energie minimal. Für den maximalen Geschwindigkeitsbetrag die Auslenkung null einsetzen.'},
  ]}],
  daempfung: [{title:'Den Abklingkoeffizienten aus zwei Amplituden bestimmen',intro:t`Die Hüllkurve einer schwach gedämpften linearen Schwingung ist $A(t)=A_0e^{-\gamma t}$. Verglichen werden positive Maximalbeträge, keine beliebigen Momentanauslenkungen.`,steps:[
    {tex:t`\frac{A_2}{A_1}=e^{-\gamma(t_2-t_1)}`,comment:'Die beiden Hüllkurvenwerte durcheinander teilen. Die unbekannte Anfangsamplitude kürzt sich.'},
    {tex:t`\ln\!\left(\frac{A_2}{A_1}\right)=-\gamma\Delta t`,comment:t`Auf beiden Seiten den natürlichen Logarithmus anwenden und $\Delta t=t_2-t_1>0$ setzen. Der Logarithmus erhält ein dimensionsloses Verhältnis.`},
    {tex:t`\gamma=\frac{\ln(A_1/A_2)}{\Delta t}`,comment:'Durch die negative Zeitdifferenz teilen und das Logarithmusgesetz für den Kehrwert verwenden.'},
  ],conclusion:t`Für abnehmende Amplituden ist $A_1>A_2$ und damit $\gamma>0$. Die Einheit ist $\mathrm{s^{-1}}$, wenn die Zeit in Sekunden eingesetzt wird.`}],
  'lc-schwingkreis': [{title:'Die Thomson-Formel aus der Maschengleichung',intro:t`Idealer geschlossener LC-Kreis ohne Widerstand und äußere Quelle. $Q$ ist die Ladung einer festgelegten Kondensatorplatte. Wir wählen die Umlaufrichtung so, dass $I=\dot Q$ gilt.`,steps:[
    {tex:t`U_L+U_C=0`,comment:'In der geschlossenen Masche addieren sich die vorzeichenbehafteten Spannungsabfälle zu null.'},
    {tex:t`L\dot I+\frac QC=0`,comment:'Die Bauteilgleichungen für die ideale Spule und den Kondensator einsetzen; Spannungs- und Strompfeile passen zur gewählten Umlaufrichtung.'},
    {tex:t`L\ddot Q+\frac QC=0`,comment:'Den Strom durch die zeitliche Ableitung der gewählten Plattenladung ersetzen.'},
    {tex:t`\ddot Q=-\frac1{LC}Q`,comment:'Den Ladungsterm auf die rechte Seite bringen und durch die positive Induktivität teilen.'},
    {tex:t`\omega_0^2=\frac1{LC}`,comment:'Mit der Bewegungsgleichung einer harmonischen Schwingung vergleichen.'},
    {tex:t`T=\frac{2\pi}{\omega_0}=2\pi\sqrt{LC}`,comment:'Die Kreisfrequenz in die Periodendauer umrechnen: Das ist die Thomson-Formel.'},
  ],conclusion:'Ein realer Widerstand entzieht dem Schwingkreis Energie und dämpft den Verlauf. Die ideale Herleitung beschreibt diesen Energieverlust nicht.'}],
};
export default function OscillationDerivations({lesson}:{lesson:string}) {return <>{derivations[lesson]?.map(d=><FormulaSteps key={d.title} {...d}/>)}</>;}
