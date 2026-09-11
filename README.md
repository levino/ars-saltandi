# ARS SALTANDI — Website

Neubau der Website der ARS SALTANDI Tanz- und Artistikschule Hildesheim.
Statisches Astro, gehostet auf Cloudflare Workers. Kein WordPress, keine
Datenbank, keine Updates, die Sonntagabend eingespielt werden müssen.

**Alle Inhalte liegen als Markdown und TypeScript im Repository.** Änderungen
laufen über Pull Requests — von Hand oder von einer KI, die aus einem PDF, einer
E-Mail oder einer Sprachnachricht den passenden Commit baut.

---

## Schnellstart

```bash
npm install
npm run dev          # Entwicklungsserver auf http://localhost:4321
npm run build        # Produktions-Build nach dist/
npm run preview      # Build lokal im echten Worker testen
npm run check        # Typprüfung
```

---

## Inhalte pflegen

Kein Login, kein Backend. Datei ändern, Pull Request, fertig.

| Was | Wo |
|---|---|
| **Stundenplan** | `src/content/schedule/*.yaml` — eine Datei pro Wochentag |
| **Preise** | `src/content/preise.yaml` |
| **Freie Plätze** (Startseite) | `src/content/freie-plaetze.yaml` |
| **Kurse** | `src/content/courses/*.md` |
| **Dozent:innen** | `src/content/teachers/*.md` |
| **News** | `src/content/news/*.md` |
| **Fotos** | `src/assets/photos/` + Zuordnung in `src/lib/photos.ts` |
| **Adressen, Kontakt, Navigation** | `src/data/site.ts` |

### Stundenplan ändern

Pro Wochentag eine YAML-Datei. Ein Eintrag sieht so aus:

```yaml
  - studio: 3
    start: "16:00"
    end: "17:00"
    title: Ballett (ab 10)
    teacher: Karen
    levels: [1]
```

Beim Build wird jede Zeile geprüft: Uhrzeiten müssen `HH:MM` sein, das Ende nach dem
Beginn liegen, Studio 1–5, Level 0–3. Unbekannte Feldnamen brechen den Build — ein
Tippfehler fällt also auf, bevor er online geht.

Daraus entstehen automatisch:

- die filterbare Wochenübersicht auf `/stundenplan/`
- die Terminliste auf jeder Kursseite
- die Kurszuordnung auf `/team/`
- die Zahl „Kurstermine pro Woche“ auf der Startseite

Kommt ein neuer Stundenplan als PDF, genügt der Satz: *„Hier ist der neue
Stundenplan, bau ihn ein.“* Die KI liest das PDF und öffnet einen PR, in dem
genau die geänderten Zeilen stehen — und der Diff zeigt vor dem Merge, was sich
wirklich geändert hat.

### Neue News

Neue Datei in `src/content/news/`:

```markdown
---
title: Auftritt beim Sommerfest
date: 2026-09-20
kind: auftritt          # news | erfolg | auftritt | kurs
summary: Ein Satz für die Übersichtsseite.
---

Fließtext als Markdown.
```

### Neuer Kurs

Neue Datei in `src/content/courses/`. Wichtig ist `scheduleTitles` — damit
verbindet sich die Kursseite mit dem Stundenplan:

```markdown
---
title: Breakdance
summary: Kurzbeschreibung für Karten und Suchergebnisse.
discipline: tanz              # tanz | artistik
ages: ab 10 Jahren
scheduleTitles:               # exakt wie in schedule.ts
  - Breakdance
location: dance-drama         # dance-drama | moving-arts
order: 12
---

Beschreibungstext.
```

Jede Datei wird beim Build gegen ein Schema geprüft (`src/content.config.ts`).
Ein Tippfehler im Frontmatter bricht den Build — die Seite kann also nicht kaputt
online gehen.

---

## Gestaltung

Die Website folgt der bestehenden CI der Schule, nicht einer neuen:

- **Markenschwarz `#241f21`** — aus der Wortmarke abgenommen
- **Signalrot `#ff0000`** — wie die Level-Markierungen im gedruckten Stundenplan
- **Weiß**

Mehr Farben hat die CI nicht; alles Weitere sind Abstufungen desselben Schwarz. Die
Farbigkeit kommt aus den Fotos. Die Tokens stehen gesammelt oben in
`src/styles/global.css`.

Logo, Signet und die Logos der Teilbereiche (Dance & Drama School, Moving Arts,
Company, e.V.) liegen in `src/assets/brand/`. Die Schrift **Oswald** wird unter
`public/fonts/` selbst ausgeliefert — es gehen keine Daten an Google.

### Ein Foto austauschen

Bild nach `src/assets/photos/` legen (WebP, etwa 1600–2000 px breit) und in
`src/lib/photos.ts` dem Kurs-Slug zuordnen. Kurse ohne Foto bekommen automatisch eine
Platzhalterkarte mit dem Signet — es sieht also nie kaputt aus.

Für News steht das Bild im Frontmatter des Beitrags:

```markdown
image: buehne-traces
credit: Walter Hapke
```

## Formulare

Die Website ist vollständig statisch **bis auf eine Route**: `src/pages/api/form.ts`
(`export const prerender = false`). Sie nimmt alle Formulare entgegen —
Probestunde, Kontakt, FSJ-Bewerbung — und verschickt sie als E-Mail.

- Versand über **Brevo**, wo für den Newsletter ohnehin schon ein Konto besteht.
- Keine Datenbank: Die Angaben landen im E-Mail-Postfach, sonst nirgends.
- Schutz: Honeypot-Feld, Pflicht-Häkchen Datenschutz, Längenbegrenzung,
  Origin-Prüfung und Astros CSRF-Schutz.
- Ohne JavaScript funktionieren die Formulare als normales HTML-POST mit
  Redirect auf `/danke/`.

### Einrichten

```bash
npx wrangler secret put BREVO_API_KEY
```

Empfänger- und Absenderadresse stehen als `vars` in `wrangler.jsonc`.
Die Absenderdomain muss in Brevo verifiziert sein.

Lokal testen: `BREVO_API_KEY="..."` in eine Datei `.dev.vars` schreiben
(ist in `.gitignore`) und `npm run preview` starten.

---

## Deployment

```bash
npm run deploy     # astro build && wrangler deploy
```

Astro rendert alle Seiten vor; Cloudflare liefert sie direkt vom Edge aus. Der
Worker läuft ausschließlich für `/api/form` — jeder normale Seitenaufruf kostet
keinen Worker-Aufruf.

Sinnvoll für den Dauerbetrieb: Cloudflare mit dem Repository verbinden, sodass
jeder Merge nach `main` automatisch deployt. Dann ist ein gemergter PR gleich
eine veröffentlichte Änderung.

---

## Vor dem Livegang

- [ ] **Impressum vervollständigen** — Vorstand, Registergericht, Registernummer,
      inhaltlich Verantwortliche:r (`src/pages/impressum.astro`)
- [ ] **Datenschutzerklärung prüfen lassen** (`src/pages/datenschutz.astro`)
- [ ] **Stundenplan gegenlesen** — aus `Stundenplan-AUG-2026.pdf` übernommen,
      sollte einmal von der Schule bestätigt werden
- [ ] **Studio-Zuordnung bestätigen** — welche Studionummern liegen in der
      Carl-Zeiss-Straße 26, welche in der 18a?
- [ ] **Fotos für Bauchtanz und die inklusive Tanzgruppe** — für diese beiden Kurse
      fand sich im Medienarchiv kein passendes Bild; sie zeigen bis dahin eine
      Platzhalterkarte
- [ ] **Bildnachweise prüfen** — als Fotograf ist Walter Hapke genannt; bitte
      bestätigen und gegebenenfalls ergänzen
- [ ] **Brevo-Secret setzen** und einen Testversand durchführen
- [ ] **Weiterleitungen einrichten** — die alten `/index.php/...`-Adressen auf die
      neuen Adressen umbiegen, damit Google-Treffer und geteilte Links weiter
      funktionieren
- [ ] **Newsletter-Formular** von `/anmeldung-newsletter/` übernehmen, falls
      gewünscht (Brevo-Formular, läuft unverändert weiter)

---

## Was aus der alten Seite übernommen wurde

| Alt | Neu |
|---|---|
| `Stundenplan-AUG-2026.pdf` (Dropbox) | `/stundenplan/`, durchsuchbar und filterbar |
| `Preisliste_2026.pdf` (Dropbox) | `/preise/` als HTML |
| Elementor-Formulare | `src/pages/api/form.ts` |
| Newsletter (Brevo) | unverändert, läuft extern weiter |
| Shop, Spenden (betterplace) | unverändert, externe Links |
| Modern Events Calendar | entfallen — Termine laufen über News |
| Ultimate Member | entfallen — war ohne öffentliche Funktion |
| Borlabs Cookie | entfallen — es werden keine Cookies gesetzt |

---

## Stack

- [Astro](https://astro.build) — statische Ausgabe, eine dynamische Route
- [Cloudflare Workers](https://workers.cloudflare.com) mit statischen Assets
- [Brevo](https://www.brevo.com) für E-Mail-Versand
- Kein Framework, kein CSS-Framework, kein Build-Zauber — reines HTML und CSS
