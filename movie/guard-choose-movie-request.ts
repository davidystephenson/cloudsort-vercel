import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { ChooseMovieRequest } from './movie-types'
import guardEpisodeChoice from '@/choice/guard-episode-choice'

export default function guardChooseMovieRequest (props: {
  label: string
  value: unknown
}): ChooseMovieRequest {
  const guards = {
    listId: guardNumber,
    lastMergechoiceId: guardNumber,
    choice: guardEpisodeChoice
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
