import guardMovie from './guard-movie'
import { Movie } from '@prisma/client'
import guardObjectArrayType from '@/guard/guard-object-array-type'
import guardObjectArray from '@/guard/guard-object-array'
import guardArray from '@/guard/guard-array'

export default function guardMovieArray (props: {
  data: unknown
  label: string
}): Movie[] {
  const array = guardArray({
    data: props.data,
    label: props.label
  })
  const objectArray = guardObjectArray({
    data: array,
    label: props.label
  })
  return guardObjectArrayType({
    data: objectArray,
    guard: guardMovie,
    label: props.label
  })
}
