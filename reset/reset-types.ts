import { EpisodeRequest } from '@/episode/episode-types'
import { EpisodeReset } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export interface ResetRequest extends EpisodeRequest {
  reset: EpisodeReset<ListMovie>
}
