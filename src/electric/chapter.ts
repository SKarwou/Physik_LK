import type { Chapter } from '../chapters';

// Only the freely accessible electric-field material enters the public app bundle.
export const electricChapter: Chapter = {
    slug: "elektrisches-feld", title: "Elektrisches Feld", area: "Elektromagnetische Felder", symbol: "E", hours: 40,
    teaser: "Feldbegriff, Kraftmessung und Potentialkarten – mit interaktiven Experimenten, Kondensator und Teilchenflug.",
    lead: "Du entwickelst aus beobachtbaren Kraftwirkungen ein räumliches Feldmodell und lernst, dieses Modell zeichnerisch, energetisch und rechnerisch zu nutzen.",
    tags: ["Coulomb", "Feldlinien", "Potential"], goals: ["Coulomb-Kräfte berechnen und einordnen", "Feldkarten zeichnen und Vektoren überlagern", "Potential, Spannung und Energie verknüpfen"],
    theorySections: [
      { title: "Ladung und Coulomb-Kraft", paragraphs: [
        "Elektrische Ladung ist eine Eigenschaft von Materie. In einem abgeschlossenen System bleibt die Gesamtladung erhalten; Reibung erzeugt keine Ladung, sondern trennt bereits vorhandene positive und negative Ladungsanteile. Gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an. Der Betrag der Kraft zwischen idealisierten Punktladungen wird durch das Coulomb-Gesetz beschrieben.",
        "Die Abhängigkeit F ∝ 1/r² ist ein inverses Quadratgesetz. Verdoppelt sich der Abstand, sinkt die Kraft auf ein Viertel. Dieses Verhalten lässt sich durch eine Linearisierung prüfen: Trägt man F gegen 1/r² auf, sollte im idealen Modell eine Gerade durch den Ursprung entstehen. Reale Ladungsverteilungen, Feuchtigkeit und endliche Körpergrößen begrenzen die Punktladungsnäherung.",
      ]},
      { title: "Feldstärke, Feldlinien und Superposition", paragraphs: [
        "Der Feldbegriff ersetzt die Vorstellung einer unmittelbaren Fernwirkung. Eine Quellladung verändert den Raum. Die elektrische Feldstärke E an einem Ort ist die Kraft pro positiver Probeladung. Das Feld gehört zum Ort und zur Quellenanordnung; die Kraft hängt zusätzlich von Betrag und Vorzeichen der eingebrachten Ladung ab. Für negative Ladungen zeigt die Kraft entgegengesetzt zur Feldrichtung.",
        "Feldlinien sind ein Darstellungsmodell. Die Tangente zeigt die Richtung des Feldvektors, die Liniendichte steht qualitativ für den Betrag. Feldlinien beginnen an positiven und enden an negativen Ladungen oder im Unendlichen; sie kreuzen sich nie. Mehrere Quellen werden durch vektorielle Addition überlagert. Ein Feldnullpunkt bedeutet, dass sich Beiträge aufheben – nicht, dass dort keine Einzelfelder existieren.",
      ]},
      { title: "Potential und Materie im Feld", paragraphs: [
        "Das elektrische Potential beschreibt die potentielle Energie pro Ladung. Eine Spannung ist eine Potentialdifferenz. Bewegt sich eine Ladung durch eine Spannung, ändert sich ihre potentielle Energie um qU. Äquipotentiallinien verbinden Orte gleichen Potentials und stehen im elektrostatischen Fall senkrecht auf den Feldlinien. Entlang einer Äquipotentiallinie verrichtet das Feld keine Arbeit.",
        "In einem Leiter können sich Ladungen verschieben. Im elektrostatischen Gleichgewicht ist das Feld im Inneren eines idealen Leiters null; überschüssige Ladung sitzt auf der Oberfläche. In Isolatoren können sich gebundene positive und negative Ladungsschwerpunkte geringfügig gegeneinander verschieben: Das Material wird polarisiert. Damit lassen sich Faraday-Käfig, angezogener Wasserstrahl und kapazitive Sensoren erklären.",
      ]},
    ],
    memory: "Das Feld gehört zum Ort, die Kraft zusätzlich zur Ladung: F⃗ = q·E⃗. Feldlinien sind keine Teilchenbahnen.",
    formulas: [
      { formula: "F = 1/(4πɛ₀) · |Q₁Q₂|/r²", meaning: "Coulomb-Kraft zwischen Punktladungen.", condition: "Punktladungsnäherung" },
      { formula: "E⃗ = F⃗/q", meaning: "Definition der elektrischen Feldstärke." },
      { formula: "E = 1/(4πɛ₀) · |Q|/r²", meaning: "Feld einer Punktladung." },
      { formula: "E⃗ges = ΣE⃗i", meaning: "Vektorielle Superposition." },
      { formula: "U = Δφ; ΔEpot = qU", meaning: "Potentialdifferenz und Energieänderung." },
    ],
    example: { title: "Feldstärke aus einer Kraftmessung", task: "Auf q = 3,0 nC wirkt F = 6,2 μN nach rechts. Bestimme Feldstärke und Kraft auf q₂ = −4,5 nC.", steps: ["Alle Größen in SI-Einheiten: q = 3,0·10⁻⁹ C, F = 6,2·10⁻⁶ N.", "E = F/q = 2,07·10³ N/C nach rechts.", "Für q₂ gilt F₂ = q₂E. Der Betrag ist 4,5·10⁻⁹ C · 2,07·10³ N/C.", "Wegen des negativen Vorzeichens zeigt die Kraft nach links."], result: "E = 2,1 kN/C nach rechts; F₂ = 9,3 μN nach links" },
    flow: [{ label: "Ladung", detail: "Quelle des Feldes" }, { label: "Feld", detail: "Eigenschaft des Raumes" }, { label: "Kraft", detail: "F⃗ = qE⃗" }, { label: "Energie", detail: "ΔEpot = qU" }],
    lab: { kind: "coulomb", title: "Coulomb-Labor", intro: "Variiere Ladung und Abstand. Prüfe besonders, was eine Verdopplung des Abstands bewirkt." },
    experiment: { title: "Feldstärke operational bestimmen", question: "Bleibt E = F/q bei verschiedenen Probeladungen konstant?", materials: "Kraftsensor oder vorbereiteter Datensatz, Tabellenkalkulation, Diagrammpapier", steps: ["Nimm F für mindestens fünf Werte von q am selben Ort auf.", "Berechne für jede Messung den Quotienten F/q.", "Zeichne F gegen q und bestimme die Steigung.", "Vergleiche Quotientenmittelwert und Geradensteigung."], evaluation: ["Diskutiere Nullpunktfehler und Streuung.", "Erkläre den Einfluss einer zu großen Probeladung.", "Unterscheide Feld- und Teilcheneigenschaft."] },
    deepDive: { title: "Warum ein Blitzableiter Blitze nicht einfach 'anzieht'", text: "An scharfen Spitzen ist die Oberflächenladungsdichte und damit die lokale Feldstärke groß. Das kann die Luft ionisieren. Ein Blitzableiter bietet vor allem einen kontrollierten, gut leitenden Weg zur Erde. Ob und wo ein Blitz entsteht, hängt jedoch von der gesamten Feldverteilung zwischen Gewitterwolke und Boden ab." },
    exercises: [
      { id: "e1", title: "Coulomb-Kraft", level: "AFB I/II", prompt: String.raw`$Q_{1} = 20\,\mathrm{nC}$ und $Q_{2} = -35\,\mathrm{nC}$ haben $6{,}0\,\mathrm{cm}$ Abstand. Berechne Betrag und Richtung der Kraft.` },
      { id: "e2", title: "Linearisierung", level: "AFB II · Heft", prompt: String.raw`Für $r=4;\ 5;\ 6;\ 8;\ 10\,\mathrm{cm}$ werden $F=2{,}25;\ 1{,}44;\ 1{,}00;\ 0{,}562;\ 0{,}360\,\mathrm{mN}$ gemessen. Ergänze $\frac{1}{r^{2}}$ und zeichne F gegen $\frac{1}{r^{2}}$.` },
      { id: "e3", title: "Feldlinienkarte", level: "AFB II · Zeichnung", prompt: "Zeichne Punktladung, Plattenfeld und Dipol mit mindestens acht Feldlinien. Markiere Symmetrien, starke Bereiche und je eine Modellgrenze." },
      { id: "e4", title: "Vektoren überlagern", level: "AFB II", prompt: String.raw`Am Punkt P wirken $3{,}0\,\frac{\mathrm{kN}}{\mathrm C}$ nach Osten und $4{,}0\,\frac{\mathrm{kN}}{\mathrm C}$ nach Norden. Bestimme Gesamtfeld und Winkel zeichnerisch und rechnerisch.` },
      { id: "e5", title: "Potential und Energie", level: "AFB II", prompt: String.raw`Ein Elektron bewegt sich von A nach B mit $\varphi _{B} - \varphi _{A} = +850\,\mathrm{V}$. Bestimme Betrag und Vorzeichen seiner potentiellen Energieänderung und erläutere die Änderung der kinetischen Energie.` },
      { id: "e6", title: "Blitzableiter-Behauptung", level: "AFB III · Argumentation", prompt: "Beurteile: 'Ein Blitzableiter zieht Blitze an und macht ein Haus deshalb gefährlicher.' Verwende Feldstärke, Ionisation, Leitfähigkeit und Systemgrenze.", hint: "Trenne Entstehung des Blitzes und sicheren Strompfad." },
    ],
  };
