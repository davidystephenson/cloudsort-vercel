import { ListMovie, RemoveMovieRequest } from './movie-types'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import postHistoryEvent from '@/event/post-history-event'

export default async function postRemoveMovie (props: {
  body: RemoveMovieRequest
  label: string
}): Promise<HistoryEvent<ListMovie>> {
  const response = await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movie/remove'
  })
  return response
}
