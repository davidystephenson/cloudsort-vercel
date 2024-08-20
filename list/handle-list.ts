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
    request: ListWhere
    db: Db
    list: List
  }) => Promise<OkTrue>
  request: ListWhere
  db: Db
}): Promise<OkTrue> {
  const list = await props.db.list.findFirst({
    where: {
      id: props.request.listId,
      userId: props.authSession.user.id
    }
  })
  if (list == null) {
    throw new ApiError(404, 'This list does not exist')
  }
  const response = await props.handle({
    authSession: props.authSession,
    request: props.request,
    db: props.db,
    list
  })
  return response
}
