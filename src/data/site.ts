export const site = {
  name: 'ARS SALTANDI',
  tagline: 'Tanz. Artistik. Bühne.',
  description:
    'Tanz- und Artistikschule in Hildesheim: Ballett, HipHop, Contemporary, Tanzakrobatik, Vertikaltuch, Rhönrad, Cyr Wheel und mehr — für Kinder ab 3,5 Jahren bis Erwachsene.',
  email: 'info@arssaltandi.de',
  phone: '+49 5121 2065646',
  phoneDisplay: '05121 – 206 56 46',
  instagram: 'https://www.instagram.com/arssaltandi/',
  betterplace: 'https://www.betterplace.org/de/organisations/46283-ars-saltandi-e-v',
  shop: 'https://shop-ars-saltandi.arminasi.de/',
  newsletterAction:
    'https://bef57f2f.sibforms.com/serve/MUIEACVAiUIY93WhWtDsllFJbgw4SNBgaowBEVpuEV_v_tZGRNVhXPzmZ2_pshXMTZGtIAXhPHPS_2OZLOaBGan05laKUz__oKNGF3mX0iOlCnFHGfSU1zBL1g2Szab-WCDGoHZ6hlBXF8nn8kBdCq8C_O78ROQFS585GJslMJtx4J7AhYywS8v3qyRwE_TFXIvx0l742Z0Vz0Cb',
} as const

export const locations = [
  {
    id: 'dance-drama',
    name: 'Dance & Drama School',
    street: 'Carl-Zeiss-Straße 26',
    city: '31137 Hildesheim',
    blurb: 'Ballett, Jazz, Contemporary, HipHop, Stepptanz, Bauchtanz und die ARS-SALTANDI-Gruppen.',
  },
  {
    id: 'moving-arts',
    name: 'Moving Arts',
    street: 'Carl-Zeiss-Straße 18a',
    city: '31137 Hildesheim',
    blurb: 'Artistikstudio: Vertikaltuch, Trapez, Hoop, Rhönrad, Cyr Wheel, Akrobatik, Airtrack.',
  },
] as const

/** Preisliste 2026 — Quelle: Preisliste_2026.pdf. Preise pro Kurs und Monat. */
export const prices = {
  note: 'Die Preise gelten pro Kurs und Monat und setzen Bezahlung per Bankeinzug voraus. Bei Barzahlung oder Überweisung kommen wegen des höheren Verwaltungsaufwands 2,- € pro Kurs dazu.',
  groups: [
    {
      title: 'Tanz — erster Kurs',
      items: [
        { label: 'Kinder bis 5 Jahre (45 min)', price: '30,- €' },
        { label: 'Schüler*innen 5 – 17 Jahre', price: '35,- €' },
        { label: 'Erwachsene', price: '37,- €' },
      ],
    },
    {
      title: 'Tanz — weitere Kurse',
      hint: 'gilt nur für Tanz',
      items: [
        { label: 'als Zweitkurs', price: '25,- €' },
        { label: 'als Drittkurs', price: '15,- €' },
      ],
    },
    {
      title: 'Moving Arts / Artistikstudio',
      items: [
        { label: 'Erster Kurs', price: '37,- €' },
        { label: 'als Zweit-, Drittkurs etc.', price: '34,- €' },
        { label: 'Workshops', price: 'je nach Angebot' },
      ],
    },
  ],
} as const

export const nav = [
  { href: '/kurse/', label: 'Kurse' },
  { href: '/stundenplan/', label: 'Stundenplan' },
  { href: '/team/', label: 'Team' },
  { href: '/company/', label: 'Company' },
  { href: '/news/', label: 'News' },
  { href: '/verein/', label: 'Verein' },
  { href: '/kontakt/', label: 'Kontakt' },
] as const
