import { handleAuth } from '@/handle/handle-auth'
import { OkTrueResponse } from '@/handle/handle-types'
import handleHideList from '@/hide/handle-hide-list'
import guardListWhere from '@/list/guard-list-where'

export async function POST (request: Request): OkTrueResponse {
  const response = await handleAuth({
    guard: guardListWhere,
    label: '/list/delete body',
    handle: handleHideList,
    request
  })
  return response
}
