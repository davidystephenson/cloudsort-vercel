import { ApiError } from 'next/dist/server/api-utils'

export default function guardStringNull (props: {
  label: string
  value: unknown
}): string | null {
  if (typeof props.value !== 'string' && props.value !== null) {
    const message = `${props.label} is not a string or null`
    throw new ApiError(422, message)
  }
  return props.value
}
