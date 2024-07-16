import { MovieEpisode } from '@/event/event-types'
import postHistoryEpisode from '@/event/post-history-event'
import { CreateMoviesRequest } from './movie-types'

export default async function postMovies (props: {
  body: CreateMoviesRequest
  label: string
}): Promise<MovieEpisode> {
  const response = await postHistoryEpisode({
    body: props.body,
    label: props.label,
    url: '/api/movies'
  })
  return response
}
