import guardArrayType from './guard-array-type'
import guardStringNumber from './guard-string-number'

export default function guardStringNumberArray (props: {
  label: string
  value: unknown
}): Array<string | number> {
  return guardArrayType({
    guard: guardStringNumber,
    label: props.label,
    value: props.value
  })
}
