import { MovieEpisode } from '@/episode/episode-types'
import { RandomRequest } from './random-types'
import postEpisode from '@/episode/post-episode'

export default async function postRandom (props: {
  body: RandomRequest
  label: string
}): Promise<MovieEpisode> {
  const episode = await postEpisode({
    request: props.body,
    label: props.label,
    url: '/api/list/random'
  })
  return episode
}
