import EpisodeTimeView from '@/episode/episode-time-view'
import { EpisodeImport } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function ImportEpisodeCellsView (props: {
  input: EpisodeImport<ListMovie>
}): JSX.Element {
  return (
    <TableSpanView>
      <Heading size='xs'>
        Import {props.input.items.length} (<EpisodeTimeView />)
      </Heading>
    </TableSpanView>
  )
}
