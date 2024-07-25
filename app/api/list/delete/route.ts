import handlePostDeleteList from '@/list/handle-post-delete-list'
import { handleAuth } from '@/handle/handle-auth'
import { OkTrueResponse } from '@/handle/handle-types'
import guardListWhere from '@/list/guard-list-where'

export async function POST (request: Request): OkTrueResponse {
  const response = await handleAuth({
    guard: guardListWhere,
    label: '/list/delete',
    handle: handlePostDeleteList,
    request
  })
  return response
}
