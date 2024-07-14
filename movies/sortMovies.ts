import getItem from '../mergeChoice/getItem'
import getPoints from '../mergeChoice/getPoints'
import { ItemId, State } from '../mergeChoice/mergeChoiceTypes'
import { CalculatedMovie, ListMovie } from '../movie/movie-types'
import compareMovies from './compareMovies'

export default function sortMovies (props: {
  ids: ItemId[]
  state: State<ListMovie>
  worseFirst?: boolean
}): CalculatedMovie[] {
  const calculatedMovies = props.ids.map((itemId) => {
    const movie = getItem({ itemId, items: props.state.items })
    const points = getPoints({ itemId, state: props.state })
    return {
      ...movie,
      points
    }
  })
  calculatedMovies.sort((a, b) => {
    return compareMovies({
      a,
      b,
      worseFirst: props.worseFirst
    })
  })
  return calculatedMovies
}
