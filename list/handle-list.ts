import { OkTrue } from '@/ok/ok-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { ListWhere } from './list-types'
import { List } from '@prisma/client'

export default async function handleList (props: {
  authSession: Session
  handle: (props: {
    authSession: Session
    body: ListWhere
    db: Db
    list: List
  }) => Promise<OkTrue>
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
  const response = await props.handle({
    authSession: props.authSession,
    body: props.body,
    db: props.db,
    list
  })
  return response
}
