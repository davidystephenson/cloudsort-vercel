import guardObject from '@/fashion-police/guard-object'
import { CreateListRequest } from './list-types'
import guardStringProp from '@/fashion-police/guard-string-prop'

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
