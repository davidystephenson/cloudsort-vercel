import guardPostDeleteList from '@/list/guard-post-delete-list'
import { handleAuthPost } from '@/post/handle-auth-post'
import { PostDeleteListBody } from '@/list/list-types'
import { Ok } from '@/respond/respond-types'
import handlePostDeleteList from '@/list/handle-post-delete-list'

export async function POST (request: Request): Promise<Response> {
  return await handleAuthPost<PostDeleteListBody, Ok>({
    guard: guardPostDeleteList,
    guardLabel: '/list/delete body',
    handle: handlePostDeleteList,
    request
  })
}
