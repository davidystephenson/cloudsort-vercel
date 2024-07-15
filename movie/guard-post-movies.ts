import { CreateMoviesRequest } from './movie-types'
import guardNumber from '@/fashion-police/guard-number'
import guardMovieDataArray from './guard-movie-data-array'
import fashionPolice from '@/fashion-police/fashion-police'
import guardNumberNull from '@/fashion-police/guard-number-null'

export default function guardPostMovies (props: {
  label: string
  value: unknown
}): CreateMoviesRequest {
  const guards = {
    lastMergechoiceId: guardNumberNull,
    listId: guardNumber,
    movies: guardMovieDataArray
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
