import { ListMovie } from '@/movie/movie-types'
import { RelatedEpisodeItem } from './episode-types'
import { Calculated } from '@/mergechoice/mergeChoiceTypes'

export default function modelEpisodeMovie (props: {
  episodeItem: RelatedEpisodeItem
}): Calculated<ListMovie> {
  if (props.episodeItem.item.movie == null) {
    throw new Error('There is no movie')
  }
  const movie = {
    id: props.episodeItem.item.id,
    imdbId: props.episodeItem.item.movie.imdbId,
    name: props.episodeItem.item.name,
    points: props.episodeItem.points,
    seed: props.episodeItem.seed ?? undefined,
    seeding: props.episodeItem.seeding,
    url: props.episodeItem.item.movie.url ?? undefined,
    year: props.episodeItem.item.movie.year
  }
  return movie
}
