import { MovieEpisode } from '@/event/event-types'
import postHistoryEpisode from '@/event/post-history-event'
import { ImportMoviesRequest } from './movie-types'

export default async function postImportMovies (props: {
  body: ImportMoviesRequest
  label: string
}): Promise<MovieEpisode> {
  const guarded = await postHistoryEpisode({
    body: props.body,
    label: props.label,
    url: '/api/movies/import'
  })
  return guarded
}
