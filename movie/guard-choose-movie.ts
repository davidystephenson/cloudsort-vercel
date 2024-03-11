import { ApiError } from 'next/dist/server/api-utils'
import { ChooseMovieBody } from './movie-types'
import guardObject from '@/guard/guard-object'
import guardNumberProp from '@/guard/guard-number-prop'
import guardChoiceUndefinedProp from '@/guard/guard-choice-undefined-prop'

export default function guardChooseMovie (props: {
  data: unknown
}): ChooseMovieBody {
  const data = guardObject({ data: props.data })
  try {
    const betterIndex = guardNumberProp({ data, key: 'betterIndex' })
    const listId = guardNumberProp({ data, key: 'listId' })
    const choice = guardChoiceUndefinedProp({ data, key: 'choice' })
    return {
      betterIndex,
      choice,
      listId
    }
  } catch (error) {
    const e = error as Error
    throw new ApiError(422, e.message)
  }
}
