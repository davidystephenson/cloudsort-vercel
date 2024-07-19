import EpisodeTimeView from '@/episode/episode-time-view'
import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function ChoiceEpisodeCellsView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  const symbol = props.input.aBetter ? '>' : '<'
  const aName = props.input.aBetter ? <b>{props.input.aItem.name}</b> : props.input.aItem.name
  const bName = props.input.aBetter ? props.input.bItem.name : <b>{props.input.bItem.name}</b>
  return (
    <TableSpanView>
      <Heading size='xs'>
        {aName} {symbol} {bName} (<EpisodeTimeView />)
      </Heading>
    </TableSpanView>
  )
}
