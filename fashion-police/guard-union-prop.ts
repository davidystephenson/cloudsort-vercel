import GuardError from './guard-error'
import { ArrayMap } from './fashionPoliceTypes'

export default function guardUnionProp <Guards extends unknown[]> (props: {
  guards: ArrayMap<Guards, {
    key: string
    label: string
    value: unknown
  }>
  key: string
  label: string
  value: object
}): Guards[number] {
  const labels: string[] = []
  const guard = props.guards.find(guard => {
    console.log('guard', guard)
    console.log('props', props)
    try {
      guard({
        key: props.key,
        label: props.label,
        value: props.value
      })
      return true
    } catch (error) {
      if (error instanceof GuardError) {
        labels.push(error.label)
        return false
      }
      throw error
    }
  })
  if (guard == null) {
    const label = labels.join(' or ')
    const message = `${props.label}.${props.key} is not a union of ${label}`
    throw new GuardError({
      label,
      message
    })
  }
  const guarded = guard({
    key: props.key,
    label: props.label,
    value: props.value
  })
  return guarded
}
