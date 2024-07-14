import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import post from '@/post/post'
import guardHistoryEvent from '@/event/guard-history-event'
import { ListMovie } from '@/movie/movie-types'

export default async function postHistoryEvent (props: {
  body: unknown
  label: string
  url: string
}): Promise<HistoryEvent<ListMovie>> {
  const response = await post({
    body: props.body,
    guard: guardHistoryEvent,
    label: props.label,
    url: props.url
  })
  return response
}
