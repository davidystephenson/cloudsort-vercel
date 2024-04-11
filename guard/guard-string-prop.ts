import guardPropType from './guard-prop-type'
import guardString from './guard-string'

export default function guardStringProp (props: {
  key: string
  label: string
  value: object
}): string {
  return guardPropType({
    guard: guardString,
    label: props.label,
    key: props.key,
    value: props.value
  })
}
