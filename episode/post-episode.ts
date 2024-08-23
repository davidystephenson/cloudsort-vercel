import post from '@/post/post'
import guardEpisodePayload from './guard-episode-payload'
import { MovieEpisode } from './episode-types'

export default async function postEpisode (props: {
  body: unknown
  label: string
  url: string
}): Promise<MovieEpisode> {
  const response = await post({
    request: props.body,
    guard: guardEpisodePayload,
    label: props.label,
    url: props.url
  })
  return response.episode
}
