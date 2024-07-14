import { HistoryEvent, State } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function shiftEvent (props: {
  historyEvent: HistoryEvent<ListMovie>
  state: State<ListMovie>
}): State<ListMovie> {
  const newHistory = [props.historyEvent, ...props.state.history]
  const newState = { ...props.state, history: newHistory }
  return newState
}
