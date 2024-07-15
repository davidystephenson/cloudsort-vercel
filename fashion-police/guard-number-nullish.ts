import guardNullish from './guard-nullish'
import guardNumber from './guard-number'
import guardUnion from './guard-union'

export default function guardNumberUndefined (props: {
  label: string
  value: unknown
}): number | null | undefined {
  const union = guardUnion({
    guards: [guardNumber, guardNullish],
    label: props.label,
    value: props.value
  })
  return union
}
