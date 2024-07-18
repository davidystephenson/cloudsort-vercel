import { EpisodeResponse } from '@/episode/episode-types'
import handlePostMovies from '@/movie/handle-post-movies'

export async function POST (request: Request): Promise<EpisodeResponse> {
  const response = await handlePostMovies({ request, label: '/movies' })
  return response
}
