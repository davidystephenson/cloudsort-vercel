import GuardError from './guard-error'

export default function guardDefined (props: {
  label: string
  value: unknown
}): NonNullable<unknown> {
  if (props.value == null) {
    const message = `There is no ${props.label}`
    throw new GuardError({ label: 'defeined', message })
  }
  return props.value
}
