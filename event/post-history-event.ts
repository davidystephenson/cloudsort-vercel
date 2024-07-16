import post from '@/post/post'
import guardHistoryEpisodeResponse from './guard-history-event-response'
import { MovieEpisode } from './event-types'

export default async function postHistoryEpisode (props: {
  body: unknown
  label: string
  url: string
}): Promise<MovieEpisode> {
  const response = await post({
    body: props.body,
    guard: guardHistoryEpisodeResponse,
    label: props.label,
    url: props.url
  })
  return response.episode
}
