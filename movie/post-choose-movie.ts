import { PostChooseMovieBody } from './movie-types'
import axios, { AxiosResponse } from 'axios'
import { OkResponse } from '../respond/respond-types'

export default async function postChooseMovie (props: {
  body: PostChooseMovieBody
}): Promise<OkResponse> {
  const response = await axios.post<
  unknown,
  AxiosResponse<OkResponse>,
  PostChooseMovieBody
  >('/api/movie/choose', props.body)
  return response.data
}
