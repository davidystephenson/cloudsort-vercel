import EpisodeTimeView from '@/episode/episode-time-view'
import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function ArchiveEpisodeCellsView (props: {
  input: EpisodeArchive<ListMovie>
}): JSX.Element {
  return (
    <TableSpanView>
      <Heading size='xs'>
        Archive {props.input.item.name} (<EpisodeTimeView />)
      </Heading>
    </TableSpanView>
  )
}
