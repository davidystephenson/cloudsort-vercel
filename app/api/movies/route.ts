import { handleAuth } from '@/handle/handle-auth'
import guardPostMovies from '@/movie/guard-post-movies'
import handlePostMovies from '@/movie/handle-post-movies'

export async function POST (request: Request): Promise<Response> {
  return await handleAuth({
    guard: guardPostMovies,
    label: '/api/movies body',
    handle: handlePostMovies,
    request
  })
}
