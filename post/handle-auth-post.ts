import guardServerAuth from '@/auth/guard-server-auth'
import { Session } from 'next-auth'
import { handlePost } from './handle-post'
import { PrismaTransaction } from '@/prisma/prisma-types'

export async function handleAuthPost<Body, Result> (props: {
  guard: (props: {
    label: string
    value: unknown
  }) => Body
  guardLabel: string
  handle: (props: {
    authSession: Session
    body: Body
    tx: PrismaTransaction
  }) => Promise<Result>
  request: Request
}): Promise<Response> {
  return await handlePost({
    guard: props.guard,
    guardLabel: props.guardLabel,
    handle: async (handleProps) => {
      const authSession = await guardServerAuth()
      return await props.handle({
        authSession,
        body: handleProps.body,
        tx: handleProps.transaction
      })
    },
    request: props.request
  })
}
