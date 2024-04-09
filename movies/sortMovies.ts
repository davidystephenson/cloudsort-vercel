import { MovieState } from '@/list/list-types'
import { CalculatedMovie } from '@/movie/movie-types'
import getItem from '../mergeChoice/getItem'
import getPoints from '../mergeChoice/getPoints'
import compareMovies from './compareMovies'

export default function sortMovies (props: {
  itemIds: number[]
  state: MovieState
  worseFirst?: boolean
}): CalculatedMovie[] {
  const calculatedMovies = props.itemIds.map((id) => {
    const movie = getItem({ itemId: id, items: props.state.items })
    const points = getPoints({ itemId: id, state: props.state })
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
