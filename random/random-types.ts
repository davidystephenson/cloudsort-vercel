import { EpisodeRequest } from '@/episode/episode-types'
import { EpisodeRandom } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export interface RandomRequest extends EpisodeRequest {
  random: EpisodeRandom<ListMovie>
}
