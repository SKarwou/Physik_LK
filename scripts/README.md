# Verschlüsselte Lernbereiche

`npm run build` führt zuerst TypeScript aus, erstellt die öffentliche App und baut dann sieben geschützte Kurse als einzelne ES-Module. JavaScript und CSS dieser Kurse bleiben beim Build im Arbeitsspeicher. Ausschließlich die verschlüsselten Dateien `docs/protected/<slug>.json` werden geschrieben. Es entstehen keine Klartext-Kurschunks, CSS-Dateien der geschützten Builds oder Source Maps.

`npm run verify:protected` prüft den fertigen Build mit WebCrypto (dieselbe Prüfung läuft automatisch am Ende von `npm run build`): richtige/falsche Passwörter, manipulierte Daten, Bindung an den Kurs, React-Bridge und die Trennung der IQB-Aufgaben. Ein regulärer Build prüft außerdem die Rückentschlüsselung und verweigert geschützte Kursmodule oder die alte vollständige `chapters.ts` im öffentlichen Importgraphen. Bei einem Buildfehler wird das unvollständige generierte `docs` entfernt.

## Laufzeitvertrag

Vor dem Import des entschlüsselten Moduls setzt die App:

```js
globalThis.__PHYSIK_SHARED__ = { React, jsxRuntime, katex };
```

`React` ist der Namespace von `react`, `jsxRuntime` der Namespace von `react/jsx-runtime`, `katex` der Default-Export von `katex`. Damit benutzen Hauptapp und Kurs dieselbe React-Laufzeit. Ein entschlüsseltes Modul besitzt einen Default-Export (die Kurskomponente) und keine weiteren aufzulösenden Modulimporte.

Die öffentliche JSON-Hülle enthält `version: 1`, `slug`, `cipher: "AES-GCM"`, `kdf: "PBKDF2"`, `hash: "SHA-256"`, `iterations: 310000` sowie Base64-Felder `salt`, `iv`, `ciphertext`. PBKDF2 leitet aus dem UTF-8-Passwort und einem zufälligen 16-Byte-Salt einen 256-Bit-Schlüssel ab. AES-GCM verwendet einen zufälligen 12-Byte-IV und einen 128-Bit-Authentifizierungstag am Ende des Ciphertexts. Die zusätzlichen authentifizierten Daten sind UTF-8 `physik-lk:<slug>:v1`.

Der Klartext ist UTF-8-JSON mit `{version: 1, slug, js, css}`. Erst nach erfolgreicher Authentifizierung darf die App das CSS einsetzen und `js` als Blob-Modul importieren. Die App verwaltet Blob-URLs und CSS-Lebensdauer.

## Entwicklung und Grenzen

`npm run dev` liefert an den gleichen `/Physik_LK/protected/<slug>.json`-Adressen verschlüsselte Pakete über eine Vite-Middleware. Änderungen unter `src` leeren deren Cache. Für den maßgeblichen Produktionstest: `npm run build`, `npm run verify:protected`, `npm run preview`. Der normale Vite-Entwicklungsserver stellt Quellcode bereit und ist kein geschütztes Veröffentlichungsziel.

Die Passwörter stehen ausschließlich in der Build-Konfiguration `scripts/protected-courses.mjs`. Die gemeinsame IQB-Datei wird beim öffentlichen Build auf die beiden freien Kurse beschränkt; jedes geschützte Paket enthält nur seine eigenen Aufgaben. Die Quellen bleiben unverändert vollständig für die lokale Arbeit und die Versionsverwaltung vorhanden.

Diese Verschlüsselung ist eine Lernzugangssperre für die veröffentlichte Website. Ein öffentliches GitHub-Repository macht Quelltexte und Build-Passwörter weiterhin einsehbar. Berechtigte Leser können nach dem Entschlüsseln Inhalte speichern; diese Lösung ist weder eine serverseitige Benutzerverwaltung noch ein Schutz vertraulicher Quelldaten.
