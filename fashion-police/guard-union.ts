import GuardError from './guard-error'
import { GuardArray } from './fashionPoliceTypes'

export default function guardUnion<Guards extends unknown[]> (props: {
  guards: GuardArray<Guards>
  label: string
  value: unknown
}): Guards[number] {
  const labels: string[] = []
  const guard = props.guards.find((guard) => {
    try {
      guard({
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
    const message = `${props.label} is not ${label}`
    throw new GuardError({ label, message })
  }
  const value = guard({
    label: props.label,
    value: props.value
  })
  return value
}
