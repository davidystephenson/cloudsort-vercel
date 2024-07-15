import guardUnion from './guard-union'
import guardString from './guard-string'
import guardNull from './guard-null'

export default function guardStringNull (props: {
  label: string
  value: unknown
}): string | null {
  const guarded = guardUnion({
    guards: [guardString, guardNull],
    label: props.label,
    value: props.value
  })
  return guarded
}
