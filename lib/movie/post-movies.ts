import { Movie } from '@prisma/client'
import { PostMoviesBody, PostMoviesResponse } from './movie-types'
import axios, { AxiosResponse } from 'axios'

export default async function postMovies (props: {
  body: PostMoviesBody
}): Promise<Movie[]> {
  const response = await axios.post<
  PostMoviesResponse,
  AxiosResponse<PostMoviesResponse>,
  PostMoviesBody
  >('/api/movies', props.body)
  const movies: Movie[] = response.data.movies.map((movie) => {
    return {
      ...movie,
      updatedAt: new Date(movie.updatedAt)
    }
  })
  return movies
}
