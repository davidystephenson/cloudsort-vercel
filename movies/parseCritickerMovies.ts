import { CritickerRow, MovieData } from '../movie/movie-types'

export default function parseCritickerMovies (props: {
  rows: CritickerRow[]
}): MovieData[] {
  const movies = props.rows.map((row: CritickerRow) => {
    const score = Number(row.Score)
    const year = Number(row[' Year'])
    const movie: MovieData = {
      imdbId: row[' IMDB ID'],
      review: row[' Mini Review'],
      score,
      name: row[' Film Name'],
      year,
      url: row[' URL']
    }
    return movie
  })
  return movies
}
