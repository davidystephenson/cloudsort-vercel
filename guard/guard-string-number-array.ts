import guardArrayType from './guard-array-type'
import guardStringNumber from './guard-string-number'

export default function guardStringNumberArray (props: {
  data: unknown
  label: string
}): Array<string | number> {
  return guardArrayType({
    data: props.data,
    guard: guardStringNumber,
    label: props.label
  })
}
