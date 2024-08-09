import GuardError from './guard-error'

export default function policeDate (props: {
  label: string
  value: unknown
}): Date {
  if (!(props.value instanceof Date)) {
    const message = `${props.label} is not a Date`
    throw new GuardError({
      label: 'Date',
      message
    })
  }
  return props.value
}
