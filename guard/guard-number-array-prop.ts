import guardNumberArray from './guard-number-array'
import guardPropType from './guard-prop-type'

export default function guardNumberArrayProp (props: {
  data: object
  key: string
}): number[] {
  return guardPropType({
    guard: guardNumberArray,
    data: props.data,
    key: props.key
  })
}
