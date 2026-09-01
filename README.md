# Physik-Lernlabor · Leistungsfach Baden-Württemberg

Ausführliche Lernwebsite für die Kursstufe 11/12 mit 15 Kapiteln, Theorie auf Abiturniveau, Formelnetzen, Experimenten, interaktiven Parameterlaboren, Vertiefungen und 90 Aufgaben für Papier und Heft. Die Lösungen sind kapitelweise verschlüsselt und werden erst nach Eingabe des jeweiligen Lehrkraft-Passworts im Browser entschlüsselt.

## Direkt auf GitHub Pages veröffentlichen

1. Alle Dateien und Ordner dieses Pakets in die oberste Ebene des Repositorys `Physik_LK` hochladen.
2. Unter **Settings → Pages** bei **Build and deployment** die Option **Deploy from a branch** auswählen.
3. Als Branch **main** und als Ordner **/docs** auswählen, anschließend **Save** anklicken.
4. Nach kurzer Wartezeit ist die Seite unter `https://skarwou.github.io/Physik_LK/` erreichbar.

Der Ordner `docs` enthält bereits die fertige GitHub-Pages-Version. Für das reine Veröffentlichen ist keine lokale Installation nötig.

## Website später bearbeiten

Für Änderungen wird Node.js benötigt:

```bash
npm install
npm run dev
```

Nach Änderungen die veröffentlichte Version neu erzeugen:

```bash
npm run build
```

Der Build wird automatisch in `docs` geschrieben. Danach die geänderten Dateien erneut zu GitHub hochladen.

## Wichtiger Hinweis zur Passwortliste

Die separate Word-Datei mit den Kapitelpasswörtern gehört ausschließlich zur Lehrkraft. Sie ist absichtlich nicht Bestandteil dieses öffentlichen Pakets und darf nicht in das GitHub-Repository hochgeladen werden.
