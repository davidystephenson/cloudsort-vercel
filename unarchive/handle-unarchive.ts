import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import guardUnarchiveRequest from './guard-unarchive-request'
import createUnarchiveEpisode from './create-unarchive-episode'

export default async function handleUnarchive (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    guard: guardUnarchiveRequest,
    label: props.label,
    create: async (props) => {
      const episode = await createUnarchiveEpisode({
        unarchive: props.body.unarchive,
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
