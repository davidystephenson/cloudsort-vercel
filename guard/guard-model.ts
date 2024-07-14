import guardModelProp from './gaurd-model-prop'
import guardObject from './guard-object'
import { Guards } from './guard-types'

export default function guardModel<Model> (props: {
  guards: Guards<Model>
  label: string
  value: unknown
}): Model {
  const object = guardObject({ label: props.label, value: props.value })
  const result: Partial<Model> = {}
  for (const key in props.guards) {
    const guardsValue = props.guards[key]
    const guarded = guardModelProp({
      g: guardsValue,
      key,
      label: props.label,
      value: object
    })
    result[key] = guarded
  }
  return result as Model
}
