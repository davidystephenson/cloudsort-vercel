import guardPropType from './guard-prop-type'
import guardStringUndefined from './guard-string-undefined'

export default function guardStringUndefinedProp (props: {
  key: string
  label: string
  value: object
}): string | undefined {
  const guarded = guardPropType({
    guard: guardStringUndefined,
    key: props.key,
    label: props.label,
    value: props.value
  })
  return guarded
}
