import guardServerAuth from '@/auth/guard-server-auth'
import { Session } from 'next-auth'
import { handleBody } from './handle-body'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Guard } from '@/fashion-police/fashionPoliceTypes'
import { HandledResponse } from './handle-types'
import { PrismaClient } from '@prisma/client'

export async function handleAuth<Body, Result> (props: {
  guard: Guard<Body>
  label: string
  handle: (props: {
    authSession: Session
    body: Body
    db: PrismaTransaction | PrismaClient
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
        db: handleProps.db
      })
    },
    request: props.request
  })
  return response
}
