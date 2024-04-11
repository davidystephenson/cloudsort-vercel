import { Movie } from '@prisma/client'
import { Calculated } from '../mergeChoice/mergeChoiceTypes'

export type MovieData = Omit<Movie, 'id'>

export interface PostMoviesBody {
  listId: number
  movies: MovieData[]
}

export interface PostImportMoviesBody {
  listId: number
  movies: Movie[]
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
