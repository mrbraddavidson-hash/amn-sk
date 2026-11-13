import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const loginUrl = new URL('/admin/login', url.origin)
  
  const response = NextResponse.redirect(loginUrl, { status: 302 })
  
  // Forcefully expire the payload authentication cookie across all variations
  response.cookies.set('payload-token', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'lax',
  })

  response.cookies.delete('payload-token')

  return response
}
