import { EpisodeRemove } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import RemoveIconView from './remove-icon-view'
import SingleEpisodeCellsView from '@/episode/single-episode-cells-view'

export default function RemoveEpisodeCellsView (props: {
  input: EpisodeRemove<ListMovie>
}): JSX.Element {
  return (
    <SingleEpisodeCellsView>
      <RemoveIconView />
    </SingleEpisodeCellsView>
  )
}
