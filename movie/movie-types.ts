import { Movie } from '@prisma/client'
import { Calculated, EpisodeChoice, EpisodeRemove, Item } from '../mergechoice/mergeChoiceTypes'
import { EpisodeRequest } from '@/episode/episode-types'
import { ListWhere } from '@/list/list-types'

export interface ListMovie extends Item {
  id: number
  imdbId: string
  url?: string
  year: number
}
export type MovieData = Omit<ListMovie, 'id'>
export interface MovieWhere {
  itemId: number
}
export interface ImportRequest extends ListWhere {
  lastMergechoiceId: number | null
}
export interface CreateMoviesRequest extends ImportRequest {
  movies: MovieData[]
}
export type CalculatedMovie = Calculated<ListMovie>
export type RankedMovie = CalculatedMovie & {
  rank: number
}
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
  remove: EpisodeRemove<ListMovie>
}
export interface ChooseMovieRequest extends EpisodeRequest {
  choice: EpisodeChoice<ListMovie>
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
