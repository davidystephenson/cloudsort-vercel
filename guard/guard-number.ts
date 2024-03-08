export default function guardNumber (props: {
  data: unknown
  label: string
}): number {
  if (typeof props.data !== 'number') {
    const message = `${props.label} is not a number`
    throw new Error(message)
  }
  return props.data
}
