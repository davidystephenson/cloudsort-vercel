import { Choice } from '@/mergeChoice/merge-choice-types'
import guardChoice from './guard-choice'
import { ApiError } from 'next/dist/server/api-utils'

export default function guardChoiceUndefined (props: {
  data: unknown
  label: string
}): Choice | undefined {
  if (props.data === undefined) {
    return undefined
  }
  if (props.data === null) {
    throw new ApiError(422, `${props.label} is null, not undefined`)
  }
  const choice = guardChoice({ data: props.data, key: props.label })
  return choice
}
