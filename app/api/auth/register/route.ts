import { AuthBody } from '@/auth/auth-types'
import guardAuthBody from '@/auth/guard-auth-body'
import { User } from '@prisma/client'
import handlePostRegister from '@/auth/handle-post-register'
import { handleBody } from '@/handle/handle-body'

export async function POST (request: Request): Promise<Response> {
  return await handleBody<AuthBody, User>({
    guard: guardAuthBody,
    handle: handlePostRegister,
    label: '/auth/register',
    request
  })
}
