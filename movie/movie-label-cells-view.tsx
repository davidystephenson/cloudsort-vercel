import ThemeTdView from '@/theme/theme-td-view'
import { useMovie } from './movie-context'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import MovieLabelView from './movie-label-view'

export default function MovieLabelCellsView (): JSX.Element {
  const movie = useMovie()
  const views = (
    <>
      <ThemeTdView w='100%'>
        <ThemeLinkableView href={movie.imdbUrl} isExternal>
          <MovieLabelView />
        </ThemeLinkableView>
      </ThemeTdView>
      <ThemeTdView>
        {movie.calculated.seed}
      </ThemeTdView>
    </>
  )
  return views
}
