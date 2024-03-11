import { ApiError } from 'next/dist/server/api-utils'

export default function guardArray (props: {
  data: unknown
  label: string
}): unknown[] {
  if (!Array.isArray(props.data)) {
    const message = `${props.label} is not an array`
    throw new ApiError(422, message)
  }
  return props.data
}
