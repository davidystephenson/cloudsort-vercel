import { OkTrue } from '@/ok/ok-types'
import { PostShadeBody } from './shade-types'
import { Session } from 'next-auth'
import { Db } from '@/prisma/prisma-types'

export default async function handlePostShade (props: {
  authSession: Session
  request: PostShadeBody
  db: Db
}): Promise<OkTrue> {
  await props.db.user.update({
    where: {
      id: props.authSession.user.id
    },
    data: {
      shade: props.request.shade
    }
  })
  return { ok: true }
}
