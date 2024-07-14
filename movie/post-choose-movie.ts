import { ChooseMovieRequest, ListMovie } from './movie-types'
import postHistoryEvent from '@/event/post-history-event'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'

export default async function postChooseMovie (props: {
  body: ChooseMovieRequest
  label: string
}): Promise<HistoryEvent<ListMovie>> {
  return await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movie/choose'
  })
}
