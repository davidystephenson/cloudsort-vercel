import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import createMovies from './create-movies'
import guardPostMovies from './guard-post-movies'
import importItems from '@/mergechoice/importItems'

export default async function handlePostMovies (props: {
  request: Request
  label: string
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await createMovies({
        episodes: props.episodes,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.db
      })
      return episode
    },
    guard: guardPostMovies,
    label: props.label,
    request: props.request,
    snap: (props) => {
      if (props.historyEpisode.import == null) {
        throw new Error('There is no import')
      }
      const newState = importItems({
        items: props.historyEpisode.import.items,
        state: props.state
      })
      return newState
    }
  })
  return response
}
