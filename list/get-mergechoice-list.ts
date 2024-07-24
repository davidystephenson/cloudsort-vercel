import { episodeToHistoryEpisode } from '@/episode/episode-to-history-episode'
import deduceState from '@/mergechoice/deduceState'
import { ListMovie } from '@/movie/movie-types'
import { RelatedList, MergechoiceList } from './list-types'
import { Episode } from '@/mergechoice/mergeChoiceTypes'

export default function getMergechoiceList (props: {
  list: RelatedList
}): MergechoiceList {
  const history: Array<Episode<ListMovie>> = props.list.episodes.map((episode) => {
    const historyEpisode = episodeToHistoryEpisode({ episode })
    return historyEpisode
  })
  const state = deduceState({ history, seed: props.list.seed })
  const mergechoiceList = {
    list: props.list,
    state
  }
  return mergechoiceList
}
