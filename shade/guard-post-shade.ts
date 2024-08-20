import guardObject from '@/fashion-police/guard-object'
import { PostShadeRequest } from './shade-types'
import guardStringProp from '@/fashion-police/guard-string-prop'

export default function guardPostShade (props: {
  label: string
  value: unknown
}): PostShadeRequest {
  const object = guardObject({
    label: props.label,
    value: props.value
  })
  const shade = guardStringProp({
    key: 'shade',
    label: props.label,
    value: object
  })
  const body = { shade }
  return body
}
