import { Listing } from './listing-types'
import post from '@/post/post'
import policeRankedMovieArray from '@/movie/police-ranked-movie-array'

export default async function postListing (props: {
  label: string
  listId: number
}): Promise<Listing> {
  const body = { listId: props.listId }
  const response = await post({
    body,
    guard: policeRankedMovieArray,
    label: props.label,
    url: '/list/listing'
  })
  return response
}
