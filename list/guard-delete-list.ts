import guardObject from '@/guard/guard-object'
import guardNumberProp from '@/guard/guard-number-prop'
import { DeleteListBody } from './list-types'

export default function guardDeleteList (props: {
  label: string
  value: unknown
}): DeleteListBody {
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
