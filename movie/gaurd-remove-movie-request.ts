import guardModel from '@/guard/guard-model'
import guardNumber from '@/guard/guard-number'
import { RemoveMovieRequest } from './movie-types'
import guardEventRemoveData from '@/event/guard-event-remove-data'

export default function guardRemoveMovieRequest (props: {
  label: string
  value: unknown
}): RemoveMovieRequest {
  const guards = {
    listId: guardNumber,
    lastMergechoiceId: guardNumber,
    remove: guardEventRemoveData
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
