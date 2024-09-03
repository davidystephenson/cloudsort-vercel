import { MovieEpisode } from '@/episode/episode-types'
import { ImportMoviesRequest } from './movie-types'
import postEpisode from '@/episode/post-episode'

export default async function postImportMovies (props: {
  body: ImportMoviesRequest
  label: string
}): Promise<MovieEpisode> {
  const guarded = await postEpisode({
    request: props.body,
    label: props.label,
    url: '/api/movies/import'
  })
  return guarded
}
