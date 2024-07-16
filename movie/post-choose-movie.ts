import { MovieEpisode } from '@/event/event-types'
import postHistoryEpisode from '@/event/post-history-event'
import { ChooseMovieRequest } from './movie-types'

export default async function postChooseMovie (props: {
  body: ChooseMovieRequest
  label: string
}): Promise<MovieEpisode> {
  const episode = await postHistoryEpisode({
    body: props.body,
    label: props.label,
    url: '/api/movie/choose'
  })
  return episode
}
