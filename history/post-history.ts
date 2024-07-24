import post from '@/post/post'
import { ListHistory } from './history-types'
import policeHistoryResponse from './police-history-response'
import { ListWhere } from '@/list/list-types'

export default async function postHistory (props: {
  body: ListWhere
  label: string
}): Promise<ListHistory> {
  const response = await post({
    body: props.body,
    guard: policeHistoryResponse,
    label: props.label,
    url: '/api/list/history'
  })
  return response.history
}
