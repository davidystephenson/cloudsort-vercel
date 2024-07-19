import EpisodeTimeView from '@/episode/episode-time-view'
import { EpisodeRemove } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function RemoveEpisodeCellsView (props: {
  input: EpisodeRemove<ListMovie>
}): JSX.Element {
  return (
    <TableSpanView>
      <Heading size='xs'>
        Remove {props.input.item.name} (<EpisodeTimeView />)
      </Heading>
    </TableSpanView>
  )
}
