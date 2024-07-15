import GuardError from '@/fashion-police/guard-error'

export default function guardTrue (props: {
  label: string
  value: unknown
}): true {
  if (props.value !== true) {
    const message = `${props.label} is not true`
    throw new GuardError({ label: 'true', message })
  }
  return props.value
}
