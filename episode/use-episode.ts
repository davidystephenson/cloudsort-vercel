import { useList } from '@/list/list-context'
import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function useEpisode (props: {
  episodeId: number
}): Episode<ListMovie> {
  const list = useList()
  const episode = list.siftedEpisodes.find((episode) => {
    const match = episode.mergeChoiceId === props.episodeId
    return match
  })
  if (episode == null) {
    console.log('episodeId', props.episodeId)
    console.log('use Episode list.siftedEpisodes', list.siftedEpisodes)
    throw new Error(`Episode ${props.episodeId} not found`)
  }
  return episode
}
