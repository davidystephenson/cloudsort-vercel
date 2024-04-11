import { ApiError } from 'next/dist/server/api-utils'

export default function guardArray (props: {
  label: string
  value: unknown
}): unknown[] {
  if (!Array.isArray(props.value)) {
    const message = `${props.label} is not an array`
    throw new ApiError(422, message)
  }
  return props.value
}
