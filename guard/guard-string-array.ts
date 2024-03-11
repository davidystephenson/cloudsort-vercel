import guardArrayType from './guard-array-type'
import guardString from './guard-string'

export default function guardStringArray (props: {
  data: unknown
  label: string
}): string[] {
  return guardArrayType({
    data: props.data,
    guard: guardString,
    label: props.label
  })
}
