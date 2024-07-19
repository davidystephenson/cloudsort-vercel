import EpisodeTimeView from '@/episode/episode-time-view'
import { EpisodeRandom } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function RandomEpisodeCellsView (props: {
  input: EpisodeRandom<ListMovie>
}): JSX.Element {
  return (
    <TableSpanView>
      <Heading size='xs'>
        Random {props.input.first.name} vs {props.input.second.name} (<EpisodeTimeView />)
      </Heading>
    </TableSpanView>
  )
}
