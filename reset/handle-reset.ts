import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import guardResetRequest from './guard-reset-request'
import createResetEpisode from './create-reset-episode'

export default async function handleReset (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    guard: guardResetRequest,
    label: props.label,
    create: async (props) => {
      const episode = await createResetEpisode({
        reset: props.body.reset,
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
