import guardPropType from './guard-prop-type'
import guardStringNull from './guard-string-null'

export default function guardStringNullProp (props: {
  data: object
  key: string
}): string | null {
  return guardPropType({
    guard: guardStringNull,
    data: props.data,
    key: props.key
  })
}
