import { State } from '@/mergeChoice/mergeChoiceTypes'
import sortMovies from './sortMovies'
import { CalculatedMovie, ListMovie } from '../movie/movie-types'

export default function getSortedMovies (props: {
  state: State<ListMovie>
}): CalculatedMovie[] {
  const better = sortMovies({ ids: props.state.betterIds, state: props.state })
  const active = sortMovies({ ids: props.state.activeIds, state: props.state })
  const worse = sortMovies({ ids: props.state.worseIds, state: props.state })
  const reserve = sortMovies({ ids: props.state.reserveIds, state: props.state })
  return [
    ...better,
    ...active,
    ...worse,
    ...reserve
  ]
}
