import { ListMovie } from '@/movie/movie-types'
import { RelatedEventItem } from './event-types'
import { Calculated } from '@/mergeChoice/mergeChoiceTypes'

export default function modelEventMovie (props: {
  eventItem: RelatedEventItem
}): Calculated<ListMovie> {
  if (props.eventItem.item.movie == null) {
    throw new Error('There is no movie')
  }
  const movie = {
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
