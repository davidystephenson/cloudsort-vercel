import { EpisodeResponse } from '@/episode/episode-types'
import handleUnarchive from '@/unarchive/handle-unarchive'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleUnarchive({ request, label: '/movie/unarchive' })
  return response
}
