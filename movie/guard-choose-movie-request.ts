import guardModel from '@/guard/guard-model'
import guardNumber from '@/guard/guard-number'
import { ChooseMovieRequest } from './movie-types'
import guardEventChoiceData from '@/event/guard-event-choice-data'

export default function guardChooseMovieRequest (props: {
  label: string
  value: unknown
}): ChooseMovieRequest {
  const guards = {
    listId: guardNumber,
    lastMergechoiceId: guardNumber,
    choice: guardEventChoiceData
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
