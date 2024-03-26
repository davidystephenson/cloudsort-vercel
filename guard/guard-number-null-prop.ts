import guardNumberNull from './guard-number-null'
import guardPropType from './guard-prop-type'

export default function guardNumberNullProp (props: {
  data: object
  key: string
}): number | null {
  return guardPropType({
    guard: guardNumberNull,
    data: props.data,
    key: props.key
  })
}
