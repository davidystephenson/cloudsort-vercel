import guardTrue from '@/fashion-police/guard-true'
import fashionPolice from '@/fashion-police/fashion-police'
import guardEpisode from './guard-episode'
import { EpisodePayload } from './episode-types'

export default function guardEpisodePayload (props: {
  label: string
  value: unknown
}): EpisodePayload {
  const guarded = fashionPolice({
    required: {
      ok: guardTrue,
      episode: guardEpisode
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
