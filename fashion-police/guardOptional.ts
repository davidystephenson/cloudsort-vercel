import guardModelProp from './guard-model-prop'
import guardObject from './guard-object'
import { Guards } from './fashionPoliceTypes'

export default function guardOptional<Model> (props: {
  guards: Guards<Model>
  label: string
  value: unknown
}): Partial<Model> {
  const object = guardObject({ label: props.label, value: props.value })
  const result: Partial<Model> = {}
  for (const key in props.guards) {
    if (!(key in object)) {
      continue
    }
    const guardsValue = props.guards[key]
    const guarded = guardModelProp({
      g: guardsValue,
      key,
      label: props.label,
      value: object
    })
    result[key] = guarded
  }
  return result
}
