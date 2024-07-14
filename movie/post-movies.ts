import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { CreateMoviesRequest, ListMovie } from './movie-types'
import post from '@/post/post'

export default async function postMovies (props: {
  body: CreateMoviesRequest
}): Promise<HistoryEvent<ListMovie>> {
  const response = await post({
    payload: props.body,
    url: '/api/movies'
  })
  return await post({
    payload: props.body,
    url: '/api/movies'
  })
}
