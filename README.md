# Physik-Lernlabor · Leistungsfach Baden-Württemberg

Die Startseite bietet eine kompakte Themenauswahl ohne Bildungsplannummern und ohne doppelten Einstieg. Die drei geöffneten Lernbereiche sind Elektrisches Feld, Magnetisches Feld und Elektromagnetisches Feld (Elektrodynamik).

## Lernweg

- Elektrisches Feld: zehn Kapitel von den Grundlagen bis zum Transfer. Die vorhandenen Simulationen, Versuchswege, das Lexikon, der RC-Selbstlernweg und die geschützten Lösungen bleiben erhalten.
- Magnetisches Feld: sieben Kapitel zu Feldlinien, Leiterkraft, Spule, Lorentzkraft und Hall-Effekt, Kreisbahn, Geschwindigkeitsfilter und dem Vergleich von Gravitations-, elektrischem und magnetischem Feld.
- Elektromagnetisches Feld: acht Kapitel zu Bewegungsinduktion, magnetischem Fluss, Lenz und Wirbelströmen, Generator, Transformator, Selbstinduktion, Feldenergie der Spule und Maxwell.

Die Themenübersicht zeigt nur die Auswahl. Ein Klick öffnet genau ein Lernkapitel. Die URL enthält dessen Anker und bleibt direkt teilbar; die Zurück-/Vorwärtsnavigation des Browsers funktioniert ebenfalls. Bestehende RC-Anker und die Links zum Lexikon bleiben nutzbar.

Jedes Kapitel endet mit zehn Single-/Multiple-Choice-Fragen. Mindestens acht richtig beantwortete Fragen schalten ein Codewort frei. Mehrfachwahl wird nur bei exakt richtiger Auswahl als korrekt gewertet. Nach der Auswertung sind richtige Antworten und Erklärungen zugänglich; Wiederholungen sind möglich. Die beste Punktzahl wird lokal in diesem Browser gespeichert, ohne Konto oder Übertragung von Lerndaten. Browserdaten löschen entfernt diesen Fortschritt. Die Wortfolge ist als Lernmotivation gedacht, nicht als manipulationssicherer Prüfungsnachweis.

## Didaktik und Modelle

Heftaufträge stehen vor aufklappbaren Lösungen und Interpretationen. Merksätze sind mit einer Glühbirne gekennzeichnet. Zwei zusätzliche Begleitexperimente ergänzen das elektrische Feld: ein realer Wasserstrahlversuch mit Messprotokoll und ein virtuelles geladenes Fadenpendel mit Kraftauswertung. Die bisherigen Experimentkomponenten wurden nicht ersetzt.

Neue Modelle erlauben unter anderem die Variation von Leiter-/Spulenfeldern, Lorentzkraft und Kreisbahnen, Flussänderung, Generatorrotation und RL-Verlauf. Berechnete Idealwerte werden ausdrücklich von eigenen realen Messwerten unterschieden. Messreihen müssen vor dem Kapitelwechsel gesichert bzw. ins Heft übertragen werden. Das Pendel zeigt eine qualitative Einschwingbewegung; sein Ruhewinkel folgt dem Kräftegleichgewicht. Der Geschwindigkeitsfilter zeigt die anfängliche Ablenkungsrichtung, keine numerisch berechnete Bahn.

Der Feldvergleich folgt den Kategorien der bereitgestellten Unterrichtstabelle; irreführende Analogien wurden präzisiert: Feldlinien sind nicht allgemein Teilchenbahnen, freie Fallbewegung schirmt Gravitation nicht ab, und die magnetische Kraft hängt auch von der Bewegung ab.

Grundlage bleibt die zu Klassen 11/12 passende Bildungsplanfassung 2022 (V2), Abschnitte 3.6.2.1–3.6.2.3. Fachliche Quellen sind in den Kursübersichten verlinkt. Die separate Fassung für Klassen 12/13 wird nicht mit diesem Lernweg vermischt.

## Entwicklung und Veröffentlichung

Node.js 24 verwenden:

```sh
npm ci
npm run dev
npm run build
```

Der Build wird in `docs` erzeugt, mit dem Basisverzeichnis `/Physik_LK/`. Der bestehende GitHub-Actions-Workflow baut bei Änderungen auf `main` aus den Quelldateien und veröffentlicht GitHub Pages. Änderungen an den Pages-Einstellungen sind nicht erforderlich.

Website: https://skarwou.github.io/Physik_LK/

Die Original-Arbeitsblätter und die private Passwortliste werden nicht veröffentlicht. Bestehende Word-Glossare bleiben als ältere Downloads gekennzeichnet.


## Zugang zu den Lernbereichen

Elektrisches Feld und Denk- und Arbeitsweisen sind frei zugänglich. Die sieben anderen Themen werden beim Build einzeln mit AES-GCM verschlüsselt und erst nach Eingabe des jeweiligen Themenpassworts geöffnet. Direkte Kapitelverweise und alte Themenadressen führen durch dieselbe Sperre. Die Freigabe gilt nur für die geöffnete Seite; Neuladen oder „Thema wieder sperren“ beendet sie. Hinweise zu Build, Prüfung und Passwortkonfiguration stehen in [scripts/README.md](scripts/README.md).

Das ist eine Unterrichtsfreigabe: Das öffentliche GitHub-Repository mit Quellen, Historie und Build-Konfiguration bleibt lesbar. Der Zugang ist deshalb nicht als Geheimnisschutz für vertrauliche Inhalte gedacht. Die separat verschlüsselten Lehrkraftlösungen im frei zugänglichen elektrischen Feld bleiben unverändert.

Alle 75 Unterkapitel zeigen eigene dekorative SVG-Cartoons auf der Kachel und im Kapitelkopf. Experimente, Formelsatz, Heftaufträge und Quizfortschritt bleiben erhalten.
