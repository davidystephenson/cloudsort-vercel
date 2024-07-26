import { Row } from '@/cell/cell-types'
import MovieLabelCellView from '@/movie/movie-label-cell-view'
import ThemeTdView from '@/theme/theme-td-view'
import RandomIconView from './random-icon-view'

export default function RandomEpisodeMovieCellsView(props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <>
      <MovieLabelCellView />
      <ThemeTdView>
        <RandomIconView />
      </ThemeTdView>
      <ThemeTdView>
        <RandomIconView />
      </ThemeTdView>
    </>
  )
  return view
}
