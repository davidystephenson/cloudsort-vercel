import { EpisodeImport } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Text } from '@chakra-ui/react'

export default function ImportEpisodeCellsView (props: {
  input: EpisodeImport<ListMovie>
}): JSX.Element {
  return (
    <Text>
      Import {props.input.items.length}
    </Text>
  )
}
