import { EpisodeReset } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import ResetIconView from './reset-icon-view'
import SingleEpisodeCellsView from '@/episode/single-episode-cells-view'

export default function ResetEpisodeCellsView (props: {
  input: EpisodeReset<ListMovie>
}): JSX.Element {
  return (
    <SingleEpisodeCellsView>
      <ResetIconView />
    </SingleEpisodeCellsView>
  )
}
