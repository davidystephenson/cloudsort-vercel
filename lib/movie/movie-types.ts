import { Movie } from '@prisma/client'

export type MovieData = Omit<Movie, 'id'>

export type PostMovieBody = MovieData & { listId: number }

export interface DeleteMovieBody {
  listId: number
  movieId: number
}

export interface MovieContextValue {
  delete: () => Promise<void>
  row: Movie
}
