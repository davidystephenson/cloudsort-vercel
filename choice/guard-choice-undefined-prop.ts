import { Choice } from '@/mergechoice/mergeChoiceTypes'
import guardChoiceUndefined from './guard-choice-undefined'
import guardPropType from '@/fashion-police/guard-prop-type'

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
