import { APIError, type PayloadRequest } from 'payload'

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const REFUSED = 'Please complete the security check and try again.'

/**
 * Checks the Cloudflare Turnstile token that a public form sends in the `Authorization` header.
 * Fails closed: if the secret is missing, the token is absent, or the check cannot be completed,
 * the request is refused.
 */
export async function requireTurnstile(req: PayloadRequest): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  // Sent as `Authorization: Turnstile <token>`: the CMS's CORS allow-list permits Authorization,
  // and Payload ignores schemes it does not recognise.
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Turnstile ') ? header.slice('Turnstile '.length).trim() : ''
  if (!secret || !token) throw new APIError(REFUSED, 400, undefined, true)

  const body = new URLSearchParams({ secret, response: token })
  const ip = req.headers.get('cf-connecting-ip')
  if (ip) body.set('remoteip', ip)

  let ok = false
  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body })
    const json = (await res.json()) as { success?: boolean }
    ok = json.success === true
  } catch {
    ok = false
  }
  if (!ok) throw new APIError(REFUSED, 400, undefined, true)
}
