import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { HStack, Text } from '@chakra-ui/react'
import ArchiveIconView from './archive-icon-view'

export default function ArchiveEpisodeCellsView (props: {
  input: EpisodeArchive<ListMovie>
}): JSX.Element {
  return (
    <HStack>
      <ArchiveIconView />
      <Text>{props.input.item.name}</Text>
    </HStack>
  )
}
