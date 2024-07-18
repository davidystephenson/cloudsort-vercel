import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Text } from '@chakra-ui/react'

export default function UnarchiveBodyView (props: {
  input: EpisodeArchive<ListMovie>
}): JSX.Element {
  return (
    <Text>
      Unarchive: {props.input.item.name}
    </Text>
  )
}
