import guardUnion from './guard-union'
import guardString from './guard-string'
import guardUndefined from './guard-undefined'

export default function guardStringUndefined (props: {
  label: string
  value: unknown
}): string | undefined {
  const guarded = guardUnion({
    guards: [guardString, guardUndefined],
    label: props.label,
    value: props.value
  })
  return guarded
}
