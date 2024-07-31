import MovieCellsMenuView from '@/movie/movie-cells-menu-view'
import { Box, HStack, Text } from '@chakra-ui/react'
import ThemeTdView from '../theme/theme-td-view'
import { useMovie } from './movie-context'
import MovieLabelCellsView from './movie-label-cells-view'
import RankView from '@/rank/rank-view'
import HideDisplayView from '@/hide/hide-display-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  const consumer = (
    <>
      <MovieLabelCellsView>
        <RankView />
      </MovieLabelCellsView>
      <ThemeTdView>
        <HStack justifyContent='end' gap='0'>
          <Box paddingRight='5px'>
            <HideDisplayView />
          </Box>
          <Text>{movie.item.points}</Text>
          <MovieCellsMenuView />
        </HStack>
      </ThemeTdView>
    </>
  )
  return consumer
}
