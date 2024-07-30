import MovieCellsMenuView from '@/movie/movie-cells-menu-view'
import { HStack, Text } from '@chakra-ui/react'
import ThemeTdView from '../theme/theme-td-view'
import { useMovie } from './movie-context'
import MovieLabelCellsView from './movie-label-cells-view'
import RankView from '@/rank/rank-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <MovieLabelCellsView>
        <RankView />
      </MovieLabelCellsView>
      <ThemeTdView pr='0'>
        <HStack>
          <Text>{movie.item.points}</Text>
          <MovieCellsMenuView />
        </HStack>
      </ThemeTdView>
    </>
  )
}
