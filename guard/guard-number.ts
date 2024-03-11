import { ApiError } from 'next/dist/server/api-utils'

export default function guardNumber (props: {
  data: unknown
  label: string
}): number {
  if (typeof props.data !== 'number') {
    const message = `${props.label} is not a number`
    throw new ApiError(422, message)
  }
  return props.data
}
