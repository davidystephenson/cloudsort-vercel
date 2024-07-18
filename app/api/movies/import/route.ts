import guardImportMoviesRequest from '@/movie/guard-import-movies-request'
import { EpisodeResponse } from '@/episode/episode-types'
import createImportEpisode from '@/import/create-import-episode'
import handleEpisode from '@/episode/handle-episode'

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
