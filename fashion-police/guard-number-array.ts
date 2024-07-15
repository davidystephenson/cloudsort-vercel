import guardArrayType from './guard-array-type'
import guardNumber from './guard-number'

export default function guardNumberArray (props: {
  label: string
  value: unknown
}): number[] {
  return guardArrayType({
    value: props.value,
    guard: guardNumber,
    label: props.label
  })
}
