import EpisodeTimeView from '@/episode/episode-time-view'
import { EpisodeReset } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function ResetEpisodeCellsView (props: {
  input: EpisodeReset<ListMovie>
}): JSX.Element {
  return (
    <TableSpanView>
      <Heading size='xs'>
        Reset {props.input.item.name} (<EpisodeTimeView />)
      </Heading>
    </TableSpanView>
  )
}
