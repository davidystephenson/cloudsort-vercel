import { ListingPayload } from './listing-types'
import post from '@/post/post'
import policeListingPayload from './police-listing-payload'

export default async function postListing (props: {
  label: string
  listId: number
}): Promise<ListingPayload> {
  const body = { listId: props.listId }
  const response = await post({
    request: body,
    guard: policeListingPayload,
    label: props.label,
    url: '/api/list/listing'
  })
  return response
}
