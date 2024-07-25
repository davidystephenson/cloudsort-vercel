import { Listing } from './listing-types'
import post from '@/post/post'
import guardCalculatedMovieArray from '@/movie/guard-calculated-movie-array'

export default async function postListing (props: {
  label: string
  listId: number
}): Promise<Listing> {
  const body = { listId: props.listId }
  const response = await post({
    body,
    guard: guardCalculatedMovieArray,
    label: props.label,
    url: '/list/listing'
  })
  return response
}
