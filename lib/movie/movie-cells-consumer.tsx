import { useMovie } from '../movie/movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'
import DeleteIconButtonView from '../delete-button/delete-icon-button-view'
import ThemeTdView from '../theme/theme-td-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  async function send (): Promise<void> {
    await movie.delete()
  }
  return (
    <>
      <ThemeTdView w='100%'>
        <ThemeLinkableView href={movie.calculated.url} isExternal>
          {movie.calculated.name}
        </ThemeLinkableView>
      </ThemeTdView>
      <ThemeTdView>
        {movie.calculated.score}
      </ThemeTdView>
      <ThemeTdView>
        {movie.calculated.points}
        <DeleteIconButtonView send={send} />
      </ThemeTdView>
    </>
  )
}
