import { ApiError } from 'next/dist/server/api-utils'

export default function guardNumberNull (props: {
  label: string
  value: unknown
}): number | null {
  if (typeof props.value !== 'number' && props.value !== null) {
    const message = `${props.label} is not a string or null`
    throw new ApiError(422, message)
  }
  return props.value
}
