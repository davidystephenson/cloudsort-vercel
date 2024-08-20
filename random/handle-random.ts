import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import guardRandomRequest from './guard-random-request'
import createRandomEpisode from './create-random-episode'
import setupRandomChoice from '@/mergechoice/setupRandomChoice'

export default async function handleRandom (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await createRandomEpisode({
        random: props.body.random,
        db: props.db,
        listId: props.body.listId,
        mergechoiceId: props.episodes.length
      })
      return episode
    },
    guard: guardRandomRequest,
    label: props.label,
    request: props.request,
    snap: (props) => {
      const newState = setupRandomChoice({ state: props.state })
      return newState
    }
  })
  return response
}
