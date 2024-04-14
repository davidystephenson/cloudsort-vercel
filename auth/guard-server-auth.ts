import { ApiError } from 'next/dist/server/api-utils'
import serverAuth from './server-auth'
import { Session } from 'next-auth'

export default async function guardServerAuth (): Promise<Session> {
  const authSession = await serverAuth()
  if (authSession == null) {
    throw new ApiError(401, 'There is no session')
  }
  return authSession
}
