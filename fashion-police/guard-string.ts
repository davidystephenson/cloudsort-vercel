import GuardError from './guard-error'

export default function guardString (props: {
  label: string
  value: unknown
}): string {
  if (typeof props.value !== 'string') {
    const message = `${props.label} is not a string`
    throw new GuardError({ label: 'a string', message })
  }
  return props.value
}
