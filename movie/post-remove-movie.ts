import { MovieEpisode } from '@/event/event-types'
import postHistoryEpisode from '@/event/post-history-event'
import { RemoveMovieRequest } from './movie-types'

export default async function postRemoveMovie (props: {
  body: RemoveMovieRequest
  label: string
}): Promise<MovieEpisode> {
  const response = await postHistoryEpisode({
    body: props.body,
    label: props.label,
    url: '/api/movie/remove'
  })
  return response
}
