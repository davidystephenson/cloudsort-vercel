import axios, { AxiosResponse } from 'axios'

export default async function post <Body, Response> (props: {
  body: Body
  url: string
}): Promise<Response> {
  const response = await axios.post<
  unknown,
  AxiosResponse<Response>,
  Body
  >(props.url, props.body)
  return response.data
}
