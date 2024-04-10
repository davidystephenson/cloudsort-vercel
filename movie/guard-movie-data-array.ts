import guardObjectArrayType from '@/guard/guard-object-array-type'
import guardMovieData from './guard-movie-data'
import { MovieData } from './movie-types'

export default function guardMovieDataArray (props: {
  data: unknown
  label: string
}): MovieData[] {
  return guardObjectArrayType({
    data: props.data,
    guard: guardMovieData,
    label: props.label
  })
}
