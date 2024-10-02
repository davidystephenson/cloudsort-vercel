import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import ArchiveIconView from './archive-icon-view'
import SingleEpisodeCellsView from '@/episode/single-episode-cells-view'

export default function ArchiveEpisodeCellsView (props: {
  input: EpisodeArchive<ListMovie>
}): JSX.Element {
  return (
    <SingleEpisodeCellsView>
      <ArchiveIconView />
    </SingleEpisodeCellsView>
  )
}
