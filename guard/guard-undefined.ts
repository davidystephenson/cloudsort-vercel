import GuardError from './guard-error'

export default function guardUndefined (props: {
  label: string
  value: unknown
}): undefined {
  if (props.value !== undefined) {
    const message = `${props.label} is not undefined`
    throw new GuardError({
      label: 'undefined',
      message
    })
  }
  return props.value
}
