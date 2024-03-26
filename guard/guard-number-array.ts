import guardArrayType from './guard-array-type'
import guardNumber from './guard-number'

export default function guardNumberArray (props: {
  data: unknown
  label: string
}): number[] {
  return guardArrayType({
    data: props.data,
    guard: guardNumber,
    label: props.label
  })
}
