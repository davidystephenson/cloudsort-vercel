import guardPropType from './guard-prop-type'
import guardBoolean from './guard-boolean'

export default function guardBooleanProp (props: {
  data: object
  key: string
}): boolean {
  const prop = guardPropType({
    data: props.data,
    guard: guardBoolean,
    key: props.key
  })
  return prop
}
