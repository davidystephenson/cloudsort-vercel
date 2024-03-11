import { ApiError } from 'next/dist/server/api-utils'
import { PostMovieBody } from './movie-types'
import guardMovieData from './guard-movie-data'
import guardNumberProp from '@/guard/guard-number-prop'

export default function guardPostMovie (props: {
  data: unknown
}): PostMovieBody {
  if (props.data == null) {
    throw new ApiError(400, 'There is no body')
  }
  if (typeof props.data !== 'object') {
    throw new ApiError(422, 'The body is not an object')
  }
  if (!('listId' in props.data)) {
    throw new ApiError(422, 'There is no listId')
  }
  const movieData = guardMovieData({ data: props.data })
  try {
    const listId = guardNumberProp({ data: props.data, key: 'listId' })
    return {
      listId,
      ...movieData
    }
  } catch (error) {
    const e = error as Error
    throw new ApiError(422, e.message)
  }
}
