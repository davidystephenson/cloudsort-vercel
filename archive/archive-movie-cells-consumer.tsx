import { useMovie } from '@/movie/movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'
import ThemeTdView from '../theme/theme-td-view'
import { HStack, Icon } from '@chakra-ui/react'
import MovieLabelView from '@/movie/movie-label-view'
import ArchiveMenuView from './archive-menu-view'
import { LuArchive } from 'react-icons/lu'

export default function ArchiveMovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <ThemeTdView w='100%'>
        <ThemeLinkableView href={movie.imdbUrl} isExternal>
          <MovieLabelView />
        </ThemeLinkableView>
      </ThemeTdView>
      <ThemeTdView>
        {movie.calculated.seed}
      </ThemeTdView>
      <ThemeTdView pr='0'>
        <HStack>
          <Icon as={LuArchive} />
          <ArchiveMenuView />
        </HStack>
      </ThemeTdView>
    </>
  )
}
