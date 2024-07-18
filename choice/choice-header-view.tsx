import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { HStack, Heading } from '@chakra-ui/react'
import episodeContext from '../episode/episode-context'

export default function ChoiceHeaderView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  const episode = episodeContext.useContext()
  const date = new Date(episode.element.createdAt)
  const localeString = date.toLocaleString()
  return (
    <HStack>
      <Heading size='sm'>
        Choice ({localeString})
      </Heading>
    </HStack>
  )
}
