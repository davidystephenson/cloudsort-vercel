import { EpisodeRandom } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Text } from '@chakra-ui/react'
import RandomIcon from './random-icon'

export default function RandomEpisodeCellsView (props: {
  input: EpisodeRandom<ListMovie>
}): JSX.Element {
  return (
    <Text>
      <RandomIcon /> {props.input.first.name} vs {props.input.second.name}
    </Text>
  )
}
