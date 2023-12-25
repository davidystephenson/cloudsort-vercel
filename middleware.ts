import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware (req: NextRequest): Promise<NextResponse<unknown>> {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname

  // If it's the root path, just render it
  if (path === '/') {
    return NextResponse.next()
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })

  if ((session == null) && path === '/protected') {
    return NextResponse.redirect(new URL('/login', req.url))
  } else if ((session != null) && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/protected', req.url))
  }
  const next = NextResponse.next()
  return next
}
