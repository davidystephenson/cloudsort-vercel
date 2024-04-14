import post from '@/post/post'
import { PostDeleteMovieBody } from './movie-types'
import { Ok } from '@/respond/respond-types'

export default async function postDeleteMovie (props: {
  body: PostDeleteMovieBody
}): Promise<Ok> {
  return await post({
    body: props.body,
    url: '/api/movie/delete'
  })
}
