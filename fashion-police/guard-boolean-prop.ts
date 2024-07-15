import guardPropType from './guard-prop-type'
import guardBoolean from './guard-boolean'

export default function guardBooleanProp (props: {
  key: string
  label: string
  value: object
}): boolean {
  const prop = guardPropType({
    value: props.value,
    label: props.label,
    guard: guardBoolean,
    key: props.key
  })
  return prop
}
