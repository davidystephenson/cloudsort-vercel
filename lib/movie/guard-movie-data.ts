import { ApiError } from 'next/dist/server/api-utils'
import guardString from '../guard/guard-string'
import guardNumber from '../guard/guard-number'
import { MovieData } from './movie-types'

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
    const name = guardString({ data: props.data.name, label: 'title' })
    const score = guardNumber({ data: props.data.score, label: 'score' })
    const imdbId = guardString({ data: props.data.imdbId, label: 'imdbId' })
    const review = 'review' in props.data
      ? guardString({ data: props.data.review, label: 'review' })
      : null
    const url = 'url' in props.data
      ? guardString({ data: props.data.url, label: 'url' })
      : null
    const year = guardNumber({ data: props.data.year, label: 'year' })
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
