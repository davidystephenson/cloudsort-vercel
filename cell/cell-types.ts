import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { CalculatedMovie, ListMovie } from '@/movie/movie-types'

export interface ArchiveCells {
  type: 'archive'
}
export interface ArchiveMovieCells {
  type: 'archiveMovie'
  movie: CalculatedMovie
}
export interface ColumnsCells {
  type: 'columns'
}
export interface EpisodeCells {
  type: 'episode'
  episode: Episode<ListMovie>
}
export interface EpisodeMovieCells {
  type: 'episodeMovie'
  episode: Episode<ListMovie>
  movie: CalculatedMovie
}
export interface HistoryCells {
  type: 'history'
}
export interface ListMovieCells {
  type: 'listMovie'
  movie: CalculatedMovie
}
export interface ListMoviesCells {
  type: 'listMovies'
}

export interface Cells {
  archive: ArchiveCells
  archiveMovie: ArchiveMovieCells
  columns: ColumnsCells
  episode: EpisodeCells
  episodeMovie: EpisodeMovieCells
  history: HistoryCells
  listMovie: ListMovieCells
  listMovies: ListMoviesCells
}
export type CellsKey = keyof Cells
export type CellsType = Cells[CellsKey]

export interface Row <Key extends CellsKey> {
  id: number | string
  cells: Cells[Key]
  type: Key
}
