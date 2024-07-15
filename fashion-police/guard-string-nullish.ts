import guardUnion from './guard-union'
import guardString from './guard-string'
import guardNullish from './guard-nullish'

export default function guardStringNullish (props: {
  label: string
  value: unknown
}): string | null | undefined {
  const guarded = guardUnion({
    guards: [guardString, guardNullish],
    label: props.label,
    value: props.value
  })
  return guarded
}
