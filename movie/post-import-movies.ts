import { PostImportMoviesBody } from './movie-types'
import axios, { AxiosResponse } from 'axios'
import { OkResponse } from '@/respond/respond-types'

export default async function postImportMovies (props: {
  body: PostImportMoviesBody
}): Promise<OkResponse> {
  const response = await axios.post<
  never,
  AxiosResponse<OkResponse>,
  PostImportMoviesBody
  >('/api/movies/import', props.body)
  return response.data
}
