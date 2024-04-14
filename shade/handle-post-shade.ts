import { Ok } from '@/respond/respond-types'
import { PostShadeBody } from './shade-types'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Session } from 'next-auth'

export default async function handlePostShade (props: {
  authSession: Session
  body: PostShadeBody
  tx: PrismaTransaction
}): Promise<Ok> {
  await props.tx.user.update({
    where: {
      id: props.authSession.user.id
    },
    data: {
      shade: props.body.shade
    }
  })

  return { ok: true }
}
