import { ApiError } from 'next/dist/server/api-utils'
import { MovieData } from './movie-types'
import guardNumberProp from '@/guard/guard-number-prop'
import guardStringProp from '@/guard/guard-string-prop'
import guardStringNullProp from '@/guard/guard-string-null-prop'

export default function guardMovieData (props: {
  data: unknown
}): MovieData {
  if (props.data == null) {
    throw new ApiError(400, 'There is no body')
  }
  if (typeof props.data !== 'object') {
    throw new ApiError(422, 'The body is not an object')
  }
  if (!('name' in props.data)) {
    throw new ApiError(422, 'There is no name')
  }
  if (!('score' in props.data)) {
    throw new ApiError(422, 'There is no score')
  }
  if (!('imdbId' in props.data)) {
    throw new ApiError(422, 'There is no imdbId')
  }
  if (!('year' in props.data)) {
    throw new ApiError(422, 'There is no year')
  }
  try {
    const name = guardStringProp({ data: props.data, key: 'name' })
    const score = guardNumberProp({ data: props.data, key: 'score' })
    const imdbId = guardStringProp({ data: props.data, key: 'imdbId' })
    const review = guardStringNullProp({ data: props.data, key: 'review' })
    const url = guardStringNullProp({ data: props.data, key: 'url' })
    const year = guardNumberProp({ data: props.data, key: 'year' })
    return {
      name,
      score,
      imdbId,
      review,
      url,
      year
    }
  } catch (error) {
    const e = error as Error
    throw new ApiError(422, e.message)
  }
}
