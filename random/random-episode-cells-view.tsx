import { EpisodeRandom } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Text } from '@chakra-ui/react'
import RandomIconView from './random-icon-view'

export default function RandomEpisodeCellsView (props: {
  input: EpisodeRandom<ListMovie>
}): JSX.Element {
  return (
    <Text>
      <RandomIconView /> {props.input.first.name} vs {props.input.second.name}
    </Text>
  )
}
