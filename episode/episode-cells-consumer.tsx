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
import TableSpanView from '@/table/table-span-view'
import privateListContext from '@/list/private-list-context'
import { Heading, HStack, Text } from '@chakra-ui/react'
import EpisodeTimeView from './episode-time-view'
import { MouseEvent } from 'react'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import EpisodeMenu from './episode-menu-view'

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
  const list = privateListContext.useContext()
  const cells = marionEpisodeElement({
    actors,
    complement: { row: props.row },
    part: episode.element
  })
  function handleClick (event: MouseEvent): void {
    event.preventDefault()
    list.toggleEpisode({ episodeId: props.row.cells.episode.mergeChoiceId })
  }
  const consumer = (
    <TableSpanView>
      <HStack w='100%' justifyContent='space-between'>
        <ThemeLinkableView href='#' onClick={handleClick}>
          <HStack>
            <Heading size='xs'>
              {cells}
            </Heading>
            <Text whiteSpace='nowrap'>(<EpisodeTimeView />)</Text>
          </HStack>
        </ThemeLinkableView>
        <EpisodeMenu />
      </HStack>
    </TableSpanView>
  )
  return consumer
}
