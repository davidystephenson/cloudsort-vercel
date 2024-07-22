import { ListWhere } from '@/list/list-types'
import { OkTrue } from '@/ok/ok-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'

export default async function unhideList (props: {
  authSession: Session
  body: ListWhere
  db: Db
}): Promise<OkTrue> {
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
