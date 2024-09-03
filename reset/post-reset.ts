import { MovieEpisode } from '@/episode/episode-types'
import postEpisode from '@/episode/post-episode'
import { ResetRequest } from './reset-types'

export default async function postUnarchive (props: {
  body: ResetRequest
  label: string
}): Promise<MovieEpisode> {
  const episode = await postEpisode({
    request: props.body,
    label: props.label,
    url: '/api/movie/reset'
  })
  return episode
}
