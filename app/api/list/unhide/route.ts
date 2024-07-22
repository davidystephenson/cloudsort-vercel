import { handleAuth } from '@/handle/handle-auth'
import { OkTrueResponse } from '@/handle/handle-types'
import handleUnhideList from '@/hide/handle-unhide-list'
import guardListWhere from '@/list/guard-list-where'

export async function POST (request: Request): OkTrueResponse {
  const response = await handleAuth({
    guard: guardListWhere,
    label: '/list/delete body',
    handle: handleUnhideList,
    request
  })
  return response
}
