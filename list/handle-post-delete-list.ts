import { ApiError } from 'next/dist/server/api-utils'
import { ListWhere } from './list-types'
import { Session } from 'next-auth'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { OkTrue } from '@/ok/ok-types'

export default async function handlePostDeleteList (props: {
  authSession: Session
  body: ListWhere
  tx: PrismaTransaction
}): Promise<OkTrue> {
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
