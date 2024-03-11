import { ApiError } from 'next/dist/server/api-utils'
import { PostMoviesBody } from './movie-types'
import guardMovieData from './guard-movie-data'
import guardNumberProp from '@/guard/guard-number-prop'

export default function guardPostMovies (props: {
  data: unknown
}): PostMoviesBody {
  if (props.data == null) {
    throw new ApiError(400, 'There is no body')
  }
  if (typeof props.data !== 'object') {
    throw new ApiError(422, 'The body is not an object')
  }
  if (!('listId' in props.data)) {
    throw new ApiError(422, 'There is no listId')
  }
  if (!('movies' in props.data)) {
    throw new ApiError(422, 'There is no movies')
  }
  if (!Array.isArray(props.data.movies)) {
    throw new ApiError(422, 'The movies is not an array')
  }
  const movies = props.data.movies.map((element, index) => {
    const movie = guardMovieData({ data: element })
    return movie
  })
  try {
    const listId = guardNumberProp({ data: props.data, key: 'listId' })
    return {
      listId,
      movies
    }
  } catch (error) {
    const e = error as Error
    throw new ApiError(422, e.message)
  }
}
