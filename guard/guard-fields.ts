import { Fields } from '../form/form-types'
import guardString from './guard-string'

export default function guardFields <FieldName extends string> (props: {
  fields: Fields
  names: FieldName[]
}): Record<FieldName, string> {
  const entries: Array<[FieldName, string]> = props.names.map((name) => {
    const field = props.fields[name]
    const value = guardString({
      data: field?.value,
      label: name
    })
    return [name, value]
  })
  const result = Object.fromEntries(entries) as Record<FieldName, string>
  return result
}
