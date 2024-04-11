import guardNumberProp from '@/guard/guard-number-prop'
import guardMovieData from './guard-movie-data'
import { Movie } from '@prisma/client'

export default function guardMovie (props: {
  label: string
  value: object
}): Movie {
  const movieData = guardMovieData({
    label: props.label,
    value: props.value
  })
  const id = guardNumberProp({
    key: 'id',
    label: props.label,
    value: props.value
  })
  return {
    id,
    ...movieData
  }
}
