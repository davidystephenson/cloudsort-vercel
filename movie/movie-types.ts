import { Movie } from '@prisma/client'
import { Calculated } from '../mergeChoice/merge-choice-types'

export type MovieData = Omit<Movie, 'id'>

export interface PostMovieBody extends MovieData {
  listId: number
}

export interface PostMoviesBody {
  listId: number
  movies: MovieData[]
}

export type CreatedMovie = Omit<Movie, 'updatedAt'> & {
  updatedAt: string
}

export interface PostMoviesResponse {
  movies: CreatedMovie[]
}

export interface DeleteMovieBody {
  listId: number
  movieId: number
}

export type CalculatedMovie = Calculated<Movie>

export interface ChooseMovieBody {
  betterIndex: number
  listId: number
}

export interface CritickerRow {
  ' Date Rated': string
  ' Film Name': string
  ' Year': string
  ' Mini Review': string
  ' URL': string
  ' IMDB ID': string
  Score: string
}
