import guardEpisodeItem from '@/episode/guard-episode-item'
import fashionPolice from '@/fashion-police/fashion-police'
import { UnarchiveRequest } from './unarchive-types'
import guardNumber from '@/fashion-police/guard-number'

export default function guardUnarchiveRequest (props: {
  label: string
  value: unknown
}): UnarchiveRequest {
  const required = {
    lastMergechoiceId: guardNumber,
    listId: guardNumber,
    unarchive: guardEpisodeItem
  }
  const guarded = fashionPolice({
    required,
    label: props.label,
    value: props.value
  })
  return guarded
}
