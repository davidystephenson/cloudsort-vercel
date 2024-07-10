import guardObject from './guard-object'
import guardPropType from './guard-prop-type'
import { Guard } from './guard-types'

export default function guardModel<Model> (props: {
  guards: { [Key in keyof Model]: Guard<Model[Key]> }
  label: string
  value: unknown
}): Model {
  const object = guardObject({ label: props.label, value: props.value })
  const result: Partial<Model> = {} // Use Partial to initially allow for incomplete assignments
  for (const key in props.guards) {
    const guard = props.guards[key]
    const guarded = guardPropType({ guard, key, label: props.label, value: object })
    result[key] = guarded
  }
  return result as Model // Type assertion to convert Partial<T> to T
}
