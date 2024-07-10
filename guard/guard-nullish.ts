import guardNull from './guard-null'
import guardUndefined from './guard-undefined'
import guardUnion from './guard-union'

export default function guardNullish (props: {
  label: string
  value: unknown
}): null | undefined {
  const union = guardUnion({
    guards: [guardNull, guardUndefined],
    label: props.label,
    value: props.value
  })
  return union
}
