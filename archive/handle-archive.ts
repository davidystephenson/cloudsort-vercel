import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import createArchiveEpisode from './create-archive-episode'
import guardArchiveRequest from './guard-archive-request'
import archiveItem from '@/mergechoice/archiveItem'

export default async function handleArchive (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await createArchiveEpisode({
        archive: props.body.archive,
        db: props.db,
        listId: props.body.listId,
        mergechoiceId: props.episodes.length
      })
      return episode
    },
    guard: guardArchiveRequest,
    label: props.label,
    request: props.request,
    snap: (props) => {
      const newState = archiveItem({
        itemId: props.request.archive.item.id,
        state: props.state
      })
      return newState
    }
  })
  return response
}
