import MovieCellsMenuView from '@/movie/movie-cells-menu-view'
import { HStack, Text } from '@chakra-ui/react'
import ThemeTdView from '../theme/theme-td-view'
import { useMovie } from './movie-context'
import MovieLabelCellsView from './movie-label-cells-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <MovieLabelCellsView />
      <ThemeTdView pr='0'>
        <HStack>
          <Text>{movie.calculated.points}</Text>
          <MovieCellsMenuView />
        </HStack>
      </ThemeTdView>
    </>
  )
}
