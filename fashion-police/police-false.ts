import GuardError from './guard-error'

export default function policeFalse (props: {
  label: string
  value: unknown
}): false {
  if (props.value !== false) {
    const message = `${props.label} is not false`
    throw new GuardError({
      label: 'false',
      message
    })
  }
  return props.value
}
