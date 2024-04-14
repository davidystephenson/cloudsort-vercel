import post from '@/post/post'
import { PostImportMoviesBody } from './movie-types'
import { Ok } from '@/respond/respond-types'

export default async function postImportMovies (props: {
  body: PostImportMoviesBody
}): Promise<Ok> {
  return await post({
    body: props.body,
    url: '/api/movies/import'
  })
}
