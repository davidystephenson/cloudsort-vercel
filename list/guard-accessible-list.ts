import serverAuth from '@/auth/server-auth'
import { List, PrismaClient } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'
import hasListAccess from './has-list-access'
import { PrismaTransaction } from '@/prisma/prisma-types'

export default async function guardAccessibleList (props: {
  currentUserId?: number
  db: PrismaClient | PrismaTransaction
  listId: number
}): Promise<List> {
  console.log('props.listId', props.listId)
  const list = await props.db.list.findUnique({
    where: { id: props.listId }
  })
  if (list == null) {
    throw new ApiError(404, 'List not found')
  }
  const authSession = await serverAuth()
  console.log('authSession?.user.id', authSession?.user.id)
  const accessible = hasListAccess({ currentUserId: authSession?.user.id, list })
  if (!accessible) {
    throw new ApiError(404, 'There is no list')
  }
  return list
}
