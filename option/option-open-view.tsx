import { useMovie } from '@/movie/movie-context'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import { HStack, Text } from '@chakra-ui/react'
import { useOption } from './option-context'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function OptionOpenView (): JSX.Element {
  const movie = useMovie()
  const option = useOption()

  return (
    <ThemeLinkableView
      href={movie.imdbUrl ?? undefined}
      isExternal
    >
      <HStack>
        <Text>[{option.openLetter}] imdb</Text>
        <ExternalLinkIcon />
      </HStack>
    </ThemeLinkableView>
  )
}
