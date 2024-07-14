import guardObject from './guard-object'
import guardProp from './guard-prop'
import guardPropType from './guard-prop-type'
import { Guard } from './guard-types'

type Guards <Guarded> = {
  [Key in keyof Guarded]: Guard<Guarded[Key]> | Guards<Guarded[Key]>
}

function guardOrModel <Guarded, Key extends keyof Guarded> (props: {
  g: Guard<Guarded[Key]> | Guards<Guarded[Key]>
  key: string
  label: string
  value: object
}): Guarded[Key] {
  if (props.g instanceof Function) {
    const guarded = guardPropType({ guard: props.g, key: props.key, label: props.label, value: props.value })
    return guarded
  } else {
    const prop = guardProp({ key: props.key, label: props.label, value: props.value })
    const guarded = guardModel({
      guards: props.g,
      label: props.label,
      value: prop
    })
    console.log(guarded)
    return guarded
  }
}

export default function guardModel<Model> (props: {
  guards: Guards<Model>
  label: string
  value: unknown
}): Model {
  const object = guardObject({ label: props.label, value: props.value })
  const result: Partial<Model> = {} // Use Partial to initially allow for incomplete assignments
  for (const key in props.guards) {
    const guardsValue = props.guards[key]
    const guarded = guardOrModel({
      g: guardsValue,
      key,
      label: props.label,
      value: object
    })
    result[key] = guarded
  }
  return result as Model // Type assertion to convert Partial<T> to T
}
