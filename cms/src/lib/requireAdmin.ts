import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Guard for the custom /api/export-* routes. They read every record with the Local API,
 * which bypasses collection access rules, so the caller must be a logged-in admin.
 * The admin dashboard links send the session cookie, which payload.auth() reads.
 */
export async function requireAdmin(request: Request) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: request.headers })
  const isAdmin = Boolean(user && (user as { role?: string }).role === 'admin')

  const denied = isAdmin
    ? null
    : new Response(JSON.stringify({ error: 'Admin login required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      })

  return { payload, denied }
}
