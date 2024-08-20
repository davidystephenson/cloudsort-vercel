import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import guardUnarchiveRequest from './guard-unarchive-request'
import createUnarchiveEpisode from './create-unarchive-episode'
import unarchiveItem from '@/mergechoice/unarchiveItem'

export default async function handleUnarchive (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await createUnarchiveEpisode({
        unarchive: props.body.unarchive,
        db: props.db,
        listId: props.body.listId,
        mergechoiceId: props.episodes.length
      })
      return episode
    },
    guard: guardUnarchiveRequest,
    label: props.label,
    request: props.request,
    snap: (props) => {
      const newState = unarchiveItem({
        itemId: props.request.unarchive.item.id,
        state: props.state
      })
      return newState
    }
  })
  return response
}
