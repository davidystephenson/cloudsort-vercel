import { ApiError } from 'next/dist/server/api-utils'
import { PostMovieBody } from './movie-types'
import guardMovieData from './guard-movie-data'
import guardNumberProp from '@/guard/guard-number-prop'
import guardObject from '@/guard/guard-object'

export default function guardPostMovie (props: {
  data: unknown
}): PostMovieBody {
  const object = guardObject({ data: props.data })
  if (!('listId' in object)) {
    throw new ApiError(422, 'There is no listId')
  }
  const listId = guardNumberProp({ data: object, key: 'listId' })
  const movieData = guardMovieData({ data: object })
  return {
    listId,
    ...movieData
  }
}
