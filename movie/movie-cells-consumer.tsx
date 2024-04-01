import { useMovie } from './movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'
import DeleteIconButtonView from '../delete-button/delete-icon-button-view'
import ThemeTdView from '../theme/theme-td-view'
import { HStack, Text } from '@chakra-ui/react'
import MovieLabelView from './movie-label-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  async function send (): Promise<void> {
    await movie.delete()
  }
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
          <DeleteIconButtonView send={send} />
        </HStack>
      </ThemeTdView>
    </>
  )
}
