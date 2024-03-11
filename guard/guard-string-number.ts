import { ApiError } from 'next/dist/server/api-utils'

export default function guardStringNumber (props: {
  data: unknown
  label: string
}): string | number {
  if (typeof props.data !== 'string' && typeof props.data !== 'number') {
    const message = `${props.label} is not a string or number`
    throw new ApiError(422, message)
  }
  return props.data
}
