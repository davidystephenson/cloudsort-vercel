import { ApiError } from 'next/dist/server/api-utils'

export default function guardNumberNull (props: {
  data: unknown
  label: string
}): number | null {
  if (typeof props.data !== 'number' && props.data !== null) {
    const message = `${props.label} is not a string or null`
    throw new ApiError(422, message)
  }
  return props.data
}
