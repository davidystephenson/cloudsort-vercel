import { OkTrue } from '@/ok/ok-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'
import { ListWhere } from './list-types'
import handleList from './handle-list'

export default async function handlePostDeleteList (props: {
  authSession: Session
  request: ListWhere
  db: Db
}): Promise<OkTrue> {
  const response = await handleList({
    authSession: props.authSession,
    request: props.request,
    db: props.db,
    handle: async (props) => {
      await props.db.list.delete({
        where: {
          id: props.request.listId
        }
      })
      return { ok: true }
    }
  })
  return response
}
