import guardBoolean from './guard-boolean'
import guardNull from './guard-null'
import guardUnion from './guard-union'

export default function guardBooleanNull (props: {
  label: string
  value: unknown
}): boolean | null {
  const union = guardUnion({
    guards: [guardBoolean, guardNull],
    label: props.label,
    value: props.value
  })
  return union
}
