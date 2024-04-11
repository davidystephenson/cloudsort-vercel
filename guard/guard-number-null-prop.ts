import guardNumberNull from './guard-number-null'
import guardPropType from './guard-prop-type'

export default function guardNumberNullProp (props: {
  key: string
  label: string
  value: object
}): number | null {
  return guardPropType({
    guard: guardNumberNull,
    label: props.label,
    value: props.value,
    key: props.key
  })
}
