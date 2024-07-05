import { ImportMoviesRequest } from './movie-types'
import guardNumberProp from '@/guard/guard-number-prop'
import guardObject from '@/guard/guard-object'
import guardMovieArrayProp from './guard-movie-array-prop'

export default function guardPostImportMovies (props: {
  label: string
  value: unknown
}): ImportMoviesRequest {
  const object = guardObject({
    label: props.label,
    value: props.value
  })
  const movies = guardMovieArrayProp({
    label: props.label,
    key: 'movies',
    value: object
  })
  const listId = guardNumberProp({
    key: 'listId',
    label: props.label,
    value: object
  })
  return {
    listId,
    movies
  }
}
