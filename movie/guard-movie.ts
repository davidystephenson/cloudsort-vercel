import { ApiError } from 'next/dist/server/api-utils'
import guardNumberProp from '@/guard/guard-number-prop'
import guardMovieData from './guard-movie-data'
import { Movie } from '@prisma/client'

export default function guardMovie (props: {
  data: object
}): Movie {
  const movieData = guardMovieData({ data: props.data })
  if (props.data == null) {
    throw new ApiError(400, 'There is no body')
  }
  const id = guardNumberProp({ data: props.data, key: 'id' })
  return {
    id,
    ...movieData
  }
}
