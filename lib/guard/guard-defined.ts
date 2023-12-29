export default function guardDefined <Value> (props: {
  name: string
  value: Value
}): NonNullable<Value> {
  if (props.value == null) {
    const message = `There is no ${props.name}`
    throw new Error(message)
  }
  return props.value
}
