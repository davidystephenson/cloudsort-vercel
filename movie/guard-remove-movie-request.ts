import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { RemoveMovieRequest } from './movie-types'
import guardEpisodeRemoveData from '@/event/guard-event-remove-data'

export default function guardRemoveMovieRequest (props: {
  label: string
  value: unknown
}): RemoveMovieRequest {
  const guards = {
    listId: guardNumber,
    lastMergechoiceId: guardNumber,
    remove: guardEpisodeRemoveData
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
