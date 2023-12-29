import { Movie } from '@prisma/client'
import { PostMovieBody } from './movie-types'
import axios from 'axios'

export default async function postMovie (props: PostMovieBody): Promise<Movie> {
  const response = await axios.post('/api/movie', props)
  return response.data
}
