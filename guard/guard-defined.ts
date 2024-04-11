export default function guardDefined (props: {
  data: unknown
  label: string
}): NonNullable<unknown> {
  if (props.data == null) {
    const message = `There is no ${props.label}`
    throw new Error(message)
  }
  return props.data
}
