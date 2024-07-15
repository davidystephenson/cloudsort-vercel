import { MovieHistoryEvent } from '@/event/event-types'
import postHistoryEvent from '@/event/post-history-event'
import { RemoveMovieRequest } from './movie-types'

export default async function postRemoveMovie (props: {
  body: RemoveMovieRequest
  label: string
}): Promise<MovieHistoryEvent> {
  const response = await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movie/remove'
  })
  return response
}
