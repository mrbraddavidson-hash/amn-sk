// Turns the CMS rich-text body (Lexical JSON) into HTML. Covers what editors use: paragraphs,
// headings, bullet and numbered lists, quotes, bold, italic, underline, code and links.
// All text is escaped, so nothing from the CMS is inserted as raw HTML.

type RichNode = {
  type?: string
  text?: string
  format?: number
  tag?: string
  listType?: string
  children?: RichNode[]
  fields?: { url?: string }
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function inline(nodes: RichNode[] = []): string {
  return nodes
    .map((n) => {
      if (n.type === 'linebreak') return '<br>'
      if (n.type === 'link') {
        const href = esc(n.fields?.url || '#')
        return `<a href="${href}" class="text-sky-700 underline">${inline(n.children)}</a>`
      }
      if (n.type === 'text') {
        let s = esc(n.text || '')
        const f = n.format || 0
        if (f & 16) s = `<code>${s}</code>`
        if (f & 1) s = `<strong>${s}</strong>`
        if (f & 2) s = `<em>${s}</em>`
        if (f & 8) s = `<u>${s}</u>`
        return s
      }
      return inline(n.children)
    })
    .join('')
}

function block(n: RichNode): string {
  switch (n.type) {
    case 'heading': {
      const tag = /^h[1-6]$/.test(n.tag || '') ? n.tag! : 'h2'
      return `<${tag} class="text-xl font-bold text-slate-900 mt-8 mb-3">${inline(n.children)}</${tag}>`
    }
    case 'list': {
      const ordered = n.listType === 'number'
      const tag = ordered ? 'ol' : 'ul'
      const style = ordered ? 'list-decimal' : 'list-disc'
      return `<${tag} class="${style} pl-6 mb-4 space-y-2">${(n.children || []).map(block).join('')}</${tag}>`
    }
    case 'listitem':
      return `<li>${inline(n.children)}</li>`
    case 'quote':
      return `<blockquote class="border-l-4 border-amber-400 pl-4 italic text-slate-700 mb-4">${inline(n.children)}</blockquote>`
    default:
      return `<p class="mb-4">${inline(n.children)}</p>`
  }
}

export function richTextToHtml(content: unknown): string {
  const children = (content as { root?: { children?: RichNode[] } } | null)?.root?.children
  if (!Array.isArray(children)) return ''
  return children.map(block).join('')
}

// Plain text (for example an event location) with any web address made clickable. Text is escaped first.
export function linkifyText(text: string): string {
  return esc(text).replace(/(https?:\/\/[^\s<]+)/g, (url) => `<a href="${url}" class="text-sky-700 underline break-all">${url}</a>`)
}
