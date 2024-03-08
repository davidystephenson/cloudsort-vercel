import { ApiError } from 'next/dist/server/api-utils'
import { PostMovieBody } from './movie-types'
import guardNumber from '../guard/guard-number'
import guardMovieData from './guard-movie-data'

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
    const listId = guardNumber({ data: props.data.listId, label: 'listId' })
    return {
      listId,
      ...movieData
    }
  } catch (error) {
    const e = error as Error
    throw new ApiError(422, e.message)
  }
}
