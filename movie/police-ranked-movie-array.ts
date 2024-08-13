import guardArrayType from '@/fashion-police/guard-array-type'
import { RankedMovie } from './movie-types'
import policeRankedMovie from './police-ranked-movie'

export default function policeRankedMovieArray (props: {
  label: string
  value: unknown
}): RankedMovie[] {
  const policed = guardArrayType({
    guard: policeRankedMovie,
    label: props.label,
    value: props.value
  })
  return policed
}
