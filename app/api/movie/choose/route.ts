import handleChoice from '@/choice/handle-choice'
import { EpisodeResponse } from '@/episode/episode-types'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleChoice({ request, label: '/movie/choose' })
  return response
}
