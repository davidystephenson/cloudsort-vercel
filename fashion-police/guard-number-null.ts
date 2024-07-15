import guardNull from './guard-null'
import guardNumber from './guard-number'
import guardUnion from './guard-union'

export default function guardNumberNull (props: {
  label: string
  value: unknown
}): number | null {
  const union = guardUnion({
    guards: [guardNumber, guardNull],
    label: props.label,
    value: props.value
  })
  return union
}
