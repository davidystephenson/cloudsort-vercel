import { ApiError } from 'next/dist/server/api-utils'
import { ListRequest } from './list-types'
import { Session } from 'next-auth'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Ok } from '@/ok/ok-types'

export default async function handlePostDeleteList (props: {
  authSession: Session
  body: ListRequest
  tx: PrismaTransaction
}): Promise<Ok> {
  const list = await props.tx.list.findFirst({
    where: {
      id: props.body.listId,
      userId: props.authSession.user.id
    }
  })
  if (list == null) {
    throw new ApiError(404, 'This list does not exist')
  }
  await props.tx.list.delete({
    where: {
      id: props.body.listId
    }
  })
  return { ok: true }
}
