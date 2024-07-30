'use server'

import { List } from '@prisma/client'
import PrivateListView from './private-list-view'
import PublicListView from './public-list-view'
import guardListing from '@/listing/guard-listing'
import prisma from '@/prisma/prisma'
import guardRelatedList from './guard-related-list'
import listToHistory from './list-to-history'

export default async function ListConsumer (props: {
  currentUserId?: number
  list: List
}): Promise<JSX.Element> {
  const _private = props.currentUserId === props.list.userId
  if (_private) {
    const list = await guardRelatedList({
      db: prisma,
      listId: props.list.id
    })
    const history = listToHistory({
      list
    })
    const view = (
      <PrivateListView
        history={history}
        seed={list.seed}
      />
    )
    return view
  }
  const itemHides = await prisma.itemHide.findMany({
    where: {
      userId: props.list.userId
    }
  })
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
