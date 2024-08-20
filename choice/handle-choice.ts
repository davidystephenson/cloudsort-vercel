import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import createChoiceEpisode from './create-choice-episode'
import guardMovieChoiceRequest from '@/movie/guard-movie-choice-request'
import chooseOption from '@/mergechoice/chooseOption'

export default async function handleChoice (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await createChoiceEpisode({
        choice: props.body.choice,
        db: props.db,
        listId: props.body.listId,
        episodes: props.episodes
      })
      return episode
    },
    guard: guardMovieChoiceRequest,
    label: props.label,
    request: props.request,
    snap: (props) => {
      const newState = chooseOption({
        betterIndex: props.request.choice.betterIndex,
        state: props.state
      })
      return newState
    }
  })
  return response
}
