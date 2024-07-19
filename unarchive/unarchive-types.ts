import { EpisodeRequest } from '@/episode/episode-types'
import { EpisodeUnarchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export interface UnarchiveRequest extends EpisodeRequest {
  unarchive: EpisodeUnarchive<ListMovie>
}
