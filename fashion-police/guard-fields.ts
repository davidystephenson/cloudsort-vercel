import guardString from './guard-string'

export default function guardFields <FieldName extends string> (props: {
  values: Record<string, unknown>
  names: FieldName[]
}): Record<FieldName, string> {
  const entries: Array<[FieldName, string]> = props.names.map((name) => {
    const value = props.values[name]
    const string = guardString({
      value,
      label: name
    })
    return [name, string]
  })
  const result = Object.fromEntries(entries) as Record<FieldName, string>
  return result
}
