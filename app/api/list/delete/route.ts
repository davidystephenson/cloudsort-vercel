import guardPostDeleteList from '@/list/guard-post-delete-list'
import { ListWhere } from '@/list/list-types'
import handlePostDeleteList from '@/list/handle-post-delete-list'
import { handleAuth } from '@/handle/handle-auth'
import { OkTrue } from '@/ok/ok-types'

export async function POST (request: Request): Promise<Response> {
  return await handleAuth<ListWhere, OkTrue>({
    guard: guardPostDeleteList,
    label: '/list/delete body',
    handle: handlePostDeleteList,
    request
  })
}
