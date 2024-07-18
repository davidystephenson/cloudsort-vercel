import guardImportMoviesRequest from '@/movie/guard-import-movies-request'
import { EpisodeResponse } from '@/episode/episode-types'
import createImportEpisode from '@/import/create-import-episode'
import handleEpisode from '@/episode/handle-episode'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleEpisode({
    guard: guardImportMoviesRequest,
    label: '/movie/import',
    create: async (props) => {
      const episode = await createImportEpisode({
        episodes: props.episodes,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.db
      })
      return episode
    },
    request
  })
  return response
}
