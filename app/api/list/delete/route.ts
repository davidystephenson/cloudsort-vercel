import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import guardDeleteList from '@/list/guard-delete-list'
import respondError from '@/respond/respond-error'
import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const data: unknown = await req.json()
  const body = guardDeleteList({ label: '/list/delete body', value: data })
  const list = await prisma.list.findFirst({
    where: {
      id: body.listId,
      userId: authSession.user.id
    }
  })
  if (list == null) {
    return respondError({ message: 'This list does not exist', status: 404 })
  }
  await prisma.list.delete({
    where: {
      id: body.listId
    }
  })
  return NextResponse.json(list)
}
