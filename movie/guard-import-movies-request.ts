import guardModel from '@/guard/guard-model'
import guardNumber from '@/guard/guard-number'
import { ImportMoviesRequest } from './movie-types'
import guardCalculatedMovieArray from './guard-calculated-movie-array'
import guardNumberNull from '@/guard/guard-number-null'

export default function guardImportMoviesRequest (props: {
  label: string
  value: unknown
}): ImportMoviesRequest {
  const guards = {
    movies: guardCalculatedMovieArray,
    lastMergechoiceId: guardNumberNull,
    listId: guardNumber
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
