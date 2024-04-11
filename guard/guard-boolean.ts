import { ApiError } from 'next/dist/server/api-utils'

export default function guardBoolean (props: {
  label: string
  value: unknown
}): boolean {
  if (typeof props.value !== 'boolean') {
    const message = `${props.label} is not a boolean`
    throw new ApiError(422, message)
  }
  return props.value
}
