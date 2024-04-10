import guardProp from './guard-prop'

export default function guardObjectPropType <Type> (props: {
  guard: (props: {
    data: object
    label: string
  }) => Type
  data: object
  key: string
}): Type {
  const prop = guardProp({ data: props.data, key: props.key })
  const typed = props.guard({
    data: prop,
    label: props.key
  })
  return typed
}
