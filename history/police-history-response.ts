import fashionPolice from '@/fashion-police/fashion-police'
import policeHistory from './police-history'
import { HistoryResponse } from './history-types'

export default function policeHistoryResponse (props: {
  label: string
  value: unknown
}): HistoryResponse {
  const required = { history: policeHistory }
  const policed = fashionPolice({
    required,
    label: props.label,
    value: props.value
  })
  return policed
}
