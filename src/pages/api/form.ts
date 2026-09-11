/**
 * Formular-Endpunkt — die einzige dynamische Route der Website.
 *
 * Alles andere ist vorgerendert und kommt direkt aus dem Edge-Cache; nur
 * dieser Handler läuft tatsächlich im Worker (`prerender = false`).
 *
 * Versand über Brevo — dort besteht bereits ein Konto für den Newsletter.
 * Secret setzen mit:  npx wrangler secret put BREVO_API_KEY
 */
import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'

export const prerender = false

/** Felder, die nur der Steuerung dienen und nicht in die E-Mail gehören. */
const CONTROL_FIELDS = new Set(['_subject', '_form', '_gotcha', 'datenschutz'])
const MAX_FIELD_LENGTH = 5000
const MAX_FIELDS = 30
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const escapeHtml = (s: string): string =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

export const POST: APIRoute = async ({ request, url, redirect }) => {
  const apiKey = env.BREVO_API_KEY
  const mailTo = env.MAIL_TO ?? 'info@arssaltandi.de'
  const mailFrom = env.MAIL_FROM ?? 'website@arssaltandi.de'
  const mailFromName = env.MAIL_FROM_NAME ?? 'ARS SALTANDI Website'

  // Nur Absendungen vom eigenen Formular annehmen.
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== url.host) {
    return new Response('Forbidden', { status: 403 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return redirect('/formular-fehler/', 303)
  }

  // Honeypot: ausgefüllt = Bot. Wir tun so, als sei alles gut.
  if (String(form.get('_gotcha') ?? '').trim()) return redirect('/danke/', 303)
  if (!form.get('datenschutz')) return redirect('/formular-fehler/', 303)

  const formName = String(form.get('_form') ?? 'Formular').slice(0, 100)
  const subject = String(form.get('_subject') ?? 'Nachricht über die Website').slice(0, 200)

  const entries: [string, string][] = []
  for (const [key, value] of form.entries()) {
    if (CONTROL_FIELDS.has(key) || typeof value !== 'string') continue
    const trimmed = value.trim()
    if (!trimmed) continue
    entries.push([key.slice(0, 100), trimmed.slice(0, MAX_FIELD_LENGTH)])
    if (entries.length >= MAX_FIELDS) break
  }
  if (entries.length === 0) return redirect('/formular-fehler/', 303)

  if (!apiKey) {
    console.error('BREVO_API_KEY fehlt — Formular kann nicht versendet werden.')
    return redirect('/formular-fehler/', 303)
  }

  const replyTo = entries.find(([k]) => /mail/i.test(k))?.[1]

  const html = [
    `<h2>${escapeHtml(formName)}</h2>`,
    '<table cellpadding="6" style="border-collapse:collapse">',
    ...entries.map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(k)}</strong></td>` +
        `<td style="border:1px solid #ddd">${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`,
    ),
    '</table>',
    '<p style="color:#888;font-size:12px">Gesendet über arssaltandi.de</p>',
  ].join('')

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { email: mailFrom, name: mailFromName },
      to: [{ email: mailTo }],
      subject,
      htmlContent: html,
      textContent: entries.map(([k, v]) => `${k}: ${v}`).join('\n'),
      ...(replyTo && EMAIL_RE.test(replyTo) ? { replyTo: { email: replyTo } } : {}),
    }),
  })

  if (!response.ok) {
    console.error('Brevo-Versand fehlgeschlagen', response.status, await response.text())
    return redirect('/formular-fehler/', 303)
  }

  return redirect('/danke/', 303)
}
