import { List, Movie } from '@prisma/client'
import { MovieData } from '../movie/movie-types'

export interface ListContextValue {
  createMovie: (props: MovieData) => Promise<Movie>
  delete: () => Promise<void>
  row: List
  movies: Movie[]
}

export interface ListsContextValue {
  create: (props: { name: string }) => Promise<List>
  createMovie: (props: { listId: number, movie: Movie }) => void
  delete: (props: { id: number }) => void
  filterRows: (filterProps: { query: string | undefined }) => void
  filteredRows: List[]
  rows: List[]
}
