import { CreateMoviesRequest } from './movie-types'
import guardNumber from '@/guard/guard-number'
import guardMovieDataArray from './guard-movie-data-array'
import guardModel from '@/guard/guard-model'

export default function guardPostMovies (props: {
  label: string
  value: unknown
}): CreateMoviesRequest {
  const guards = {
    lastMergechoiceId: guardNumber,
    listId: guardNumber,
    movies: guardMovieDataArray
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
