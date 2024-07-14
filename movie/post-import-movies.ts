import postHistoryEvent from '@/event/post-history-event'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { ImportMoviesRequest, ListMovie } from './movie-types'

export default async function postImportMovies (props: {
  body: ImportMoviesRequest
  label: string
}): Promise<HistoryEvent<ListMovie>> {
  const guarded = await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movies/import'
  })
  return guarded
}
