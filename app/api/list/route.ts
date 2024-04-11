import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import respondError from '@/respond/respond-error'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const body = await req.json()
  const exists = await prisma.list.findFirst({
    where: {
      name: body.name,
      userId: authSession.user.id
    }
  })
  if (exists != null) {
    return respondError({ message: 'This list already exists', status: 409 })
  }
  const list = await prisma.list.create({
    data: {
      name: body.name,
      userId: authSession.user.id,
      seed: String(Math.random())
    }
  })
  return NextResponse.json(list)
}
