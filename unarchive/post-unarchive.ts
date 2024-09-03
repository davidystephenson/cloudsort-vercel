import { MovieEpisode } from '@/episode/episode-types'
import postEpisode from '@/episode/post-episode'
import { UnarchiveRequest } from './unarchive-types'

export default async function postUnarchive (props: {
  body: UnarchiveRequest
  label: string
}): Promise<MovieEpisode> {
  const episode = await postEpisode({
    request: props.body,
    label: props.label,
    url: '/api/movie/unarchive'
  })
  return episode
}
