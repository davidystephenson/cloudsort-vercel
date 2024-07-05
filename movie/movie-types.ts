import { Movie } from '@prisma/client'
import { Calculated, HistoryChoiceData, Item, ItemId } from '../mergeChoice/mergeChoiceTypes'

export interface ListMovie extends Item {
  id: number
  imdbId: string
  url?: string
  year: number
}
export type MovieData = Omit<ListMovie, 'id'>

export interface CreateMoviesRequest {
  listId: number
  movies: MovieData[]
}

export interface ImportMoviesRequest {
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

export type CalculatedMovie = Calculated<ListMovie>

export interface PostChooseMovieBody {
  listId: number
  lastChoiceMergechoiceId: ItemId
  choice: HistoryChoiceData<ListMovie>
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
