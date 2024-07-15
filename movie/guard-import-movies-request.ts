import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { ImportMoviesRequest } from './movie-types'
import guardCalculatedMovieArray from './guard-calculated-movie-array'
import guardNumberNull from '@/fashion-police/guard-number-null'

export default function guardImportMoviesRequest (props: {
  label: string
  value: unknown
}): ImportMoviesRequest {
  const guards = {
    movies: guardCalculatedMovieArray,
    lastMergechoiceId: guardNumberNull,
    listId: guardNumber
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
