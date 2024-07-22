import { Row } from '@/cell/cell-types'
import MovieLabelCellView from '@/movie/movie-label-cell-view'
import ThemeTdView from '@/theme/theme-td-view'
import RandomIcon from './random-icon'

export default function RandomEpisodeMovieCellsView(props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <>
      <MovieLabelCellView />
      <ThemeTdView>
        <RandomIcon />
      </ThemeTdView>
      <ThemeTdView>
        <RandomIcon />
      </ThemeTdView>
    </>
  )
  return view
}
