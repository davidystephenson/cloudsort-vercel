import { HistoryArchiveData } from '@/mergeChoice/mergeChoiceTypes'
import { RelatedEvent } from './event-types'
import { ListMovie } from '@/movie/movie-types'
import modelEventMovie from './model-event-movie'

export default function modelArchiveEventData (props: {
  event: RelatedEvent
}): HistoryArchiveData<ListMovie> {
  if (props.event.archive == null) {
    throw new Error('There is no archive')
  }
  if (props.event.archive.eventItem.item.movie == null) {
    throw new Error('There is no movie')
  }
  const movie = modelEventMovie({ eventItem: props.event.archive.eventItem })
  const data = {
    item: movie
  }
  return data
}
