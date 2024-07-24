import { episodeToHistoryEpisode } from '@/episode/episode-to-history-episode'
import { RelatedList } from './list-types'
import { ListHistory } from '@/history/history-types'

export default function listToHistory (props: {
  list: RelatedList
}): ListHistory {
  const history = props.list.episodes.map((episode) => {
    const historyEpisode = episodeToHistoryEpisode({ episode })
    return historyEpisode
  })
  return history
}
