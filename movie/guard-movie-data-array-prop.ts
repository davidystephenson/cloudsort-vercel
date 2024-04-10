import guardPropType from '@/guard/guard-prop-type'
import guardMovieDataArray from './guard-movie-data-array'
import { MovieData } from './movie-types'

export default function guardMovieDataArrayProp (props: {
  data: object
  key: string
}): MovieData[] {
  return guardPropType({
    guard: guardMovieDataArray,
    data: props.data,
    key: props.key
  })
}
