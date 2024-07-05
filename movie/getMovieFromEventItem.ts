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
    seeding: props.eventItem.seeding,
    year: props.eventItem.item.movie.year
  }
  return movie
}
