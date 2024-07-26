'use server'

import { List } from '@prisma/client'
import PrivateListView from './private-list-view'
import PublicListView from './public-list-view'
import guardListing from '@/listing/guard-listing'
import prisma from '@/prisma/prisma'

export default async function ListConsumer (props: {
  currentUserId?: number
  list: List
}): Promise<JSX.Element> {
  const _private = props.currentUserId === props.list.userId
  if (_private) {
    const view = (
      <PrivateListView />
    )
    return view
  }
  console.log('props.currentUserId', props.currentUserId)
  const itemHides = await prisma.itemHide.findMany({
    where: {
      userId: props.list.userId
    }
  })
  console.log('itemHides', itemHides)
  const listing = await guardListing({
    db: prisma,
    itemHides,
    listId: props.list.id
  })
  const view = (
    <PublicListView
      list={props.list}
      listing={listing}
    />
  )
  return view
}
