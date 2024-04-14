import { handlePost } from '@/post/handle-post'
import { AuthBody } from '@/auth/auth-types'
import guardAuthBody from '@/auth/guard-auth-body'
import { User } from '@prisma/client'
import handlePostRegister from '@/auth/handle-post-register'

export async function POST (request: Request): Promise<Response> {
  return await handlePost<AuthBody, User>({
    guard: guardAuthBody,
    guardLabel: '/auth/register body',
    handle: handlePostRegister,
    request
  })
}
