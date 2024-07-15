import GuardError from './guard-error'

export default function guardNull (props: {
  label: string
  value: unknown
}): null {
  if (props.value !== null) {
    const message = `${props.label} is not null`
    throw new GuardError({ label: 'null', message })
  }
  return props.value
}
