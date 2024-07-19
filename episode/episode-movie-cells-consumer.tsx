import ArchiveEpisodeMovieCellsView from '@/archive/archive-episode-movie-cells-view'
import { Row } from '@/cell/cell-types'
import ChoiceEpisodeMovieCellsView from '@/choice/choice-episode-movie-cells-view'
import ImportEpisodeMovieCellsView from '@/import/import-episode-movie-cells-view'
import RandomEpisodeMovieCellsView from '@/random/random-episode-movie-cells-view'
import RemoveEpisodeMovieCellsView from '@/remove/remove-episode-movie-cells-view'
import ResetEpisodeMovieCellsView from '@/reset/reset-episode-movie-cells-view'
import UnarchiveEpisodeMovieCellsView from '@/unarchive/unarchive-episode-movie-cells-view'
import episodeContext from './episode-context'
import marionEpisodeElement from './marion-episode-element'

export default function EpisodeMovieCellsConsumer (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const episode = episodeContext.useContext()
  const actors = {
    archive: ArchiveEpisodeMovieCellsView,
    choice: ChoiceEpisodeMovieCellsView,
    import: ImportEpisodeMovieCellsView,
    random: RandomEpisodeMovieCellsView,
    remove: RemoveEpisodeMovieCellsView,
    reset: ResetEpisodeMovieCellsView,
    unarchive: UnarchiveEpisodeMovieCellsView
  }
  const cells = marionEpisodeElement({
    actors,
    complement: { row: props.row },
    part: episode.element
  })
  const consumer = <>{cells}</>
  return consumer
}
