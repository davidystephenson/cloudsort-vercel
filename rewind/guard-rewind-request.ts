import guardNumber from '@/fashion-police/guard-number'
import { RewindRequest } from '../shade/rewind-types'
import fashionPolice from '@/fashion-police/fashion-police'
import guardString from '@/fashion-police/guard-string'

export default function guardRewindRequest (props: {
  label: string
  value: unknown
}): RewindRequest {
  const required = {
    episodeMergechoiceId: guardNumber,
    lastMergechoiceId: guardNumber,
    listId: guardNumber,
    snapshot: guardString
  }
  const policed = fashionPolice({
    label: props.label,
    required,
    value: props.value
  })
  return policed
}
