import { OkTrue } from '@/ok/ok-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'
import unhideList from './unhide-list'
import { ListWhere } from '@/list/list-types'
import handleList from '@/list/handle-list'

export default async function handleUnhideList (props: {
  authSession: Session
  request: ListWhere
  db: Db
}): Promise<OkTrue> {
  const response = await handleList({
    authSession: props.authSession,
    body: props.request,
    db: props.db,
    handle: unhideList
  })
  return response
}
