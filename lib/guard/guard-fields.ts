import { Fields } from '../form/form-types'
import guardDefined from './guard-defined'

export default function guardFields <FieldName extends string> (props: {
  fields: Fields
  names: FieldName[]
}): Record<FieldName, string> {
  const entries: Array<[FieldName, string]> = props.names.map((name) => {
    const field = props.fields[name]
    const value = guardDefined({
      name: `${name}`,
      value: field?.value
    })
    return [name, value]
  })
  const result = Object.fromEntries(entries) as Record<FieldName, string>
  return result
}
