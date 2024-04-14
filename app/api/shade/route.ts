import { NextRequest } from 'next/server'
import { handleAuthPost } from '@/post/handle-auth-post'
import guardPostShade from '@/shade/guard-post-shade'
import handlePostShade from '@/shade/handle-post-shade'

export async function POST (
  request: NextRequest
): Promise<Response> {
  return await handleAuthPost({
    guard: guardPostShade,
    guardLabel: '/shade body',
    handle: handlePostShade,
    request
  })
}
