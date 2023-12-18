import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

export async function POST (
  req: NextRequest
): Promise<Response> {
  const session = await getServerSession(authOptions)
  if (session == null) {
    const body = { error: 'There is no session' }
    const options = { status: 400 }
    return NextResponse.json(body, options)
  }
  const body = await req.json()
  const user = await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      theme: body.theme
    }
  })
  console.log('user', user)
  return NextResponse.json(user)
}
