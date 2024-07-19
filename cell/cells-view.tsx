import ArchiveMovieCellsView from '@/archive/archive-movie-cells-view'
import { CellsKey, Row } from './cell-types'
import ArchiveCellsView from '@/archive/archive-cells-view'
import TableColumnsView from '@/table/table-columns-view'
import EpisodeCellsView from '@/episode/episode-cells-view'
import EpisodeMovieCellsView from '@/episode/episode-movie-cells-view'
import HistoryCellsView from '@/history/history-cells-view'
import ListMovieCellsView from '@/movie/list-movie-cells-view'
import ListMoviesCellsView from '@/movie/list-movies-cells-view'

export default function CellsView <Key extends CellsKey> (props: {
  row: Row<Key>
}): JSX.Element {
  type Views = {
    [K in CellsKey]: (props: { row: Row<K> }) => JSX.Element
  }
  const views: Views = {
    archive: ArchiveCellsView,
    archiveMovie: ArchiveMovieCellsView,
    columns: TableColumnsView,
    episode: EpisodeCellsView,
    episodeMovie: EpisodeMovieCellsView,
    history: HistoryCellsView,
    listMovie: ListMovieCellsView,
    listMovies: ListMoviesCellsView
  }
  const V = views[props.row.type]
  const view = V({ row: props.row })
  return view
}
