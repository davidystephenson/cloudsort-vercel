import handleArchive from '@/archive/handle-archive'
import { EpisodeResponse } from '@/episode/episode-types'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleArchive({ request, label: '/movie/archive' })
  return response
}
