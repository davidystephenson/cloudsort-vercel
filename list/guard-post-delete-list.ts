import guardObject from '@/guard/guard-object'
import guardNumberProp from '@/guard/guard-number-prop'
import { PostDeleteListBody } from './list-types'

export default function guardPostDeleteList (props: {
  label: string
  value: unknown
}): PostDeleteListBody {
  const data = guardObject({
    label: props.label,
    value: props.value
  })
  const listId = guardNumberProp({
    key: 'listId',
    label: props.label,
    value: data
  })
  return {
    listId
  }
}
