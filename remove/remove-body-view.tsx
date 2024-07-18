import { EpisodeRemove } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Text } from '@chakra-ui/react'

export default function RemoveEpisodeView(props: {
  input: EpisodeRemove<ListMovie>
}): JSX.Element {
  return (
    <Text>
      Remove: {props.input.item.name}
    </Text>
  )
}
