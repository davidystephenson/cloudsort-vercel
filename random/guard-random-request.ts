import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { RandomRequest } from './random-types'
import guardEpisodeRandom from './guard-episode-random'

export default function guardRandomRequest (props: {
  label: string
  value: unknown
}): RandomRequest {
  const guards = {
    listId: guardNumber,
    lastMergechoiceId: guardNumber,
    random: guardEpisodeRandom
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
