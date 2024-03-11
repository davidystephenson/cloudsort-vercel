import guardProp from './guard-prop'

export default function guardPropType <Type> (props: {
  guard: (props: {
    data: unknown
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
