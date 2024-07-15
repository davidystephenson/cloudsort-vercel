import guardBooleanProp from '@/fashion-police/guard-boolean-prop'
import guardNumberArrayProp from '@/fashion-police/guard-number-array-prop'
import guardNumberNullProp from '@/fashion-police/guard-number-null-prop'
import guardNumberProp from '@/fashion-police/guard-number-prop'
import { Choice } from '@/mergeChoice/mergeChoiceTypes'

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
