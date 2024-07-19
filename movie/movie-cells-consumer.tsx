import { useMovie } from './movie-context'
import ThemeTdView from '../theme/theme-td-view'
import { HStack, Text } from '@chakra-ui/react'
import ListMovieMenuView from '@/list/list-movie-menu-view'
import MovieLabelCellsView from './movie-label-cells-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <MovieLabelCellsView />
      <ThemeTdView pr='0'>
        <HStack>
          <Text>{movie.calculated.points}</Text>
          <ListMovieMenuView />
        </HStack>
      </ThemeTdView>
    </>
  )
}
