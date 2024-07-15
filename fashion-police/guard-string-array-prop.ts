import guardPropType from './guard-prop-type'
import guardStringArray from './guard-string-array'

export default function gaurdStringArrayProp (props: {
  key: string
  label: string
  value: object
}): string[] {
  return guardPropType({
    guard: guardStringArray,
    key: props.key,
    label: props.label,
    value: props.value
  })
}
