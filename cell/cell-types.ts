export interface ArchiveCells {
  type: 'archive'
}
export interface ArchiveMovieCells {
  type: 'archiveMovie'
  movieId: number
}
export interface ColumnsCells {
  type: 'columns'
}
export interface EpisodeCells {
  type: 'episode'
  episodeId: number
}
export interface EpisodeMovieCells {
  type: 'episodeMovie'
  episodeId: number
  movieId: number
}
export interface HistoryCells {
  type: 'history'
}
export interface ListMovieCells {
  type: 'listMovie'
  movieId: number
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
