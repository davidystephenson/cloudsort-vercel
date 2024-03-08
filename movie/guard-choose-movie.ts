import { ApiError } from 'next/dist/server/api-utils'
import { ChooseMovieBody } from './movie-types'
import guardNumber from '../guard/guard-number'

export default function guardChooseMovie (props: {
  data: unknown
}): ChooseMovieBody {
  if (props.data == null) {
    throw new ApiError(400, 'There is no body')
  }
  if (typeof props.data !== 'object') {
    throw new ApiError(422, 'The body is not an object')
  }
  if (!('betterIndex' in props.data)) {
    throw new ApiError(422, 'There is no betterIndex')
  }
  if (!('listId' in props.data)) {
    throw new ApiError(422, 'There is no listId')
  }
  try {
    const betterIndex = guardNumber({ data: props.data.betterIndex, label: 'betterId' })
    const listId = guardNumber({ data: props.data.listId, label: 'listId' })
    return {
      betterIndex,
      listId
    }
  } catch (error) {
    const e = error as Error
    throw new ApiError(422, e.message)
  }
}
