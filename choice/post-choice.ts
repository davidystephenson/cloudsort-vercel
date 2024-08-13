import { MovieEpisode } from '@/episode/episode-types'
import { MovieChoiceRequest } from '../movie/movie-types'
import postEpisode from '@/episode/post-episode'

export default async function postChoice (props: {
  request: MovieChoiceRequest
  label: string
}): Promise<MovieEpisode> {
  const episode = await postEpisode({
    body: props.request,
    label: props.label,
    url: '/api/movie/choice'
  })
  return episode
}
