import { OkTrue } from '@/ok/ok-types'
import { PostShadeBody } from './shade-types'
import { Session } from 'next-auth'
import { Db } from '@/prisma/prisma-types'

export default async function handlePostShade (props: {
  authSession: Session
  body: PostShadeBody
  db: Db
}): Promise<OkTrue> {
  await props.db.user.update({
    where: {
      id: props.authSession.user.id
    },
    data: {
      shade: props.body.shade
    }
  })
  return { ok: true }
}
