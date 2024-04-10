import { PostImportMoviesBody } from './movie-types'
import guardNumberProp from '@/guard/guard-number-prop'
import guardObject from '@/guard/guard-object'
import guardMovieArrayProp from './guard-movie-array-prop'

export default function guardPostImportMovies (props: {
  data: unknown
}): PostImportMoviesBody {
  const object = guardObject({ data: props.data })
  const movies = guardMovieArrayProp({ data: object, key: 'movies' })
  const listId = guardNumberProp({ data: object, key: 'listId' })
  return {
    listId,
    movies
  }
}
