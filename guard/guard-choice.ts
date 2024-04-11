import { Choice } from '@/mergeChoice/mergeChoiceTypes'
import guardNumberProp from './guard-number-prop'
import guardBooleanProp from './guard-boolean-prop'
import guardNumberNullProp from './guard-number-null-prop'
import guardNumberArrayProp from './guard-number-array-prop'

export default function guardChoice (props: {
  label: string
  value: object
}): Choice {
  const aIndex = guardNumberProp({
    key: 'aIndex',
    label: props.label,
    value: props.value
  })
  const bIndex = guardNumberProp({
    key: 'bIndex',
    label: props.label,
    value: props.value
  })
  const mergeChoiceId = guardNumberProp({
    key: 'mergeChoiceId',
    label: props.label,
    value: props.value
  })
  const operationMergeChoiceId = guardNumberNullProp({
    key: 'operationMergeChoiceId',
    label: props.label,
    value: props.value
  })
  const options = guardNumberArrayProp({
    key: 'options',
    label: props.label,
    value: props.value
  })
  const random = guardBooleanProp({
    value: props.value,
    label: props.label,
    key: 'random'
  })

  return {
    aIndex,
    bIndex,
    mergeChoiceId,
    operationMergeChoiceId,
    options,
    random
  }
}
