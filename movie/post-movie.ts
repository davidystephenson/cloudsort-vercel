import { Movie } from '@prisma/client'
import { PostMovieBody, CreatedMovie } from './movie-types'
import axios, { AxiosResponse } from 'axios'

export default async function postMovie (props: {
  body: PostMovieBody
}): Promise<Movie> {
  const response = await axios.post<
  CreatedMovie,
  AxiosResponse<CreatedMovie>,
  PostMovieBody
  >('/api/movie', props.body)
  return response.data
}
