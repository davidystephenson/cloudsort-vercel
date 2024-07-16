import { MovieEpisode } from '@/episode/episode-types'
import { RemoveMovieRequest } from './movie-types'
import postEpisode from '@/episode/post-episode'

export default async function postRemoveMovie (props: {
  body: RemoveMovieRequest
  label: string
}): Promise<MovieEpisode> {
  const response = await postEpisode({
    body: props.body,
    label: props.label,
    url: '/api/movie/remove'
  })
  return response
}
