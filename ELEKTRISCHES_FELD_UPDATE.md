# Elektrisches Feld: Update vom 1. Oktober 2026

Das bestehende Kapitel `?page=kapitel/elektrisches-feld` verwendet jetzt eine eigene Lernumgebung mit acht Stationen. Der Rest der Website und die verschlüsselten Lösungen bleiben bestehen.

## Unterricht und Inhalt

- Feldbegriff, positive Probeladung, homogene und radiale Felder, Dipol, Quellen und Senken.
- Grießwanne mit einschaltbarem Feld, auswählbaren Ladungsanordnungen, freiem Zeichnen und Vergleich mit Modelllinien.
- Plattenfeld: Spannung, Abstand, positive Probeladung und Position einstellen; Kraft und Feldstärke vergleichen; geführte Energieanimation und Herleitung von W = qU sowie E = U/d.
- Coulomb-Versuch mit Kraftsensor, variabler Quell- und Probeladung, Mittelpunktabstand, Messprotokoll, CSV und Linearisierung F gegen 1/r².
- Leitende Potentialwanne mit zwei Messspitzen, Platten- und Rundelektroden, Äquipotentiallinien und CSV-Protokoll. Numerisches Laplace-Modell mit isolierenden Wänden.
- Vektorielle Superposition sowie Influenz und Polarisation.
- Kapazität, Geometrie, Dielektrikum, angeschlossene/abgetrennte Quelle, Feldenergie, RC-Lade- und Entladekurven.
- Positive Teilchen parallel/senkrecht zum Feld und Vergleich mit Gravitation.
- 15 kurze Rechenübungen mit Eingabeprüfung, Rechenweg, Druckansicht und ein Glossar mit 57 Fachbegriffen aus den bereitgestellten Word-Vorlagen. Die sechs bisherigen Heftaufgaben und deren geschützte Lösungen bleiben erhalten.
- Konvention: U_AB = φ_A − φ_B, W_Feld(A→B) = qU_AB, ΔE_pot = −qU_AB. Das Vorzeichen in Heftaufgabe e5 ist jetzt ausdrücklich definiert.

Bildungsplan: https://www.bildungsplaene-bw.de/,Lde/BP2016BW_ALLG_GYM_PH.V2_IK_11-12-LF_02_01

Die numerischen Werte sind berechnet, keine experimentellen Messungen. Die gesonderten Zeichenaufgaben verwenden didaktisch simulierte Streuung. Reale Versuchsaufbauten und deren Grenzen sind direkt an den Stationen beschrieben. Die Wasserwanne ist ein stationäres leitendes Analogiemodell, kein isolierender Kondensator.

## Ergänzung: Formeln und Diagrammwerkstatt

- Formeln, Rechenwege und wichtige Begriffsdefinitionen als native MathML-Darstellung: echte Brüche, Indizes, Potenzen und Vektorpfeile. KaTeX ist lokal gebündelt; keine CDN-Verbindung erforderlich.
- Messdiagramme mit Achsenpfeilen, quadratischem Raster, Einheiten und einzelnen Messkreuzen. Keine automatisch gezeichneten Verbindungslinien.
- Coulomb-Diagramm startet leer und zeigt ausschließlich aufgenommene Messwerte. Das RC-Diagramm zeigt einzelne ideale Modellpunkte und die gewählte Messzeit.
- Vier Zeichenaufgaben mit Messwerttabellen: Feldkraft gegen Probeladung, Coulomb-Kraft gegen Abstand, Potential gegen Ort und RC-Entladung. Die didaktisch simulierten Werte besitzen kleine Streuungen und sind entsprechend gekennzeichnet.
- Vergleichspunkte sind zunächst ausgeblendet, Auswertungen aufklappbar, Messwerte als CSV herunterladbar. Die Druckansicht zeigt stets leere Raster und keine Lösungen, auch nach dem Einblenden auf dem Bildschirm.
- Raster und Achsenpfeile auch bei Vektoraddition und Teilchenbewegung; Raster in der Potentialwanne.

## Korrektur V3: Grießverteilung und durchgängige Brüche

- Die bisher korrelierten Koordinaten der Grießkörner erzeugten breite diagonale Leerstreifen. Jetzt ist pro kleiner Rasterzelle ein unabhängig versetztes Körnchen verteilt: 476 Körner, stabile Positionen beim Ein-/Ausschalten, keine künstlichen leeren Bänder. Nur tatsächliche Elektrodenflächen werden ausgespart.
- Übrig gebliebene Quotienten in Fließtext, Aufgaben, Einheiten, Reglern, Tabellen und der Coulomb-Diagrammachse werden als gestapelte Brüche dargestellt. Das umfasst auch ältere Aufgabenbeschriftungen. Der Lösungstresor erhält denselben Textformatter, ohne Änderung an Verschlüsselung oder Passwortprüfung.
- Die neue Einzeldatei heißt `Physik_Lernlabor_V3_Brueche_und_Koernchen.html` und ist sichtbar als „Vorschau 03“ gekennzeichnet, damit sie von früheren Downloads unterscheidbar bleibt.
- Die neue Offline-Datei wurde unmittelbar geprüft: alle fünf Feldanordnungen, Kornverteilung, die abgebildete Energieformel, Diagramm-/Tabellenbrüche, alle aufgeklappten Kurzübungen und Glossare sowie 390-/768-px-Ansichten. Dabei keine verbleibenden sichtbaren mathematischen Schrägstrichquotienten gefunden.

## Ergänzung V4 vom 2. Oktober 2026: Coulomb-Versuch

- Die bereitgestellte Versuchsskizze ist unverändert eingebunden (`src/electric/assets/coulomb-aufbau.png`); Aufbau, Mittelpunktabstand und Durchführung sind direkt daneben erläutert.
- Reihenfolge: Aufbau und Durchführung → Forschungsauftrag → Schieberegler mit Animation → Messprotokoll → Diagramm → Auswertung und Coulombsches Gesetz.
- Die Animation folgt der Skizze: K₁ auf verschiebbarem Stativ, K₂ über einen schrägen isolierenden Halter mit dem Kraftsensor verbunden. Zusätzliche gut lesbare Anzeigen für Abstand und Kraftbetrag unter der Animation.
- Die Tabelle ist bereits vor der ersten Messung sichtbar. Vorhandene Messwerte werden beim Verstellen der Regler nicht überschrieben. Das Diagramm zeigt weiterhin einzelne gespeicherte Messpunkte für die gewählten Ladungsbeträge.
- Die Formel und die Erklärung des Abstands- und Ladungsgesetzes stehen unter dem Diagramm. Die anschließende Herleitung der radialen Feldstärke bleibt erhalten.
- Die neue Datei `Physik_Lernlabor_V4_Coulomb.html` enthält auch das Versuchsbild vollständig eingebettet und funktioniert offline.
- Geprüft: Reihenfolge auf Desktop/390/768 px, Offline-Bild, Abstandsquadratgesetz, Variation beider Ladungen, Anziehung/Abstoßung, Datenbestand und Diagrammfilter, CSV und Löschen.

## Ergänzung V5 vom 2. Oktober 2026: Diagramme auf Klick und vollständiges Glossar

- Coulomb- und RC-Diagramme zeigen zunächst nur Achsen, Beschriftung und Raster. „Diagramm zeichnen“ blendet die Messkreuze ein; mit „Diagramm ausblenden“ verschwinden sie wieder. Neue Daten, andere Ladungsbeträge oder eine andere Darstellung setzen die Anzeige zurück. Die Aufnahme und die Tabelle der Messwerte bleiben davon unabhängig.
- Alle vier Zeichenaufgaben verwenden denselben Buttontext. Druckraster bleiben leer. Auch die Coulomb-Auswertung mit Formel ist nun zunächst geschlossen.
- Das bisherige Kurzglossar ist durch alle 57 Begriffe in acht Themenbereichen aus den gelieferten Schüler- und Lehrkraftfassungen ersetzt. Beide Originaldokumente sind unverändert als Downloads eingebunden. Ein Direktlink steht im Werkzeugkasten oben im Kapitel.
- Pro Begriff gibt es eigene Eingabefelder für Erklärung sowie Formel, Einheit oder Skizzenidee. Suche und Themenfilter erleichtern die Arbeit. Einträge werden lokal im Browser gespeichert und lassen sich als Textdatei ohne Musterlösungen herunterladen; es findet keine Übermittlung statt.
- „Lösungen / Erwartungshorizont anzeigen“ blendet die Definitionen, Formeln und Hinweise der Lehrkraftfassung unter den eigenen Einträgen ein. Dies ist eine offene Selbstkontrolle; die vorhandenen verschlüsselten Heftaufgaben bleiben separat.
- Formeln wurden aus den Word-Gleichungen mit erhaltenen Bruchstrukturen, Wurzeln, Indizes und Vektoren übertragen. Einheiten sind typografisch aufrecht; mathematische Quotienten erscheinen als echte Brüche.
- Die Vorschau `Physik_Lernlabor_V5_Glossar_und_Diagramme.html` enthält auch beide Word-Downloads eingebettet und funktioniert offline.
- Geprüft: Build, alle 57 Begriffe, 114 Eingabefelder, initial verborgene Diagramme und Lösungen, erneutes Ausblenden bei Daten-/Achsenwechsel, Speicherung nach Neuladen, Suche, Filter, vollständiger Erwartungshorizont, Word-Downloads bytegleich zu den Vorlagen, Export eigener Einträge, leere Druckraster und Layout bei 390/768/1365 px. Keine JavaScript-Fehler.

## Ergänzung V6 vom 2. Oktober 2026: Kapitel 01 und Grundlagen

- Startseite und erstes Kapitel folgen dem Design der Informatik-Seite: Creme, dunkles Grün, helle Karten, Serifenschrift als Akzent. Ein neu erzeugter Motivationscartoon ist auf Startseite und Kapitelanfang eingebaut. Es werden keine externen Webfonts mehr benötigt.
- Das elektrische Feld ist auf der Startseite Kapitel 01. Weitere Kapitel sind als „In Vorbereitung“ aufgeführt. Ihre bisherigen Quelldaten und verschlüsselten Lösungen sind erhalten. „So arbeitest du“ und der Werkzeugkasten sind entfernt.
- Durchgehend Teil 00–09 statt Stationen. Teil 00: Ladung, Strom, Spannung, Widerstand, Leistung und Energie; Leistung korrekt in Watt. Stromkreissimulation mit Schalter, einem Widerstand, Reihen- und Parallelschaltung, A-/V-Messgeräten, Anschlussprüfung, Stromrichtungen, Messprotokoll, CSV und Diagramm auf Klick. Vier zusätzliche Rechenchecks.
- Teil 01: die bisherige Influenz-/Polarisationssimulation; neues Elektroskop mit Annäherung, Berührung und Neutralisieren; neue interaktive Wimshurst-Maschine mit schrittweisem/automatischem Kurbeln, Restladung, Neutralisatoren, Sammlern, Leidener Flaschen und Funken.
- Die Influenzmaschine ist ein ausdrücklich qualitatives Modell. Ladungsbilanz der Sammler bleibt null; ohne Restladung beginnt im idealen Modell keine Verstärkung. Ohne Neutralisator findet im vereinfachten Modell keine weitere Sammlung statt. Größere Kapazität benötigt bis zur Überschlagsschwelle mehr Ladung. Die Scheiben sind zur Übersicht nebeneinander angeordnet. Keine Vorhersage realer Spannungen oder Ladungsbeträge.
- Danach: Feldbegriff (02), Kraft/Feldstärke (03), Coulomb (04), Potential (05), Superposition (06), Kondensator/RC (07), Teilchen/Gravitation (08), Lexikon/Übungen (09). Alle bisherigen Experimente bleiben enthalten.
- Glossar als Lexikon ohne Eingabefelder, Fortschritt oder Browserspeicherung. Einzelne Begriffe und alle Mustererklärungen lassen sich ein-/ausblenden; Suche und Themenfilter bleiben. 57 Begriffe der Vorlagen plus sieben Grundlagenbegriffe. Die unveränderten Word-Vorlagen enthalten weiterhin 57 Begriffe.
- Stromkreis- und Maschinenskizze lassen sich vergrößern und seitlich verschieben. Texte, Bedienelemente und Messwerte bleiben auf kleinen Bildschirmen gut lesbar.
- Geprüft: Produktionsbuild, alle zehn Teile, 64 Lexikoneinträge und deren Formeln, anfänglich verborgene Lösungen/Diagramme, Ohmsches Gesetz und Schaltungstypen, korrekte/fehlerhafte Messgeräteanschlüsse, Elektroskopzustände, Maschinenmodell einschließlich Ladungsbilanz, fehlender Restladung und Vergleich der Speicherkapazität. Offlineprüfung bei 1365/768/390 px ohne JavaScript-Fehler.

## Technischer Aufbau

- `src/electric/`: Komponenten, Modelldefinitionen und eigenes Stylesheet.
- `src/ModulePage.tsx`: bindet das neue Kapitel ein.
- `src/chapters.ts`: aktualisierter Teaser und präzisierte Potentialaufgabe.
- `docs/`: vorgefertigte Version für GitHub Pages.
- `package-lock.json`: reproduzierbare Installation einschließlich der lokal gebündelten KaTeX-Abhängigkeit.

Lokal starten (Node.js 24):

```bash
npm ci
npm run dev
```

Für GitHub Pages bauen:

```bash
npm run build
```

Der vorhandene GitHub-Workflow baut bei Änderungen an `main` ebenfalls die Website. Seine Veröffentlichungseinstellungen wurden nicht verändert.

## Einspielen

Das Update wurde gegen Repository-Stand `ad1006b1afcaa25175861529537a8a8973141c84` erstellt. Vor dem Übernehmen etwaige spätere Änderungen vergleichen. Die GitHub-Verbindung der Arbeitssitzung hatte nur Leserechte; es wurde nichts auf GitHub hochgeladen oder veröffentlicht.

Das ZIP enthält die vollständigen Quelldateien und den fertigen `docs`-Ordner, ohne Abhängigkeiten und ohne Passwörter. Die zusätzlich erzeugte Patch-Datei kann alternativ in einem sauberen Checkout dieses Standes mit `git apply` angewendet werden.

## Prüfung dieser Fassung

- Ergänzung geprüft: Brüche, Indizes, Vektoren und alle dynamischen Formeln; Messpunktdarstellung, Ein-/Ausblenden, CSV und Druckraster ohne Lösungen.

- TypeScript und Produktionsbuild erfolgreich.
- Physikprüfungen: Coulomb-Abstandsgesetz, Feldstärke, Kapazität, RC-Zeitverlauf, Potentialwerte an den Elektroden, Symmetrie und Laplace-Residuum der Potentialwanne.
- Browserprüfung: Eingabeprüfung (auch Dezimalkomma), Kraftskalierung und Ortsunabhängigkeit, Animationen, Potentialmessspitzen, Messprotokolle/CSV-Export, Kondensatorrandbedingungen, RC-Umschaltung, Teilchenflug und Navigation.
- Desktop, 390-px-Handy- und 768-px-Tablet-Ansicht auf horizontales Überlaufen geprüft; zentrale Simulationen visuell kontrolliert.

Die separate Datei `Physik_Lernlabor_Vorschau.html` lässt sich ohne Installation im Browser öffnen. Sie enthält die komplette Anwendung in einer Datei und startet auf der neuen Startseite. Zum Veröffentlichen sind die Quelldateien bzw. der `docs`-Ordner aus dem ZIP vorgesehen, nicht die Vorschau-Datei.
