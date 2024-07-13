import { Movie } from '@prisma/client'
import { Calculated, HistoryChoiceData, HistoryRemoveData, Item } from '../mergeChoice/mergeChoiceTypes'
import { EventRequest } from '@/event/event-types'

export interface ListMovie extends Item {
  id: number
  imdbId: string
  url?: string
  year: number
}
export type MovieData = Omit<ListMovie, 'id'>
export interface CreateMoviesRequest extends EventRequest {
  movies: MovieData[]
}
export type CalculatedMovie = Calculated<ListMovie>
export interface ImportMoviesRequest extends EventRequest {
  movies: CalculatedMovie[]
}
export type CreatedMovie = Omit<Movie, 'updatedAt'> & {
  updatedAt: string
}
export interface PostMoviesResponse extends EventRequest {
  movies: CreatedMovie[]
}
export interface RemoveMovieRequest extends EventRequest {
  remove: HistoryRemoveData<ListMovie>
}
export interface ChooseMovieRequest extends EventRequest {
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
