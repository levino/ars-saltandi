/**
 * Bildzuordnung.
 *
 * Die Fotos liegen in src/assets/photos und werden von Astro beim Build
 * optimiert (WebP, mehrere Größen, Lazy Loading). Hier steht nur, welches
 * Bild wozu gehört — so muss keine Seite einen Dateinamen kennen.
 *
 * Fotos: ARS SALTANDI e.V.; viele Bühnenfotos von Walter Hapke.
 */
import type { ImageMetadata } from 'astro'

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.webp', {
  eager: true,
})

const byName: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [
    path.split('/').pop()!.replace('.webp', ''),
    mod.default,
  ]),
)

export const photo = (name: string): ImageMetadata | undefined => byName[name]

/** Kurs-Slug → Foto. Kurse ohne Eintrag bekommen eine typografische Karte. */
export const coursePhotos: Record<string, string> = {
  'ars-saltandi': 'studio-training',
  ballett: 'ballett',
  contemporary: 'contemporary',
  hiphop: 'buehne-uebermut',
  tanzakrobatik: 'tanzakrobatik',
  stepptanz: 'stepptanz',
  'kreativer-tanz': 'studio-kinder',
  vertikaltuch: 'vertikaltuch',
  'trapez-hoop': 'trapez-hoop',
  aerial: 'aerial-minis',
  'cyr-wheel': 'cyr-wheel',
  artistik: 'artistik',
  akrobatik: 'akrobatik',
  tumbling: 'tumbling',
  rhoenrad: 'rhoenrad',
  tanzfitness: 'tanzfitness',
  buehnenpraesenz: 'buehne-traces',
}

/** Foto zu einem Kurs, falls hinterlegt. */
export const coursePhoto = (slug: string): ImageMetadata | undefined => {
  const name = coursePhotos[slug]
  return name ? photo(name) : undefined
}
