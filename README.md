# Physik-Lernlabor · Leistungsfach Baden-Württemberg

Kapitel 01 führt von den Grundlagen der Mittelstufe zum elektrischen Feld. Es enthält die Teile 00–09 mit interaktiven Experimenten, Messprotokollen, Diagrammen auf Klick, 64 Lexikoneinträgen und Übungen. Die Startseite übernimmt die Überschriften und die Hierarchie aus Abschnitt 3.6 des Bildungsplans (Leistungsfach 11/12). Nur „3.6.2.1 Elektrisches Feld“ ist bereits ausgearbeitet; die übrigen Themen sind „In Vorbereitung“.

## Neu in V9: kleinschrittiger Selbstlernweg in Teil 07

Die sechs Lernblöcke beginnen mit einem verbindlichen Leseauftrag zur Schulbuch-Doppelseite 124–125. Die 15 Minuten Lesezeit sind Teil der insgesamt 360 Minuten. Ein Symbolvergleich verbindet die Buchschaltung und die Buchbezeichnung Q_C mit der Simulation. Die Kapazität bleibt bekannt; Ladung, Spannung, Stromstärke, Einheiten und drei Grundbeziehungen werden aufgefrischt.

Die Messanleitung erklärt jeden Bedienungsschritt, die Messwertaufnahme und das Sichern der Reihen. Die Herleitungen erklären jede algebraische Operation und die Wahl jeder Grundbeziehung. Exponentialfaktor, Kettenregel, Anfangsbedingung, die fehlende Ladung beim Aufladen, Zeitkonstante, Halbwertszeit, Logarithmus und Stromfläche haben eigene Hilfen und kurze Zwischenaufträge. Fünf Kontrollpunkte und sechs Heftaufträge begleiten die Arbeit.

Eine Tabelle beantwortet ausdrücklich „Welche Gleichung benutze ich wann?“. Ein vollständig begründetes Rechenbeispiel und ein Gegenbeispiel zum Aufladen bereiten auf die 24 bestehenden Aufgaben vor. Aufgaben 1–19 gehören zum Lernweg; 20–24 sowie die Buchaufgaben auf Seite 125 sind Vertiefungen. Lösungen bleiben einzeln aufklappbar. Die Zeitangaben sind Richtwerte.

Im Experiment bleiben Messpunkte bis „Diagramm zeichnen“ verborgen. Eigene Messreihen lassen sich merken und als CSV sichern. Beim direkten Umschalten bleibt die Kondensatorspannung stetig. Der feste Strompfeil der Website (Entladen negativ) und die im Buch verwendete positive Entladestromrichtung werden ausdrücklich gegenübergestellt.

Die Druckfassung enthält Leseauftrag, Arbeitsaufträge und Heftanweisungen. Hilfen, Lösungen und Bedienung werden dabei ausgeblendet. Die Buchfotos sind nicht im öffentlichen Uploadpaket enthalten; Texte und Skizzen sind neu ausgearbeitet.

## Dieses Update hochladen

1. Das ZIP entpacken und den Ordner `GitHub_Upload` öffnen.
2. Im Repository `SKarwou/Physik_LK` zur obersten Ebene wechseln, dann **Add file → Upload files** öffnen.
3. Den **Inhalt** von `GitHub_Upload` hochladen: insbesondere die Ordner `src`, `public`, `docs` und die Dateien daneben. Den Ordner `GitHub_Upload` selbst nicht als zusätzliche Ebene hochladen. Die ZIP-Datei wird von GitHub nicht automatisch entpackt.
4. Änderungen mit einer Beschreibung wie „Kapitel 01 mit Grundlagen und interaktiven Experimenten“ auf `main` speichern. Falls Änderungen über einen Pull Request erfolgen, muss dieser anschließend übernommen werden, damit der vorhandene Workflow startet.
5. Unter **Actions** den vorhandenen Workflow „Physik-Website automatisch veröffentlichen“ prüfen. Nach erfolgreichem Lauf die Seite öffnen und gegebenenfalls neu laden.

Website: https://skarwou.github.io/Physik_LK/

Die bestehenden Pages-Einstellungen müssen für dieses Update nicht geändert werden. Der vorhandene Workflow baut den Inhalt aus `src` und veröffentlicht `docs`. Der fertige `docs`-Ordner ist zusätzlich bereits enthalten. Falls die bestehende Veröffentlichung stattdessen über `main` und `/docs` eingerichtet ist, ist auch dieser Ordner vollständig vorbereitet.

GitHub-Anleitung: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Lokal weiterbearbeiten

Node.js 24 verwenden:

```bash
npm ci
npm run dev
```

Produktionsversion erzeugen:

```bash
npm run build
```

Der Build landet in `docs`. Das Vite-Basisverzeichnis bleibt `/Physik_LK/`.

## Inhalt und Grenzen

- Die Influenzmaschine zeigt eine feste Skizze mit einer einmaligen Aufladephase. Die Kugelbilder erklären Elektronenmangel und Elektronenüberschuss bei unveränderter positiver Ladung. Das Elektroskop bleibt interaktiv. Beide sind qualitative, erklärte Modelle. Sie liefern keine realen Messwerte in Volt oder Coulomb.
- Stromkreis, Coulomb-Versuch und weitere quantitative Experimente liefern ideale Modellwerte. Die gesonderten Zeichenaufgaben kennzeichnen ihre simulierte Streuung.
- Das Online-Lexikon speichert keine persönlichen Einträge. Mustererklärungen und 245 einzelne Symbolerklärungen mit Einheiten sind frei aufklappbar. Die zwei älteren Word-Downloads bleiben als solche gekennzeichnet.
- Formeln verwenden E bzw. ΔE für Energie und Malpunkte zwischen Faktoren. W erscheint weiterhin korrekt als Einheit Watt.
- Die Drahtlupe trennt ungeordnete Elektronenbewegung, langsame Drift und schnelle Ausbreitung der elektrischen Wirkung. Im Schaltplan kreisen keine Teilchenpunkte.
- Die Versuche enthalten sichtbare Anleitungen zu Aufbau und Durchführung. Beim RC-Versuch erarbeiten die Lernenden eigene Modellmessreihen; die Tabellen stehen vor den auf Klick sichtbaren Diagrammen.
- Die verschlüsselten Lösungen der bisherigen Heftaufgaben bleiben unverändert. Eine private Passwortliste ist nicht Teil des Pakets.
- Bildquelle des Cartoons und Erstellungsnotiz: `src/electric/assets/ASSET_NOTES.md`.

Die separate Vorschau-Datei außerhalb von `GitHub_Upload` ist zum lokalen Öffnen vorgesehen und gehört nicht zum Upload.
