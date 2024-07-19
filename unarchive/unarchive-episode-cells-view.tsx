import EpisodeTimeView from '@/episode/episode-time-view'
import { EpisodeUnarchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function UnarchiveEpisodeCellsView (props: {
  input: EpisodeUnarchive<ListMovie>
}): JSX.Element {
  return (
    <TableSpanView>
      <Heading size='xs'>
        Unarchive {props.input.item.name} (<EpisodeTimeView />)
      </Heading>
    </TableSpanView>
  )
}
