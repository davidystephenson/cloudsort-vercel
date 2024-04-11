import { ApiError } from 'next/dist/server/api-utils'

export default function guardString (props: {
  label: string
  value: unknown
}): string {
  if (typeof props.value !== 'string') {
    const message = `${props.label} is not a string`
    throw new ApiError(422, message)
  }
  return props.value
}
