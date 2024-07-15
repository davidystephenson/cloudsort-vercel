import GuardError from './guard-error'

export default function guardBoolean (props: {
  label: string
  value: unknown
}): boolean {
  if (typeof props.value !== 'boolean') {
    const message = `${props.label} is not a boolean`
    throw new GuardError({ label: 'boolean', message })
  }
  return props.value
}
