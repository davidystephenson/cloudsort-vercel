import guardPostList from '@/list/guard-post-list'
import handlePostList from '@/list/handle-post-list'
import { handleAuthPost } from '@/post/handle-auth-post'

export async function POST (request: Request): Promise<Response> {
  return await handleAuthPost({
    guard: guardPostList,
    guardLabel: '/list body',
    handle: handlePostList,
    request
  })
}
