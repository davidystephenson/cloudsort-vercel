import { useMovie } from './movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'
import ThemeTdView from '../theme/theme-td-view'
import { HStack, Text } from '@chakra-ui/react'
import MovieLabelView from './movie-label-view'
import DeleteMovieButtonView from './delete-movie-button-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <ThemeTdView w='100%'>
        <ThemeLinkableView href={movie.imdbUrl} isExternal>
          <MovieLabelView />
        </ThemeLinkableView>
      </ThemeTdView>
      <ThemeTdView>
        {movie.calculated.score}
      </ThemeTdView>
      <ThemeTdView>
        <HStack>
          <Text>{movie.calculated.points}</Text>
          <DeleteMovieButtonView />
        </HStack>
      </ThemeTdView>
    </>
  )
}
