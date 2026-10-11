const applications: Record<string, {question: string; context: string}> = {
  grundlagen: {question: 'Warum braucht eine leistungsstarke Lampe mehr Energie, aber verbraucht keine Ladung?', context: 'Ob Fahrradlicht oder Handy-Ladegerät: Stromstärke, Spannung und Leistung beschreiben verschiedene Eigenschaften. Du lernst, Angaben auf Geräten sinnvoll zu unterscheiden.'},
  influenz: {question: 'Warum klebt ein geriebener Luftballon an einer zunächst neutralen Wand?', context: 'Ladungsverschiebungen erklären Anziehung ohne Berührung. Mit demselben Feldmodell lässt sich verstehen, warum eine leitende Hülle vor äußeren elektrostatischen Feldern schützt.'},
  feldbegriff: {question: 'Wie kannst du eine unsichtbare Kraftwirkung übersichtlich zeichnen?', context: 'Feldbilder zeigen, an welchen Stellen etwa zwischen Elektroden starke Kräfte zu erwarten sind. Du liest Richtung und Stärke, bevor du eine Ladung dort hineinsetzt.'},
  feldkraft: {question: 'Wie viel Kraft wirkt auf ein kleines geladenes Staubteilchen?', context: 'In einem elektrostatischen Filter werden zuvor geladene Partikel zu Sammelflächen bewegt. Für die Kraft zählt neben dem Feld auch die Ladung des jeweiligen Teilchens.'},
  coulomb: {question: 'Warum lässt die elektrische Anziehung beim Entfernen so schnell nach?', context: 'Bei einer kleinen geladenen Kugel reichen wenige zusätzliche Zentimeter für eine deutliche Kraftänderung. Du untersuchst den Abstandseinfluss und erkennst die Grenzen des Punktladungsmodells.'},
  potential: {question: 'Was bedeuten die Voltangaben auf einer Batterie eigentlich?', context: 'Eine Spannung verknüpft Ladung und übertragbare Energie. Die Potenzialkarte hilft dir außerdem, einen sinnvollen Bezugspunkt von einer messbaren Spannung zwischen zwei Punkten zu unterscheiden.'},
  superposition: {question: 'Kann zwischen zwei Ladungen ein Ort ohne elektrische Kraftwirkung liegen?', context: 'In Anordnungen mit mehreren Elektroden wirken alle Quellen gleichzeitig. Mit Feldpfeilen entscheidest du, wo sich Beiträge verstärken oder aufheben.'},
  kondensator: {question: 'Wie kann ein Kamerablitz gespeicherte Energie in kurzer Zeit abgeben?', context: 'Ein Kondensator wird geladen und stellt später Energie bereit. Das RC-Modell erklärt zugleich, weshalb Laden Zeit braucht und wie Widerstand und Kapazität diesen Verlauf beeinflussen.'},
  teilchen: {question: 'Wie zeichnet eine Spannung einen Leuchtfleck auf einen Schirm?', context: 'Die Braunsche Röhre macht sichtbar, wie elektrische Felder Elektronen steuern. Beschleunigung und Ablenkung führen vom Modellteilchen zum klassischen Oszilloskop und zur Elektronenoptik.'},
  uebungen: {question: 'Welche Formel passt zur Situation – und woran erkennst du das?', context: 'Du verbindest Messdiagramme, Geräte und Begriffe. Ein begründeter Ansatz hilft dir, auch neue Anwendungen zu lösen, statt nur ähnliche Zahlen in bekannte Gleichungen einzusetzen.'},
};
export default function LessonApplications({ lesson }: {lesson: string}) {
  const entry = applications[lesson];
  return <aside className="ef-application"><b>Aus dem Alltag ins Modell</b><h2>{entry.question}</h2><p>{entry.context}</p></aside>;
}
