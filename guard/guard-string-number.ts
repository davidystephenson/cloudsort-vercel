import { ApiError } from 'next/dist/server/api-utils'

export default function guardStringNumber (props: {
  label: string
  value: unknown
}): string | number {
  if (typeof props.value !== 'string' && typeof props.value !== 'number') {
    const message = `${props.label} is not a string or number`
    throw new ApiError(422, message)
  }
  return props.value
}
