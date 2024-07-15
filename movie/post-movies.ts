import { MovieHistoryEvent } from '@/event/event-types'
import postHistoryEvent from '@/event/post-history-event'
import { CreateMoviesRequest } from './movie-types'

export default async function postMovies (props: {
  body: CreateMoviesRequest
  label: string
}): Promise<MovieHistoryEvent> {
  const response = await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movies'
  })
  return response
}
