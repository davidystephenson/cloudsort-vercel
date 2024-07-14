import guardNumberProp from '@/guard/guard-number-prop'
import guardMovieData from './guard-movie-data'
import { Movie } from '@prisma/client'
import guardModel from '@/guard/guard-model'
import guardNumber from '@/guard/guard-number'

export default function guardMovie (props: {
  label: string
  value: unknown
}): Movie {
  const movieData = guardMovieData({
    label: props.label,
    value: props.value
  })
  const guards = { id: guardNumber }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return {
    ...movieData,
    ...guarded
  }
}
