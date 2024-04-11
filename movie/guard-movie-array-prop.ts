import guardPropType from '@/guard/guard-prop-type'
import guardMovieArray from './guard-movie-array'
import { Movie } from '@prisma/client'

export default function guardMovieArrayProp (props: {
  key: string
  label: string
  value: object
}): Movie[] {
  return guardPropType({
    guard: guardMovieArray,
    key: props.key,
    label: props.label,
    value: props.value
  })
}
