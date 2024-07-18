import { OkTrue } from '@/ok/ok-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { ListWhere } from './list-types'

export default async function handlePostDeleteList (props: {
  authSession: Session
  body: ListWhere
  db: Db
}): Promise<OkTrue> {
  const list = await props.db.list.findFirst({
    where: {
      id: props.body.listId,
      userId: props.authSession.user.id
    }
  })
  if (list == null) {
    throw new ApiError(404, 'This list does not exist')
  }
  await props.db.list.delete({
    where: {
      id: props.body.listId
    }
  })
  return { ok: true }
}
