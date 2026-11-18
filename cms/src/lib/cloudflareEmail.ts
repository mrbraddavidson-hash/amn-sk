import type { EmailAdapter, SendEmailOptions } from 'payload'

/**
 * Payload email adapter for Cloudflare Email Sending (Workers `send_email` binding).
 * No API key: the Worker's binding is the credential, and the sender domain must be onboarded
 * to Email Sending in the Cloudflare account.
 */

type Recipient = { email: string; name?: string }

// Matches the shape of Cloudflare's `SendEmail` binding without depending on its exact overloads.
export type SendEmailBinding = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: (message: any) => Promise<unknown>
}

// "Name <a@b.c>", a bare address, or Nodemailer-style { address, name } -> { email, name }
function parseAddress(input: unknown): Recipient | null {
  if (!input) return null
  if (typeof input === 'object') {
    const o = input as { address?: string; email?: string; name?: string }
    const email = o.address || o.email
    return email ? { email, ...(o.name ? { name: o.name } : {}) } : null
  }
  const s = String(input).trim()
  const m = s.match(/^(.*)<([^<>]+)>$/)
  if (m) {
    const name = m[1].trim().replace(/^"|"$/g, '')
    return { email: m[2].trim(), ...(name ? { name } : {}) }
  }
  return s ? { email: s } : null
}

// Cloudflare's binding rejects an address object that has no `name` ("Incorrect type for the 'name'
// field on 'EmailAddress'"), even though the typings mark it optional. So: a plain address string
// when there is no display name, and { email, name } only when there is one.
function forBinding(r: Recipient): string | { email: string; name: string } {
  return r.name ? { email: r.email, name: r.name } : r.email
}

function toRecipients(input: unknown): Recipient[] {
  const items = Array.isArray(input) ? input : input ? [input] : []
  return items.flatMap((item) => {
    if (typeof item === 'string' && item.includes(',') && !item.includes('<')) {
      return item.split(',').map(parseAddress)
    }
    return [parseAddress(item)]
  }).filter((r): r is Recipient => Boolean(r))
}

// Plain-text alternative (some mail clients and spam filters expect one).
export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li)>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function cloudflareEmailAdapter(options: {
  binding: SendEmailBinding
  defaultFromAddress: string
  defaultFromName: string
  /** Where replies go (for example the Network's shared inbox). Optional. */
  replyTo?: string
}): EmailAdapter {
  const { binding, defaultFromAddress, defaultFromName, replyTo } = options

  return () => ({
    name: 'cloudflare-email',
    defaultFromAddress,
    defaultFromName,
    async sendEmail(message: SendEmailOptions) {
      const to = toRecipients(message.to)
      if (!to.length) throw new Error('Email has no recipient')

      const from = parseAddress(message.from) ?? { email: defaultFromAddress, name: defaultFromName }
      const html = typeof message.html === 'string' ? message.html : undefined
      const text = typeof message.text === 'string' ? message.text : html ? htmlToText(html) : undefined
      const reply = parseAddress(message.replyTo) ?? (replyTo ? { email: replyTo } : undefined)

      return binding.send({
        to: to.map(forBinding),
        from: forBinding(from),
        subject: String(message.subject ?? '').replace(/[\r\n]+/g, ' '),
        ...(html ? { html } : {}),
        ...(text ? { text } : {}),
        ...(reply ? { replyTo: forBinding(reply) } : {}),
      })
    },
  })
}
