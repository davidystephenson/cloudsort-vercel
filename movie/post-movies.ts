import { Movie } from '@prisma/client'
import { PostMoviesBody } from './movie-types'
import post from '@/post/post'

export default async function postMovies (props: {
  body: PostMoviesBody
}): Promise<Movie[]> {
  return await post({
    body: props.body,
    url: '/api/movies'
  })
}
