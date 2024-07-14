import post from '@/post/post'
import { RemoveMovieRequest } from './movie-types'
import { Ok } from '@/respond/respond-types'

export default async function postDeleteMovie (props: {
  body: RemoveMovieRequest
}): Promise<Ok> {
  return await post({
    payload: props.body,
    url: '/api/movie/remove'
  })
}
