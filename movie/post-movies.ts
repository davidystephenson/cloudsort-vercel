import { MovieEpisode } from '@/episode/episode-types'
import { CreateMoviesRequest } from './movie-types'
import postEpisode from '@/episode/post-episode'

export default async function postMovies (props: {
  body: CreateMoviesRequest
  label: string
}): Promise<MovieEpisode> {
  const response = await postEpisode({
    request: props.body,
    label: props.label,
    url: '/api/movies'
  })
  return response
}
