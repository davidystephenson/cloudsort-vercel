import { Guards } from './fashionPoliceTypes'
import guardOptional from './guardOptional'
import guardRequired from './guardRequired'

export default function fashionPolice<Required, Optional> (props: {
  required?: Guards<Required>
  label: string
  optional?: Guards<Optional>
  value: unknown
}): Record<string, never> & Required & Partial<Optional> {
  const never: Record<string, never> = {}
  if (props.required == null) {
    const required: Required = {} as any
    if (props.optional == null) {
      const optional: Partial<Optional> = {}
      const policed = { ...never, ...required, ...optional }
      return policed
    }
    const optional = guardOptional({ guards: props.optional, label: props.label, value: props.value })
    const policed = { ...never, ...required, ...optional }
    return policed
  }
  const required = guardRequired({ guards: props.required, label: props.label, value: props.value })
  if (props.optional == null) {
    const optional: Partial<Optional> = {}
    const policed = { ...never, ...required, ...optional }
    return policed
  }
  const optional = guardOptional({ guards: props.optional, label: props.label, value: props.value })
  const policed = { ...never, ...required, ...optional }
  return policed
}
