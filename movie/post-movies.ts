import { Movie } from '@prisma/client'
import { CreateMoviesRequest } from './movie-types'
import post from '@/post/post'

export default async function postMovies (props: {
  body: CreateMoviesRequest
}): Promise<Movie[]> {
  return await post({
    body: props.body,
    url: '/api/movies'
  })
}
