import { RankingPayload } from './rankingTypes'
import post from '@/post/post'
import policeRankingPayload from './policeRankingPayload'

export default async function postRanking (props: {
  label: string
  listId: number
}): Promise<RankingPayload> {
  const body = { listId: props.listId }
  const response = await post({
    request: body,
    guard: policeRankingPayload,
    label: props.label,
    url: '/api/list/ranking'
  })
  return response
}
