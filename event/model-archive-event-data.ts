import { HistoryArchiveData } from '@/mergeChoice/mergeChoiceTypes'
import { RelatedEpisode } from './event-types'
import { ListMovie } from '@/movie/movie-types'
import modelEpisodeMovie from './model-event-movie'

export default function modelArchiveEpisodeData (props: {
  episode: RelatedEpisode
}): HistoryArchiveData<ListMovie> {
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
