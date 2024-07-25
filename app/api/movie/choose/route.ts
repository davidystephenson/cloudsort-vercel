import handleChoice from '@/choice/handle-choice'
import { EpisodeResponse } from '@/episode/episode-types'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleChoice({
    label: '/movie/choose',
    request
  })
  return response
}
