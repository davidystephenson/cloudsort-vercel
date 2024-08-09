import MovieCellsMenuView from '@/movie/movie-cells-menu-view'
import { HStack, Text } from '@chakra-ui/react'
import ThemeTdView from '../theme/theme-td-view'
import { useMovie } from './movie-context'
import MovieLabelCellsView from './movie-label-cells-view'
import RankView from '@/rank/rank-view'

export default function MovieCellsConsumer (props: {
  rank: number
}): JSX.Element {
  const movie = useMovie()
  const consumer = (
    <>
      <MovieLabelCellsView>
        <RankView rank={props.rank} />
      </MovieLabelCellsView>
      <ThemeTdView>
        <HStack justifyContent='end' gap='0'>
          <Text>{movie.item.points}</Text>
          <MovieCellsMenuView />
        </HStack>
      </ThemeTdView>
    </>
  )
  return consumer
}
