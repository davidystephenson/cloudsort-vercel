import { Movie } from '@prisma/client'
import { PostMoviesBody } from './movie-types'
import { PrismaTransaction } from '@/prisma/prisma-types'

export default async function handlePostMovies (props: {
  body: PostMoviesBody
  tx: PrismaTransaction
}): Promise<Movie[]> {
  const imdbIds = props.body.movies.map((movie) => movie.imdbId)
  const existingMovies = await props.tx.movie.findMany({
    where: {
      imdbId: {
        in: imdbIds
      }
    }
  })
  const existingImdbIds = existingMovies.map((movie) => movie.imdbId)
  const newImdbIds = imdbIds.filter((imdbId) => !existingImdbIds.includes(imdbId))
  const newMovieData = props.body
    .movies
    .filter((movie) => newImdbIds.includes(movie.imdbId))
  await props.tx.movie.createMany({
    data: newMovieData
  })
  const newMovies = await props.tx.movie.findMany({
    where: {
      imdbId: {
        in: newImdbIds
      }
    }
  })
  const movies = [...existingMovies, ...newMovies]
  return movies
}
