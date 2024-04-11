import guardArrayType from './guard-array-type'
import guardString from './guard-string'

export default function guardStringArray (props: {
  label: string
  value: unknown
}): string[] {
  return guardArrayType({
    guard: guardString,
    label: props.label,
    value: props.value
  })
}
