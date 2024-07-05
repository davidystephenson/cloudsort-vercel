import guardObject from '@/guard/guard-object'
import { CreateListRequest } from './list-types'
import guardStringProp from '@/guard/guard-string-prop'

export default function guardPostList (props: {
  label: string
  value: unknown
}): CreateListRequest {
  const data = guardObject({
    label: props.label,
    value: props.value
  })
  const name = guardStringProp({
    key: 'name',
    label: props.label,
    value: data
  })
  return {
    name
  }
}
