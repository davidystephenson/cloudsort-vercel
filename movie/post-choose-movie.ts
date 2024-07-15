import { MovieHistoryEvent } from '@/event/event-types'
import postHistoryEvent from '@/event/post-history-event'
import { ChooseMovieRequest } from './movie-types'

export default async function postChooseMovie (props: {
  body: ChooseMovieRequest
  label: string
}): Promise<MovieHistoryEvent> {
  const event = await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movie/choose'
  })
  return event
}
