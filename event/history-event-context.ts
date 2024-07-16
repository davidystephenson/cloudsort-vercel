import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import contextCreator from 'context-creator'

const historyEventContext = contextCreator({
  name: 'event',
  useValue: (props: {
    event: HistoryEvent<ListMovie>
  }) => {
    const value = {
      event: props.event
    }
    return value
  }
})
export default historyEventContext
