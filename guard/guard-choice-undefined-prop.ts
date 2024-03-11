import { Choice } from '@/mergeChoice/merge-choice-types'
import guardPropType from './guard-prop-type'
import guardChoiceUndefined from './guard-choice-undefined'

export default function guardChoiceUndefinedProp (props: {
  data: object
  key: string
}): Choice | undefined {
  return guardPropType({
    data: props.data,
    guard: guardChoiceUndefined,
    key: props.key
  })
}
