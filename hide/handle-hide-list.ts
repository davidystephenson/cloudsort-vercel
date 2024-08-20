import { OkTrue } from '@/ok/ok-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'
import { ListWhere } from '../list/list-types'
import handleList from '../list/handle-list'

export default async function handleHideList (props: {
  authSession: Session
  request: ListWhere
  db: Db
}): Promise<OkTrue> {
  const response = await handleList({
    authSession: props.authSession,
    body: props.request,
    db: props.db,
    handle: async (props) => {
      await props.db.list.update({
        where: {
          id: props.body.listId
        },
        data: {
          hidden: false
        }
      })
      return { ok: true }
    }
  })
  return response
}
