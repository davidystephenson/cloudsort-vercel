import guardPropType from './guard-prop-type'
import guardString from './guard-string'

export default function guardStringProp (props: {
  data: object
  key: string
}): string {
  return guardPropType({
    guard: guardString,
    data: props.data,
    key: props.key
  })
}
