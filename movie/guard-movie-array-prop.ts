import guardPropType from '@/guard/guard-prop-type'
import guardMovieArray from './guard-movie-array'
import { Movie } from '@prisma/client'

export default function guardMovieArrayProp (props: {
  data: object
  key: string
}): Movie[] {
  return guardPropType({
    guard: guardMovieArray,
    data: props.data,
    key: props.key
  })
}
