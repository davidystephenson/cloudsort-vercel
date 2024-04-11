import guardPropType from './guard-prop-type'
import guardStringNull from './guard-string-null'

export default function guardStringNullProp (props: {
  key: string
  label: string
  value: object
}): string | null {
  return guardPropType({
    guard: guardStringNull,
    key: props.key,
    label: props.label,
    value: props.value
  })
}
