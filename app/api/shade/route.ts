import { NextRequest } from 'next/server'
import guardPostShade from '@/shade/guard-post-shade'
import handlePostShade from '@/shade/handle-post-shade'
import { handleAuth } from '@/handle/handle-auth'

export async function POST (
  request: NextRequest
): Promise<Response> {
  return await handleAuth({
    guard: guardPostShade,
    label: '/shade body',
    handle: handlePostShade,
    request
  })
}
