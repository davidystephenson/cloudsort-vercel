import auth from '@/lib/auth/server-auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST (req: Request): Promise<Response> {
  const authSession = await auth()
  if (authSession == null) {
    const body = { error: 'There is no session' }
    const options = { status: 400 }
    return NextResponse.json(body, options)
  }
  const { name } = await req.json()
  const exists = await prisma.list.findFirst({
    where: {
      name,
      userId: authSession.user.id
    }
  })
  if (exists != null) {
    const body = { error: 'This list already exists' }
    const options = { status: 400 }
    return NextResponse.json(body, options)
  }
  const list = await prisma.list.create({
    data: {
      name,
      userId: authSession.user.id
    }
  })
  return NextResponse.json(list)
}
