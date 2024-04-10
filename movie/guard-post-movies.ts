import { PostMoviesBody } from './movie-types'
import guardNumberProp from '@/guard/guard-number-prop'
import guardObject from '@/guard/guard-object'
import guardMovieDataArrayProp from './guard-movie-data-array-prop'

export default function guardPostMovies (props: {
  data: unknown
}): PostMoviesBody {
  const object = guardObject({ data: props.data })
  const movies = guardMovieDataArrayProp({ data: object, key: 'movies' })
  const listId = guardNumberProp({ data: object, key: 'listId' })
  return {
    listId,
    movies
  }
}
