import guardPropType from './guard-prop-type'
import guardStringNumberArray from './guard-string-number-array'

export default function guardStringNumberArrayProp (props: {
  key: string
  label: string
  value: object
}): Array<string | number> {
  return guardPropType({
    guard: guardStringNumberArray,
    key: props.key,
    label: props.label,
    value: props.value
  })
}
