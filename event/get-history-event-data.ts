import { HistoryData, HistoryDataKey } from '@/mergeChoice/mergeChoiceTypes'
import { EventDataModelers, RelatedEvent } from './event-types'
import { ListMovie } from '@/movie/movie-types'
import modelArchiveEventData from './model-archive-event-data'
import modelChoiceEventData from './model-choice-event-data'

export default function getHistoryEventData (props: {
  event: RelatedEvent
}): HistoryData<ListMovie> {
  const modelers: EventDataModelers = {
    archive: modelArchiveEventData,
    choice: modelChoiceEventData
  }
  let key: HistoryDataKey<ListMovie>
  for (key in modelers) {
    const data = props.event[key]
    if (data != null) {
      const modeler = modelers[key]
      const modeled = modeler({ event: props.event })
      return modeled
    }
  }

  throw new Error('Unknown event type')
}
