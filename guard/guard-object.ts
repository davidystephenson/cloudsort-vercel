import { ApiError } from 'next/dist/server/api-utils'

export default function guardObject (props: {
  label: string
  value: unknown
}): object {
  if (props.value == null) {
    throw new ApiError(400, `There is no ${props.label}`)
  }
  if (typeof props.value !== 'object') {
    throw new ApiError(422, `${props.label} is not an object`)
  }
  return props.value
}
