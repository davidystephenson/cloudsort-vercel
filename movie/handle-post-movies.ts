import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import createMovies from './create-movies'
import guardPostMovies from './guard-post-movies'

export default async function handlePostMovies (props: {
  request: Request
  label: string
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    guard: guardPostMovies,
    label: props.label,
    create: async (props) => {
      const episode = await createMovies({
        episodes: props.episodes,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.db
      })
      return episode
    },
    request: props.request
  })
  return response
}
