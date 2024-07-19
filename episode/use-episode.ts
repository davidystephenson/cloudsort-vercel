import { useList } from '@/list/list-context'
import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function useEpisode (props: {
  episodeId: number
}): Episode<ListMovie> {
  const list = useList()
  const episode = list.state.history.find((episode) => {
    const match = episode.mergeChoiceId === props.episodeId
    return match
  })
  if (episode == null) {
    throw new Error('Episode not found')
  }
  return episode
}
