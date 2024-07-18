import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { ArchiveRequest } from './archive-types'
import guardEpisodeArchive from './guard-episode-archive'

export default function guardArchiveRequest (props: {
  label: string
  value: unknown
}): ArchiveRequest {
  const guards = {
    listId: guardNumber,
    lastMergechoiceId: guardNumber,
    archive: guardEpisodeArchive
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
