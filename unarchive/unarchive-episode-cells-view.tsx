import { EpisodeUnarchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import UnarchiveIconView from './unarchive-icon-view'
import SingleEpisodeCellsView from '@/episode/single-episode-cells-view'

export default function UnarchiveEpisodeCellsView (props: {
  input: EpisodeUnarchive<ListMovie>
}): JSX.Element {
  return (
    <SingleEpisodeCellsView>
      <UnarchiveIconView />
    </SingleEpisodeCellsView>
  )
}
