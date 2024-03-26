import { ApiError } from 'next/dist/server/api-utils'
import guardObject from '@/guard/guard-object'
import guardNumberProp from '@/guard/guard-number-prop'
import { DeleteListBody } from './list-types'

export default function guardChooseMovie (props: {
  data: unknown
}): DeleteListBody {
  const data = guardObject({ data: props.data })
  try {
    const listId = guardNumberProp({ data, key: 'listId' })
    return {
      listId
    }
  } catch (error) {
    const e = error as Error
    throw new ApiError(422, e.message)
  }
}
