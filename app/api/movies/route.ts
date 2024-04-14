import guardPostMovies from '@/movie/guard-post-movies'
import handlePostMovies from '@/movie/handle-post-movies'
import { handleAuthPost } from '@/post/handle-auth-post'

export async function POST (request: Request): Promise<Response> {
  return await handleAuthPost({
    guard: guardPostMovies,
    guardLabel: '/api/movies body',
    handle: handlePostMovies,
    request
  })
}
