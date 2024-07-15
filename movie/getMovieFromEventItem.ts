import { CalculatedMovie } from './movie-types'
import { RelatedEventItem } from '@/event/event-types'

export default function getMovieFromEventItem (props: {
  eventItem: RelatedEventItem
}): CalculatedMovie {
  if (props.eventItem.item.movie == null) {
    throw new Error('There is no movie')
  }
  const movie: CalculatedMovie = {
    id: props.eventItem.item.id,
    imdbId: props.eventItem.item.movie.imdbId,
    name: props.eventItem.item.name,
    points: props.eventItem.points,
    seed: props.eventItem.seed ?? undefined,
    seeding: props.eventItem.seeding,
    url: props.eventItem.item.movie.url ?? undefined,
    year: props.eventItem.item.movie.year
  }
  return movie
}
