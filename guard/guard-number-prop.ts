import guardPropType from './guard-prop-type'
import guardNumber from './guard-number'

export default function guardNumberProp (props: {
  data: object
  key: string
}): number {
  return guardPropType({
    guard: guardNumber,
    data: props.data,
    key: props.key
  })
}
