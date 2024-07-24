import { handleAuth } from '@/handle/handle-auth'
import { HandledHistory } from '@/history/history-types'
import guardListWhere from '@/list/guard-list-where'
import guardRelatedList from '@/list/guard-related-list'
import listToHistory from '@/list/list-to-history'

export async function POST (request: Request): Promise<HandledHistory> {
  const response = await handleAuth({
    guard: guardListWhere,
    label: '/list/history',
    handle: async (props) => {
      const list = await guardRelatedList({
        db: props.db,
        listId: props.body.listId
      })
      const history = listToHistory({
        list
      })
      return { ok: true, history }
    },
    request
  })
  return response
}
