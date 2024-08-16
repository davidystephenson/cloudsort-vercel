import { useMovie } from '@/movie/movie-context'
import ThemeTdView from '../theme/theme-td-view'
import { HStack, Icon } from '@chakra-ui/react'
import ArchiveMenuView from './archive-menu-view'
import { LuArchive } from 'react-icons/lu'
import MovieLabelCellView from '@/movie/movie-label-cell-view'

export default function ArchiveMovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <MovieLabelCellView />
      <ThemeTdView>
        {movie.item.seed}
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
