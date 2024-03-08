import axios from 'axios'
import { DeleteMovieBody } from './movie-types'

export default async function deleteMovie (props: DeleteMovieBody): Promise<void> {
  return await axios.delete('/api/movie', { data: props })
}
