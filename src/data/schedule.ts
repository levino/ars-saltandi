/**
 * Wochenplan — Quelle: Stundenplan AUG 2026 (PDF).
 *
 * Diese Datei ist die neue Quelle der Wahrheit. Änderungen hier erscheinen
 * sofort auf /stundenplan, /kurse und auf jeder Dozent:innen-Seite.
 *
 * level: 0 = Einsteiger · 1 = Einsteiger mit Vorkenntnissen
 *        2 = fortgeschritten · 3 = sehr fortgeschritten
 * selectionOnly: Leistungsgruppen des Fördersystems — Teilnahme nach Auswahl.
 */

export type Weekday = 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag'
export type Level = 0 | 1 | 2 | 3

export interface Slot {
  day: Weekday
  studio: 1 | 2 | 3 | 4 | 5
  start: string
  end: string
  title: string
  teacher?: string
  levels?: Level[]
  /** Leistungsgruppe des Fördersystems — Teilnahme nach Auswahl */
  selectionOnly?: boolean
  /** Hinweis, z. B. "Start 28.08." */
  note?: string
  /** interner Kurs, nicht öffentlich buchbar */
  internal?: boolean
}

export const LEVEL_LABELS: Record<Level, string> = {
  0: 'Einsteiger',
  1: 'Einsteiger mit Vorkenntnissen',
  2: 'fortgeschritten',
  3: 'sehr fortgeschritten',
}

export const SELECTION_GROUPS =
  /^(ARS SALTANDI Company|Junior-Company|Vorstufe Junior Company|Aerial Company|Aerial Junior Company|Acro Company|Acro Junior Company|Rhönrad Company|Mini-Talente|Pre-Talente)$/

export const slots: Slot[] = [
  // ───────────────────────── MONTAG ─────────────────────────
  { day: 'Montag', studio: 1, start: '15:00', end: '16:00', title: 'ARS SALTANDI (5 u. 6)', teacher: 'Christine' },
  { day: 'Montag', studio: 1, start: '16:00', end: '17:00', title: 'ARS SALTANDI (7-9)', teacher: 'Christine' },
  { day: 'Montag', studio: 1, start: '17:00', end: '18:00', title: 'Tanzakrobatik (ab 10)', teacher: 'Christine' },
  { day: 'Montag', studio: 1, start: '18:00', end: '19:00', title: 'ARS SALTANDI (ab 13)', teacher: 'Christine' },
  { day: 'Montag', studio: 1, start: '19:00', end: '20:00', title: 'Ballett (E)', teacher: 'Karen', levels: [3] },
  { day: 'Montag', studio: 1, start: '20:00', end: '21:00', title: 'Jazz (E)', teacher: 'Katrin', levels: [3] },

  { day: 'Montag', studio: 2, start: '17:00', end: '18:00', title: 'Modern Tap', teacher: 'Karen' },
  { day: 'Montag', studio: 2, start: '18:30', end: '20:00', title: 'Bauchtanz', teacher: 'Sabine' },
  { day: 'Montag', studio: 2, start: '20:00', end: '21:00', title: 'Bauchtanz', teacher: 'Sabine' },

  { day: 'Montag', studio: 3, start: '16:00', end: '17:00', title: 'Ballett (ab 10)', teacher: 'Karen' },
  { day: 'Montag', studio: 3, start: '17:30', end: '18:00', title: 'Spitzentanz', teacher: 'Katrin' },
  { day: 'Montag', studio: 3, start: '18:00', end: '19:00', title: 'Ballett', teacher: 'Karen', levels: [2] },

  { day: 'Montag', studio: 4, start: '10:00', end: '11:00', title: 'Rhönrad', teacher: 'Larissa' },
  { day: 'Montag', studio: 4, start: '14:00', end: '15:00', title: 'Rhönrad', teacher: 'Larissa', levels: [0] },
  { day: 'Montag', studio: 4, start: '15:00', end: '16:00', title: 'Aerial Minis (6-8)', teacher: 'Larissa' },
  { day: 'Montag', studio: 4, start: '16:00', end: '17:00', title: 'Luftartistik (8-10)', teacher: 'Larissa' },
  { day: 'Montag', studio: 4, start: '17:00', end: '18:00', title: 'Rhönrad', teacher: 'Larissa', levels: [1] },
  { day: 'Montag', studio: 4, start: '18:00', end: '19:00', title: 'Rhönrad', teacher: 'Larissa', levels: [2] },
  { day: 'Montag', studio: 4, start: '19:00', end: '20:00', title: 'Rhönrad', teacher: 'Larissa', levels: [0, 1, 2, 3] },
  { day: 'Montag', studio: 4, start: '20:00', end: '21:00', title: 'Cyr Wheel', teacher: 'Larissa', levels: [0, 1, 2, 3] },

  { day: 'Montag', studio: 5, start: '15:00', end: '16:00', title: 'Acro & Aerial', teacher: 'Jolanda', levels: [0, 1] },
  { day: 'Montag', studio: 5, start: '16:00', end: '17:00', title: 'Vertikaltuch', teacher: 'Jolanda', levels: [2] },
  { day: 'Montag', studio: 5, start: '17:15', end: '18:15', title: 'Trapez & Hoop (ab 8)', teacher: 'Jolanda' },
  { day: 'Montag', studio: 5, start: '18:15', end: '19:15', title: 'Bühnenpräsenz', teacher: 'Katrin', levels: [0, 1, 2, 3], note: 'alle Level & Altersstufen' },

  // ───────────────────────── DIENSTAG ─────────────────────────
  { day: 'Dienstag', studio: 1, start: '15:00', end: '16:00', title: 'ARS SALTANDI (5 u. 6)', teacher: 'Christine' },
  { day: 'Dienstag', studio: 1, start: '16:00', end: '17:00', title: 'Tanzakrobatik (ab 10)', teacher: 'Christine' },
  { day: 'Dienstag', studio: 1, start: '17:00', end: '18:00', title: 'Vorstufe Junior Company', teacher: 'Katrin', selectionOnly: true },
  { day: 'Dienstag', studio: 1, start: '18:00', end: '19:00', title: 'Junior-Company', teacher: 'Katrin', selectionOnly: true },
  { day: 'Dienstag', studio: 1, start: '19:00', end: '21:00', title: 'ARS SALTANDI Company', teacher: 'Katrin', selectionOnly: true },

  { day: 'Dienstag', studio: 2, start: '15:15', end: '16:00', title: 'Kreativer Tanz ab 3,5', teacher: 'Nina' },
  { day: 'Dienstag', studio: 2, start: '16:00', end: '16:45', title: 'Kreativer Tanz ab 3,5', teacher: 'Nina' },

  { day: 'Dienstag', studio: 3, start: '17:15', end: '18:15', title: 'ARS SALTANDI 12-15', teacher: 'Christine' },
  { day: 'Dienstag', studio: 3, start: '18:15', end: '19:15', title: 'Contemporary (J+E)', teacher: 'Christine', levels: [1] },

  { day: 'Dienstag', studio: 4, start: '15:00', end: '16:00', title: 'Artistik', teacher: 'Jolanda', levels: [0, 1] },
  { day: 'Dienstag', studio: 4, start: '16:00', end: '17:00', title: 'Acro & Aerial', teacher: 'Jolanda', levels: [2, 3] },
  { day: 'Dienstag', studio: 4, start: '17:00', end: '18:00', title: 'Vertikaltuch', teacher: 'Jolanda', levels: [1] },
  { day: 'Dienstag', studio: 4, start: '18:00', end: '19:00', title: 'Vertikaltuch', teacher: 'Jolanda', levels: [0] },
  { day: 'Dienstag', studio: 4, start: '19:30', end: '20:30', title: 'Rhönrad', teacher: 'Larissa' },
  { day: 'Dienstag', studio: 4, start: '20:30', end: '21:30', title: 'Rhönrad', teacher: 'Larissa', levels: [0, 1, 2, 3] },

  { day: 'Dienstag', studio: 5, start: '15:00', end: '16:00', title: 'Tanzakrobatik (7-9)', teacher: 'Pia' },
  { day: 'Dienstag', studio: 5, start: '16:00', end: '17:00', title: 'ARS SALTANDI (ab 10)', teacher: 'Pia' },
  { day: 'Dienstag', studio: 5, start: '17:00', end: '18:00', title: 'ARS SALTANDI (ab 10)', teacher: 'Pia' },
  { day: 'Dienstag', studio: 5, start: '18:00', end: '19:00', title: 'ARS SALTANDI (J&E)', teacher: 'Pia' },
  { day: 'Dienstag', studio: 5, start: '19:00', end: '20:00', title: 'Vertikaltuch', teacher: 'Tina', levels: [2] },
  { day: 'Dienstag', studio: 5, start: '20:00', end: '21:00', title: 'Vertikaltuch (E)', teacher: 'Tina' },

  // ───────────────────────── MITTWOCH ─────────────────────────
  { day: 'Mittwoch', studio: 1, start: '15:00', end: '16:00', title: 'ARS SALTANDI (5 u. 6)', teacher: 'Christine' },
  { day: 'Mittwoch', studio: 1, start: '16:00', end: '17:00', title: 'ARS SALTANDI (7-9)', teacher: 'Christine' },
  { day: 'Mittwoch', studio: 1, start: '17:00', end: '18:00', title: 'Tanzakrobatik (ab 12)', teacher: 'Christine', levels: [2] },
  { day: 'Mittwoch', studio: 1, start: '18:00', end: '19:00', title: 'ARS SALTANDI ab 13', teacher: 'Christine' },
  { day: 'Mittwoch', studio: 1, start: '19:15', end: '20:45', title: 'Modern Dance', teacher: 'Katrin', levels: [3] },

  { day: 'Mittwoch', studio: 2, start: '17:25', end: '17:55', title: 'Spitzentanz', teacher: 'Katrin' },

  { day: 'Mittwoch', studio: 3, start: '16:00', end: '17:00', title: 'Inklusive Tanzgruppe' },
  { day: 'Mittwoch', studio: 3, start: '17:15', end: '18:15', title: 'HipHop', teacher: 'Pia', levels: [1] },
  { day: 'Mittwoch', studio: 3, start: '18:15', end: '19:15', title: 'HipHop Masterclass', teacher: 'Pia' },
  { day: 'Mittwoch', studio: 3, start: '19:15', end: '20:15', title: 'Dancehall (ab 16)', teacher: 'Isabell' },

  { day: 'Mittwoch', studio: 4, start: '14:00', end: '15:00', title: 'Rhönrad', teacher: 'Larissa', levels: [0] },
  { day: 'Mittwoch', studio: 4, start: '15:00', end: '16:00', title: 'Vertikaltuch', levels: [0] },
  { day: 'Mittwoch', studio: 4, start: '16:00', end: '17:00', title: 'Aerial Junior Company', teacher: 'Doorke & Albertine', selectionOnly: true },
  { day: 'Mittwoch', studio: 4, start: '17:00', end: '18:00', title: 'Rhönrad', teacher: 'Larissa', levels: [2] },
  { day: 'Mittwoch', studio: 4, start: '18:00', end: '19:00', title: 'Rhönrad Company', teacher: 'Larissa', selectionOnly: true },
  { day: 'Mittwoch', studio: 4, start: '19:00', end: '20:00', title: 'Rhönrad Company', teacher: 'Larissa', selectionOnly: true },
  { day: 'Mittwoch', studio: 4, start: '20:00', end: '21:00', title: 'Cyr Wheel', teacher: 'Larissa', levels: [0, 1, 2, 3] },

  { day: 'Mittwoch', studio: 5, start: '15:00', end: '16:00', title: 'ARS SALTANDI (5 u. 6)', teacher: 'Pia' },
  { day: 'Mittwoch', studio: 5, start: '16:00', end: '17:00', title: 'ARS SALTANDI (7-9)', teacher: 'Pia' },
  { day: 'Mittwoch', studio: 5, start: '17:00', end: '18:00', title: 'Aerial Company', teacher: 'Doorke & Albertine', selectionOnly: true },
  { day: 'Mittwoch', studio: 5, start: '18:00', end: '19:00', title: 'Modern Dance', teacher: 'Katrin', levels: [2] },
  { day: 'Mittwoch', studio: 5, start: '19:00', end: '20:00', title: 'Akrobatik (J+E)', teacher: 'Luise' },

  // ───────────────────────── DONNERSTAG ─────────────────────────
  { day: 'Donnerstag', studio: 1, start: '15:00', end: '16:00', title: 'Tanzakrobatik (7-9)', teacher: 'Christine' },
  { day: 'Donnerstag', studio: 1, start: '16:00', end: '17:00', title: 'ARS SALTANDI (7-9)', teacher: 'Christine' },
  { day: 'Donnerstag', studio: 1, start: '17:00', end: '18:00', title: 'Tanzakrobatik (ab 10)', teacher: 'Christine', levels: [1] },
  { day: 'Donnerstag', studio: 1, start: '18:00', end: '19:30', title: 'Junior-Company', teacher: 'Katrin', selectionOnly: true },
  { day: 'Donnerstag', studio: 1, start: '19:30', end: '21:00', title: 'ARS SALTANDI Company', teacher: 'Katrin', selectionOnly: true },

  { day: 'Donnerstag', studio: 2, start: '17:00', end: '18:00', title: 'Bauchtanz', teacher: 'Sabine' },

  { day: 'Donnerstag', studio: 3, start: '17:00', end: '18:00', title: 'Modern Dance (E)', teacher: 'Katrin', levels: [1] },
  { day: 'Donnerstag', studio: 3, start: '18:00', end: '19:00', title: 'Ballett (J+E)', teacher: 'Christine', levels: [1] },
  { day: 'Donnerstag', studio: 3, start: '19:15', end: '20:15', title: 'Tanzfitness (J+E)', teacher: 'Elisabeth' },

  { day: 'Donnerstag', studio: 4, start: '15:00', end: '16:00', title: 'Vertikaltuch', teacher: 'Jolanda', levels: [1] },
  { day: 'Donnerstag', studio: 4, start: '16:00', end: '17:00', title: 'Artistik', teacher: 'Jolanda', levels: [2] },
  { day: 'Donnerstag', studio: 4, start: '17:00', end: '18:00', title: 'Artistik', teacher: 'Jolanda', levels: [3] },
  { day: 'Donnerstag', studio: 4, start: '18:00', end: '19:00', title: 'Vertikaltuch', teacher: 'Jolanda', levels: [3] },

  { day: 'Donnerstag', studio: 5, start: '15:00', end: '16:00', title: 'Akrobatik (ab 10)' },
  { day: 'Donnerstag', studio: 5, start: '16:00', end: '17:30', title: 'Acro Junior Company', selectionOnly: true },
  { day: 'Donnerstag', studio: 5, start: '17:30', end: '19:15', title: 'Acro Company', selectionOnly: true },
  { day: 'Donnerstag', studio: 5, start: '19:30', end: '20:45', title: 'Modern Dance', teacher: 'Christine', levels: [3] },

  // ───────────────────────── FREITAG ─────────────────────────
  { day: 'Freitag', studio: 1, start: '15:00', end: '16:00', title: 'Mini-Talente', teacher: 'Katrin', selectionOnly: true },
  { day: 'Freitag', studio: 1, start: '16:00', end: '17:00', title: 'Pre-Talente', teacher: 'Christine', selectionOnly: true },
  { day: 'Freitag', studio: 1, start: '17:00', end: '18:00', title: 'ARS SALTANDI (13-17)', teacher: 'Christine' },
  { day: 'Freitag', studio: 1, start: '18:00', end: '19:00', title: 'Contemporary Jazz (12-18)', teacher: 'Pia' },

  { day: 'Freitag', studio: 2, start: '15:00', end: '16:00', title: 'ARS SALTANDI ab 10', teacher: 'Christine', note: 'Start 28.08.' },
  { day: 'Freitag', studio: 2, start: '16:00', end: '17:00', title: 'Stepptanz J & E', teacher: 'Anne', levels: [2] },
  { day: 'Freitag', studio: 2, start: '17:00', end: '18:00', title: 'Stepptanz', teacher: 'Anne', internal: true },

  { day: 'Freitag', studio: 3, start: '15:00', end: '16:00', title: 'ARS SALTANDI (7-9)', teacher: 'Pia' },
  { day: 'Freitag', studio: 3, start: '16:00', end: '17:00', title: 'HipHop (12-15)', teacher: 'Pia' },
  { day: 'Freitag', studio: 3, start: '17:00', end: '18:00', title: 'HipHop (ab 16)', teacher: 'Pia' },

  { day: 'Freitag', studio: 4, start: '14:30', end: '15:30', title: 'Aerial Arts (6-8)', teacher: 'Larissa' },
  { day: 'Freitag', studio: 4, start: '15:30', end: '16:30', title: 'Aerial Dance', teacher: 'Larissa' },
  { day: 'Freitag', studio: 4, start: '16:45', end: '17:45', title: 'Aerial Yoga (J+E)', teacher: 'Tina', levels: [2] },

  { day: 'Freitag', studio: 5, start: '15:00', end: '16:00', title: 'Akrobatik', teacher: 'Ben', levels: [2] },
  { day: 'Freitag', studio: 5, start: '16:00', end: '17:00', title: 'Akrobatik', teacher: 'Ben', levels: [3] },
  { day: 'Freitag', studio: 5, start: '17:15', end: '18:15', title: 'Tumbling Airtrack ab 10', teacher: 'Gordon', levels: [1] },
  { day: 'Freitag', studio: 5, start: '18:15', end: '19:15', title: 'Tumbling Airtrack', teacher: 'Gordon', levels: [2] },
  { day: 'Freitag', studio: 5, start: '19:15', end: '20:15', title: 'Tumbling Airtrack', teacher: 'Gordon', levels: [3] },
]

/** Freie Plätze / neue Kurse — aus dem Stundenplan-PDF (Stand AUG 2026). */
export const freeSpots = [
  { teacher: 'Karen', text: 'Modern Tap, montags 17:00-18:00 Uhr' },
  { teacher: 'Katrin', text: 'Bühnenpräsenz, montags 18:15-19:15 Uhr' },
  { teacher: 'Pia', text: 'ARS SALTANDI (ab 10), dienstags 17:00-18:00 Uhr' },
  { teacher: 'Christine', text: 'ARS SALTANDI (ab 10), freitags 15:00-16:00 Uhr', isNew: true },
  { teacher: 'Jolanda', text: 'Artistik Level 0 + 1, dienstags 15:00-16:00 Uhr' },
]

export const WEEKDAYS: Weekday[] = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

export const toMinutes = (t: string): number => {
  const [h = '0', m = '0'] = t.split(':')
  return Number(h) * 60 + Number(m)
}

export const slotsByDay = (day: Weekday): Slot[] =>
  slots.filter((s) => s.day === day).sort((a, b) => toMinutes(a.start) - toMinutes(b.start) || a.studio - b.studio)

export const slotsForTeacher = (name: string): Slot[] =>
  slots.filter((s) => s.teacher?.includes(name))

/** Alle eindeutigen Kurstitel mit ihren Terminen. */
export const scheduleIndex = (): Map<string, Slot[]> => {
  const map = new Map<string, Slot[]>()
  for (const s of slots) {
    const list = map.get(s.title) ?? []
    list.push(s)
    map.set(s.title, list)
  }
  return map
}
