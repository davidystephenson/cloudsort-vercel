import { Db } from '@/prisma/prisma-types'
import { Listing } from './listing-types'
import guardRelatedList from '@/list/guard-related-list'
import getListing from './get-listing'

export default async function guardListing (props: {
  db: Db
  listId: number
}): Promise<Listing> {
  const relatedList = await guardRelatedList({
    db: props.db,
    listId: props.listId
  })
  const listing = await getListing({ db: props.db, relatedList })
  return listing
}
