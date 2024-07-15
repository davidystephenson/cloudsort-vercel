import guardPropType from './guard-prop-type'
import guardStringNumber from './guard-string-number'

export default function guardStringNumberProp (props: {
  key: string
  label: string
  value: object
}): string | number {
  return guardPropType({
    guard: guardStringNumber,
    key: props.key,
    label: props.label,
    value: props.value
  })
}
