import guardImportMoviesRequest from '@/movie/guard-import-movies-request'
import { EpisodeResponse } from '@/episode/episode-types'
import createImportEpisode from '@/import/create-import-episode'
import handleEpisode from '@/episode/handle-episode'
import importItems from '@/mergechoice/importItems'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await createImportEpisode({
        episodes: props.episodes,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.db
      })
      return episode
    },
    guard: guardImportMoviesRequest,
    label: '/movie/import',
    request,
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
