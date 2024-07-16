import { Episode, State } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function shiftEpisode (props: {
  historyEpisode: Episode<ListMovie>
  state: State<ListMovie>
}): State<ListMovie> {
  const newHistory = [props.historyEpisode, ...props.state.history]
  const newState = { ...props.state, history: newHistory }
  return newState
}
