import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import createChoiceEpisode from './create-choice-episode'
import guardMovieChoiceRequest from '@/movie/guard-movie-choice-request'

export default async function handleChoice (props: {
  label: string
  request: Request
}): Promise<EpisodeResponse> {
  const response = await handleEpisode({
    guard: guardMovieChoiceRequest,
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
