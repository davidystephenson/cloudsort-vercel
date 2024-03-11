import guardPropType from './guard-prop-type'
import guardStringNumber from './guard-string-number'

export default function guardStringNumberProp (props: {
  data: object
  key: string
}): string | number {
  return guardPropType({
    guard: guardStringNumber,
    data: props.data,
    key: props.key
  })
}
