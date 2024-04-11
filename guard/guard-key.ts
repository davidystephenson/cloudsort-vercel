import { ApiError } from 'next/dist/server/api-utils'

function hasKey<Data extends Object, Key extends string> (data: Data, key: Key): data is Data & Record<Key, unknown> {
  return key in data
}

export default function guardKey <Data extends Object, Key extends string> (props: {
  key: Key
  value: Data
}): Data & Record<Key, unknown> {
  if (!hasKey(props.value, props.key)) {
    throw new ApiError(422, `There is no ${props.key}`)
  }
  return props.value
}
