import GuardError from './guard-error'

export default function guardUnionProp <Guarded> (props: {
  guards: Array<(props: {
    key: string
    label: string
    value: object
  }) => Guarded>
  key: string
  label: string
  value: object
}): Guarded {
  const labels: string[] = []
  const guard = props.guards.find(guard => {
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
    const message = `${props.label} is not a union of ${label}`
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
