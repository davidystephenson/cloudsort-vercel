import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import { State } from '@/mergechoice/mergeChoiceTypes'
import { CalculatedMovie, ListMovie } from './movie-types'

export default function getMovie (props: {
  movieId: number
  state: State<ListMovie>
}): CalculatedMovie {
  const archiveMovie = props.state.archive[props.movieId]
  if (archiveMovie != null) {
    const calculated = { ...archiveMovie, points: 0 }
    return calculated
  }
  const item = getCalculatedItem({
    itemId: props.movieId,
    state: props.state
  })
  return item
}
