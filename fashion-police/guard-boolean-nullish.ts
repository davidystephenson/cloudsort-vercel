import guardBoolean from './guard-boolean'
import guardNullish from './guard-nullish'
import guardUnion from './guard-union'

export default function guardBooleanNullish (props: {
  label: string
  value: unknown
}): boolean | null | undefined {
  const union = guardUnion({
    guards: [guardBoolean, guardNullish],
    label: props.label,
    value: props.value
  })
  return union
}
