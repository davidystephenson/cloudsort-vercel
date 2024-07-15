import { MovieHistoryEvent } from '@/event/event-types'
import postHistoryEvent from '@/event/post-history-event'
import { ImportMoviesRequest } from './movie-types'

export default async function postImportMovies (props: {
  body: ImportMoviesRequest
  label: string
}): Promise<MovieHistoryEvent> {
  const guarded = await postHistoryEvent({
    body: props.body,
    label: props.label,
    url: '/api/movies/import'
  })
  return guarded
}
