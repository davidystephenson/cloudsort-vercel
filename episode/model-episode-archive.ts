import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { RelatedEpisode } from './episode-types'
import { ListMovie } from '@/movie/movie-types'
import modelEpisodeMovie from './model-episode-movie'

export default function modelEpisodeArchive (props: {
  episode: RelatedEpisode
}): EpisodeArchive<ListMovie> {
  if (props.episode.archive == null) {
    throw new Error('There is no archive')
  }
  if (props.episode.archive.episodeItem.item.movie == null) {
    throw new Error('There is no movie')
  }
  const movie = modelEpisodeMovie({ episodeItem: props.episode.archive.episodeItem })
  const data = {
    item: movie
  }
  return data
}
