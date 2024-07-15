import guardTrue from '@/fashion-police/guard-true'
import fashionPolice from '@/fashion-police/fashion-police'
import guardHistoryEvent from './guard-history-event'
import { HistoryEventResponse } from './event-types'

export default function guardHistoryEventResponse (props: {
  label: string
  value: unknown
}): HistoryEventResponse {
  const guarded = fashionPolice({
    required: {
      ok: guardTrue,
      event: guardHistoryEvent
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
