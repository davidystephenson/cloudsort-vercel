import { ApiError } from 'next/dist/server/api-utils'

export default function guardString (props: {
  data: unknown
  label: string
}): string {
  if (typeof props.data !== 'string') {
    const message = `${props.label} is not a string`
    throw new ApiError(422, message)
  }
  return props.data
}
