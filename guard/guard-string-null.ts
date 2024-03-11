import { ApiError } from 'next/dist/server/api-utils'

export default function guardStringNull (props: {
  data: unknown
  label: string
}): string | null {
  if (typeof props.data !== 'string' && props.data !== null) {
    const message = `${props.label} is not a string or null`
    throw new ApiError(422, message)
  }
  return props.data
}
