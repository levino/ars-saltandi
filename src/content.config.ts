import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    /** Kurzer Teaser für Karten und Suchergebnisse */
    summary: z.string(),
    /** tanz | artistik */
    discipline: z.enum(['tanz', 'artistik']),
    /** Freitext, z. B. "ab 10 Jahren", "5 – 17 Jahre" */
    ages: z.string(),
    /** Titel, wie sie im Stundenplan (src/data/schedule.ts) stehen */
    scheduleTitles: z.array(z.string()).default([]),
    location: z.enum(['dance-drama', 'moving-arts']),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
})

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

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    /** news | erfolg | auftritt | kurs */
    kind: z.enum(['news', 'erfolg', 'auftritt', 'kurs']).default('news'),
    draft: z.boolean().default(false),
  }),
})

export const collections = { courses, teachers, news }
