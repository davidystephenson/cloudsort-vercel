import GuardError from './guard-error'

export default function guardUnion <Guarded> (props: {
  guards: Array<(props: {
    label: string
    value: unknown
  }) => Guarded>
  label: string
  value: unknown
}): Guarded {
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
        console.log('error', error)
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
