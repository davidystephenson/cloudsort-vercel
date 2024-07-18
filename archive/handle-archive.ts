import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import createArchiveEpisode from './create-archive-episode'
import guardArchiveRequest from './guard-archive-request'

export default async function handleArchive (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    guard: guardArchiveRequest,
    label: props.label,
    create: async (props) => {
      const episode = await createArchiveEpisode({
        archive: props.body.archive,
        db: props.db,
        listId: props.body.listId,
        mergechoiceId: props.episodes.length
      })
      return episode
    },
    request: props.request
  })
  return response
}
