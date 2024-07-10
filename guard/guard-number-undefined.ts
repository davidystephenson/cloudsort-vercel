import guardNumber from './guard-number'
import guardUndefined from './guard-undefined'
import guardUnion from './guard-union'

export default function guardNumberUndefined (props: {
  label: string
  value: unknown
}): number | undefined {
  const union = guardUnion({
    guards: [guardNumber, guardUndefined],
    label: props.label,
    value: props.value
  })
  return union
}
