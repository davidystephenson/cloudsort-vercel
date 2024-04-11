import guardPropType from './guard-prop-type'
import guardNumber from './guard-number'

export default function guardNumberProp (props: {
  key: string
  label: string
  value: object
}): number {
  return guardPropType({
    guard: guardNumber,
    key: props.key,
    label: props.label,
    value: props.value
  })
}
