import { Choice } from '@/mergeChoice/merge-choice-types'
import guardNumberProp from './guard-number-prop'
import guardBooleanProp from './guard-boolean-prop'
import guardNumberNullProp from './guard-number-null-prop'
import guardNumberArrayProp from './guard-number-array-prop'

export default function guardChoice (props: {
  data: object
  key: string
}): Choice {
  const aIndex = guardNumberProp({ data: props.data, key: 'aIndex' })
  const bIndex = guardNumberProp({ data: props.data, key: 'bIndex' })
  const mergeChoiceId = guardNumberProp({ data: props.data, key: 'mergeChoiceId' })
  const operationMergeChoiceId = guardNumberNullProp({ data: props.data, key: 'operationMergeChoiceId' })
  const options = guardNumberArrayProp({ data: props.data, key: 'options' })
  const random = guardBooleanProp({ data: props.data, key: 'random' })

  return {
    aIndex,
    bIndex,
    mergeChoiceId,
    operationMergeChoiceId,
    options,
    random
  }
}
