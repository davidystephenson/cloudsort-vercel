import guardServerAuth from '@/auth/guard-server-auth'
import { Session } from 'next-auth'
import { handleBody } from './handle-body'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Guard } from '@/fashion-police/fashionPoliceTypes'
import { HandledResponse } from './handle-types'

export async function handleAuth<Body, Result> (props: {
  guard: Guard<Body>
  label: string
  handle: (props: {
    authSession: Session
    body: Body
    tx: PrismaTransaction
  }) => Promise<Result>
  request: Request
}): HandledResponse<Result> {
  const response = await handleBody({
    guard: props.guard,
    label: props.label,
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
  return response
}
