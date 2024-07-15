import guardObjectArrayType from '@/fashion-police/guard-object-array-type'
import guardMovieData from './guard-movie-data'
import { MovieData } from './movie-types'

export default function guardMovieDataArray (props: {
  label: string
  value: unknown
}): MovieData[] {
  return guardObjectArrayType({
    guard: guardMovieData,
    label: props.label,
    value: props.value
  })
}
