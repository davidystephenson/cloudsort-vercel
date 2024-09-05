import post from '@/post/post'
import guardEpisodePayload from './guard-episode-payload'
import { MovieEpisode } from './episode-types'

export default async function postEpisode (props: {
  request: unknown
  label: string
  url: string
}): Promise<MovieEpisode> {
  const response = await post({
    request: props.request,
    guard: guardEpisodePayload,
    label: props.label,
    url: props.url
  })
  return response.episode
}
