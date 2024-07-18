import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import guardChooseMovieRequest from '@/movie/guard-choose-movie-request'
import createChoiceEpisode from './create-choice-episode'

export default async function handleChoice (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    guard: guardChooseMovieRequest,
    label: props.label,
    create: async (props) => {
      const episode = await createChoiceEpisode({
        choice: props.body.choice,
        db: props.db,
        listId: props.body.listId,
        episodes: props.episodes
      })
      return episode
    },
    request: props.request
  })
  return response
}
