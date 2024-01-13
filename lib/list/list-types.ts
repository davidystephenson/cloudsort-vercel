import { List, Movie, Prisma } from '@prisma/client'
import { CalculatedMovie, MovieData } from '../movie/movie-types'
import { State } from '../mergeChoice/merge-choice-types'

export interface ListContextValue {
  choose: (props: { betterIndex: number }) => Promise<void>
  createMovie: (props: MovieData) => Promise<Movie>
  delete: () => Promise<void>
  deleteMovie: (props: { movieId: number }) => void
  filter: (props: { query: string | undefined }) => void
  filtered: CalculatedMovie[]
  row: List
  movies: CalculatedMovie[]
  state: State<Movie>
}

export interface ListsContextValue {
  create: (props: { name: string }) => Promise<List>
  delete: (props: { id: number }) => void
  filter: (filterProps: { query: string | undefined }) => void
  filtered: List[]
  rows: List[]
}
export type RelatedList = Prisma.ListGetPayload<{
  include: {
    operations: {
      include: {
        inputs: {
          include: {
            inputMovies: true
          }
        }
        outputMovies: true
      }
    }
    movieReservations: true
    choices: true
  }
}>
export interface MergechoiceList {
  list: RelatedList
  state: State<Movie>
}
