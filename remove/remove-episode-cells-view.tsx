import { EpisodeRemove } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { HStack, Text } from '@chakra-ui/react'
import RemoveIconView from './remove-icon-view'
import MovieLabelLinkContentView from '@/movie/movie-label-link-content-view'

export default function RemoveEpisodeCellsView (props: {
  input: EpisodeRemove<ListMovie>
}): JSX.Element {
  return (
    <HStack width='100%' gap='4px' alignItems='baseline'>
      <RemoveIconView />
      <Text>
        <MovieLabelLinkContentView />
      </Text>
    </HStack>
  )
}
