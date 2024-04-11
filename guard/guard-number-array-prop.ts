import guardNumberArray from './guard-number-array'
import guardPropType from './guard-prop-type'

export default function guardNumberArrayProp (props: {
  key: string
  label: string
  value: object
}): number[] {
  return guardPropType({
    guard: guardNumberArray,
    label: props.label,
    value: props.value,
    key: props.key
  })
}
