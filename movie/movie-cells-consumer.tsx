import { useMovie } from './movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'
import ThemeTdView from '../theme/theme-td-view'
import { Button, HStack, Text } from '@chakra-ui/react'
import MovieLabelView from './movie-label-view'
import MovieMenu from './movie-menu'

export default function MovieCellsConsumer (props: {
  mounted?: boolean
}): JSX.Element {
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
      <ThemeTdView>
        <HStack>
          <Text>{movie.calculated.points}</Text>
          <MovieMenu mounted={props.mounted} />
          <Button>Test</Button>
        </HStack>
      </ThemeTdView>
    </>
  )
}
