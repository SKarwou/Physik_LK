import FormulaSteps from '../components/FormulaSteps';
const t = String.raw;

export function PlateFieldDerivation() {
  return <FormulaSteps title="Von der Kraft zur Spannung – und zurück" intro={t`Wir betrachten eine positive Probeladung $q>0$ im homogenen Plattenfeld. Sie bewegt sich um den Plattenabstand $d$ in Feldrichtung; $U>0$ ist dabei der durchlaufene Spannungsabfall. Randfelder werden vernachlässigt.`} steps={[
    { tex: t`W=F\cdot d`, comment: 'Die konstante elektrische Kraft verrichtet Arbeit: Kraft mal Weg. Die Kraft zeigt hier in Wegrichtung.' },
    { tex: t`W=q\cdot U`, comment: 'Dieselbe übertragene Energie lässt sich elektrisch als Ladung mal Spannungsabfall ausdrücken.' },
    { tex: t`F\cdot d=q\cdot U`, comment: 'Beide Ausdrücke beschreiben dieselbe Arbeit. Deshalb dürfen wir sie gleichsetzen.' },
    { tex: t`\frac{F\cdot d}{q\cdot d}=\frac{q\cdot U}{q\cdot d}`, comment: t`Teile beide Seiten durch $q\cdot d$. Ladung und Plattenabstand sind hier ungleich null.` },
    { tex: t`\frac Fq=\frac Ud`, comment: t`Kürze links $d$ und rechts $q$. Links bleibt die Kraft pro positiver Probeladung.` },
    { tex: t`E=\frac Ud`, comment: t`Ersetze $\frac Fq$ durch den Feldstärkebetrag $E$. Für $d$ in Metern und $U$ in Volt erhältst du $E$ in $\frac{\mathrm V}{\mathrm m}$.` },
  ]} conclusion={t`Das Feld hängt bei festem $U$ und $d$ nicht von der verwendeten kleinen Probeladung ab. Für die Kraft auf eine beliebige Ladung gilt vektoriell $\vec F=q\vec E$.`} />;
}

export function RadialFieldDerivation() {
  return <FormulaSteps title="Vom Coulomb-Gesetz zur Feldstärke" intro={t`Gesucht ist der Feldstärkebetrag im Abstand $r>0$ von einer Punktladung $Q$. Die kleine Probeladung $q$ darf die Quellenanordnung nicht verändern.`} steps={[
    { tex: t`F=k\frac{|Q|\,|q|}{r^2}`, comment: 'Das Coulomb-Gesetz beschreibt den Betrag der Kraft zwischen den beiden Ladungen.' },
    { tex: t`E=\frac F{|q|}`, comment: 'Die Feldstärke ist die Kraft pro Ladungsbetrag. So entfernen wir den Einfluss der Probe aus dem Messwert.' },
    { tex: t`E=\frac{k|Q|\,|q|}{r^2|q|}`, comment: 'Setze für die Kraft den Ausdruck aus dem Coulomb-Gesetz ein.' },
    { tex: t`E=k\frac{|Q|}{r^2}`, comment: t`Kürze $|q|\ne0$. Übrig bleiben nur Quellladung, Abstand und die Konstante $k$.` },
    { tex: t`E=\frac{|Q|}{4\pi\varepsilon_0r^2}`, comment: t`Setze für das Vakuum $k=\frac1{4\pi\varepsilon_0}$ ein. In Luft ist dies eine gute Näherung.` },
  ]} conclusion={t`Die Formel gibt einen Betrag an. Die Feldrichtung zeigt für $Q>0$ radial nach außen und für $Q<0$ zur Quelle hin.`} />;
}

export function CapacitorEnergyDerivation() {
  return <FormulaSteps title={t`Warum enthält die Feldenergie den Faktor $\frac12$?`} intro={t`Ein zunächst ungeladener idealer Kondensator mit konstanter Kapazität $C$ wird auf die Endspannung $U$ geladen. Beim Laden steigt die Spannung gleichmäßig mit der bereits gespeicherten Ladung.`} steps={[
    { tex: t`U(Q')=\frac{Q'}C`, comment: t`$Q'$ ist der momentane Ladungsbetrag einer Platte. Im Spannungs-Ladungs-Diagramm ergibt sich eine Ursprungsgerade.` },
    { tex: t`E_{\mathrm{Kond}}=\frac12 Q\cdot U`, comment: t`Die gespeicherte Energie ist die Fläche unter dieser Geraden bis zur Endladung $Q$: ein Dreieck mit Grundseite $Q$ und Höhe $U$.` },
    { tex: t`Q=C\cdot U`, comment: 'Löse die Kapazitätsdefinition nach der Endladung auf. Damit lässt sich die Energie nur mit Kapazität und Spannung ausdrücken.' },
    { tex: t`E_{\mathrm{Kond}}=\frac12(C\cdot U)\cdot U`, comment: t`Ersetze in der Dreiecksformel die Endladung $Q$ durch $C\cdot U$.` },
    { tex: t`E_{\mathrm{Kond}}=\frac12 C\cdot U^2`, comment: t`Fasse $U\cdot U$ zu $U^2$ zusammen. Bei doppelter Endspannung wird die gespeicherte Energie viermal so groß.` },
  ]} conclusion={t`Hier wird das Feld während des Ladens aufgebaut. Bewegt sich dagegen eine kleine Ladung durch eine bereits feste Spannung, beträgt die übertragene Energie $q\cdot U$ – ohne den Faktor $\frac12$.`} />;
}

export function ParticleSpeedDerivation() {
  return <FormulaSteps title="Beschleunigungsspannung in Geschwindigkeit übersetzen" intro={t`Ein positives Teilchen startet aus der Ruhe. Es wird nur von der elektrischen Kraft beschleunigt, durchläuft $U_{AB}>0$ und bleibt deutlich langsamer als Licht. Die Masse $m$ bleibt konstant.`} steps={[
    { tex: t`\Delta E_{\mathrm{kin}}=qU_{AB}`, comment: 'Die vom elektrischen Feld übertragene Energie wird vollständig zu kinetischer Energie.' },
    { tex: t`\frac12 mv_B^2=qU_{AB}`, comment: t`Setze die kinetische Energie ein. Wegen $v_A=0$ ist die Anfangsenergie null.` },
    { tex: t`mv_B^2=2qU_{AB}`, comment: t`Multipliziere beide Seiten mit 2, um den Faktor $\frac12$ aufzuheben.` },
    { tex: t`v_B^2=\frac{2qU_{AB}}m`, comment: 'Teile beide Seiten durch die positive Masse.' },
    { tex: t`v_B=\sqrt{\frac{2qU_{AB}}m}`, comment: 'Ziehe die positive Quadratwurzel, weil die gesuchte Geschwindigkeit hier als Betrag angegeben wird.' },
  ]} conclusion={t`Das gilt für den beschriebenen Beschleunigungsfall. Allgemein entscheidet das Vorzeichen von $qU_{AB}$, ob die kinetische Energie zu- oder abnimmt.`} />;
}

export function BraunTubeDerivation() {
  return <>
    <FormulaSteps title="Zuerst: Geschwindigkeit nach der Beschleunigung" intro={t`Das Elektron startet nahezu aus der Ruhe. $e>0$ ist der Betrag seiner Ladung und $U_a>0$ die Beschleunigungsspannung. Wir rechnen nichtrelativistisch und ohne Energieverluste.`} steps={[
      { tex: t`eU_a=\frac12m_ev_0^2`, comment: 'Die elektrische Energie wird zur kinetischen Energie des Elektrons. Deshalb stehen beide Ausdrücke gleich.' },
      { tex: t`2eU_a=m_ev_0^2`, comment: 'Multipliziere beide Seiten mit 2.' },
      { tex: t`v_0^2=\frac{2eU_a}{m_e}`, comment: 'Teile durch die Elektronenmasse und vertausche die Seiten.' },
      { tex: t`v_0=\sqrt{\frac{2eU_a}{m_e}}`, comment: 'Ziehe die positive Wurzel für den Geschwindigkeitsbetrag beim Eintritt in die Ablenkplatten.' },
    ]} />
    <FormulaSteps title="Dann: Bewegung zwischen den Ablenkplatten" intro={t`Wir zählen $y$ nach oben positiv und setzen $U_D=\varphi_{\mathrm{oben}}-\varphi_{\mathrm{unten}}$. Das Querfeld ist homogen. Die horizontale Geschwindigkeit bleibt $v_x=v_0$; anfangs gilt $v_y=0$.`} steps={[
      { tex: t`E_y=-\frac{U_D}d`, comment: 'Bei positiver oberer Platte zeigt das elektrische Feld nach unten. Deshalb hat seine y-Komponente ein Minuszeichen.' },
      { tex: t`F_y=(-e)E_y=\frac{eU_D}d`, comment: 'Ein Elektron hat die Ladung −e. Die beiden Minuszeichen ergeben eine nach oben gerichtete Kraft bei positiver Ablenkspannung.' },
      { tex: t`a_y=\frac{F_y}{m_e}=\frac{eU_D}{m_ed}`, comment: 'Teile die Kraft durch die Elektronenmasse. Die Querbeschleunigung ist zwischen den Platten konstant.' },
      { tex: t`t_1=\frac l{v_0}`, comment: 'Flugzeit gleich Plattenlänge durch horizontale Geschwindigkeit. Nur während dieser Zeit beschleunigt das Querfeld.' },
      { tex: t`y_1=\frac12a_yt_1^2`, comment: 'Für die Querbewegung aus der Ruhe gilt das Weggesetz der gleichmäßig beschleunigten Bewegung.' },
      { tex: t`v_y=a_yt_1`, comment: 'Beim Verlassen der Platten hat das Elektron diese vertikale Geschwindigkeit erreicht.' },
    ]} />
    <FormulaSteps title="Zum Schluss: Ablenkung am Schirm" intro={t`Hinter den Platten folgt die feldfreie Strecke $b$. Das Elektron bewegt sich dort geradlinig mit konstanter Geschwindigkeit weiter; $y_1$ ist also noch nicht die gesamte Schirmablenkung.`} steps={[
      { tex: t`t_2=\frac b{v_0}`, comment: 'Berechne die Flugzeit von den Platten bis zum Schirm.' },
      { tex: t`y_2=v_yt_2`, comment: 'Die zusätzliche vertikale Strecke ist Geschwindigkeit mal Zeit; im feldfreien Bereich gibt es keine weitere Querbeschleunigung.' },
      { tex: t`y_S=y_1+y_2`, comment: 'Addiere die Ablenkung im Feld und die Ablenkung während der Drift.' },
      { tex: t`y_S=\frac{a_yl^2}{2v_0^2}+\frac{a_ylb}{v_0^2}`, comment: t`Setze $t_1=\frac l{v_0}$, $v_y=a_yt_1$ und $t_2=\frac b{v_0}$ in die beiden Weganteile ein.` },
      { tex: t`y_S=\frac{a_yl}{v_0^2}\left(\frac l2+b\right)`, comment: t`Klammere den gemeinsamen Faktor $\frac{a_yl}{v_0^2}$ aus.` },
      { tex: t`\frac{a_y}{v_0^2}=\frac{eU_D}{m_ed}\cdot\frac{m_e}{2eU_a}`, comment: 'Setze Querbeschleunigung und Geschwindigkeitsquadrat ein. Durch einen Bruch zu teilen bedeutet, mit seinem Kehrwert zu multiplizieren.' },
      { tex: t`\frac{a_y}{v_0^2}=\frac{U_D}{2dU_a}`, comment: t`Kürze $e$ und $m_e$. Die beiden Spannungen und der Plattenabstand bleiben übrig.` },
      { tex: t`y_S=\frac{U_D}{U_a}\frac l{2d}\left(b+\frac l2\right)`, comment: 'Setze den gekürzten Faktor in die Schirmgleichung ein. Bei fester Geometrie ist die Ablenkung proportional zur Ablenkspannung und umgekehrt proportional zur Beschleunigungsspannung.' },
    ]} />
  </>;
}
