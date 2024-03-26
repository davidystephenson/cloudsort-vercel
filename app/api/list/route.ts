import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import apiError from '@/api/api-error'
import { NextResponse } from 'next/server'
import guardDeleteList from '@/list/guard-delete-list'

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
      name: body.name,
      userId: authSession.user.id,
      seed: String(Math.random())
    }
  })
  return NextResponse.json(list)
}

export async function DELETE (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const data: unknown = await req.json()
  const body = guardDeleteList({ data })
  const list = await prisma.list.findFirst({
    where: {
      id: body.listId,
      userId: authSession.user.id
    }
  })
  if (list == null) {
    return apiError({ message: 'This list does not exist', status: 404 })
  }
  await prisma.list.delete({
    where: {
      id: body.listId
    }
  })
  return NextResponse.json(list)
}
