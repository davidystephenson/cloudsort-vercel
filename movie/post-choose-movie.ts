import { ChooseMovieBody } from './movie-types'
import axios, { AxiosResponse } from 'axios'
import { OkResponse } from '../respond/respond-types'

export default async function postChooseMovie (props: {
  body: ChooseMovieBody
}): Promise<OkResponse> {
  const response = await axios.post<
  OkResponse,
  AxiosResponse<OkResponse>,
  ChooseMovieBody
  >('/api/movie/choose', props.body)
  return response.data
}
