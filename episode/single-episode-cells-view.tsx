import MovieLabelLinkContentView from '@/movie/movie-label-link-content-view'
import { HStack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function SingleEpisodeCellsView (props: {
  children: ReactNode
}): JSX.Element {
  return (
    <HStack width='100%' gap='4px'>
      {props.children}
      <Text>
        <MovieLabelLinkContentView />
      </Text>
    </HStack>
  )
}
