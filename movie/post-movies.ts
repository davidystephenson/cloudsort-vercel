import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { CreateMoviesRequest, ListMovie } from './movie-types'
import postHistoryEvent from '@/event/post-history-event'

export default async function postMovies (props: {
  body: CreateMoviesRequest
  label: string
}): Promise<HistoryEvent<ListMovie>> {
  const response = await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movies'
  })
  return response
}
