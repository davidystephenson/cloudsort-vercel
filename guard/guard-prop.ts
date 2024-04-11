import guardKey from './guard-key'

export default function guardProp (props: {
  key: string
  value: object
}): unknown {
  const keyed = guardKey({
    key: props.key,
    value: props.value
  })
  const value = keyed[props.key]
  return value
}
