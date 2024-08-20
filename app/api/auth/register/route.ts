import { AuthRequest } from '@/auth/auth-types'
import guardAuthBody from '@/auth/guard-auth-body'
import { User } from '@prisma/client'
import handlePostRegister from '@/auth/handle-post-register'
import { handleRequest } from '@/handle/handle-request'

export async function POST (request: Request): Promise<Response> {
  return await handleRequest<AuthRequest, User>({
    guard: guardAuthBody,
    handle: handlePostRegister,
    label: '/auth/register',
    request
  })
}
