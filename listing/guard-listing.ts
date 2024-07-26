import { Db } from '@/prisma/prisma-types'
import { Listing } from './listing-types'
import guardRelatedList from '@/list/guard-related-list'
import getListing from './get-listing'
import { ItemHide } from '@prisma/client'

export default async function guardListing (props: {
  db: Db
  itemHides?: ItemHide[]
  listId: number
}): Promise<Listing> {
  const relatedList = await guardRelatedList({
    db: props.db,
    listId: props.listId
  })
  const listing = getListing({ itemHides: props.itemHides, relatedList })
  return listing
}
