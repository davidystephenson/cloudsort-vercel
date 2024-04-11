import guardMovie from './guard-movie'
import { Movie } from '@prisma/client'
import guardObjectArrayType from '@/guard/guard-object-array-type'
import guardObjectArray from '@/guard/guard-object-array'
import guardArray from '@/guard/guard-array'

export default function guardMovieArray (props: {
  label: string
  value: unknown
}): Movie[] {
  const array = guardArray({
    label: props.label,
    value: props.value
  })
  const objectArray = guardObjectArray({
    value: array,
    label: props.label
  })
  return guardObjectArrayType({
    value: objectArray,
    guard: guardMovie,
    label: props.label
  })
}
