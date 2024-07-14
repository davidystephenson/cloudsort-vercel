import post from '@/post/post'
import { ImportMoviesRequest } from './movie-types'
import { Ok } from '@/respond/respond-types'

export default async function postImportMovies (props: {
  body: ImportMoviesRequest
}): Promise<Ok> {
  return await post({
    payload: props.body,
    url: '/api/movies/import'
  })
}
