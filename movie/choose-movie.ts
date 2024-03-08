import { ChooseMovieBody } from './movie-types'
import axios, { AxiosResponse } from 'axios'
import { OkResponse } from '../api/api-types'

export default async function chooseMovie (props: {
  body: ChooseMovieBody
}): Promise<OkResponse> {
  const response = await axios.post<
  OkResponse,
  AxiosResponse<OkResponse>,
  ChooseMovieBody
  >('/api/choose', props.body)
  return response.data
}
