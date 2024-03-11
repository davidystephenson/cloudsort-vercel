import { ApiError } from 'next/dist/server/api-utils'

function hasKey<Data extends Object, Key extends string> (data: Data, key: Key): data is Data & Record<Key, unknown> {
  return key in data
}

export default function guardKey <Data extends Object, Key extends string> (props: {
  data: Data
  key: Key
}): Data & Record<Key, unknown> {
  if (!hasKey(props.data, props.key)) {
    throw new ApiError(422, `There is no ${props.key}`)
  }
  return props.data
}
