import { ApiError } from 'next/dist/server/api-utils'

export default function guardBoolean (props: {
  data: unknown
  label: string
}): boolean {
  if (typeof props.data !== 'boolean') {
    const message = `${props.label} is not a boolean`
    throw new ApiError(422, message)
  }
  return props.data
}
