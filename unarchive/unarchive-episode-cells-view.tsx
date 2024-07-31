import { EpisodeUnarchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { HStack, Text } from '@chakra-ui/react'
import UnarchiveIconView from './unarchive-icon-view'

export default function UnarchiveEpisodeCellsView (props: {
  input: EpisodeUnarchive<ListMovie>
}): JSX.Element {
  return (
    <HStack>
      <UnarchiveIconView />
      <Text>{props.input.item.name}</Text>
    </HStack>
  )
}
