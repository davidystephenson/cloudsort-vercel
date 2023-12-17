import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST (req: Request): Promise<Response> {
  const { email, theme } = await req.json()
  const exists = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (exists == null) {
    return NextResponse.json({ error: 'There is no user' }, { status: 404 })
  } else {
    const user = await prisma.user.update({
      where: {
        email
      },
      data: {
        theme
      }
    })
    return NextResponse.json(user)
  }
}
