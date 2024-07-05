import { ApiError } from 'next/dist/server/api-utils'
import { DeleteListRequest } from './list-types'
import { Ok } from '@/respond/respond-types'
import { Session } from 'next-auth'
import { PrismaTransaction } from '@/prisma/prisma-types'

export default async function handlePostDeleteList (props: {
  authSession: Session
  body: DeleteListRequest
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
