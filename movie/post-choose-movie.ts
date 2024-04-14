import { PostChooseMovieBody } from './movie-types'
import { Ok } from '../respond/respond-types'
import post from '@/post/post'

export default async function postChooseMovie (props: {
  body: PostChooseMovieBody
}): Promise<Ok> {
  return await post({
    body: props.body,
    url: '/api/movie/choose'
  })
}
