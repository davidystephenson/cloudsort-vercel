import guardPropType from './guard-prop-type'
import guardStringNumberArray from './guard-string-number-array'

export default function guardStringNumberArrayProp (props: {
  data: object
  key: string
}): Array<string | number> {
  return guardPropType({
    guard: guardStringNumberArray,
    data: props.data,
    key: props.key
  })
}
