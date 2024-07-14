import guardModel from './guard-model'
import guardObject from './guard-object'
import guardProp from './guard-prop'
import guardPropType from './guard-prop-type'
import { GuardsValue } from './guard-types'
import guardUnionProp from './guard-union-prop'

export default function guardModelProp<Guarded, Key extends keyof Guarded> (props: {
  g: GuardsValue<Guarded, Key>
  key: string
  label: string
  value: unknown
}): Guarded[Key] {
  const object = guardObject({ label: props.label, value: props.value })
  if (props.g instanceof Function) {
    const guarded = guardPropType({
      guard: props.g,
      key: props.key,
      label: props.label,
      value: object
    })
    return guarded
  }
  if (props.g instanceof Array) {
    const guarded = guardUnionProp({
      guards: props.g,
      key: props.key,
      label: props.label,
      value: object
    })
    return guarded
  }
  const prop = guardProp({
    key: props.key,
    label: props.label,
    value: object
  })
  const guarded = guardModel({
    guards: props.g,
    label: props.label,
    value: prop
  })
  console.log(guarded)
  return guarded
}
