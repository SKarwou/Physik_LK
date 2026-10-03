import { MathText } from './Math';

const guides = {
  circuit: {
    setup: 'Die Quelle hält eine Spannung zwischen ihren Polen aufrecht. Schalter, Widerstand und Leitungen bilden den Stromweg. Ein Amperemeter misst den Ladungstransport durch einen Querschnitt; ein Voltmeter vergleicht die Potentiale zweier Anschlusspunkte.',
    steps: ['Beginne mit einem Widerstand von 100 Ω und 6 V. Wähle das Amperemeter und „In Reihe“, dann schließe den Schalter.', 'Notiere Spannung und Stromstärke mit Einheiten. Ändere danach nur die Spannung; lasse den Widerstand gleich. Mit „Strommesswert aufnehmen“ ergänzt du deine Tabelle.', 'Öffne den Schalter zum Umbauen. Wähle das Voltmeter und schließe es parallel zum Verbraucherbereich an. Schließe den Schalter wieder und lies die Spannung ab.', 'Vergleiche nun Reihe und Parallel bei derselben Quellenspannung und gleichen Einzelwiderständen. Notiere zuerst deine Vermutung und danach die Beobachtung.'],
  },
  matter: {
    setup: 'Das Rechteck steht für einen zunächst neutralen Körper. Ein äußeres elektrisches Feld wirkt auf seine positiven und negativen Ladungen. Ob Elektronen frei beweglich oder an Atome gebunden sind, entscheidet über die Reaktion.',
    steps: ['Wähle zuerst den Leiter und betrachte ihn bei ausgeschaltetem Feld. Überlege, welche Ladungen im Metall beweglich sind.', 'Schalte das Feld ein. Verfolge die Elektronen: Wo entstehen Überschuss und Mangel? Die Pluszeichen kennzeichnen die positive Nettoladung, keine wandernden Protonen.', 'Schalte das Feld aus und wähle den Isolator. Schalte es erneut ein und vergleiche die kleinen örtlichen Verschiebungen mit der Umverteilung im Leiter.', 'Formuliere den Unterschied zwischen Influenz und Polarisation. Erkläre dabei, warum der gesamte isolierte Körper neutral bleibt.'],
  },
  electroscope: {
    setup: 'Metallteller, Stab, Halterung und beweglicher Zeiger sind leitend verbunden. Gleichnamige Ladungen an Zeiger und Halterung führen zur Abstoßung. Der Zeigerausschlag macht diese elektrische Wirkung sichtbar.',
    steps: ['Neutralisiere das Elektroskop. Wähle einen negativ geladenen Stab und verkleinere den Abstand, ohne ihn zu berühren.', 'Vergleiche die Ladungsverteilung oben am Teller und unten am Zeiger. Entferne den Stab wieder: Was unterscheidet reine Umverteilung von dauerhafter Aufladung?', 'Wiederhole mit positivem Stab. Prüfe, ob der Ausschlag allein verrät, welches Vorzeichen der Stab hat.', 'Nutze zuletzt „Teller berühren, dann Stab entfernen“. Vergleiche diesen Fall mit dem bloßen Annähern und begründe den verbleibenden Ausschlag.'],
  },
  grains: {
    setup: 'Längliche Grießkörner liegen in isolierendem Öl zwischen Elektroden. Das elektrische Feld polarisiert die Körner. Sie richten sich mit ihrer Längsachse nach dem örtlichen Feld aus; im echten Versuch können sie Ketten bilden.',
    steps: ['Wähle eine Elektrodenanordnung. Skizziere auf Papier oder mit „Selbst zeichnen“ deine Vorhersage, bevor du das Feld einschaltest.', 'Schalte das Feld ein und beobachte die Orientierung vieler Körnchen. Zeichne einige glatte Feldlinien, die überall zur lokalen Körnerausrichtung passen.', 'Ergänze selbst die Pfeilrichtung aus der Wirkung auf eine positive Probeladung. Die Körner zeigen diese Richtung nicht an.', 'Klicke erst danach auf „Feldlinien vergleichen“. Untersuche anschließend eine andere Anordnung; notiere Gemeinsamkeiten und Unterschiede.'],
  },
  plate: {
    setup: 'Zwei große parallele Platten liegen an einer Spannungsquelle. Links befindet sich die positive, rechts die negative Platte. Eine kleine positive Probeladung wird zwischen ihnen festgehalten; die Anzeige nennt den Betrag der elektrischen Kraft.',
    steps: ['Beginne mit U = 200 V, d = 10 cm und q = 2 nC. Lies E und F ab und notiere die Richtung des Kraftpfeils.', 'Halte U und d fest und ändere nur q. Lege im Heft eine Tabelle für q und F an. So kannst du prüfen, welche Eigenschaft zur Probe und welche zum Feld gehört.', 'Setze q zurück und verändere erst U, dann in einem getrennten Versuch d. Notiere vor jeder Änderung eine begründete Vorhersage.', 'Verschiebe die Probe waagrecht und senkrecht. Starte danach „Energieübertragung zeigen“: Vergleiche den zurückgelegten Weg mit der übertragenen Energie. Die Probe wird hier geführt, nicht frei beschleunigt.'],
  },
  potential: {
    setup: 'Zwei Elektroden liegen in einer flachen leitenden Wasserschicht an einer Kleinspannung. Das Voltmeter besitzt eine rote Messspitze A und eine schwarze Bezugsspitze B. Es zeigt die Spannung U_AB zwischen diesen beiden Orten, nicht ein absolutes Potential.',
    steps: ['Beginne mit Plattenelektroden und 10 V. Lasse B rechts an der negativen Elektrode mit dem festgelegten Bezug 0 V.', 'Verschiebe A über die Regler oder direkt in der Wanne. Suche einen Ort mit 5 V und speichere ihn mit „Messpunkt speichern“. Notiere seine Koordinaten.', 'Suche mindestens drei weitere Orte mit derselben Anzeige. Verbinde sie im Heft zur Äquipotentiallinie. Wiederhole für 2 V und 8 V.', 'Blende erst jetzt Äquipotentiallinien und Feldrichtungen zum Vergleich ein. Verschiebe anschließend B: Unterscheide das Potential eines Ortes von der zwischen A und B gemessenen Spannung.', 'Wiederhole mit runden Elektroden. B wird dabei auf die negative Rundelektrode gesetzt. Vergleiche die Form der Linien mit dem Plattenfeld.'],
  },
  superposition: {
    setup: 'Am selben Ort P wirken zwei elektrische Feldbeiträge. Der blaue Pfeil zeigt E₁, der rosa Pfeil E₂ und der grüne Pfeil das resultierende Feld. Die Pfeile beschreiben Eigenschaften des Feldes am Ort P, keine Wege von Teilchen.',
    steps: ['Stelle E₁ = 3 kN/C und E₂ = 4 kN/C ein. Wähle zunächst „Parallel“ und skizziere deine Vektoraddition.', 'Wechsle zu „Entgegen“. Überlege vor dem Ablesen, welcher Beitrag überwiegt und wohin das Gesamtfeld zeigt.', 'Wähle „Senkrecht“. Verschiebe einen Pfeil in deiner Zeichnung parallel an die Spitze des anderen; der Gesamtpfeil führt vom Anfang zum Ende.', 'Stelle zwei gleich große entgegengesetzte Beiträge ein. Erkläre den Unterschied zwischen „keine Quellen“ und „Feldbeiträge heben sich an P auf“.'],
  },
  capacitor: {
    setup: 'Zwei voneinander isolierte Metallplatten speichern entgegengesetzte Ladungen. Ihre Kapazität hängt von Plattenfläche, Abstand und Material im Zwischenraum ab. Entscheidend ist, ob die Spannungsquelle noch angeschlossen ist.',
    steps: ['Lasse die Quelle zunächst angeschlossen. Notiere A, d, εᵣ sowie C, Q, U und die Feldenergie. Verändere immer nur eine der drei Geometrie- bzw. Materialgrößen.', 'Verdopple die Plattenfläche und stelle sie anschließend zurück. Verdopple danach den Abstand. Vergleiche jeweils die Kapazität mit dem Ausgangswert.', 'Wähle „Abgetrennt“. Die gerade gespeicherte Ladung wird festgehalten. Verändere nun den Abstand oder die relative Permittivität und beobachte besonders die Spannung.', 'Vergleiche denselben Eingriff bei konstantem U und konstantem Q. Begründe, warum eine angeschlossene Quelle Ladung nachliefern oder aufnehmen kann, eine abgetrennte aber nicht.'],
  },
  rc: {
    setup: 'Ein Widerstand R liegt im Stromweg zu einem Kondensator C. Beim Laden wird eine konstante Quellenspannung angelegt, beim Entladen ist die Quelle abgetrennt und der Kondensator mit dem Widerstand verbunden. Der Zeitregler zeigt Vielfache der Zeitkonstante τ.',
    steps: ['Wähle „Aufladen“, R = 10 kΩ, C = 100 µF und U₀ = 10 V. Stelle die Zeit zunächst auf 0 τ.', 'Lies Spannung und Stromstärke für 0; 0,5; 1; 2; 3 und 5 τ ab. Nutze die Tabelle und zeichne die Werte gegen die tatsächliche Zeit in Sekunden.', 'Klicke erst nach dem eigenen Zeichnen auf „Diagramm zeichnen“. Vergleiche Spannung und Strom getrennt; der Stromgraph zeigt den Betrag.', 'Wiederhole mit „Entladen“. Erkläre das negative Vorzeichen der Stromanzeige gegenüber der beim Laden gewählten Richtung.', 'Verdopple R oder C. Vergleiche dieselben Vorgangsphasen in Sekunden: Der Zeitregler 1 τ steht nun für einen anderen Zeitpunkt.'],
  },
  particle: {
    setup: 'Ein positiv geladenes Proton tritt mit einer Anfangsgeschwindigkeit in ein homogenes elektrisches Feld ein. Der Kraftpfeil zeigt seine elektrische Kraft. Du vergleichst einen Eintritt parallel zum Feld mit einem Eintritt senkrecht dazu.',
    steps: ['Wähle den parallelen Eintritt. Sage die Bahnform voraus und starte den Flug. Beobachte die Abstände der kleinen Ortsmarkierungen für gleiche Zeitabschnitte.', 'Setze zurück, erhöhe nur die Feldstärke und vergleiche den Flug bei gleicher Anfangsgeschwindigkeit. Die Kraft bewirkt eine Änderung der Geschwindigkeit.', 'Wechsle zum senkrechten Eintritt. Trenne die Bewegung in die gleichförmige x-Bewegung und die beschleunigte y-Bewegung.', 'Vergleiche bei derselben Feldstärke zwei Anfangsgeschwindigkeiten. Erkläre die Ablenkung am gleichen x-Ort über die unterschiedliche Aufenthaltszeit im Feld.', 'Formuliere abschließend, was sich bei einer negativen Ladung gleicher Masse und gleichem Ladungsbetrag ändern würde.'],
  },
};
export default function ExperimentGuide({ kind }: { kind: keyof typeof guides }) {
  const guide = guides[kind];
  return <div className="ef-experiment-guide"><p><b>Aufbau und Ziel.</b> <MathText>{guide.setup}</MathText></p><h4>Durchführung · Schritt für Schritt</h4><ol>{guide.steps.map((step, i) => <li key={i}><MathText>{step}</MathText></li>)}</ol></div>;
}
