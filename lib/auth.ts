import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Session, getServerSession } from 'next-auth'

export default async function auth (): Promise<Session | null> {
  return await getServerSession(authOptions)
}
