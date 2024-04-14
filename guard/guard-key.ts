import { ApiError } from 'next/dist/server/api-utils'

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
    throw new ApiError(422, `${props.label} has no ${props.key}`)
  }
  return props.value
}
