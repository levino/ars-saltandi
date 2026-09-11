import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders'

/* ── gemeinsame Bausteine ────────────────────────────────────────────── */

const time = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Uhrzeit muss im Format HH:MM stehen, z. B. "16:00"')

const level = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])

const weekday = z.enum(['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'])

/* ── Kurse ───────────────────────────────────────────────────────────── */

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    /** Kurzer Teaser für Karten und Suchergebnisse */
    summary: z.string(),
    discipline: z.enum(['tanz', 'artistik']),
    /** Freitext, z. B. "ab 10 Jahren" */
    ages: z.string(),
    /** Titel exakt so, wie sie im Stundenplan stehen — stellt die Verbindung her */
    scheduleTitles: z.array(z.string()).default([]),
    location: z.enum(['dance-drama', 'moving-arts']),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
})

/* ── Dozent:innen ────────────────────────────────────────────────────── */

const teachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
  schema: z.object({
    name: z.string(),
    /** Vorname, wie er im Stundenplan steht */
    scheduleName: z.string(),
    role: z.string().default('Dozent:in'),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
})

/* ── News ────────────────────────────────────────────────────────────── */

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    kind: z.enum(['news', 'erfolg', 'auftritt', 'kurs']).default('news'),
    draft: z.boolean().default(false),
  }),
})

/* ── Stundenplan ─────────────────────────────────────────────────────── */

const schedule = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/schedule' }),
  schema: z
    .object({
      day: weekday,
      /** Reihenfolge der Wochentage */
      order: z.number().int().min(1).max(5),
      slots: z.array(
        z
          .object({
            studio: z.number().int().min(1).max(5),
            start: time,
            end: time,
            title: z.string().min(1),
            teacher: z.string().optional(),
            levels: z.array(level).nonempty().optional(),
            /** Leistungsgruppe des Fördersystems — Teilnahme nach Auswahl */
            selectionOnly: z.boolean().default(false),
            /** interne Gruppe, keine offene Anmeldung */
            internal: z.boolean().default(false),
            /** freier Hinweis, z. B. "Start 28.08." */
            note: z.string().optional(),
          })
          .refine((s) => s.start < s.end, {
            message: 'Ende muss nach dem Beginn liegen',
            path: ['end'],
          }),
      ),
    })
    .strict(),
})

/* ── Freie Plätze ────────────────────────────────────────────────────── */

const freeSpots = defineCollection({
  loader: file('./src/content/freie-plaetze.yaml', {
    parser: (text) => parseListFile(text, 'spots'),
  }),
  schema: z.object({
    teacher: z.string(),
    text: z.string(),
    isNew: z.boolean().default(false),
  }),
})

/* ── Preise ──────────────────────────────────────────────────────────── */

const prices = defineCollection({
  loader: file('./src/content/preise.yaml', {
    parser: (text) => {
      const data = parseYaml(text) as Record<string, unknown>
      return [{ id: 'preise', ...data }]
    },
  }),
  schema: z.object({
    note: z.string(),
    groups: z.array(
      z.object({
        title: z.string(),
        hint: z.string().optional(),
        items: z.array(z.object({ label: z.string(), price: z.string() })),
      }),
    ),
  }),
})

/* ── YAML-Hilfen ─────────────────────────────────────────────────────── */

import { parse as parseYaml } from 'yaml'

/** Liest eine Liste unter `key` und vergibt fortlaufende IDs. */
function parseListFile(text: string, key: string): Record<string, unknown>[] {
  const data = parseYaml(text) as Record<string, unknown[]>
  const list = data[key] ?? []
  return list.map((entry, i) => ({ id: String(i), ...(entry as Record<string, unknown>) }))
}

export const collections = { courses, teachers, news, schedule, freeSpots, prices }
