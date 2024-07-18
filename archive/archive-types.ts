import { EpisodeRequest } from '@/episode/episode-types'
import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export interface ArchiveRequest extends EpisodeRequest {
  archive: EpisodeArchive<ListMovie>
}
