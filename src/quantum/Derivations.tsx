import FormulaSteps from '../components/FormulaSteps';
type Derivation=Parameters<typeof FormulaSteps>[0];
const t=String.raw;
const derivations:Record<string,Derivation[]>={
 'photoeffekt:exercise-0':[{title:'Vom violetten Licht zur Gegenspannung',steps:[
  {tex:t`E_{\mathrm{Ph}}=\frac{hc}{\lambda}`,comment:'Die Energie eines Photons aus seiner Wellenlänge bestimmen.'},
  {tex:t`E_{\mathrm{Ph}}=\frac{1240\,\mathrm{eV\,nm}}{400\,\mathrm{nm}}=3{,}10\,\mathrm{eV}`,comment:'Die Nanometer kürzen sich; die Photonenenergie liegt in Elektronenvolt vor.'},
  {tex:t`E_{\mathrm{kin,max}}=3{,}10\,\mathrm{eV}-2{,}00\,\mathrm{eV}=1{,}10\,\mathrm{eV}`,comment:'Die Austrittsarbeit abziehen. Das positive Ergebnis zeigt, dass Emission energetisch möglich ist.'},
  {tex:t`U_{\mathrm g}=\frac{E_{\mathrm{kin,max}}}{e}=1{,}10\,\mathrm V`,comment:'Die maximale Energie durch den Ladungsbetrag teilen. Ein Elektronenvolt ist genau die Energie, die eine Elementarladung bei einem Volt gewinnt.'},
 ]}],
 'photoeffekt:exercise-1':[{title:'Photonen pro Sekunde aus der Lichtleistung',steps:[
  {tex:t`E_{\mathrm{Ph}}=3{,}0\cdot1{,}602\cdot10^{-19}\,\mathrm J=4{,}806\cdot10^{-19}\,\mathrm J`,comment:'Die Photonenenergie in Joule umrechnen, weil die Leistung in Joule pro Sekunde eingesetzt wird.'},
  {tex:t`P=\dot N E_{\mathrm{Ph}}`,comment:'Bei monochromatischem Licht ist die Leistung gleich Photonenzahl pro Zeit mal Energie je Photon.'},
  {tex:t`\dot N=\frac{P}{E_{\mathrm{Ph}}}`,comment:'Durch die positive Photonenenergie teilen.'},
  {tex:t`\dot N=\frac{1{,}0\cdot10^{-6}\,\mathrm{J/s}}{4{,}806\cdot10^{-19}\,\mathrm J}\approx2{,}08\cdot10^{12}\,\mathrm{s^{-1}}`,comment:'Leistung und Energie einsetzen. Dieses Ergebnis zählt Photonen, nicht bereits gesammelte Photoelektronen.'},
 ]}],
 'halbleiter:exercise-1':[{title:'Vorwiderstand und seine Wärmeleistung',intro:'Die angegebene LED-Spannung wird am gewünschten Arbeitspunkt als bekannt angenommen; die Gleichspannungsquelle liefert fünf Volt.',steps:[
  {tex:t`U_R=U_0-U_{\mathrm F}=5{,}0\,\mathrm V-2{,}0\,\mathrm V=3{,}0\,\mathrm V`,comment:'Nach der Maschenregel fällt der Rest der Quellenspannung am Vorwiderstand ab.'},
  {tex:t`I=5{,}0\,\mathrm{mA}=0{,}0050\,\mathrm A`,comment:'Vor dem Einsetzen Milliampere in Ampere umrechnen.'},
  {tex:t`R=\frac{U_R}{I}=\frac{3{,}0\,\mathrm V}{0{,}0050\,\mathrm A}=600\,\Omega`,comment:'Das Ohmsche Gesetz nur auf den Widerstand anwenden; die LED selbst ist kein ohmscher Widerstand.'},
  {tex:t`P_R=U_RI=3{,}0\,\mathrm V\cdot0{,}0050\,\mathrm A=0{,}015\,\mathrm W`,comment:'Für die Widerstandsleistung dessen Spannungsabfall mit dem Strom multiplizieren. Die gesamte Quellenspannung würde die Gesamtleistung ergeben.'},
 ]}],
 'atomkerne:exercise-0':[{title:'Restkernzahl und Aktivität getrennt berechnen',steps:[
  {tex:t`n_{1/2}=\frac{9{,}0\,\mathrm h}{3{,}0\,\mathrm h}=3`,comment:'Die vergangene Zeit durch die Halbwertszeit teilen. Hier sind es genau drei Halbierungen.'},
  {tex:t`N=8{,}0\cdot10^6\left(\frac12\right)^3=1{,}0\cdot10^6`,comment:'Den Ausgangsbestand dreimal halbieren; das ist der Erwartungswert der noch vorhandenen Kerne.'},
  {tex:t`T_{1/2}=3{,}0\,\mathrm h=10800\,\mathrm s`,comment:'Für die Aktivität in Becquerel die Halbwertszeit in Sekunden umrechnen.'},
  {tex:t`\lambda_{\mathrm Z}=\frac{\ln2}{10800\,\mathrm s}\approx6{,}42\cdot10^{-5}\,\mathrm{s^{-1}}`,comment:'Die Zerfallskonstante aus der Halbwertszeit bestimmen; nicht mit dem Kehrwert der Halbwertszeit verwechseln.'},
  {tex:t`\mathcal A_0=\lambda_{\mathrm Z}N_0\approx513\,\mathrm{Bq}`,comment:'Für die gefragte Anfangsaktivität den Anfangsbestand einsetzen, nicht den bereits verkleinerten Restbestand.'},
 ]}],
 photoeffekt:[{title:'Energiebilanz, Gegenspannung und Grenzfrequenz',intro:t`Einphotonenmodell des äußeren Photoeffekts: $W_{\mathrm A}$ ist die Austrittsarbeit, $e>0$ der Betrag der Elektronenladung und $U_{\mathrm g}\ge0$ der Betrag der Gegenspannung.`,steps:[
  {tex:t`hf=W_{\mathrm A}+E_{\mathrm{kin,max}}`,comment:'Die Photonenenergie deckt die Austrittsarbeit und die maximal verbleibende kinetische Energie.'},
  {tex:t`E_{\mathrm{kin,max}}=hf-W_{\mathrm A}`,comment:'Auf beiden Seiten die Austrittsarbeit abziehen. Dieser Ausdruck beschreibt emittierte Elektronen nur oberhalb der Schwelle.'},
  {tex:t`eU_{\mathrm g}=hf-W_{\mathrm A}`,comment:'Beim vollständigen Abbremsen der schnellsten Elektronen entspricht ihre kinetische Energie der elektrischen Gegenarbeit.'},
  {tex:t`U_{\mathrm g}=\frac he f-\frac{W_{\mathrm A}}e`,comment:'Durch den positiven Ladungsbetrag teilen. Im Gegenspannungs-Frequenz-Diagramm ist die Steigung Plancks Konstante geteilt durch die Elementarladung.'},
  {tex:t`0=hf_{\mathrm g}-W_{\mathrm A}`,comment:'An der Energieschwelle bleibt gerade keine kinetische Energie übrig. Den Grenzfall null einsetzen.'},
  {tex:t`f_{\mathrm g}=\frac{W_{\mathrm A}}h`,comment:'Die Austrittsarbeit addieren und durch Plancks Konstante teilen.'},
 ],conclusion:t`Für $f<f_{\mathrm g}$ findet im Einphotonenmodell keine Emission statt. Die Gerade wird dort nicht als negative Elektronenenergie weitergeführt.`}],
 photonenimpuls:[{title:'Photonenimpuls aus Energie und Wellenlänge',intro:'Für ein Photon im Vakuum ist die Ruhemasse null. Der Impulsbetrag ist positiv; seine Richtung entspricht der Ausbreitungsrichtung.',steps:[
  {tex:t`E^2=p^2c^2`,comment:'In der relativistischen Energie-Impuls-Beziehung den Ruhemasse-Term für ein Photon null setzen.'},
  {tex:t`p=\frac Ec`,comment:'Die positive Wurzel ziehen und durch die Lichtgeschwindigkeit teilen.'},
  {tex:t`E=\frac{hc}{\lambda}`,comment:'Die Photonenenergie durch Frequenz beziehungsweise Vakuumwellenlänge ausdrücken.'},
  {tex:t`p=\frac{hc}{\lambda c}=\frac h\lambda`,comment:'Die Energie einsetzen und die Lichtgeschwindigkeit kürzen. Auch ein Photon ohne Ruhemasse besitzt Impuls.'},
 ]}],
 materiewellen:[{title:'Von der Beschleunigungsspannung zur de-Broglie-Wellenlänge',intro:t`Ein Elektron startet nahezu aus der Ruhe und gewinnt in der Beschleunigungsspannung $U>0$ die Energie $eU$. Die folgende Rechnung gilt nichtrelativistisch, also für $eU\ll m_{\mathrm e}c^2$.`,steps:[
  {tex:t`E_{\mathrm{kin}}=eU`,comment:'Die elektrische Arbeit wird in kinetische Energie umgewandelt. Verwendet werden positive Beträge.'},
  {tex:t`p^2=m_{\mathrm e}^2v^2=2m_{\mathrm e}E_{\mathrm{kin}}`,comment:t`Aus $p=m_{\mathrm e}v$ und $E_{\mathrm{kin}}=m_{\mathrm e}v^2/2$ die Geschwindigkeit eliminieren.`},
  {tex:t`p=\sqrt{2m_{\mathrm e}eU}`,comment:'Die elektrische Energie einsetzen und die positive Wurzel für den Impulsbetrag ziehen.'},
  {tex:t`\lambda=\frac hp=\frac h{\sqrt{2m_{\mathrm e}eU}}`,comment:'Den Impuls in die de-Broglie-Beziehung einsetzen; die Wurzel umfasst das gesamte Produkt im Nenner.'},
  {tex:t`\frac{\lambda_2}{\lambda_1}=\sqrt{\frac{U_1}{U_2}}`,comment:'Für dieselbe Teilchenart die beiden Wellenlängen dividieren. Alle Konstanten kürzen sich.'},
 ],conclusion:'Vierfache Spannung ergibt im nichtrelativistischen Modell die halbe Wellenlänge. Für hochenergetische Elektronen ist die relativistische Impuls-Energie-Beziehung nötig.'}],
 quanteninterferenz:[{title:'Woher der Interferenzterm kommt',intro:t`Für zwei kohärente, nicht unterscheidbare Alternativen werden die komplexen Wahrscheinlichkeitsamplituden addiert. Das Sternchen bedeutet komplexe Konjugation.`,steps:[
  {tex:t`\psi=\psi_1+\psi_2`,comment:'Zuerst die Amplituden addieren. Es werden hier noch keine Wahrscheinlichkeiten addiert.'},
  {tex:t`|\psi|^2=(\psi_1+\psi_2)(\psi_1^*+\psi_2^*)`,comment:'Das Betragsquadrat als Produkt einer komplexen Zahl mit ihrer konjugierten Zahl schreiben.'},
  {tex:t`|\psi|^2=|\psi_1|^2+|\psi_2|^2+\psi_1\psi_2^*+\psi_1^*\psi_2`,comment:'Beide Klammern ausmultiplizieren. Neben den Einzelbeiträgen entstehen zwei gemischte Terme.'},
  {tex:t`|\psi|^2=|\psi_1|^2+|\psi_2|^2+2\operatorname{Re}(\psi_1^*\psi_2)`,comment:'Die gemischten Terme sind zueinander komplex konjugiert; ihre Summe ist der doppelte Realteil.'},
 ],conclusion:'Der zusätzliche Term hängt von der relativen Phase ab. Bei vollständig unterscheidbaren Wegmarkierungen verschwindet er in der unselektierten Ortsstatistik; das ist eine physikalische Änderung der Präparation.'}],
 unschaerfe:[{title:'Eine Untergrenze richtig umstellen',intro:t`$\sigma_x$ und $\sigma_{p_x}$ sind Standardabweichungen derselben Zustandspräparation. Sie sind keine Geräteauflösungen und nicht automatisch die Breite eines Spalts.`,steps:[
  {tex:t`\sigma_x\sigma_{p_x}\ge\frac\hbar2`,comment:'Mit der Unschärferelation für Ort und die dazugehörige Impulskomponente beginnen.'},
  {tex:t`\sigma_{p_x}\ge\frac{\hbar}{2\sigma_x}`,comment:'Durch die positive Ortsstreuung teilen. Die Richtung des Ungleichheitszeichens bleibt dabei erhalten.'},
  {tex:t`\sigma_{p_x}=m\sigma_{v_x}`,comment:'Nur nichtrelativistisch bei fester Masse die Impulskomponente durch Masse mal Geschwindigkeitskomponente ausdrücken; deren Standardabweichungen skalieren genauso.'},
  {tex:t`\sigma_{v_x}\ge\frac{\hbar}{2m\sigma_x}`,comment:'Einsetzen und durch die positive Masse teilen. Das Ergebnis ist eine Untergrenze, keine allgemeine Gleichheit.'},
 ]}],
 'atommodelle-spektren':[{title:'Vom Energieniveau zur Spektrallinie',intro:t`Vereinfachtes Wasserstoffmodell ohne Feinstruktur. Ein Photon wird bei einem Übergang von $n_o$ nach $n_u<n_o$ emittiert.`,steps:[
  {tex:t`E_n=-\frac{13{,}6\,\mathrm{eV}}{n^2}`,comment:'Das Energienullniveau ist der getrennte Zustand von Elektron und Proton. Gebundene Zustände besitzen negative Energie.'},
  {tex:t`E_{\mathrm{Ph}}=E_{n_o}-E_{n_u}`,comment:'Anfangsenergie minus Endenergie bilden. Beim Übergang nach unten ist die frei werdende Photonenenergie positiv.'},
  {tex:t`E_{\mathrm{Ph}}=13{,}6\,\mathrm{eV}\left(\frac1{n_u^2}-\frac1{n_o^2}\right)`,comment:'Beide negativen Energien einsetzen und die Vorzeichen beim Subtrahieren beachten.'},
  {tex:t`\lambda=\frac{hc}{E_{\mathrm{Ph}}}`,comment:'Die Photonenenergiebeziehung nach der Wellenlänge umstellen. Bei Energie in Elektronenvolt kann mit dem passenden Wert für das Produkt aus Planck-Konstante und Lichtgeschwindigkeit gerechnet werden.'},
 ],conclusion:'Es zählt die Energiedifferenz zwischen beiden Niveaus, nicht der Betrag eines einzelnen Energieniveaus.'}],
 'franck-hertz':[{title:'Vom Abstand der Stromminima zur Anregungsenergie',intro:t`Wir betrachten benachbarte Minima derselben Anregungsserie. Ein ungefähr konstanter Kontaktpotential-Beitrag verschiebt beide Minima ähnlich.`,steps:[
  {tex:t`\Delta U=U_{k+1}-U_k`,comment:'Die Positionen benachbarter Minima voneinander abziehen. Ein gemeinsamer konstanter Spannungsversatz kürzt sich.'},
  {tex:t`\Delta E=e\Delta U`,comment:'Die zusätzliche elektrische Arbeit für ein weiteres Anregungsereignis berechnen.'},
  {tex:t`\lambda=\frac{hc}{\Delta E}`,comment:'Falls genau diese Energiedifferenz in einem einzelnen Photon abgegeben wird, die Energie in eine Wellenlänge umrechnen.'},
 ],conclusion:'Bei einer Kaskade kann die Anregungsenergie auf mehrere Photonen aufgeteilt werden. Daher muss nicht jedes beobachtete Photon die gesamte Anregungsenergie tragen.'}],
 quantenatom:[{title:'Energiequantisierung im unendlich hohen Potentialtopf',intro:t`Eindimensionaler Topf mit Breite $L$ und Potential null im Inneren. Die Wellenfunktion verschwindet an beiden Wänden; das Teilchen wird nichtrelativistisch behandelt.`,steps:[
  {tex:t`L=n\frac{\lambda_n}{2}\quad(n=1,2,3,\ldots)`,comment:'Zwischen die beiden Knoten an den Wänden passen nur ganze Zahlen von halben Wellenlängen. Der Zustand null wäre überall null und ist kein normierbarer Teilchenzustand.'},
  {tex:t`\lambda_n=\frac{2L}{n}`,comment:'Nach den erlaubten Wellenlängen umstellen.'},
  {tex:t`p_n=\frac h{\lambda_n}=\frac{nh}{2L}`,comment:'Die de-Broglie-Beziehung einsetzen. Hier bezeichnet der Ausdruck den Impulsbetrag der beiden gegenläufigen Wellenanteile, nicht einen gerichteten mittleren Impuls.'},
  {tex:t`E_n=\frac{p_n^2}{2m}`,comment:'Im Topfinneren ist die Energie kinetisch. Die nichtrelativistische Energie-Impuls-Beziehung verwenden.'},
  {tex:t`E_n=\frac{n^2h^2}{8mL^2}`,comment:'Den erlaubten Impuls einsetzen, Zähler und Nenner quadrieren und die Faktoren zusammenfassen.'},
 ],conclusion:'Die diskreten Energien folgen aus den Randbedingungen. Der stationäre Zustand ist keine klassische Teilchenbahn; insbesondere kann sein mittlerer Impuls null sein, obwohl seine Energie positiv ist.'}],
 atomkerne:[{title:'Aus dem Zerfallsgesetz folgt die Halbwertszeit',intro:t`Ein einzelnes Nuklid ohne Nachproduktion, konstante Zerfallskonstante $\lambda_{\mathrm Z}>0$. Die Gleichungen beschreiben Erwartungswerte vieler Kerne.`,steps:[
  {tex:t`N(t)=N_0e^{-\lambda_{\mathrm Z}t}`,comment:'Mit dem exponentiellen Zerfallsgesetz beginnen. Einzelne Kernzerfälle bleiben zufällig.'},
  {tex:t`\frac{N_0}{2}=N_0e^{-\lambda_{\mathrm Z}T_{1/2}}`,comment:'Die Definition der Halbwertszeit einsetzen: Nach dieser Dauer ist die Hälfte der Ausgangskerne noch vorhanden.'},
  {tex:t`\ln\!\left(\frac12\right)=-\lambda_{\mathrm Z}T_{1/2}`,comment:'Zuerst durch die positive Ausgangszahl teilen, dann auf beiden Seiten den natürlichen Logarithmus anwenden.'},
  {tex:t`T_{1/2}=\frac{\ln2}{\lambda_{\mathrm Z}}`,comment:'Durch die negative Zerfallskonstante teilen und das Logarithmusgesetz für den Kehrwert nutzen.'},
  {tex:t`\mathcal A(t)=-\frac{\mathrm dN}{\mathrm dt}=\lambda_{\mathrm Z}N(t)`,comment:'Für die Aktivität das Zerfallsgesetz nach der Zeit ableiten und das negative Vorzeichen der Abnahme umkehren.'},
 ],conclusion:t`Für die Aktivität in Becquerel muss $\lambda_{\mathrm Z}$ in $\mathrm{s^{-1}}$ eingesetzt werden; eine Halbwertszeit in Stunden vorher umrechnen.`}],
};
export default function QuantumDerivations({lesson,exercise}:{lesson:string;exercise?:number}) {return <>{derivations[exercise===undefined?lesson:`${lesson}:exercise-${exercise}`]?.map(d=><FormulaSteps key={d.title} {...d}/>)}</>;}
