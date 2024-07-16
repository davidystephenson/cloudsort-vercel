import { Movie } from '@prisma/client'
import { Calculated, HistoryChoiceData, HistoryRemoveData, Item } from '../mergeChoice/mergeChoiceTypes'
import { EpisodeRequest } from '@/event/event-types'
import { ListRequest } from '@/list/list-types'

export interface ListMovie extends Item {
  id: number
  imdbId: string
  url?: string
  year: number
}
export type MovieData = Omit<ListMovie, 'id'>
export interface ImportRequest extends ListRequest {
  lastMergechoiceId: number | null
}
export interface CreateMoviesRequest extends ImportRequest {
  movies: MovieData[]
}
export type CalculatedMovie = Calculated<ListMovie>
export interface ImportMoviesRequest extends ImportRequest {
  movies: CalculatedMovie[]
}
export type CreatedMovie = Omit<Movie, 'updatedAt'> & {
  updatedAt: string
}
export interface PostMoviesResponse extends EpisodeRequest {
  movies: CreatedMovie[]
}
export interface RemoveMovieRequest extends EpisodeRequest {
  remove: HistoryRemoveData<ListMovie>
}
export interface ChooseMovieRequest extends EpisodeRequest {
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
