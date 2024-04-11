import axios from 'axios'
import { PostDeleteMovieBody } from './movie-types'
import { OkResponse } from '@/respond/respond-types'

export default async function postDeleteMovie (props: {
  body: PostDeleteMovieBody
}): Promise<OkResponse> {
  const response = await axios.post<
  unknown,
  OkResponse,
  PostDeleteMovieBody
  >('/api/movie/delete', props.body)
  return response
}
