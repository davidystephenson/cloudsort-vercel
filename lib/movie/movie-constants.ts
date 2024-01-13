import { MovieData } from './movie-types'

export const MOVIE_DATA: MovieData = {
  name: '',
  year: 0,
  score: 0,
  imdbId: '',
  review: '',
  url: ''
}
export const MOVIE_DATA_KEYS: Array<keyof MovieData> = ['name', 'score', 'imdbId', 'year']
