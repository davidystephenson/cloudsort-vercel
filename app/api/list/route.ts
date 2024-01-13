import respondAuthError from '@/lib/auth/respond-auth-error'
import serverAuth from '@/lib/auth/server-auth'
import prisma from '@/lib/prisma/prisma'
import apiError from '@/lib/api/api-error'
import { NextResponse } from 'next/server'

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
    return apiError({ message: 'This list already exists', status: 409 })
  }
  const list = await prisma.list.create({
    data: {
      complete: false,
      name: body.name,
      userId: authSession.user.id
    }
  })
  return NextResponse.json(list)
}

export async function DELETE (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const body = await req.json()
  const list = await prisma.list.findFirst({
    where: {
      id: body.id,
      userId: authSession.user.id
    }
  })
  if (list == null) {
    return apiError({ message: 'This list does not exist', status: 404 })
  }
  await prisma.list.delete({
    where: {
      id: body.id
    }
  })
  return NextResponse.json(list)
}
