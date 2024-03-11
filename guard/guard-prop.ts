import guardKey from './guard-key'

export default function guardProp (props: {
  data: object
  key: string
}): unknown {
  const keyed = guardKey({ data: props.data, key: props.key })
  const value = keyed[props.key]
  return value
}
