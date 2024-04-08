import axios from 'axios'
import { DeleteMovieBody } from './movie-types'
import { OkResponse } from '@/respond/respond-types'

export default async function postDeleteMovie (props: {
  body: DeleteMovieBody
}): Promise<OkResponse> {
  const response = await axios.post<
  unknown,
  OkResponse,
  DeleteMovieBody
  >('/api/movie/delete', props.body)
  return response
}
