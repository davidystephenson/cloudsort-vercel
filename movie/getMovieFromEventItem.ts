import { CalculatedMovie } from './movie-types'
import { RelatedEpisodeItem } from '@/event/event-types'

export default function getMovieFromEpisodeItem (props: {
  episodeItem: RelatedEpisodeItem
}): CalculatedMovie {
  if (props.episodeItem.item.movie == null) {
    throw new Error('There is no movie')
  }
  const movie: CalculatedMovie = {
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
