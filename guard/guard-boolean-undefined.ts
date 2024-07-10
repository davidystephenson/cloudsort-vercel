import guardBoolean from './guard-boolean'
import guardUndefined from './guard-undefined'
import guardUnion from './guard-union'

export default function guardBooleanUndefined (props: {
  label: string
  value: unknown
}): boolean | undefined {
  const union = guardUnion({
    guards: [guardBoolean, guardUndefined],
    label: props.label,
    value: props.value
  })
  return union
}
