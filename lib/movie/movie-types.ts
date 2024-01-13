import { Movie } from '@prisma/client'
import { Calculated } from '../mergeChoice/merge-choice-types'

export type MovieData = Omit<Movie, 'id' | 'updatedAt'>

export type PostMovieBody = MovieData & { listId: number }

export type PostMovieResponse = Omit<Movie, 'updatedAt'> & {
  updatedAt: string
}

export interface DeleteMovieBody {
  listId: number
  movieId: number
}

export type CalculatedMovie = Calculated<Movie>

export interface MovieContextValue {
  delete: () => Promise<void>
  calculated: CalculatedMovie
}

export interface ChooseMovieBody {
  listId: number
  betterIndex: number
}
