import { EpisodeRandom } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Text } from '@chakra-ui/react'

export default function RandomBodyView (props: {
  input: EpisodeRandom<ListMovie>
}): JSX.Element {
  return (
    <>
      <Text>
        First: {props.input.first.name}
      </Text>
      <Text>
        Second: {props.input.second.name}
      </Text>
    </>
  )
}
