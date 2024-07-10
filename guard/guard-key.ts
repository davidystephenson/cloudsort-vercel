import GuardError from './guard-error'

function hasKey<Value extends object, Key extends string> (
  key: Key,
  value: Value
): value is Value & Record<Key, unknown> {
  return key in value
}

export default function guardKey <Value extends object, Key extends string> (props: {
  key: Key
  label: string
  value: Value
}): Value & Record<Key, unknown> {
  if (!hasKey(props.key, props.value)) {
    const label = `key ${props.key}`
    const message = `${props.label} has no ${props.key}`
    throw new GuardError({ label, message })
  }
  return props.value
}
