import MovieCellsMenuView from '@/movie/movie-cells-menu-view'
import { Text } from '@chakra-ui/react'
import ThemeTdView from '../theme/theme-td-view'
import { useMovie } from './movie-context'
import MovieLabelCellsView from './movie-label-cells-view'
import RankView from '@/rank/rank-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  const consumer = (
    <>
      <MovieLabelCellsView>
        <RankView />
      </MovieLabelCellsView>
      <ThemeTdView>
        <Text>{movie.item.points}</Text>
      </ThemeTdView>
      <ThemeTdView>
        <MovieCellsMenuView />
      </ThemeTdView>
    </>
  )
  return consumer
}
