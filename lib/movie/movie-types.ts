import { Movie } from '@prisma/client'

export type MovieData = Omit<Movie, 'id'>

export type PostMovieBody = MovieData & { listId: number }

export interface MovieContextValue {
  row: Movie
}
