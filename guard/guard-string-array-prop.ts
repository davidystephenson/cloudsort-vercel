import guardPropType from './guard-prop-type'
import guardStringArray from './guard-string-array'

export default function gaurdStringArrayProp (props: {
  data: object
  key: string
}): string[] {
  return guardPropType({
    data: props.data,
    guard: guardStringArray,
    key: props.key
  })
}
