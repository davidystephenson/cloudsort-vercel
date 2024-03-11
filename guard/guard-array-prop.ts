import guardPropType from './guard-prop-type'
import guardArray from './guard-array'

export default function guardArrayProp (props: {
  data: object
  key: string
}): unknown[] {
  return guardPropType({
    guard: guardArray,
    data: props.data,
    key: props.key
  })
}
