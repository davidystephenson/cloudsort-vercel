import guardEpisodeItem from '@/episode/guard-episode-item'
import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { ResetRequest } from './reset-types'

export default function guardUnarchiveRequest (props: {
  label: string
  value: unknown
}): ResetRequest {
  const required = {
    lastMergechoiceId: guardNumber,
    listId: guardNumber,
    reset: guardEpisodeItem
  }
  const guarded = fashionPolice({
    required,
    label: props.label,
    value: props.value
  })
  return guarded
}
