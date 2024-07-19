import ArchiveEpisodeCellsView from '@/archive/archive-episode-cells-view'
import { Row } from '@/cell/cell-types'
import ChoiceEpisodeCellsView from '@/choice/choice-episode-cells-view'
import ImportEpisodeCellsView from '@/import/import-episode-cells-view'
import RandomEpisodeCellsView from '@/random/random-episode-cells-view'
import RemoveEpisodeCellsView from '@/remove/remove-episode-cells-view'
import ResetEpisodeCellsView from '@/reset/reset-episode-cells-view'
import UnarchiveEpisodeCellsView from '@/unarchive/unarchive-episode-cells-view'
import episodeContext from './episode-context'
import marionEpisodeElement from './marion-episode-element'

export default function EpisodeCellsConsumer (props: {
  row: Row<'episode'>
}): JSX.Element {
  const episode = episodeContext.useContext()
  const actors = {
    archive: ArchiveEpisodeCellsView,
    choice: ChoiceEpisodeCellsView,
    import: ImportEpisodeCellsView,
    random: RandomEpisodeCellsView,
    remove: RemoveEpisodeCellsView,
    reset: ResetEpisodeCellsView,
    unarchive: UnarchiveEpisodeCellsView
  }
  const cells = marionEpisodeElement({
    actors,
    complement: { row: props.row },
    part: episode.element
  })
  const consumer = <>{cells}</>
  return consumer
}
