import { Movie } from '@prisma/client'
import { Calculated, ItemId } from '../mergeChoice/mergeChoiceTypes'

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

export interface PostDeleteMovieBody {
  listId: number
  movieId: number
}

export type CalculatedMovie = Calculated<Movie>

export interface PostChooseMovieBody {
  betterIndex: number
  listId: number
  movieId: ItemId
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
