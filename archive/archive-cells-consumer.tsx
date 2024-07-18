import { useMovie } from '@/movie/movie-context'
import MovieLabelView from '@/movie/movie-label-view'
import ThemeLinkableView from '../theme/theme-linkable-view'
import ThemeTdView from '../theme/theme-td-view'
import ArchiveMenu from './archive-menu'
import { HStack, Text } from '@chakra-ui/react'

export default function ArchiveCellsConsumer (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <ThemeTdView w='100%'>
        <ThemeLinkableView href={movie.imdbUrl} isExternal>
          <MovieLabelView />
        </ThemeLinkableView>
      </ThemeTdView>
      <ThemeTdView>
        <HStack>
          <Text>{movie.calculated.seed}</Text>
          <ArchiveMenu />
        </HStack>
      </ThemeTdView>
    </>
  )
}
