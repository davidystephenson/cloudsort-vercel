import { EpisodeResponse } from '@/episode/episode-types'
import handleRandom from '@/random/handle-random'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleRandom({ request, label: '/movie/archive' })
  return response
}
