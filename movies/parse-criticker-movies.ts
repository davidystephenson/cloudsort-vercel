import { CritickerRow, MovieData } from '../movie/movie-types'

export default function parseCritickerMovies (props: {
  rows: CritickerRow[]
}): MovieData[] {
  const movies = props.rows.map((row: CritickerRow) => {
    const score = Number(row.Score)
    const year = Number(row[' Year'])
    const movie: MovieData = {
      imdbId: row[' IMDB ID'],
      name: row[' Film Name'],
      year,
      url: row[' URL'],
      seeding: true,
      seed: score
    }
    return movie
  })
  return movies
}
