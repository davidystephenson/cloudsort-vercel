import { ApiError } from 'next/dist/server/api-utils'

export default function guardObject (props: {
  data: unknown
}): object {
  if (props.data == null) {
    throw new ApiError(400, 'There is no body')
  }
  if (typeof props.data !== 'object') {
    throw new ApiError(422, 'The body is not an object')
  }
  return props.data
}
