import { MovieEpisode } from '@/episode/episode-types'
import { ChooseMovieRequest } from '../movie/movie-types'
import postEpisode from '@/episode/post-episode'

export default async function postChoice (props: {
  body: ChooseMovieRequest
  label: string
}): Promise<MovieEpisode> {
  const episode = await postEpisode({
    body: props.body,
    label: props.label,
    url: '/api/movie/choose'
  })
  return episode
}
