import guardPostDeleteList from '@/list/guard-post-delete-list'
import { ListRequest } from '@/list/list-types'
import { Ok } from '@/respond/respond-types'
import handlePostDeleteList from '@/list/handle-post-delete-list'
import { handleAuth } from '@/handle/handle-auth'

export async function POST (request: Request): Promise<Response> {
  return await handleAuth<ListRequest, Ok>({
    guard: guardPostDeleteList,
    label: '/list/delete body',
    handle: handlePostDeleteList,
    request
  })
}
