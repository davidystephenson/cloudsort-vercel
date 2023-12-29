import { Fields } from '../form/form-types'
import guardDefined from './guard-defined'
import gaurdEntries from './guard-entries'

export default function guardFields <FieldName extends string> (props: {
  fields: Fields
  names: FieldName[]
}): { [K in [FieldName, string] as K[0]]: K[1]; } {
  const entries: Array<[FieldName, string]> = props.names.map((name) => {
    const field = props.fields[name]
    const value = guardDefined({
      name: `${name}`,
      value: field?.value
    })
    return [name, value]
  })
  const result = gaurdEntries(entries)
  return result
}
