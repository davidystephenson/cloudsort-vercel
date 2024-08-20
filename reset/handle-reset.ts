import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import guardResetRequest from './guard-reset-request'
import createResetEpisode from './create-reset-episode'
import resetItem from '@/mergechoice/resetItem'

export default async function handleReset (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await createResetEpisode({
        reset: props.body.reset,
        db: props.db,
        listId: props.body.listId,
        mergechoiceId: props.episodes.length
      })
      return episode
    },
    guard: guardResetRequest,
    label: props.label,
    request: props.request,
    snap: (props) => {
      const newState = resetItem({
        itemId: props.request.reset.item.id,
        state: props.state
      })
      return newState
    }
  })
  return response
}
