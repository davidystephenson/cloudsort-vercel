import guardPropType from '@/fashion-police/guard-prop-type'
import guardMovieDataArray from './guard-movie-data-array'
import { MovieData } from './movie-types'

export default function guardMovieDataArrayProp (props: {
  key: string
  label: string
  value: object
}): MovieData[] {
  return guardPropType({
    guard: guardMovieDataArray,
    key: props.key,
    label: props.label,
    value: props.value
  })
}
