import GuardError from './guard-error'

export default function guardArray (props: {
  label: string
  value: unknown
}): unknown[] {
  if (!Array.isArray(props.value)) {
    const message = `${props.label} is not an array`
    throw new GuardError({ label: 'array', message })
  }
  return props.value
}
