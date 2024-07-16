import guardImportMoviesRequest from '@/movie/guard-import-movies-request'
import handleEpisode from '@/event/handle-event'
import { EpisodeResponse } from '@/event/event-types'
import createImportEpisode from '@/event/create-import-event'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleEpisode({
    guard: guardImportMoviesRequest,
    label: '/movie/import',
    createEpisode: async (props) => {
      const episode = await createImportEpisode({
        episodes: props.episodes,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.tx
      })
      return episode
    },
    request
  })
  return response
}
