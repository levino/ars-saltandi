/**
 * Hilfsfunktionen rund um den Stundenplan.
 *
 * Die Daten selbst liegen als Content Collection in src/content/schedule/*.yaml
 * und werden beim Build gegen das Schema in src/content.config.ts geprüft.
 * Dieses Modul enthält nur Typen und Logik — keine Inhalte.
 */
import { getCollection } from 'astro:content'

export type Weekday = 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag'
export type Level = 0 | 1 | 2 | 3

/** Ein Kurstermin, angereichert um den Wochentag seiner Datei. */
export interface Slot {
  day: Weekday
  studio: number
  start: string
  end: string
  title: string
  teacher?: string
  levels?: Level[]
  selectionOnly: boolean
  internal: boolean
  note?: string
}

export const WEEKDAYS: Weekday[] = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

export const LEVEL_LABELS: Record<Level, string> = {
  0: 'Einsteiger',
  1: 'Einsteiger mit Vorkenntnissen',
  2: 'fortgeschritten',
  3: 'sehr fortgeschritten',
}

export const toMinutes = (t: string): number => {
  const [h = '0', m = '0'] = t.split(':')
  return Number(h) * 60 + Number(m)
}

export const duration = (s: Slot): number => toMinutes(s.end) - toMinutes(s.start)

/** Alle Termine der Woche, sortiert nach Tag, Uhrzeit und Studio. */
export async function getSlots(): Promise<Slot[]> {
  const days = await getCollection('schedule')
  return days
    .sort((a, b) => a.data.order - b.data.order)
    .flatMap((day) => day.data.slots.map((slot) => ({ ...slot, day: day.data.day })))
    .sort(
      (a, b) =>
        WEEKDAYS.indexOf(a.day) - WEEKDAYS.indexOf(b.day) ||
        toMinutes(a.start) - toMinutes(b.start) ||
        a.studio - b.studio,
    )
}

/** Termine gruppiert nach Wochentag, in Wochenreihenfolge. */
export async function getSlotsByDay(): Promise<{ day: Weekday; slots: Slot[] }[]> {
  const slots = await getSlots()
  return WEEKDAYS.map((day) => ({ day, slots: slots.filter((s) => s.day === day) }))
}

/** Alle Dozent:innen-Namen, die im Stundenplan vorkommen. */
export const teacherNames = (slots: Slot[]): string[] =>
  [...new Set(slots.map((s) => s.teacher).filter((t): t is string => Boolean(t)))].sort((a, b) =>
    a.localeCompare(b, 'de'),
  )

/** Termine einer Dozent:in — `Doorke` trifft auch `Doorke & Albertine`. */
export const slotsForTeacher = (slots: Slot[], scheduleName: string): Slot[] =>
  slots.filter((s) => s.teacher?.includes(scheduleName))

/** Termine zu den Stundenplan-Titeln eines Kurses. */
export const slotsForTitles = (slots: Slot[], titles: string[]): Slot[] => {
  const wanted = new Set(titles)
  return slots.filter((s) => wanted.has(s.title))
}

/** Titel der Leistungsgruppen (Company, Talente …), alphabetisch. */
export const selectionGroupTitles = (slots: Slot[]): string[] =>
  [...new Set(slots.filter((s) => s.selectionOnly).map((s) => s.title))].sort((a, b) =>
    a.localeCompare(b, 'de'),
  )
