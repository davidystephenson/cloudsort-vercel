import { List, Movie } from '@prisma/client'
import { MovieData } from '../movie/movie-types'

export interface ListContextValue {
  createMovie: (props: MovieData) => Promise<Movie>
  delete: () => Promise<void>
  deleteMovie: (props: { movieId: number }) => void
  filter: (props: { query: string | undefined }) => void
  filtered: Movie[]
  row: List
  movies: Movie[]
}

export interface ListsContextValue {
  create: (props: { name: string }) => Promise<List>
  createMovie: (props: { listId: number, movie: Movie }) => void
  delete: (props: { id: number }) => void
  deleteMovie: (props: { listId: number, movieId: number }) => void
  filter: (filterProps: { query: string | undefined }) => void
  filtered: List[]
  rows: List[]
}
