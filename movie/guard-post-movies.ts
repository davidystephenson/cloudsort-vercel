import { PostMoviesBody } from './movie-types'
import guardNumberProp from '@/guard/guard-number-prop'
import guardObject from '@/guard/guard-object'
import guardMovieDataArrayProp from './guard-movie-data-array-prop'

export default function guardPostMovies (props: {
  label: string
  value: unknown
}): PostMoviesBody {
  const object = guardObject({
    label: props.label,
    value: props.value
  })
  const movies = guardMovieDataArrayProp({
    key: 'movies',
    label: props.label,
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
