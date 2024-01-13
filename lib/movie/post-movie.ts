import { Movie } from '@prisma/client'
import { PostMovieBody, PostMovieResponse } from './movie-types'
import axios, { AxiosResponse } from 'axios'

export default async function postMovie (props: {
  body: PostMovieBody
}): Promise<Movie> {
  const response = await axios.post<
  PostMovieResponse,
  AxiosResponse<PostMovieResponse>,
  PostMovieBody
  >('/api/movie', props.body)
  const movie: Movie = {
    ...response.data,
    updatedAt: new Date(response.data.updatedAt)
  }
  return movie
}
