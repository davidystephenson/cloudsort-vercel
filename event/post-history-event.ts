import post from '@/post/post'
import guardHistoryEventResponse from './guard-history-event-response'
import { MovieHistoryEvent } from './event-types'

export default async function postHistoryEvent (props: {
  body: unknown
  label: string
  url: string
}): Promise<MovieHistoryEvent> {
  const response = await post({
    body: props.body,
    guard: guardHistoryEventResponse,
    label: props.label,
    url: props.url
  })
  return response.event
}
