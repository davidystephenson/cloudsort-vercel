import prisma from '@/lib/prisma/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST (req: Request): Promise<Response> {
  const { email, password } = await req.json()
  const exists = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (exists != null) {
    const body = { error: 'User already exists' }
    const options = { status: 400 }
    return NextResponse.json(body, options)
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10)
      }
    })
    return NextResponse.json(user)
  }
}
