import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { MovieChoiceRequest } from './movie-types'
import guardEpisodeChoice from '@/choice/guard-episode-choice'
import guardString from '@/fashion-police/guard-string'

export default function guardMovieChoiceRequest (props: {
  label: string
  value: unknown
}): MovieChoiceRequest {
  const guards = {
    choice: guardEpisodeChoice,
    label: guardString,
    lastMergechoiceId: guardNumber,
    listId: guardNumber
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
