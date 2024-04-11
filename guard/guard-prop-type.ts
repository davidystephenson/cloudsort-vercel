import guardProp from './guard-prop'

export default function guardPropType <Type> (props: {
  guard: (props: {
    label: string
    value: unknown
  }) => Type
  label: string
  key: string
  value: object
}): Type {
  const prop = guardProp({ value: props.value, key: props.key })
  const keyLabel = `${props.label}.${props.key}`
  const typed = props.guard({
    label: keyLabel,
    value: prop
  })
  return typed
}
