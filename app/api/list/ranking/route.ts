import serverAuth from '@/auth/server-auth'
import { handleBody } from '@/handle/handle-body'
import { HandledResponse } from '@/handle/handle-types'
import guardAccessibleList from '@/list/guard-accessible-list'
import guardListWhere from '@/list/guard-list-where'
import guardRanking from '@/ranking/guardRanking'
import { RankingPayload } from '@/ranking/rankingTypes'

export async function POST (request: Request): HandledResponse<RankingPayload> {
  const response = await handleBody({
    guard: guardListWhere,
    label: '/list/ranking',
    handle: async (props) => {
      const authSession = await serverAuth()
      await guardAccessibleList({
        currentUserId: authSession?.user.id,
        db: props.db,
        listId: props.body.listId
      })
      const ranking = await guardRanking({
        db: props.db,
        listId: props.body.listId
      })
      return { ranking }
    },
    request
  })
  return response
}
