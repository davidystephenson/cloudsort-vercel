import { EpisodeReset } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { HStack, Text } from '@chakra-ui/react'
import ResetIconView from './reset-icon-view'

export default function ResetEpisodeCellsView (props: {
  input: EpisodeReset<ListMovie>
}): JSX.Element {
  return (
    <HStack>
      <ResetIconView />
      <Text>{props.input.item.name}</Text>
    </HStack>
  )
}
