import GuardError from './guard-error'

export default function guardObject (props: {
  label: string
  value: unknown
}): object {
  if (props.value == null) {
    const message = `${props.label} is not defined`
    throw new GuardError({ label: 'defined', message })
  }
  if (typeof props.value !== 'object') {
    const message = `${props.label} is not an object`
    throw new GuardError({ label: 'object', message })
  }
  return props.value
}
