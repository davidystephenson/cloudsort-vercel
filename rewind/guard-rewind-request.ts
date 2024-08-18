import guardNumber from '@/fashion-police/guard-number'
import { RewindRequest } from '../shade/rewind-types'
import fashionPolice from '@/fashion-police/fashion-police'

export default function guardRewindRequest (props: {
  label: string
  value: unknown
}): RewindRequest {
  const required = {
    episodeMergechoiceId: guardNumber,
    lastMergechoiceId: guardNumber,
    listId: guardNumber
  }
  const policed = fashionPolice({
    label: props.label,
    required,
    value: props.value
  })
  return policed
}
