import { Choice } from '@/mergeChoice/merge-choice-types'
import guardNumberProp from './guard-number-prop'
import guardStringProp from './guard-string-prop'
import guardStringNullProp from './guard-string-null-prop'
import guardBooleanProp from './guard-boolean-prop'
import guardStringNumberArrayProp from './gaurd-string-number-array-prop'

export default function guardChoice (props: {
  data: object
  key: string
}): Choice {
  const aIndex = guardNumberProp({ data: props.data, key: 'aIndex' })
  const bIndex = guardNumberProp({ data: props.data, key: 'bIndex' })
  const mergeChoiceId = guardStringProp({ data: props.data, key: 'mergeChoiceId' })
  const operationMergeChoiceId = guardStringNullProp({ data: props.data, key: 'operationMergeChoiceId' })
  const options = guardStringNumberArrayProp({ data: props.data, key: 'options' })
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
