import guardPostDeleteList from '@/list/guard-post-delete-list'
import { handleAuthPost } from '@/post/handle-auth-post'
import { DeleteListRequest } from '@/list/list-types'
import { Ok } from '@/respond/respond-types'
import handlePostDeleteList from '@/list/handle-post-delete-list'

export async function POST (request: Request): Promise<Response> {
  return await handleAuthPost<DeleteListRequest, Ok>({
    guard: guardPostDeleteList,
    guardLabel: '/list/delete body',
    handle: handlePostDeleteList,
    request
  })
}
