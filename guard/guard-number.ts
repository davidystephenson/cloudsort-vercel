import { ApiError } from 'next/dist/server/api-utils'

export default function guardNumber (props: {
  label: string
  value: unknown
}): number {
  if (typeof props.value !== 'number') {
    const message = `${props.label} is not a number`
    throw new ApiError(422, message)
  }
  return props.value
}
