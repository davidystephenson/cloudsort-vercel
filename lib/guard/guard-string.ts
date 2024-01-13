export default function guardString (props: {
  data: unknown
  label: string
}): string {
  if (typeof props.data !== 'string') {
    const message = `${props.label} is not a string`
    throw new Error(message)
  }
  return props.data
}
