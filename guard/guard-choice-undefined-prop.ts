import { Choice } from '@/mergeChoice/mergeChoiceTypes'
import guardPropType from './guard-prop-type'
import guardChoiceUndefined from './guard-choice-undefined'

export default function guardChoiceUndefinedProp (props: {
  key: string
  label: string
  value: object
}): Choice | undefined {
  return guardPropType({
    label: props.label,
    guard: guardChoiceUndefined,
    key: props.key,
    value: props.value
  })
}
