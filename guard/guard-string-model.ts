import { Fields } from '../form/form-types'
import guardString from './guard-string'

export default function guardStringModel <FieldName extends string> (props: {
  fields: Fields
  model: { [K in FieldName]: unknown }
}): Record<FieldName, string> {
  const keys = Object.keys(props.model) as FieldName[]
  const entries: Array<[FieldName, string]> = keys.map((name) => {
    const field = props.fields[name]
    const value = guardString({
      label: `${name}`,
      data: field?.value
    })
    return [name, value]
  })
  const result = Object.fromEntries(entries) as Record<FieldName, string>
  return result
}
