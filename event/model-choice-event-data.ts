import { HistoryChoiceData } from '@/mergeChoice/mergeChoiceTypes'
import { RelatedEvent } from './event-types'
import { ListMovie } from '@/movie/movie-types'
import modelEventMovie from './model-event-movie'

export default function modelChoiceEventData (props: {
  event: RelatedEvent
}): HistoryChoiceData<ListMovie> {
  if (props.event.choice == null) {
    throw new Error('There is no archive')
  }
  const movieA = modelEventMovie({ eventItem: props.event.choice.aEventItem })
  const movieB = modelEventMovie({ eventItem: props.event.choice.bEventItem })
  const data = {
    aBetter: props.event.choice.aBetter,
    aId: movieA.id,
    aItem: movieA,
    betterIndex: props.event.choice.betterIndex,
    bId: movieB.id,
    bItem: movieB,
    random: props.event.choice.random,
    seeded: props.event.choice.seeded
  }
  return data
}
