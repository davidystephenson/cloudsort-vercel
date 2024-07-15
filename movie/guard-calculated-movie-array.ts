import guardArrayType from '@/fashion-police/guard-array-type'
import guardCalculatedMovie from './guard-calculated-movie'
import { CalculatedMovie } from './movie-types'

export default function guardCalculatedMovieArray (props: {
  label: string
  value: unknown
}): CalculatedMovie[] {
  const guarded = guardArrayType({
    guard: guardCalculatedMovie,
    label: props.label,
    value: props.value
  })
  return guarded
}
