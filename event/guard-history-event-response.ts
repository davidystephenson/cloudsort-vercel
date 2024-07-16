import guardTrue from '@/fashion-police/guard-true'
import fashionPolice from '@/fashion-police/fashion-police'
import guardHistoryEpisode from './guard-history-event'
import { HistoryEpisodeResponse } from './event-types'

export default function guardHistoryEpisodeResponse (props: {
  label: string
  value: unknown
}): HistoryEpisodeResponse {
  const guarded = fashionPolice({
    required: {
      ok: guardTrue,
      episode: guardHistoryEpisode
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
