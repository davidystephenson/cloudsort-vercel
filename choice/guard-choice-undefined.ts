import { Choice } from '@/mergechoice/mergeChoiceTypes'
import guardChoice from './guard-choice'
import { ApiError } from 'next/dist/server/api-utils'

export default function guardChoiceUndefined (props: {
  label: string
  value: unknown
}): Choice | undefined {
  if (props.value === null) {
    throw new ApiError(422, `${props.label} is null, not undefined`)
  }
  if (props.value === undefined) {
    return undefined
  }
  try {
    const choice = guardChoice({
      label: props.label,
      value: props.value
    })
    return choice
  } catch (error) {
    throw new ApiError(422, `${props.label} is not a choice or undefined`)
  }
}
