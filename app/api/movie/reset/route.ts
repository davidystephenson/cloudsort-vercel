import { EpisodeResponse } from '@/episode/episode-types'
import handleReset from '@/reset/handle-reset'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleReset({ request, label: '/movie/reset' })
  return response
}
