import { handleAuth } from '@/handle/handle-auth'
import { OkTrueResponse } from '@/handle/handle-types'
import handleUnhideMovie from '@/hide/handle-unhide-movie'
import policeMovieWhere from '@/movie/police-movie-where'

export async function POST (request: Request): OkTrueResponse {
  const response = await handleAuth({
    guard: policeMovieWhere,
    label: '/movie/hide',
    handle: handleUnhideMovie,
    request
  })
  return response
}
