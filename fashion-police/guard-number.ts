import GuardError from './guard-error'

export default function guardNumber (props: {
  label: string
  value: unknown
}): number {
  if (typeof props.value !== 'number') {
    const message = `${props.label} is not a number`
    throw new GuardError({ label: 'number', message })
  }
  return props.value
}
