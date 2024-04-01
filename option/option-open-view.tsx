import { useMovie } from '@/movie/movie-context'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import { HStack } from '@chakra-ui/react'
import { useOption } from './option-context'

export default function OptionOpenView (): JSX.Element {
  const movie = useMovie()
  const option = useOption()

  return (
    <HStack>
      <ThemeLinkableView href={movie.calculated.url ?? undefined} isExternal>
        [{option.openLetter}] imdb
      </ThemeLinkableView>
    </HStack>
  )
}
