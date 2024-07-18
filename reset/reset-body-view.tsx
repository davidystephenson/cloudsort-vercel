import { Text } from '@chakra-ui/react'
import { EpisodeReset } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function ResetBodyView (props: {
  input: EpisodeReset<ListMovie>
}): JSX.Element {
  return (
    <Text>
      Reset: {props.input.item.name}
    </Text>
  )
}
