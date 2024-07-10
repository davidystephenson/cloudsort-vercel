import { handleAuth } from '@/handle/handle-auth'
import guardPostList from '@/list/guard-post-list'
import handlePostList from '@/list/handle-post-list'

export async function POST (request: Request): Promise<Response> {
  return await handleAuth({
    guard: guardPostList,
    label: '/list body',
    handle: handlePostList,
    request
  })
}
