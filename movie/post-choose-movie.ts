import { ChooseMovieRequest } from './movie-types'
import { Ok } from '../respond/respond-types'
import post from '@/post/post'

export default async function postChooseMovie (props: {
  body: ChooseMovieRequest
}): Promise<Ok> {
  return await post({
    payload: props.body,
    url: '/api/movie/choose'
  })
}
