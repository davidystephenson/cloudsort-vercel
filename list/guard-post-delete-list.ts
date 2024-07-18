import guardObject from '@/fashion-police/guard-object'
import guardNumberProp from '@/fashion-police/guard-number-prop'
import { ListWhere } from './list-types'

export default function guardPostDeleteList (props: {
  label: string
  value: unknown
}): ListWhere {
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
