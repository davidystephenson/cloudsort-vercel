import { EpisodeImport } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { HStack, Text } from '@chakra-ui/react'
import ImportIconView from './import-icon-view'

export default function ImportEpisodeCellsView (props: {
  input: EpisodeImport<ListMovie>
}): JSX.Element {
  return (
    <HStack>
      <ImportIconView />
      <Text>
        {props.input.items.length}
      </Text>
    </HStack>
  )
}
